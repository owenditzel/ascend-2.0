import { useState, useEffect, useCallback } from 'react'

export interface CommunityPost {
  id: string
  user_id: string
  user_name: string
  content: string
  post_type: 'general' | 'win' | 'question' | 'accountability'
  likes: string[]
  created_at: string
}

const STORAGE_KEY = 'ascend_community_posts'

const SEED_POSTS: CommunityPost[] = [
  {
    id: 'seed-1',
    user_id: 'seed-user-2',
    user_name: 'Marcus T.',
    content: 'Just closed my first $3,500 client. Took 4 weeks of consistent DMs and two calls to get here. The objection handling scripts from Module 6 were the difference — I had a response for everything. Not stopping.',
    post_type: 'win',
    likes: ['seed-user-3', 'seed-user-4', 'seed-user-5'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: 'seed-2',
    user_id: 'seed-user-3',
    user_name: 'Jordan K.',
    content: 'WEEKLY CHECK-IN\n\nMIND: Been working through the imposter syndrome module. Writing the evidence log every night is genuinely changing how I think about my pricing.\nBODY: 5/5 workouts this week, sleep is locked in.\nMISSION: 3 sales calls this week, 1 close. Targeting 2 closes next week.\n\nCommitting to 25 DM conversations opened before Friday.',
    post_type: 'accountability',
    likes: ['seed-user-2', 'seed-user-5'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: 'seed-3',
    user_id: 'seed-user-4',
    user_name: 'Devon R.',
    content: 'Question for anyone who\'s been through Module 5 — when you\'re qualifying in DMs, how long are you letting a conversation go before you push for the call booking? I keep getting stuck in long back-and-forths.',
    post_type: 'question',
    likes: ['seed-user-2'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
  },
  {
    id: 'seed-4',
    user_id: 'seed-user-5',
    user_name: 'Chris A.',
    content: 'Six months out of the league and I finally feel like I have a plan. Posted my first piece of content today. Embarrassing? Yes. Done? Also yes. The module is right — the first one is the hardest.',
    post_type: 'general',
    likes: ['seed-user-2', 'seed-user-3', 'seed-user-4'],
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
]

function loadPosts(): CommunityPost[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_POSTS))
    return SEED_POSTS
  } catch {
    return SEED_POSTS
  }
}

function savePosts(posts: CommunityPost[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
  } catch {}
}

export function useCommunity(userId: string | undefined, userName: string | undefined) {
  const [posts, setPosts] = useState<CommunityPost[]>([])
  const [loading, setLoading] = useState(true)

  const refresh = useCallback(() => {
    setPosts(loadPosts())
    setLoading(false)
  }, [])

  useEffect(() => { refresh() }, [refresh])

  function addPost(content: string, post_type: CommunityPost['post_type']) {
    if (!userId || !content.trim()) return
    const post: CommunityPost = {
      id: Date.now().toString(),
      user_id: userId,
      user_name: userName ?? 'You',
      content: content.trim(),
      post_type,
      likes: [],
      created_at: new Date().toISOString(),
    }
    const updated = [post, ...posts]
    setPosts(updated)
    savePosts(updated)
  }

  function toggleLike(postId: string) {
    if (!userId) return
    const updated = posts.map(p => {
      if (p.id !== postId) return p
      const alreadyLiked = p.likes.includes(userId)
      return {
        ...p,
        likes: alreadyLiked ? p.likes.filter(id => id !== userId) : [...p.likes, userId],
      }
    })
    setPosts(updated)
    savePosts(updated)
  }

  function deletePost(postId: string) {
    if (!userId) return
    const updated = posts.filter(p => !(p.id === postId && p.user_id === userId))
    setPosts(updated)
    savePosts(updated)
  }

  return { posts, loading, addPost, toggleLike, deletePost }
}
