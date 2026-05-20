-- ============================================================
-- SEED DATA for Ascend 2.0 — Safe to re-run
-- Order: DELETE existing data, then INSERT modules, lessons, resources
-- ============================================================

DELETE FROM resources;
DELETE FROM lessons;
DELETE FROM modules;

-- ============================================================
-- MODULES (14 total: 8 course + 6 mindset)
-- ============================================================

INSERT INTO modules (id, title, description, "order", tier_availability, learning_outcomes) VALUES

-- Course modules (full_only)
(1, 'The Identity Reset',
 'Rebuild your identity after sport. Process the transition, rebuild sense of self, position your competitive mindset as foundation for entrepreneurship.',
 1, 'full_only',
 '["Process identity crisis post-sport","Rebuild sense of self beyond athletics","Leverage competitive mindset for business","Design your 2.0 identity"]'::jsonb),

(2, 'Find Your Monetizable Skill',
 'Identify which of your skills people will pay for. Validate market demand and position yourself for premium pricing.',
 2, 'full_only',
 '["Audit all transferable skills","Validate market demand","Position for premium pricing","Choose your niche"]'::jsonb),

(3, 'Build Your Offer',
 'Design a clear, sellable offer. Service package, pricing, and value proposition that converts.',
 3, 'full_only',
 '["Design your offer anatomy","Price for premium positioning","Write your value proposition","Validate with 3 prospects"]'::jsonb),

(4, 'The Content Creation System',
 'Build a repeatable content machine that attracts ideal clients organically through DMs and community.',
 4, 'full_only',
 '["Master your content pillars","Script for attention and authority","Batch and repurpose content efficiently","Build a 30-day content calendar"]'::jsonb),

(5, 'DM Setting & Appointment Setting',
 'Master direct outreach. Cold DMs, warm intros. Convert prospects into booked discovery calls.',
 5, 'full_only',
 '["Understand the psychology of DMs","Convert cold outreach to warm conversations","Move DMs to booked Zoom calls","Track and optimize outreach metrics"]'::jsonb),

(6, 'Closing — The Sales Call',
 'Conduct high-converting discovery calls. Turn prospects into paying clients using the 5-phase framework.',
 6, 'full_only',
 '["Run the 5-phase call framework","Ask power questions that uncover pain","Handle objections confidently","Close the sale without being pushy"]'::jsonb),

(7, 'Funnel Building',
 'Create a lead generation system that automates client acquisition from content to close.',
 7, 'full_only',
 '["Map your client acquisition funnel","Create a high-converting lead magnet","Write email sequences that nurture","Optimize for conversion at each stage"]'::jsonb),

(8, 'Building the Business',
 'Operationalize the Ascend system. Plan for scale and establish sustainable business foundations.',
 8, 'full_only',
 '["Document your core processes","Build a client retention system","Set up legal and financial foundations","Create your 90-day scale plan"]'::jsonb),

-- Mindset modules (both)
(9, 'Daily Accountability',
 'Build the habits and accountability systems that elite performers use to stay consistent under pressure.',
 9, 'both',
 '["Design your daily non-negotiables","Build a personal accountability system","Track wins and identify patterns","Hold yourself accountable without a coach"]'::jsonb),

(10, 'Goal Setting & Tracking',
 'Set goals that actually drive behavior. Use the athlete''s framework for setting and hitting targets.',
 10, 'both',
 '["Set 90-day, 30-day, and weekly targets","Break goals into daily actions","Review and adjust goals weekly","Build a visual goal tracking system"]'::jsonb),

(11, 'Overcoming Imposter Syndrome',
 'Silence the inner critic. Build unshakeable confidence in your abilities as a new entrepreneur.',
 11, 'both',
 '["Identify your specific imposter triggers","Reframe self-doubt as a growth signal","Build evidence for your competence","Act despite imposter feelings"]'::jsonb),

(12, 'Building Confidence',
 'Develop the confidence that converts — on camera, on calls, in DMs, in life.',
 12, 'both',
 '["Understand confidence as a skill","Build pre-call confidence routines","Show up powerfully on camera","Handle rejection without retreating"]'::jsonb),

(13, 'Discipline & Consistency',
 'Create systems for consistency that outlast motivation. Build the athlete''s work ethic into your business.',
 13, 'both',
 '["Design an environment for discipline","Build keystone habits that stack","Recover from off days without spiraling","Create momentum through small wins"]'::jsonb),

(14, 'Community & Accountability',
 'Leverage the Ascend community to accelerate your results. Learn to give and receive accountability.',
 14, 'both',
 '["Engage authentically in the community","Give and receive feedback effectively","Find an accountability partner","Share wins to build momentum for others"]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 1 (6 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(1, 1, 'The Chapter Nobody Talks About: Life After Sport',
 'Understand what you lost when sport ended and begin reclaiming your identity on your own terms.',
 1, 14, 'https://vimeo.com/placeholder/ascend-m1-l1',
 '<h2>The Transition Nobody Prepares You For</h2><p>Sport gave you identity, structure, community, purpose — all at once. When it ends, so does the scaffolding of your entire life. This lesson names what you lost and begins the process of reclaiming it on your own terms.</p><h3>Key Points</h3><ul><li>Identity loss is normal — not weakness</li><li>Sport provided 5 things simultaneously: identity, routine, team, purpose, status</li><li>The transition gap is real — most athletes take 2-4 years without a guide</li><li>You can compress that to 90 days with the right framework</li></ul><h3>The 5 Pillars Sport Gave You</h3><ol><li><strong>Identity</strong> — "I am an athlete"</li><li><strong>Structure</strong> — Practice, games, off-season</li><li><strong>Community</strong> — Teammates, coaches, fans</li><li><strong>Purpose</strong> — Wins, championships, performance</li><li><strong>Status</strong> — Recognition, respect, belonging</li></ol><p>Entrepreneurship can replace all five. But first, you have to grieve what sport was.</p>',
 '[{"id":"m1l1-1","text":"Write: \"I WAS ___. Now I am learning to be ___.\""},{"id":"m1l1-2","text":"Journal: 3 things sport gave you that you miss most"},{"id":"m1l1-3","text":"Post in the community: your athletic background in 1 sentence"}]'::jsonb),

(2, 1, 'Beliefs + Purpose = Identity',
 'Rebuild your identity from the inside out using the Belief-Purpose-Identity stack.',
 2, 12, 'https://vimeo.com/placeholder/ascend-m1-l2',
 '<h2>You Are What You Believe You Are</h2><p>Identity is not fixed. It is the story you tell yourself about who you are — and stories can be rewritten. This lesson introduces the Belief-Purpose-Identity stack.</p><h3>The Stack</h3><ul><li><strong>Beliefs</strong> → What you accept as true about yourself</li><li><strong>Purpose</strong> → Why you get out of bed each day</li><li><strong>Identity</strong> → The result: "I am someone who ___"</li></ul><h3>The Purpose Ladder Exercise</h3><p>Ask "Why does that matter?" 5 times to find your real purpose. Surface-level: "I want to make money." → Why? "To support my family." → Why? "Because I want to provide security." → Why? etc.</p>',
 '[{"id":"m1l2-1","text":"Complete the belief audit: list 5 beliefs about yourself"},{"id":"m1l2-2","text":"Do the purpose ladder: ask \"why\" 5 times from your top goal"},{"id":"m1l2-3","text":"Write your identity statement: \"I am someone who ___\""}]'::jsonb),

(3, 1, 'Killing the Victim Mindset',
 'Replace blame and victimhood with radical ownership — the foundation of every successful entrepreneur.',
 3, 11, 'https://vimeo.com/placeholder/ascend-m1-l3',
 '<h2>Accountability vs. Victimhood</h2><p>Victim mindset is the single biggest predictor of failure in the transition from sport to business. It feels justified — because bad things did happen. But it keeps you stuck.</p><h3>Signs of Victim Mindset</h3><ul><li>"The system is rigged against me"</li><li>"I didn''t get the opportunities others did"</li><li>"If only X had happened differently..."</li><li>Blaming coaches, agents, injury, timing</li></ul><h3>The Accountability Flip</h3><p>For every victim story, there is an ownership version. Not denying reality — reframing your role in it. What could you have done differently? What can you control going forward?</p>',
 '[{"id":"m1l3-1","text":"Write 3 victim stories you tell yourself about your athletic career"},{"id":"m1l3-2","text":"Flip each story: write the accountability version"},{"id":"m1l3-3","text":"Share your biggest accountability realization in the community"}]'::jsonb),

(4, 1, 'Discipline Is a Skill, Not a Trait',
 'Activate the discipline muscle already built through sport and apply it to your business life.',
 4, 13, 'https://vimeo.com/placeholder/ascend-m1-l4',
 '<h2>Discipline Was Installed in You — Now You Control It</h2><p>As an athlete, discipline was imposed. Someone else set the schedule. Now you must impose it on yourself. The good news: the muscle is already there. You just need to activate it differently.</p><h3>Imposed vs. Chosen Discipline</h3><ul><li>Imposed: Coach tells you when to be there, what to do, consequences if you miss</li><li>Chosen: You design the schedule, create the stakes, hold yourself accountable</li></ul><h3>Environmental Design</h3><p>Willpower depletes. Environment doesn''t. Design your environment so the right choices are the easy choices.</p><ul><li>Phone in another room during deep work</li><li>Gym clothes laid out the night before</li><li>Calendar blocks treated as non-negotiable appointments</li></ul>',
 '[{"id":"m1l4-1","text":"List 5 disciplines from your athletic career you want to carry forward"},{"id":"m1l4-2","text":"Design your 3-5 daily non-negotiables (what must happen every day?)"},{"id":"m1l4-3","text":"Track your non-negotiables for 7 days and report back"}]'::jsonb),

(5, 1, 'Mastering Being Alone',
 'Build the capacity for productive solitude that gives entrepreneurs their biggest edge.',
 5, 10, 'https://vimeo.com/placeholder/ascend-m1-l5',
 '<h2>Learning to Sit With Yourself</h2><p>Athletes are rarely alone. Locker rooms, team buses, training facilities — constant social stimulation. Entrepreneurship requires extended solitude. Most athletes resist this. Those who master it get a massive edge.</p><h3>Solitude vs. Loneliness</h3><ul><li>Loneliness: Unwanted isolation — you want connection and don''t have it</li><li>Solitude: Chosen isolation — you are comfortable with your own presence</li></ul><h3>Practices for Solitude</h3><ul><li>20-minute daily meditation or silent sitting</li><li>Morning journaling (no phone first 30 min)</li><li>Solo walks without headphones</li><li>Weekly review in complete silence</li></ul>',
 '[{"id":"m1l5-1","text":"Sit alone for 20 minutes — no phone, no music, just sit"},{"id":"m1l5-2","text":"Start a daily journaling practice: 3 pages, stream of consciousness"},{"id":"m1l5-3","text":"Take a 30-minute solo walk with no headphones this week"}]'::jsonb),

(6, 1, 'The 2.0 Framework: Designing the Next Version of You',
 'Create your Ascend 2.0 Identity Map — the blueprint for who you are intentionally becoming.',
 6, 12, 'https://vimeo.com/placeholder/ascend-m1-l6',
 '<h2>Version 2.0 Is a Choice</h2><p>You don''t accidentally become the next version of yourself. You design it. This lesson gives you the Ascend 2.0 Identity Map — the blueprint for who you are becoming.</p><h3>The Identity Map</h3><ul><li><strong>What you''re keeping:</strong> Values, traits, work ethic from sport</li><li><strong>What you''re releasing:</strong> Limiting beliefs, identities that no longer serve</li><li><strong>What you''re adding:</strong> New skills, new mindsets, new daily behaviors</li></ul><h3>The 2.0 Identity Statement</h3><p>Format: "I am [name], a former [sport] [position/level]. I am building a [business type] that helps [target client] achieve [result]. I show up every day with [key trait] and [key trait]. My mission is [purpose statement]."</p>',
 '[{"id":"m1l6-1","text":"Write your 2.0 identity statement using the format above"},{"id":"m1l6-2","text":"List 5 things from sport you are keeping in your identity"},{"id":"m1l6-3","text":"List 3 new daily behaviors version 2.0 of you practices"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 2 (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(7, 2, 'The Skill Audit: What Do You Actually Have?',
 'Uncover every transferable skill from your athletic career across 4 key categories.',
 1, 13, 'https://vimeo.com/placeholder/ascend-m2-l1',
 '<h2>You Have More Skills Than You Think</h2><p>Athletes dramatically underestimate their transferable skills. You''ve been developing world-class capabilities for years — you just haven''t been paid for them directly. Yet.</p><h3>The 4 Skill Categories</h3><ul><li><strong>Performance skills:</strong> Sport-specific techniques, physical training, nutrition, recovery</li><li><strong>Mindset skills:</strong> Mental toughness, pressure performance, focus, visualization</li><li><strong>Leadership skills:</strong> Captaincy, team dynamics, motivation, conflict resolution</li><li><strong>Life skills:</strong> Time management, discipline, goal-setting, resilience</li></ul><h3>Who Pays For These?</h3><p>Other athletes, youth athletes, executives, regular people who want what you have. Your skill is not rare in your world — it''s extremely rare in theirs.</p>',
 '[{"id":"m2l1-1","text":"Complete the skill audit: list every skill from all 4 categories"},{"id":"m2l1-2","text":"Circle the 3 skills you''re most proud of"},{"id":"m2l1-3","text":"Ask 3 people: \"What do you think I''m uniquely good at?\""}]'::jsonb),

(8, 2, 'Niche Down or Drown: Finding Your Ideal Client',
 'Use the niche formula to identify your most profitable, credible, and energizing market.',
 2, 11, 'https://vimeo.com/placeholder/ascend-m2-l2',
 '<h2>The Riches Are in the Niches</h2><p>Trying to help everyone means helping no one. The counterintuitive move is to get more specific — and charge more for it.</p><h3>The Niche Formula</h3><p><strong>[Who] + [Problem] + [Specific Outcome]</strong></p><p>Example: "I help college athletes (who) struggling with the transition out of sport (problem) build a profitable personal training business in 90 days (specific outcome)."</p><h3>How to Choose Your Niche</h3><ul><li>Where do your skills match someone else''s urgent problem?</li><li>Who do you have natural credibility with?</li><li>Who has money to pay for this outcome?</li><li>Is the problem painful enough to pay to solve?</li></ul>',
 '[{"id":"m2l2-1","text":"Write 5 possible niche statements using the formula"},{"id":"m2l2-2","text":"Score each niche 1-10: credibility, market size, money, passion"},{"id":"m2l2-3","text":"Choose your niche and post it in the community for feedback"}]'::jsonb),

(9, 2, 'Market Validation: Will Anyone Actually Pay?',
 'Validate your niche before building anything — sell first, then deliver.',
 3, 10, 'https://vimeo.com/placeholder/ascend-m2-l3',
 '<h2>Validate Before You Build</h2><p>Most people build for months, then try to sell. Ascend 2.0 teaches you to sell first, then deliver. Validation = someone gives you money (or commits to it) before the product is fully built.</p><h3>3 Ways to Validate</h3><ul><li><strong>Conversations:</strong> 10 conversations with potential clients. Ask about their problem, not your solution.</li><li><strong>Offer test:</strong> Post your offer on social media, DM it to 20 people. Count responses.</li><li><strong>Pre-sell:</strong> Offer at a founding price. If 3 people say yes, you have a business.</li></ul><h3>Validation Questions</h3><ul><li>"What''s your biggest challenge with ___?"</li><li>"What have you already tried?"</li><li>"What would it be worth to solve this?"</li><li>"If I could help you achieve X in Y days, would you invest $Z?"</li></ul>',
 '[{"id":"m2l3-1","text":"Have 5 conversations with potential clients this week"},{"id":"m2l3-2","text":"Record their exact words about their problem (for your copy later)"},{"id":"m2l3-3","text":"Report validation results in the community thread"}]'::jsonb),

(10, 2, 'Competitive Research: Learn From the Market',
 'Study your competitors to find gaps, set prices, and position your offer uniquely.',
 4, 9, 'https://vimeo.com/placeholder/ascend-m2-l4',
 '<h2>Your Competitors Are Your Teachers</h2><p>Before building your offer, study what''s already working. This saves months of trial and error.</p><h3>What to Research</h3><ul><li>What are people in your niche selling?</li><li>What prices are being charged?</li><li>What promises are being made?</li><li>What complaints do their clients have?</li><li>What are they NOT offering that clients want?</li></ul><h3>Where to Research</h3><ul><li>Instagram/TikTok: search your niche keywords</li><li>Reddit: read complaints and questions</li><li>Facebook Groups: see what questions get asked most</li><li>Testimonials: what outcomes do clients celebrate?</li></ul>',
 '[{"id":"m2l4-1","text":"Find 5 people already doing what you want to do"},{"id":"m2l4-2","text":"Document their offer, price, and positioning"},{"id":"m2l4-3","text":"Find the gap: what are they NOT offering that clients want?"}]'::jsonb),

(11, 2, 'Positioning for Premium Pricing',
 'Build the authority, specificity, and social proof framework that justifies premium rates.',
 5, 12, 'https://vimeo.com/placeholder/ascend-m2-l5',
 '<h2>Price Is a Positioning Statement</h2><p>Low prices don''t attract more clients — they attract worse clients. Premium positioning starts with believing your outcome justifies a premium price.</p><h3>The Premium Positioning Framework</h3><ul><li><strong>Authority:</strong> Your athletic credentials + transformation story</li><li><strong>Specificity:</strong> Specific client + specific outcome + specific timeframe</li><li><strong>Social proof:</strong> Case studies, testimonials, before/after results</li><li><strong>Scarcity:</strong> Limited spots, application process, selective client intake</li></ul><h3>Starting Price Points</h3><ul><li>1:1 coaching (3 months): $1,500 - $5,000+</li><li>Group program (8 weeks): $500 - $2,000</li><li>Course only: $197 - $997</li><li>Done-with-you (monthly retainer): $500 - $2,000/mo</li></ul><p>Start higher than you''re comfortable with. You can always negotiate down. You can''t negotiate up from "cheap."</p>',
 '[{"id":"m2l5-1","text":"Write your premium positioning statement"},{"id":"m2l5-2","text":"Decide your starting price point (commit to it)"},{"id":"m2l5-3","text":"Find 3 people who charge more than you for similar work — study them"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 3 (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(12, 3, 'Offer Anatomy: The 6 Parts Every Offer Needs',
 'Construct a compelling offer using the 6-part framework that turns services into irresistible solutions.',
 1, 11, 'https://vimeo.com/placeholder/ascend-m3-l1',
 '<h2>An Offer Is a Promise With a Price Tag</h2><p>Most service providers describe what they do. Great offer builders describe what the client gets — and what their life looks like after.</p><h3>The 6 Parts</h3><ol><li><strong>Who it''s for:</strong> Specific avatar, specific situation</li><li><strong>The Problem:</strong> The painful thing they want to stop experiencing</li><li><strong>The Dream:</strong> What they want instead</li><li><strong>The Mechanism:</strong> Your unique process/framework</li><li><strong>The Timeline:</strong> How long to get the result</li><li><strong>The Price:</strong> What they invest to get it</li></ol>',
 '[{"id":"m3l1-1","text":"Write your offer using all 6 parts"},{"id":"m3l1-2","text":"Read it aloud — does it sound like you?"},{"id":"m3l1-3","text":"Post in community for feedback on clarity"}]'::jsonb),

(13, 3, 'The Transformation Statement: Selling Outcomes',
 'Craft the one sentence that becomes the north star of all your marketing.',
 2, 10, 'https://vimeo.com/placeholder/ascend-m3-l2',
 '<h2>Nobody Buys Coaching — They Buy Transformation</h2><p>Your transformation statement is the one sentence that describes what life looks like after working with you. It''s the north star of all your marketing.</p><h3>Formula</h3><p>"I help [SPECIFIC PERSON] go from [PAINFUL CURRENT STATE] to [DREAM OUTCOME] in [TIMEFRAME] using [YOUR METHOD]."</p><h3>Examples</h3><ul><li>"I help ex-college athletes go from feeling lost after sport to running a $5K/month coaching business in 90 days using the Ascend system."</li><li>"I help youth basketball players go from benchwarmer to starting lineup in one season using the same mental training I used in the NBA."</li></ul>',
 '[{"id":"m3l2-1","text":"Write 3 versions of your transformation statement"},{"id":"m3l2-2","text":"Share the best one in the community and get feedback"},{"id":"m3l2-3","text":"Put it in your Instagram bio this week"}]'::jsonb),

(14, 3, 'Pricing Psychology: Charge What You''re Worth',
 'Set prices based on client value and ROI — not your personal comfort level.',
 3, 13, 'https://vimeo.com/placeholder/ascend-m3-l3',
 '<h2>The Price Is Not About You — It''s About Them</h2><p>Most service providers set prices based on their comfort level. Buyers set prices based on perceived value. Your job is to make the value so clear that the price feels obvious.</p><h3>Anchoring to ROI</h3><p>What is the client''s problem costing them? If losing 30 lbs would help someone earn more, feel better, and live longer — what is that worth? Frame your price against that number.</p><h3>Pricing Tiers</h3><ul><li><strong>Entry offer:</strong> Free or low-cost lead magnet to get them into your world</li><li><strong>Core offer:</strong> Your main service/program at full price</li><li><strong>Premium offer:</strong> High-touch VIP version for the most committed buyers</li></ul>',
 '[{"id":"m3l3-1","text":"Calculate the ROI of your offer for a client (what is their problem costing them?)"},{"id":"m3l3-2","text":"Set your final price with confidence (write it down)"},{"id":"m3l3-3","text":"Practice saying your price out loud 10 times without hesitating"}]'::jsonb),

(15, 3, 'Creating Your Signature Framework',
 'Build a named, proprietary methodology that brands your coaching and commands authority.',
 4, 11, 'https://vimeo.com/placeholder/ascend-m3-l4',
 '<h2>Your Framework Is Your Brand</h2><p>A signature framework transforms your coaching from "just advice" into a repeatable, teachable system. It positions you as an expert with a proprietary method.</p><h3>Framework Components</h3><ul><li>A name (acronym, metaphor, or alliteration)</li><li>3-7 steps or phases</li><li>Each step has: a name, a description, and an action</li><li>The whole framework leads to the transformation promise</li></ul><h3>Examples</h3><ul><li>The Ascend 2.0 System™</li><li>The ATHLETE Method™</li><li>The 3-Phase Performance Blueprint™</li></ul>',
 '[{"id":"m3l4-1","text":"Sketch your framework: 3-5 phases from problem to solution"},{"id":"m3l4-2","text":"Give it a name"},{"id":"m3l4-3","text":"Create a simple visual of it (slide or drawing)"}]'::jsonb),

(16, 3, 'Offer Validation: Get 3 Yes''s Before You Build',
 'Pre-sell your offer to real prospects before investing time building the program.',
 5, 10, 'https://vimeo.com/placeholder/ascend-m3-l5',
 '<h2>Sell It Before You Build It</h2><p>The biggest mistake new coaches make: spend 3 months building a course or program, then discover nobody wants it. Validate first. Build second.</p><h3>The Pre-Sale Conversation</h3><ul><li>Present your offer verbally — no deck, no landing page needed</li><li>Ask: "If I could help you achieve X in Y days, would you invest $Z?"</li><li>Get 3 people to say yes (and ideally pay a deposit)</li><li>THEN build the program around what they tell you they need</li></ul><h3>What "Yes" Means</h3><p>A real yes = money exchanged or commitment made. "That sounds great!" is not a yes. "Here''s my credit card" is a yes.</p>',
 '[{"id":"m3l5-1","text":"Pitch your offer to 5 people in the next 7 days"},{"id":"m3l5-2","text":"Get at least 3 responses (yes, no, or \"tell me more\")"},{"id":"m3l5-3","text":"Report your validation results in the community"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 4 (6 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(17, 4, 'Content Pillars: What to Post About',
 'Define 4 core content themes that make posting systematic and strategic.',
 1, 11, 'https://vimeo.com/placeholder/ascend-m4-l1',
 '<h2>Stop Guessing What to Post</h2><p>Content pillars are 3-5 core themes your content always rotates through. They make content creation systematic instead of random.</p><h3>The 4-Pillar Framework</h3><ul><li><strong>Authority pillar:</strong> Showcase your expertise and results</li><li><strong>Story pillar:</strong> Share your journey, struggles, wins</li><li><strong>Education pillar:</strong> Teach something valuable for free</li><li><strong>Engagement pillar:</strong> Ask questions, share opinions, create conversation</li></ul>',
 '[{"id":"m4l1-1","text":"Define your 4 content pillars"},{"id":"m4l1-2","text":"Write 5 post ideas under each pillar (20 ideas total)"},{"id":"m4l1-3","text":"Pick your top 3 ideas and outline them"}]'::jsonb),

(18, 4, 'Hook Writing: Stop the Scroll',
 'Master the first-line formulas that earn attention in a crowded feed.',
 2, 12, 'https://vimeo.com/placeholder/ascend-m4-l2',
 '<h2>The First Line Is Everything</h2><p>On social media, 80% of people read the first line and nothing else. If your hook doesn''t earn the scroll, your content is invisible.</p><h3>Hook Formulas</h3><ul><li>Counterintuitive claim: "You don''t need a huge following to make $10K/month"</li><li>Specific number: "5 things I wish I knew leaving college sports"</li><li>Story opener: "The day I got cut from the team changed my life forever"</li><li>Direct address: "If you played college sports and feel lost now — read this"</li><li>Curiosity gap: "The mistake 90% of athlete entrepreneurs make in their first DM"</li></ul>',
 '[{"id":"m4l2-1","text":"Write 10 hook variations for your next post"},{"id":"m4l2-2","text":"A/B test 2 hooks on the same content this week"},{"id":"m4l2-3","text":"Track engagement — which hook performed better?"}]'::jsonb),

(19, 4, 'Video Content: Showing Up on Camera',
 'Build camera confidence and use the 3-step video framework to create content that converts.',
 3, 10, 'https://vimeo.com/placeholder/ascend-m4-l3',
 '<h2>Camera Confidence Is a Skill</h2><p>Most athlete entrepreneurs avoid video. That''s your opportunity. Video builds trust faster than any other format. Get uncomfortable once — then it becomes your superpower.</p><h3>The 3-Step Video Framework</h3><ol><li><strong>Hook (0-3 sec):</strong> State the point immediately</li><li><strong>Value (middle):</strong> Deliver on the promise of the hook</li><li><strong>CTA (end):</strong> Tell them exactly what to do next</li></ol><h3>Camera Confidence Tips</h3><ul><li>Record 10 takes without watching any of them — just practice</li><li>Look at the camera lens, not the screen</li><li>Speak 20% faster than feels natural — it slows down on camera</li><li>Use your athlete voice: commanding, clear, energetic</li></ul>',
 '[{"id":"m4l3-1","text":"Record a 60-second video about your niche — don''t delete it"},{"id":"m4l3-2","text":"Watch it once and note 2 things to improve"},{"id":"m4l3-3","text":"Post it (it doesn''t have to be perfect — done beats perfect)"}]'::jsonb),

(20, 4, 'Batching & Repurposing: Work Once, Post for a Month',
 'Create one piece of content that multiplies into 10 posts across platforms.',
 4, 11, 'https://vimeo.com/placeholder/ascend-m4-l4',
 '<h2>One Piece of Content = 10 Posts</h2><p>The most efficient content creators don''t create more — they repurpose better. One long-form piece becomes 10 short-form pieces.</p><h3>The Repurpose Waterfall</h3><ol><li>Record a 10-minute YouTube video</li><li>Clip 3-5 short videos for Reels/TikTok</li><li>Transcribe the audio → blog post</li><li>Pull 10 quotes → 10 text posts</li><li>Create a carousel from the key points</li><li>Write an email from the same topic</li></ol><h3>Batching Day</h3><p>Set aside one day per month. Create all content for the month in one sitting. Schedule it. Then don''t think about it again until next month.</p>',
 '[{"id":"m4l4-1","text":"Schedule a 4-hour content batching session this week"},{"id":"m4l4-2","text":"Create 8 pieces of content in one session"},{"id":"m4l4-3","text":"Schedule them using Buffer, Later, or Meta Business Suite"}]'::jsonb),

(21, 4, 'The Content Calendar: 30-Day Planning System',
 'Build a simple monthly posting schedule that makes consistency inevitable.',
 5, 9, 'https://vimeo.com/placeholder/ascend-m4-l5',
 '<h2>Inconsistency Kills Momentum</h2><p>You wouldn''t skip practice randomly. Don''t post randomly. A content calendar makes consistency inevitable.</p><h3>Simple 30-Day Calendar</h3><ul><li>Monday: Educational post (teach something)</li><li>Wednesday: Story/personal post</li><li>Friday: Offer/result post</li><li>Every day (optional): Stories, engagement, DM follow-ups</li></ul><p>Start with 3 posts per week. Consistency at low volume beats inconsistency at high volume.</p>',
 '[{"id":"m4l5-1","text":"Download the content calendar template from resources"},{"id":"m4l5-2","text":"Fill in your next 30 days of posts (even just topics)"},{"id":"m4l5-3","text":"Set a recurring 2-hour block every week for content creation"}]'::jsonb),

(22, 4, 'Analytics & Iteration: What''s Working?',
 'Use platform analytics to identify your best content and double down on what performs.',
 6, 8, 'https://vimeo.com/placeholder/ascend-m4-l6',
 '<h2>Data Beats Feelings</h2><p>Don''t guess what content is working. Know. Check your analytics weekly and double down on what performs.</p><h3>Key Metrics to Track</h3><ul><li><strong>Reach:</strong> How many unique accounts saw your content?</li><li><strong>Saves:</strong> Best indicator of high-value educational content</li><li><strong>Profile visits:</strong> How many people clicked to see who you are?</li><li><strong>DMs received:</strong> How many people reached out?</li><li><strong>Follows from content:</strong> Is content converting to followers?</li></ul><p>Check these weekly. Notice patterns. Create more of what earns saves and DMs.</p>',
 '[{"id":"m4l6-1","text":"Check your Instagram/TikTok analytics for the last 30 days"},{"id":"m4l6-2","text":"Find your top 3 performing posts — what do they have in common?"},{"id":"m4l6-3","text":"Create 3 new posts based on your best-performing themes"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 5 (6 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(23, 5, 'The Psychology of Cold Outreach',
 'Reframe cold DMs from begging to inviting — and send with the confidence of a former athlete.',
 1, 12, 'https://vimeo.com/placeholder/ascend-m5-l1',
 '<h2>Reframe the DM</h2><p>Most people avoid cold outreach because it feels like begging. Reframe: you have something valuable. Your message is an invitation, not a pitch.</p><h3>The Mindset Shift</h3><ul><li>You are not bothering them — you''re offering help</li><li>The worst they can do is not reply</li><li>A "no" means nothing about your offer — it means not right now</li><li>Every "no" is one closer to a "yes"</li></ul><h3>The Athlete Advantage in Outreach</h3><p>Athletes have natural credibility. "Former [sport] [level]" instantly earns attention from the right audience. Lead with your story.</p>',
 '[{"id":"m5l1-1","text":"Write your DM opening line that mentions your athletic background"},{"id":"m5l1-2","text":"Commit to sending 5 cold DMs today"},{"id":"m5l1-3","text":"Track responses in a simple spreadsheet"}]'::jsonb),

(24, 5, 'The Perfect DM: Structure & Scripts',
 'Use the 4-part DM formula to craft messages that get replies and start real conversations.',
 2, 11, 'https://vimeo.com/placeholder/ascend-m5-l2',
 '<h2>The 4-Part DM Formula</h2><ol><li><strong>Personalized opener:</strong> Reference something specific about them</li><li><strong>Credibility bridge:</strong> Why you specifically are reaching out</li><li><strong>Value statement:</strong> What you noticed and can help with</li><li><strong>Soft CTA:</strong> Low-friction next step (not "buy my thing")</li></ol><h3>Example DM</h3><p>"Hey [name] — saw your post about the grind after college football. I went through the exact same thing after my career ended. I''ve been helping former athletes turn their skills into coaching businesses. Are you open to a quick conversation about what that could look like for you?"</p>',
 '[{"id":"m5l2-1","text":"Write your own DM using the 4-part formula"},{"id":"m5l2-2","text":"Download the DM Script Library from resources"},{"id":"m5l2-3","text":"Send 10 DMs using your scripts this week"}]'::jsonb),

(25, 5, 'Warm Outreach: Your Existing Network',
 'Mine your existing relationships for first clients before going cold.',
 3, 9, 'https://vimeo.com/placeholder/ascend-m5-l3',
 '<h2>Start With Who You Know</h2><p>Cold outreach is harder than warm outreach. Before you go cold, exhaust your warm network. You have more potential clients in your existing network than you think.</p><h3>Your Warm Network Categories</h3><ul><li>Former teammates and coaches</li><li>High school and college friends</li><li>Family connections and their networks</li><li>Previous employers and colleagues</li><li>Social media followers who engage with your content</li></ul><h3>The Warm Outreach Message</h3><p>"Hey [name], I''m building a coaching business for [target client]. I thought of you because [specific reason]. I''d love to get your input or see if you know anyone who might benefit. Would you be open to a quick call?"</p>',
 '[{"id":"m5l3-1","text":"List 20 people in your warm network"},{"id":"m5l3-2","text":"Reach out to 10 of them this week"},{"id":"m5l3-3","text":"Ask each for a referral if they''re not the right fit"}]'::jsonb),

(26, 5, 'Following Up Without Being Annoying',
 'Master the 4-touch follow-up sequence that generates 80% of your sales.',
 4, 8, 'https://vimeo.com/placeholder/ascend-m5-l4',
 '<h2>The Fortune Is in the Follow-Up</h2><p>80% of sales happen after the 5th contact. Most people give up after 1-2. The follow-up is where the money is.</p><h3>The Follow-Up Sequence</h3><ol><li>Day 1: Initial DM</li><li>Day 3: Follow-up with value (share a piece of content)</li><li>Day 7: Bump with soft CTA</li><li>Day 14: Last message — "closing the loop"</li></ol><h3>The Breakup Message (Day 14)</h3><p>"Hey [name], I''ve reached out a couple times. I don''t want to keep bothering you if the timing is off. If you ever want to talk about [outcome], I''m here. Either way, best of luck with [something specific to them]."</p>',
 '[{"id":"m5l4-1","text":"Build a follow-up tracker in a spreadsheet"},{"id":"m5l4-2","text":"Identify 10 cold DMs you sent that never got a reply — follow up today"},{"id":"m5l4-3","text":"Write your breakup message template"}]'::jsonb),

(27, 5, 'Moving DMs to Zoom: The Bridge Conversation',
 'Transition DM conversations into booked discovery calls using the bridge framework.',
 5, 10, 'https://vimeo.com/placeholder/ascend-m5-l5',
 '<h2>The DM Is Not the Sale — The Call Is</h2><p>DMs should do one thing: get a call booked. Don''t try to close in DMs. Build enough trust to earn 30 minutes of their time. Then sell on the call.</p><h3>The Bridge Conversation</h3><ul><li>Acknowledge their situation: show you understand their problem</li><li>Create curiosity: hint at the solution without giving it all away</li><li>Earn the call: "I''d love to share exactly how we could do this together. Would a 20-minute Zoom work for you?"</li><li>Reduce friction: "No pressure — just a conversation to see if we''re a fit."</li></ul><h3>Booking Tools</h3><ul><li>Calendly (free) — send your link</li><li>SavvyCal — more premium feel</li><li>Simply text: "Tuesday at 2pm or Thursday at 4pm — which works?"</li></ul>',
 '[{"id":"m5l5-1","text":"Set up your Calendly or booking link"},{"id":"m5l5-2","text":"Write your bridge-to-call message template"},{"id":"m5l5-3","text":"Book 3 discovery calls this week"}]'::jsonb),

(28, 5, 'Outreach Metrics: Track Everything',
 'Build an outreach tracker and calculate the exact number of DMs needed to close one client.',
 6, 8, 'https://vimeo.com/placeholder/ascend-m5-l6',
 '<h2>You Can''t Improve What You Don''t Measure</h2><p>Outreach without tracking is just hope. Track every DM, every response, every call booked. Over time, you''ll know exactly how many DMs it takes to close one client.</p><h3>Key Outreach Metrics</h3><ul><li><strong>Response rate:</strong> Replies ÷ DMs sent (target: 20%+)</li><li><strong>Call conversion:</strong> Calls booked ÷ conversations (target: 30%+)</li><li><strong>Close rate:</strong> Sales ÷ calls (target: 25%+)</li><li><strong>DMs to close:</strong> How many DMs to get one client</li></ul>',
 '[{"id":"m5l6-1","text":"Build your outreach tracker (download template from resources)"},{"id":"m5l6-2","text":"Log every DM you''ve sent in the last week"},{"id":"m5l6-3","text":"Calculate your current response rate"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 6 (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(29, 6, 'The 5-Phase Discovery Call Framework',
 'Run structured discovery calls using the 5-phase framework that closes consistently.',
 1, 14, 'https://vimeo.com/placeholder/ascend-m6-l1',
 '<h2>Every Winning Call Has the Same Structure</h2><p>Discovery calls are not conversations — they''re structured journeys. Guide the prospect through 5 phases and you will close consistently.</p><h3>The 5 Phases</h3><ol><li><strong>Connect (2-3 min):</strong> Build rapport, set the agenda, make them comfortable</li><li><strong>Diagnose (10-12 min):</strong> Ask deep questions about their situation, pain, and goals</li><li><strong>Dream (5 min):</strong> Help them articulate what they really want</li><li><strong>Prescribe (5-7 min):</strong> Show how your offer solves their specific problem</li><li><strong>Close (5-10 min):</strong> Present the investment, handle objections, get a decision</li></ol>',
 '[{"id":"m6l1-1","text":"Download the Sales Call Script from resources"},{"id":"m6l1-2","text":"Memorize the 5-phase framework"},{"id":"m6l1-3","text":"Role-play a discovery call with another Ascend member"}]'::jsonb),

(30, 6, 'Power Questions: Uncover the Real Pain',
 'Ask the questions that reveal deep pain and make your prescription feel inevitable.',
 2, 11, 'https://vimeo.com/placeholder/ascend-m6-l2',
 '<h2>Questions Close More Than Pitches</h2><p>The best salespeople ask great questions and listen. The worst salespeople talk too much. Your goal in a discovery call is to understand their situation so deeply that your prescription feels inevitable.</p><h3>Power Question Bank</h3><ul><li>"Walk me through what''s been happening with ___"</li><li>"What have you already tried that hasn''t worked?"</li><li>"What happens if this doesn''t change in the next 12 months?"</li><li>"On a scale of 1-10, how important is it to solve this?"</li><li>"If we could get you [result] in [timeframe], what would that be worth to you?"</li><li>"What would you do with the extra [time/money/results] from solving this?"</li></ul>',
 '[{"id":"m6l2-1","text":"Write your top 10 power questions for your specific niche"},{"id":"m6l2-2","text":"Practice asking them in a mock call with a friend"},{"id":"m6l2-3","text":"Notice which questions make prospects most emotional — those are gold"}]'::jsonb),

(31, 6, 'Handling Objections: They''re Not Saying No',
 'Turn the top 5 sales objections into opportunities to deepen commitment.',
 3, 12, 'https://vimeo.com/placeholder/ascend-m6-l3',
 '<h2>Objections Are Requests for More Information</h2><p>When someone says "I need to think about it" — they''re not saying no. They''re saying "I''m not convinced yet." Your job is to find out what they need to be convinced.</p><h3>The Top 5 Objections + Responses</h3><ul><li><strong>"It''s too expensive"</strong> → "I understand. Can I ask — compared to what? What would it cost you to not solve this?"</li><li><strong>"I need to talk to my partner"</strong> → "Of course. If it were entirely up to you, would you want to move forward?"</li><li><strong>"I need to think about it"</strong> → "What specifically are you weighing? Let''s work through it together right now."</li><li><strong>"I''m not ready yet"</strong> → "What would need to be true for you to feel ready?"</li><li><strong>"I''ve tried coaching before"</strong> → "Tell me about that experience. What was missing?"</li></ul>',
 '[{"id":"m6l3-1","text":"Write your response to each of the 5 objections above"},{"id":"m6l3-2","text":"Practice objection handling in a role-play"},{"id":"m6l3-3","text":"Track which objections you hear most — prepare specific responses"}]'::jsonb),

(32, 6, 'Closing Without Feeling Pushy',
 'Reframe the close as an act of service and present investment with unshakeable calm.',
 4, 10, 'https://vimeo.com/placeholder/ascend-m6-l4',
 '<h2>The Close Is an Act of Service</h2><p>You''re not "closing" someone — you''re helping them make a decision that''s already in their best interest. Reframe the close as a gift, not a manipulation.</p><h3>The Non-Pushy Close</h3><p>"Based on everything we''ve talked about, it sounds like [their problem] is costing you [consequence]. And you said getting [result] would be worth [value they stated]. My program does exactly that in [timeframe] for [price]. Does that make sense as a next step?"</p><h3>The Silence Principle</h3><p>After presenting the investment: shut up. The first person to speak loses. Let them respond. Silence is not awkward — it''s the sound of someone thinking seriously.</p>',
 '[{"id":"m6l4-1","text":"Write your own close using the framework above"},{"id":"m6l4-2","text":"Practice presenting your price out loud — say it 20 times"},{"id":"m6l4-3","text":"Book and run your first 3 discovery calls this week"}]'::jsonb),

(33, 6, 'Post-Call: Follow Up, Collect Payment, Onboard',
 'Close the loop after every call with a professional follow-up and frictionless payment process.',
 5, 9, 'https://vimeo.com/placeholder/ascend-m6-l5',
 '<h2>The Sale Isn''t Done Until Money''s in Your Account</h2><p>After a great call, the window is short. Follow up within 24 hours. Make it easy to pay. Start delivering value immediately.</p><h3>Post-Call Sequence</h3><ol><li>Send follow-up email within 2 hours: recap the call, next steps, payment link</li><li>Follow up again in 24 hours if no response</li><li>Third touch at 48 hours with a value-add (case study, resource)</li></ol><h3>Tools for Getting Paid</h3><ul><li>Stripe — professional, fast, internationally accepted</li><li>PayPal — familiar but less professional</li><li>Venmo/CashApp — only for early-stage, small amounts</li><li>Invoice software: Wave (free), FreshBooks, QuickBooks</li></ul>',
 '[{"id":"m6l5-1","text":"Set up Stripe and send yourself a test payment"},{"id":"m6l5-2","text":"Write your post-call follow-up email template"},{"id":"m6l5-3","text":"Create a simple onboarding checklist for new clients"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 7 (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(34, 7, 'What Is a Funnel and Why You Need One',
 'Understand the 5-stage client acquisition funnel and map your current path from stranger to client.',
 1, 11, 'https://vimeo.com/placeholder/ascend-m7-l1',
 '<h2>A Funnel Is a Systematic Path From Stranger to Client</h2><p>Without a funnel, you are constantly hunting for clients. With a funnel, clients come to you. The funnel works while you sleep.</p><h3>The Simple Funnel</h3><ol><li><strong>Awareness:</strong> Content, ads, or referrals → people find you</li><li><strong>Interest:</strong> They follow you, watch your content, engage</li><li><strong>Lead:</strong> They opt-in for a free resource (lead magnet)</li><li><strong>Nurture:</strong> Email sequence builds trust over days/weeks</li><li><strong>Convert:</strong> They book a call or buy directly</li></ol>',
 '[{"id":"m7l1-1","text":"Map your current funnel (even if it''s just \"DMs\")"},{"id":"m7l1-2","text":"Identify the biggest leak in your funnel"},{"id":"m7l1-3","text":"Draw your ideal funnel for 6 months from now"}]'::jsonb),

(35, 7, 'Creating Your Lead Magnet',
 'Build a free resource so valuable that your ideal client will trade their email to get it.',
 2, 12, 'https://vimeo.com/placeholder/ascend-m7-l2',
 '<h2>The Lead Magnet: Your Best Free Offer</h2><p>A lead magnet is a free resource so valuable that people will give you their email address to get it. It''s the top of your funnel — the first step from stranger to lead.</p><h3>High-Converting Lead Magnets</h3><ul><li>PDF guide: "5 Steps to [Result]"</li><li>Video training: "How I [Achieved Result] in [Timeframe]"</li><li>Checklist: "The Complete [Outcome] Checklist"</li><li>Template: Done-for-you script, tracker, or calendar</li><li>Quiz: "What Type of Athlete Entrepreneur Are You?"</li></ul><h3>Keys to a Great Lead Magnet</h3><ul><li>Solves one specific problem</li><li>Delivers a quick win (not a full course)</li><li>Positions you as the guide to the next level</li><li>Is easy to consume (under 10 pages or 10 minutes)</li></ul>',
 '[{"id":"m7l2-1","text":"Choose your lead magnet format and topic"},{"id":"m7l2-2","text":"Create it (use Canva for PDF, Loom for video)"},{"id":"m7l2-3","text":"Set up a simple landing page with a free tool (Carrd, Linktree, or Beacons)"}]'::jsonb),

(36, 7, 'Email Marketing: Nurture Sequences',
 'Write the 5-email welcome sequence that builds trust and moves leads toward a discovery call.',
 3, 11, 'https://vimeo.com/placeholder/ascend-m7-l3',
 '<h2>Email Builds Trust at Scale</h2><p>Social media is rented land. Email is yours. Build your list — it''s the most valuable asset in your business.</p><h3>The 5-Email Welcome Sequence</h3><ol><li>Email 1 (Day 0): Deliver the lead magnet + your story</li><li>Email 2 (Day 2): Share your biggest insight + a case study</li><li>Email 3 (Day 4): Address the #1 objection in your niche</li><li>Email 4 (Day 6): Give them your best free tip or resource</li><li>Email 5 (Day 8): Soft pitch — invite them to a call or offer</li></ol><h3>Email Tools (Free to start)</h3><ul><li>ConvertKit (free up to 1,000 subscribers)</li><li>Mailchimp (free up to 500 subscribers)</li><li>Beehiiv (for newsletters)</li></ul>',
 '[{"id":"m7l3-1","text":"Set up a free ConvertKit or Mailchimp account"},{"id":"m7l3-2","text":"Write the first 3 emails of your welcome sequence"},{"id":"m7l3-3","text":"Test your sequence by subscribing yourself"}]'::jsonb),

(37, 7, 'Automating Your Client Acquisition',
 'Automate lead delivery, call booking, and onboarding so your funnel runs without daily attention.',
 4, 10, 'https://vimeo.com/placeholder/ascend-m7-l4',
 '<h2>Automation = Earning While You Sleep</h2><p>Once your funnel is built and proven, automate it. The goal: wake up to new leads, calls booked, and clients onboarded — with minimal daily effort.</p><h3>What to Automate</h3><ul><li>Lead magnet delivery (email automation)</li><li>Welcome sequence (email automation)</li><li>Call booking confirmation (Calendly)</li><li>Onboarding materials (automated email after payment)</li><li>Content scheduling (Buffer, Later)</li></ul><h3>What NOT to Automate</h3><ul><li>Personal DMs (fake it and they''ll know)</li><li>Discovery calls (this needs to be you)</li><li>Community engagement (authentic > automated)</li></ul>',
 '[{"id":"m7l4-1","text":"Set up your lead magnet automation (opt-in → email → delivery)"},{"id":"m7l4-2","text":"Configure Calendly with confirmation and reminder emails"},{"id":"m7l4-3","text":"Schedule one month of content in advance"}]'::jsonb),

(38, 7, 'Funnel Analytics: What''s Converting?',
 'Track conversion at each funnel stage and identify exactly where to focus optimization.',
 5, 9, 'https://vimeo.com/placeholder/ascend-m7-l5',
 '<h2>Measure Your Funnel Monthly</h2><p>A funnel without analytics is a guessing game. Track conversion at each stage and you''ll know exactly where to focus your optimization energy.</p><h3>Key Funnel Metrics</h3><ul><li><strong>Landing page CVR:</strong> Opt-ins ÷ visitors (target: 30%+)</li><li><strong>Email open rate:</strong> Opens ÷ sends (target: 40%+)</li><li><strong>Click rate:</strong> Clicks ÷ opens (target: 5%+)</li><li><strong>Call booking rate:</strong> Calls booked ÷ email CTAs clicked (target: 10%+)</li><li><strong>Close rate:</strong> Sales ÷ calls (target: 25%+)</li></ul>',
 '[{"id":"m7l5-1","text":"Pull your funnel metrics for the last 30 days"},{"id":"m7l5-2","text":"Find the stage with the biggest drop-off — that''s your focus"},{"id":"m7l5-3","text":"Make one improvement to that stage and track results for 2 weeks"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 8 (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(39, 8, 'Documenting Your Processes',
 'Build your business operating manual so every core process is repeatable and delegatable.',
 1, 11, 'https://vimeo.com/placeholder/ascend-m8-l1',
 '<h2>If It''s Not Written Down, It Doesn''t Exist</h2><p>As you scale, you''ll need to delegate. You can''t delegate what lives only in your head. Documentation is the foundation of a scalable business.</p><h3>Core Processes to Document</h3><ul><li>Client onboarding: What happens from payment to first call?</li><li>Content creation: How do you go from idea to published post?</li><li>DM outreach: What''s your daily outreach process?</li><li>Discovery call: The 5-phase framework, written out</li><li>Client delivery: What does your program delivery look like week by week?</li></ul><h3>Tool: Notion</h3><p>Use Notion to build your business operating manual. One page per process. Screenshot every step. Treat it like a franchise manual — so someone else could run it.</p>',
 '[{"id":"m8l1-1","text":"Document your client onboarding process step-by-step"},{"id":"m8l1-2","text":"Document your content creation process"},{"id":"m8l1-3","text":"Create a Notion workspace for your business operating manual"}]'::jsonb),

(40, 8, 'Client Retention and Results',
 'Build a client delivery system that generates results, referrals, and testimonials.',
 2, 10, 'https://vimeo.com/placeholder/ascend-m8-l2',
 '<h2>The Best Marketing Is a Transformed Client</h2><p>Retention starts on day one. The goal is not just to deliver what you promised — it''s to exceed it. Clients who get results tell everyone.</p><h3>Retention Framework</h3><ul><li><strong>Onboarding:</strong> Make the first 48 hours exceptional — welcome email, resource kit, first call</li><li><strong>Check-ins:</strong> Weekly or bi-weekly progress calls</li><li><strong>Quick wins:</strong> Engineer an early win in the first 2 weeks</li><li><strong>Communication:</strong> Proactive, not reactive — check in before they ask</li><li><strong>Celebration:</strong> Celebrate every milestone loudly</li></ul>',
 '[{"id":"m8l2-1","text":"Design your client onboarding experience in detail"},{"id":"m8l2-2","text":"Create a quick-win milestone for week 1 of your program"},{"id":"m8l2-3","text":"Write a client feedback form for your 30-day check-in"}]'::jsonb),

(41, 8, 'Legal & Financial Foundations',
 'Set up the LLC, contracts, and financial systems that protect and professionalize your business.',
 3, 13, 'https://vimeo.com/placeholder/ascend-m8-l3',
 '<h2>Protect Your Business From Day One</h2><p>Most coaches skip legal and financial setup. Don''t. A few hours of setup now prevents massive problems later.</p><h3>Legal Basics</h3><ul><li><strong>LLC:</strong> Register in your state ($50-500, worth it)</li><li><strong>Client contract:</strong> Scope of work, payment terms, refund policy</li><li><strong>Privacy policy:</strong> Required for any website collecting emails</li><li><strong>Terms of service:</strong> Required for any paid program</li></ul><h3>Financial Basics</h3><ul><li><strong>Business bank account:</strong> Separate personal and business money immediately</li><li><strong>Bookkeeping:</strong> Use Wave (free) from day one — track every transaction</li><li><strong>Tax planning:</strong> Set aside 25-30% of revenue for taxes from the start</li><li><strong>Stripe/PayPal business:</strong> Receive payments professionally</li></ul>',
 '[{"id":"m8l3-1","text":"Research LLC registration in your state"},{"id":"m8l3-2","text":"Open a business checking account this week"},{"id":"m8l3-3","text":"Set up Wave or another bookkeeping system"}]'::jsonb),

(42, 8, 'Hiring Your First VA',
 'Delegate low-value tasks to a virtual assistant and reclaim time for revenue-generating work.',
 4, 10, 'https://vimeo.com/placeholder/ascend-m8-l4',
 '<h2>Your First Hire Buys Back Your Time</h2><p>A virtual assistant (VA) is the highest-ROI first hire for a solo service business. $5-15/hour to offload admin work so you can focus on revenue-generating activities.</p><h3>What a VA Can Do</h3><ul><li>Schedule management and calendar booking</li><li>Content scheduling and repurposing</li><li>Email inbox management</li><li>Client communication follow-ups</li><li>Research and list building</li><li>Basic graphic design (using Canva templates)</li></ul><h3>Where to Find VAs</h3><ul><li>Upwork — international talent, $5-20/hr</li><li>OnlineJobs.ph — Philippines-based VAs, excellent quality</li><li>Fiverr — for one-time projects</li></ul>',
 '[{"id":"m8l4-1","text":"List every task you do in a week — circle ones a VA could do"},{"id":"m8l4-2","text":"Create a job description for your ideal VA"},{"id":"m8l4-3","text":"Post on Upwork or OnlineJobs.ph — interview 3 candidates"}]'::jsonb),

(43, 8, 'The 90-Day Scale Plan',
 'Build your quarterly business plan using the athlete season model — goals, actions, and weekly reviews.',
 5, 12, 'https://vimeo.com/placeholder/ascend-m8-l5',
 '<h2>Plan Three Months at a Time</h2><p>The athletes who dominate in business treat it like a season. 90-day sprints with clear goals, daily training, and weekly reviews. This is your playbook for the next quarter.</p><h3>90-Day Planning Template</h3><ul><li><strong>Revenue goal:</strong> $___ by [date]</li><li><strong>Clients needed:</strong> ___ @ $___ each</li><li><strong>Calls needed:</strong> ___ (at your close rate)</li><li><strong>DMs needed:</strong> ___ (at your response rate)</li><li><strong>Content needed:</strong> ___ posts/week</li></ul><h3>Weekly Review (Every Sunday)</h3><ul><li>Revenue this week vs. target</li><li>DMs sent and responses</li><li>Calls booked and closed</li><li>Content posted</li><li>One thing to improve next week</li></ul>',
 '[{"id":"m8l5-1","text":"Complete your 90-day plan using the template above"},{"id":"m8l5-2","text":"Set weekly targets that add up to your 90-day goal"},{"id":"m8l5-3","text":"Share your 90-day goal in the community for accountability"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 9: Daily Accountability (6 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(44, 9, 'Why Athletes Are Built for Accountability',
 'Recognize that your athletic background gave you a head start on every accountability system.',
 1, 10, 'https://vimeo.com/placeholder/ascend-m9-l1',
 '<h2>You Already Know How to Be Accountable</h2><p>As an athlete, you showed up to practice whether you felt like it or not. You had coaches, teammates, and schedules holding you to a standard. That structure didn''t make you accountable — it revealed that you already are.</p><h3>Transferring the Habit</h3><ul><li>In sport: external accountability (coaches, schedules, stakes)</li><li>In business: you must build the same structure internally</li><li>The skill is the same — the source changes</li></ul><p>This module teaches you to become your own best coach. You already know how to perform when held accountable. Now we build systems that hold you accountable without a coach in the room.</p>',
 '[{"id":"m9l1-1","text":"Write: what accountability systems did sport provide that you no longer have?"},{"id":"m9l1-2","text":"Identify 3 ways you currently hold yourself accountable in daily life"},{"id":"m9l1-3","text":"Post in the community: what''s the #1 thing you need to be accountable for right now"}]'::jsonb),

(45, 9, 'Designing Your Daily Non-Negotiables',
 'Create 3-5 daily actions that — done consistently — guarantee progress toward your goals.',
 2, 11, 'https://vimeo.com/placeholder/ascend-m9-l2',
 '<h2>Non-Negotiables Are Your Daily Minimum Viable Output</h2><p>A non-negotiable is something you do every single day, no matter what. Not a goal — a behavior. Goals change. Non-negotiables are constant. They are the floor of your performance, not the ceiling.</p><h3>Examples of Daily Non-Negotiables</h3><ul><li>Send 5 cold DMs</li><li>Post one piece of content</li><li>30-minute deep work block (no phone)</li><li>10-minute journal entry</li><li>Physical training session</li></ul><p>Choose 3-5 that directly connect to your business goals. Track them daily. The streak matters more than any individual day.</p>',
 '[{"id":"m9l2-1","text":"Define your 3-5 daily non-negotiables for the next 30 days"},{"id":"m9l2-2","text":"Create a simple daily tracker (paper, Notion, or app)"},{"id":"m9l2-3","text":"Share your non-negotiables in the community for accountability"}]'::jsonb),

(46, 9, 'The Morning Routine for Entrepreneurs',
 'Build a structured morning routine that puts you in peak state before the workday begins.',
 3, 9, 'https://vimeo.com/placeholder/ascend-m9-l3',
 '<h2>Win the Morning, Win the Day</h2><p>How you start your morning sets the tone for everything that follows. A structured morning routine eliminates decision fatigue, builds momentum, and ensures your most important work happens before the chaos of the day begins.</p><h3>The Athlete Morning Stack</h3><ul><li><strong>0-10 min:</strong> No phone — hydrate, breathe, set intention</li><li><strong>10-30 min:</strong> Movement (run, lift, stretch)</li><li><strong>30-45 min:</strong> Journal (3 pages, stream of consciousness)</li><li><strong>45-60 min:</strong> Review your non-negotiables and top 3 priorities for the day</li></ul><p>You don''t need a 3-hour morning routine. You need a consistent 60-minute one that you actually do.</p>',
 '[{"id":"m9l3-1","text":"Design your morning routine (write it out, step by step with times)"},{"id":"m9l3-2","text":"Run the routine tomorrow — no compromises"},{"id":"m9l3-3","text":"Track your morning routine for 7 straight days"}]'::jsonb),

(47, 9, 'The Evening Review: Closing Your Day Strong',
 'End each day with a 10-minute review that captures wins, lessons, and tomorrow''s priorities.',
 4, 8, 'https://vimeo.com/placeholder/ascend-m9-l4',
 '<h2>How You End the Day Is How You Start the Next One</h2><p>Most entrepreneurs finish the day by scrolling. High performers finish the day by reviewing. A 10-minute evening review closes loops, captures insights, and sets you up to win tomorrow before you go to sleep.</p><h3>The 5-Question Evening Review</h3><ul><li>What did I accomplish today that I''m proud of?</li><li>What didn''t get done — and why?</li><li>What''s the #1 priority for tomorrow?</li><li>What did I learn today?</li><li>What am I grateful for?</li></ul><p>Write these answers, don''t just think them. The act of writing creates clarity that thinking alone cannot.</p>',
 '[{"id":"m9l4-1","text":"Answer the 5 evening review questions tonight"},{"id":"m9l4-2","text":"Add the evening review to your calendar as a recurring 10-min block"},{"id":"m9l4-3","text":"Run it for 7 days straight and note any patterns you discover"}]'::jsonb),

(48, 9, 'Weekly Review Process',
 'Conduct a structured weekly review to measure progress, adjust plans, and build momentum.',
 5, 10, 'https://vimeo.com/placeholder/ascend-m9-l5',
 '<h2>The Weekly Review Is Your Performance Film Session</h2><p>Elite coaches don''t skip film sessions. The weekly review is your film session — where you objectively assess what happened, celebrate wins, and adjust strategy. Done every Sunday, it compounds into massive progress over 90 days.</p><h3>Weekly Review Template</h3><ul><li>Revenue this week: $___ (vs. target: $___)</li><li>Non-negotiables hit: ___/7 days</li><li>DMs sent: ___ | Responses: ___ | Calls booked: ___</li><li>Content posted: ___ pieces</li><li>Top win of the week: ___</li><li>Top lesson of the week: ___</li><li>#1 focus for next week: ___</li></ul>',
 '[{"id":"m9l5-1","text":"Block 30 minutes every Sunday for your weekly review"},{"id":"m9l5-2","text":"Complete this week''s review using the template above"},{"id":"m9l5-3","text":"Post your top win and top lesson in the community"}]'::jsonb),

(49, 9, 'Accountability Partners: Finding Your Tribe',
 'Identify and structure an accountability partnership that doubles your consistency.',
 6, 9, 'https://vimeo.com/placeholder/ascend-m9-l6',
 '<h2>You Run Faster When Someone Is Running With You</h2><p>Research consistently shows that people with accountability partners are significantly more likely to achieve their goals. Athletes already know this — you trained harder when your teammate was next to you. Build that into your business.</p><h3>The Accountability Partner Framework</h3><ul><li>Meet weekly (15-20 min) — not monthly</li><li>Share 3 commitments from last week: hit / missed / why</li><li>Share 3 commitments for next week</li><li>Give honest feedback — no cheerleading without accountability</li></ul><p>The best accountability partners are at a similar stage, equally committed, and willing to tell you hard truths.</p>',
 '[{"id":"m9l6-1","text":"Post in the community to find an accountability partner this week"},{"id":"m9l6-2","text":"Schedule your first weekly check-in call"},{"id":"m9l6-3","text":"Share your 3 commitments for the week in your first call"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 10: Goal Setting & Tracking (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(50, 10, 'The Athlete Goal-Setting Framework',
 'Apply the same goal-setting methods from elite sport to your business targets.',
 1, 12, 'https://vimeo.com/placeholder/ascend-m10-l1',
 '<h2>Athletes Set Goals Differently — And It Works</h2><p>Athletes don''t set vague goals like "get better." They set outcome goals (win the championship), performance goals (shoot 45% from three), and process goals (make 200 shots per day). This layered approach is exactly what your business needs.</p><h3>The 3-Layer Goal System</h3><ul><li><strong>Outcome goal:</strong> The big result — $10K/month by month 6</li><li><strong>Performance goal:</strong> The leading indicator — close 3 clients per month</li><li><strong>Process goal:</strong> The daily behavior — send 10 DMs, post 1 piece of content</li></ul><p>Only the process goal is fully in your control. Focus there and the outcome takes care of itself.</p>',
 '[{"id":"m10l1-1","text":"Set one outcome goal, one performance goal, and one process goal for the next 90 days"},{"id":"m10l1-2","text":"Write them in the 3-layer format above"},{"id":"m10l1-3","text":"Share your outcome goal in the community"}]'::jsonb),

(51, 10, '90-Day Thinking: Work Backwards From the Goal',
 'Reverse-engineer your 90-day revenue goal into weekly and daily actions.',
 2, 10, 'https://vimeo.com/placeholder/ascend-m10-l2',
 '<h2>Start at the End and Work Backwards</h2><p>Most people set a goal and then figure out what to do. High performers set a goal and work backwards to reveal exactly what must happen each day to hit it. This removes ambiguity and reveals whether your daily actions are actually connected to your goals.</p><h3>The Reverse-Engineer Process</h3><ul><li>Goal: $10,000 in 90 days</li><li>Average client value: $2,000</li><li>Clients needed: 5</li><li>Close rate: 25% → calls needed: 20</li><li>Call booking rate: 33% → conversations needed: 60</li><li>Response rate: 20% → DMs needed: 300</li><li>Daily DMs needed: 300 ÷ 90 days = ~3-4/day</li></ul>',
 '[{"id":"m10l2-1","text":"Set your 90-day revenue goal"},{"id":"m10l2-2","text":"Reverse-engineer it to find your daily DM target"},{"id":"m10l2-3","text":"Write the daily number somewhere you see it every morning"}]'::jsonb),

(52, 10, 'Weekly and Daily Target Setting',
 'Break 90-day goals into weekly sprints and daily tasks that create constant momentum.',
 3, 9, 'https://vimeo.com/placeholder/ascend-m10-l3',
 '<h2>Small Targets Create Big Results</h2><p>A 90-day goal is motivating but distant. Weekly targets are actionable. Daily tasks are immediate. The athlete who focuses on today''s practice — not the championship game 3 months away — is the one who wins it.</p><h3>The Target Cascade</h3><ul><li><strong>90-day goal:</strong> The season outcome</li><li><strong>Monthly milestone:</strong> Where you need to be at 30 and 60 days</li><li><strong>Weekly target:</strong> 3-5 specific outcomes for the week</li><li><strong>Daily task list:</strong> The 3 most important things to do today</li></ul><p>Every Sunday: set weekly targets. Every morning: identify today''s top 3 tasks. Every evening: review what you hit.</p>',
 '[{"id":"m10l3-1","text":"Set your 3 weekly targets for this week"},{"id":"m10l3-2","text":"Break each weekly target into daily tasks"},{"id":"m10l3-3","text":"Use the weekly review template to close out the week"}]'::jsonb),

(53, 10, 'Tracking Systems That Actually Work',
 'Build a simple tracking dashboard that shows your progress at a glance.',
 4, 11, 'https://vimeo.com/placeholder/ascend-m10-l4',
 '<h2>What Gets Measured Gets Managed</h2><p>A tracking system doesn''t need to be complicated. It needs to be something you actually use. The best tracking system is the one you open every single day.</p><h3>The Simple Business Dashboard</h3><ul><li>Revenue this month: $___ (vs. goal: $___)</li><li>Active clients: ___</li><li>DMs sent this week: ___</li><li>Calls booked: ___</li><li>Calls closed: ___</li><li>Content posted: ___</li><li>Email list size: ___</li></ul><p>Track these weekly in a Notion table or Google Sheet. The trend line is more important than any single data point.</p>',
 '[{"id":"m10l4-1","text":"Set up your business dashboard (Notion or Google Sheets)"},{"id":"m10l4-2","text":"Enter this week''s numbers"},{"id":"m10l4-3","text":"Commit to updating it every Sunday during your weekly review"}]'::jsonb),

(54, 10, 'Adjusting Goals Without Quitting',
 'Learn the difference between strategic adjustment and giving up — and how to make pivots that strengthen commitment.',
 5, 9, 'https://vimeo.com/placeholder/ascend-m10-l5',
 '<h2>Adjusting Is Not the Same as Quitting</h2><p>Athletes adjust strategy mid-game all the time. When your first offer doesn''t land, when the DM approach isn''t converting, when your niche isn''t responding — that''s information. Use it. The only failure is stopping. Adjusting the plan and continuing is what winners do.</p><h3>The Adjustment Framework</h3><ul><li>After 30 days with no results: examine the process, not the goal</li><li>Ask: is the goal wrong, or is the execution wrong?</li><li>Change one variable at a time — don''t overhaul everything at once</li><li>Give every change at least 2 weeks before evaluating</li></ul>',
 '[{"id":"m10l5-1","text":"Review your current goals — are any of them due for an adjustment?"},{"id":"m10l5-2","text":"Identify one variable you can change to improve results"},{"id":"m10l5-3","text":"Post your adjustment in the community and get input"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 11: Overcoming Imposter Syndrome (4 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(55, 11, 'Everyone Feels Like a Fraud — Here''s the Truth',
 'Normalize imposter syndrome and understand why it hits ex-athletes especially hard.',
 1, 11, 'https://vimeo.com/placeholder/ascend-m11-l1',
 '<h2>Imposter Syndrome Is the Entrance Fee to Doing Something New</h2><p>Every successful entrepreneur has felt like a fraud. It doesn''t go away — you just learn to act despite it. For ex-athletes, imposter syndrome hits differently: you spent years with a clear identity and a track record. Now you''re a beginner again. That discomfort is proof you''re growing.</p><h3>Why Athletes Get Hit Hard</h3><ul><li>You had verifiable credentials in sport — stats, rankings, championships</li><li>Business credentials feel less tangible, especially early</li><li>Comparison to others who appear further ahead</li><li>Fear of being "found out" as inexperienced</li></ul><p>The truth: everyone starts at zero in every new field. Your athletic background means you know how to build — you''ve done it once already.</p>',
 '[{"id":"m11l1-1","text":"Write about the last time you felt like an imposter — what triggered it?"},{"id":"m11l1-2","text":"List 5 things you accomplished in sport that felt impossible before you did them"},{"id":"m11l1-3","text":"Post in the community: \"I feel like an imposter because ___\" — you''ll find you''re not alone"}]'::jsonb),

(56, 11, 'Building Your Evidence File',
 'Compile a living document of proof that you are qualified, capable, and worth hiring.',
 2, 10, 'https://vimeo.com/placeholder/ascend-m11-l2',
 '<h2>Fight Feelings With Facts</h2><p>Imposter syndrome is a feeling — and feelings are not facts. The antidote is evidence. An evidence file is a running document of your accomplishments, testimonials, results, and credentials. When the inner critic speaks, open the file.</p><h3>What Goes in Your Evidence File</h3><ul><li>Athletic accomplishments and credentials</li><li>Client wins and testimonials (even informal ones)</li><li>Things people have thanked you for</li><li>Problems you''ve helped someone solve</li><li>Skills you''ve developed (formal or informal)</li><li>Moments when you showed up under pressure and delivered</li></ul><p>Add to it weekly. Read it when you doubt yourself. It is objectively true — your inner critic is not.</p>',
 '[{"id":"m11l2-1","text":"Start your evidence file today — list 10 things you are genuinely proud of"},{"id":"m11l2-2","text":"Ask 3 people who know you well: \"What do you think I''m great at?\" Add their answers"},{"id":"m11l2-3","text":"Set a weekly reminder to add at least one new entry"}]'::jsonb),

(57, 11, 'Action as the Antidote to Imposter Syndrome',
 'Discover why the only cure for imposter syndrome is consistent action — not more preparation.',
 3, 9, 'https://vimeo.com/placeholder/ascend-m11-l3',
 '<h2>You Can''t Think Your Way Out of Imposter Syndrome</h2><p>Waiting until you feel ready is a trap. Confidence doesn''t precede action — it follows it. Every time you take action despite feeling like an imposter, you collect evidence that you can do it. That evidence becomes confidence. The sequence is action → evidence → confidence, not the other way around.</p><h3>The Action Protocol</h3><ul><li>Identify the thing you''re avoiding because of imposter feelings</li><li>Make it smaller: what''s the minimum version you could do today?</li><li>Do it before you''re ready</li><li>Document the result — even imperfect action generates data</li></ul>',
 '[{"id":"m11l3-1","text":"Identify one thing you''ve been postponing because you don''t feel qualified"},{"id":"m11l3-2","text":"Do the minimum version of it today"},{"id":"m11l3-3","text":"Report back in the community: what happened when you did it anyway?"}]'::jsonb),

(58, 11, 'From Imposter to Authority in 90 Days',
 'Build the public track record that transforms how others — and you — see your expertise.',
 4, 12, 'https://vimeo.com/placeholder/ascend-m11-l4',
 '<h2>Authority Is Built, Not Assigned</h2><p>Nobody gives you authority — you build it through consistent public action over time. Content, client results, community participation, and skill development compound into a track record that makes the imposter voice progressively quieter.</p><h3>The 90-Day Authority Build</h3><ul><li><strong>Days 1-30:</strong> Post daily, have 10 conversations about your niche, get 1 first client</li><li><strong>Days 31-60:</strong> Document client progress, share case studies, teach publicly</li><li><strong>Days 61-90:</strong> Collect testimonials, refine your methodology, increase prices</li></ul><p>At day 90, look back at who you were on day 1. The gap is your evidence. The imposter didn''t survive — the authority did.</p>',
 '[{"id":"m11l4-1","text":"Write your 90-day authority plan — what will you do, post, and create?"},{"id":"m11l4-2","text":"Commit to posting publicly about your niche every day this week"},{"id":"m11l4-3","text":"Share the plan in the community for accountability"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 12: Building Confidence (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(59, 12, 'Confidence Is a Skill, Not a Gift',
 'Understand that confidence is built through preparation and repetition — not personality.',
 1, 10, 'https://vimeo.com/placeholder/ascend-m12-l1',
 '<h2>Confident Athletes Were Trained, Not Born</h2><p>The most confident athletes you know weren''t born confident — they were trained. Thousands of repetitions, countless pressure situations, and a coach who believed in them before they believed in themselves. Business confidence works the same way. You train it.</p><h3>The Confidence Formula</h3><ul><li><strong>Preparation:</strong> Know your material, practice your scripts, do your research</li><li><strong>Repetition:</strong> Do the scary thing enough times that it becomes normal</li><li><strong>Evidence:</strong> Collect proof that you can do it (see: your evidence file)</li><li><strong>Physiology:</strong> Body posture, breathing, and movement affect mental state</li></ul>',
 '[{"id":"m12l1-1","text":"Identify your #1 area where you lack confidence right now"},{"id":"m12l1-2","text":"Design a 2-week \"confidence training\" plan for that specific area"},{"id":"m12l1-3","text":"Share your plan in the community"}]'::jsonb),

(60, 12, 'Pre-Call Routines: Showing Up Ready',
 'Build a pre-call ritual that shifts your mental state from nervous to powerful.',
 2, 9, 'https://vimeo.com/placeholder/ascend-m12-l2',
 '<h2>Elite Athletes Don''t Just Show Up — They Prepare to Show Up</h2><p>Before a big game, athletes go through warmups, rituals, and mental preparation. A discovery call deserves the same treatment. The 15 minutes before a call determine more about how it goes than any script or technique.</p><h3>The Pre-Call Ritual</h3><ul><li>5 min: review their profile, your notes, and the call objective</li><li>5 min: physical activation (jumping jacks, cold water, deep breathing)</li><li>3 min: state priming — recall a time you felt completely confident</li><li>2 min: read your identity statement and transformation statement aloud</li></ul>',
 '[{"id":"m12l2-1","text":"Design your personal pre-call ritual (write it out)"},{"id":"m12l2-2","text":"Run it before your next discovery call"},{"id":"m12l2-3","text":"Rate your confidence on the call 1-10 — did the ritual help?"}]'::jsonb),

(61, 12, 'Camera Confidence: Own the Frame',
 'Show up powerfully on video content and Zoom calls using the frame ownership techniques.',
 3, 11, 'https://vimeo.com/placeholder/ascend-m12-l3',
 '<h2>The Camera Is Your New Playing Field</h2><p>Camera confidence is the superpower of the modern entrepreneur. Those who own the frame attract attention, trust, and clients. The good news: like any skill, it''s built through deliberate repetition.</p><h3>Camera Confidence Principles</h3><ul><li><strong>Eye contact:</strong> Look at the lens, not the screen — it creates connection</li><li><strong>Energy:</strong> Bring 20% more energy than feels natural — cameras compress it</li><li><strong>Stillness:</strong> Eliminate fidgeting — still body = confident presence</li><li><strong>Voice:</strong> Slow down, pause intentionally, end sentences with downward inflection</li><li><strong>Background:</strong> Clean, intentional, lit — your environment signals professionalism</li></ul>',
 '[{"id":"m12l3-1","text":"Record a 2-minute video about your niche — watch it back and score yourself"},{"id":"m12l3-2","text":"Identify your top 2 areas to improve and drill them specifically"},{"id":"m12l3-3","text":"Post the video publicly — done beats perfect"}]'::jsonb),

(62, 12, 'Handling Rejection Without Retreating',
 'Build the emotional resilience to stay in the game after a no, a bad call, or a lost client.',
 4, 10, 'https://vimeo.com/placeholder/ascend-m12-l4',
 '<h2>Rejection Is the Game — Not an Interruption to It</h2><p>Athletes get cut, lose games, and get booed. You survived that. A prospect not replying to your DM is nothing by comparison. Rejection is not personal — it''s probabilistic. More swings = more hits. Stopping after rejection guarantees zero hits.</p><h3>The Rejection Reset Protocol</h3><ul><li>Feel it for 5 minutes — don''t suppress it</li><li>Ask: what can I learn from this?</li><li>Ask: was this a reflection of my offer or just poor fit?</li><li>Do one more outreach action immediately to break the pattern</li><li>Review your evidence file to reset your state</li></ul>',
 '[{"id":"m12l4-1","text":"Write about the last rejection you experienced — what story did you tell yourself?"},{"id":"m12l4-2","text":"Rewrite that story using the rejection reset protocol"},{"id":"m12l4-3","text":"Send 5 DMs today as a direct challenge to the rejection reflex"}]'::jsonb),

(63, 12, 'The Confident Entrepreneur Daily Practice',
 'Build a daily confidence practice that compounds into unshakeable self-belief over 90 days.',
 5, 8, 'https://vimeo.com/placeholder/ascend-m12-l5',
 '<h2>Confidence Is a Daily Practice</h2><p>You don''t become confident by thinking about it. You become confident by showing up, doing the work, and collecting evidence every single day. The daily practice is simple — but it compounds into something powerful over time.</p><h3>The Daily Confidence Stack</h3><ul><li>Morning: read your identity statement and evidence file (2 min)</li><li>Before any intimidating task: use the 5-second rule — count down and act</li><li>Evening: write one thing you did today that took courage</li><li>Weekly: update your evidence file with new wins and proof</li></ul>',
 '[{"id":"m12l5-1","text":"Start the daily confidence stack tomorrow morning"},{"id":"m12l5-2","text":"Run it for 14 days straight and track your subjective confidence daily (1-10)"},{"id":"m12l5-3","text":"Share your 14-day confidence score trend in the community"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 13: Discipline & Consistency (5 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(64, 13, 'Discipline Without Motivation',
 'Build systems that make consistent action automatic — even when motivation is gone.',
 1, 11, 'https://vimeo.com/placeholder/ascend-m13-l1',
 '<h2>Motivation Is a Visitor — Discipline Lives Here</h2><p>Motivation comes and goes. Professional athletes don''t wait for motivation to show up to practice. They have a system. The system removes the daily decision of whether to do the work. Systems beat willpower every time because willpower depletes and systems don''t.</p><h3>The Discipline System</h3><ul><li>Same time every day for key activities — removes decision fatigue</li><li>Calendar blocking — treat business tasks like game day appointments</li><li>Environment design — your workspace signals "work mode"</li><li>Accountability — someone who notices if you don''t show up</li></ul>',
 '[{"id":"m13l1-1","text":"Identify the 2-3 most important business activities that require discipline"},{"id":"m13l1-2","text":"Schedule them at the same time every day for the next 30 days"},{"id":"m13l1-3","text":"Tell someone your schedule — create external accountability"}]'::jsonb),

(65, 13, 'Keystone Habits: The Domino Effect',
 'Identify the one daily habit that triggers everything else — and protect it ruthlessly.',
 2, 10, 'https://vimeo.com/placeholder/ascend-m13-l2',
 '<h2>One Habit Changes Everything</h2><p>A keystone habit is a behavior that, when done consistently, makes every other positive behavior more likely. For athletes, it''s often morning training. For entrepreneurs, it might be morning journaling, a workout, or a content creation block. Find yours and protect it like it''s your most valuable asset — because it is.</p><h3>Identifying Your Keystone Habit</h3><ul><li>When you do this one thing, your whole day goes better</li><li>Missing it throws off your entire routine</li><li>It has a positive ripple effect on multiple other habits</li><li>Common examples: morning workout, journaling, meditation, deep work block</li></ul>',
 '[{"id":"m13l2-1","text":"Identify your keystone habit — the one that anchors everything else"},{"id":"m13l2-2","text":"Build your daily routine around it (not alongside it)"},{"id":"m13l2-3","text":"Track your keystone habit for 21 days straight"}]'::jsonb),

(66, 13, 'Environment Design for Maximum Output',
 'Redesign your physical and digital environment to make productive behavior the path of least resistance.',
 3, 11, 'https://vimeo.com/placeholder/ascend-m13-l3',
 '<h2>Your Environment Votes for or Against Your Goals Every Day</h2><p>You are not fighting against laziness — you are fighting against friction. When your environment makes it easy to do the wrong thing, willpower loses. When your environment makes it easy to do the right thing, discipline wins automatically.</p><h3>Environment Design Principles</h3><ul><li>Make good behaviors easy: laptop open, notebook ready, weights visible</li><li>Make bad behaviors hard: phone in another room, social media blocked during work hours</li><li>Design for the version of you who shows up tired and unmotivated — that person needs a clear, frictionless path</li></ul>',
 '[{"id":"m13l3-1","text":"Audit your current workspace — what makes it hard to work?"},{"id":"m13l3-2","text":"Make 3 changes to your physical environment this week"},{"id":"m13l3-3","text":"Block distracting apps during your deep work hours"}]'::jsonb),

(67, 13, 'Bouncing Back From Off Days',
 'Build the recovery systems that prevent one bad day from becoming a bad week.',
 4, 9, 'https://vimeo.com/placeholder/ascend-m13-l4',
 '<h2>The Best Athletes Miss Shots — The Best Entrepreneurs Miss Days</h2><p>You will have off days. The question is not whether they happen — it''s how quickly you bounce back. Elite athletes use pre-agreed protocols for off-performances: they review, reset, and recommit without spiraling. Build the same into your business.</p><h3>The Off-Day Recovery Protocol</h3><ul><li>Don''t catastrophize: one bad day doesn''t define the week</li><li>Identify the cause: physical, mental, external, or just human?</li><li>Do one small thing from your non-negotiables to restore momentum</li><li>Don''t double down tomorrow to "make up" — just return to baseline</li></ul>',
 '[{"id":"m13l4-1","text":"Write your personal off-day protocol — what will you do when things go sideways?"},{"id":"m13l4-2","text":"Identify your "re-entry behavior" — the one small action that always gets you back on track"},{"id":"m13l4-3","text":"Share your protocol in the community"}]'::jsonb),

(68, 13, 'Building Momentum Through Small Wins',
 'Engineer early wins that generate the momentum to sustain long-term consistency.',
 5, 10, 'https://vimeo.com/placeholder/ascend-m13-l5',
 '<h2>Momentum Is Manufactured</h2><p>Momentum doesn''t happen to you — you build it. And it starts smaller than you think. Every non-negotiable completed, every DM sent, every piece of content posted is a small win. Small wins stack into streaks. Streaks create identity. Identity drives behavior. This is how discipline becomes effortless over time.</p><h3>The Small Wins System</h3><ul><li>Start each day by completing the easiest non-negotiable first</li><li>Track your streak visibly — a simple X on a calendar works</li><li>Celebrate small wins publicly in the community</li><li>Never break the chain twice in a row — "never miss twice" is the rule</li></ul>',
 '[{"id":"m13l5-1","text":"Start a visible streak tracker for your most important daily habit"},{"id":"m13l5-2","text":"Post your streak count in the community every week"},{"id":"m13l5-3","text":"Identify one small win from today and celebrate it"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- LESSONS — Module 14: Community & Accountability (4 lessons)
-- ============================================================

INSERT INTO lessons (id, module_id, title, description, "order", duration_minutes, video_url, notes_content, action_items) VALUES

(69, 14, 'The Power of Your Environment',
 'Understand why the people around you are the most powerful determinant of your success.',
 1, 10, 'https://vimeo.com/placeholder/ascend-m14-l1',
 '<h2>You Are the Average of Your Environment</h2><p>Athletes know this instinctively — playing up a level makes you better. Playing down makes you worse. The Ascend community is your opportunity to surround yourself with people who are building, growing, and holding each other to a high standard. That environment is an unfair advantage.</p><h3>How Environment Shapes Behavior</h3><ul><li>Seeing others take action normalizes action for you</li><li>Shared language creates shared standards ("non-negotiables," "DMing," "closing")</li><li>Belonging to a group of entrepreneurs makes you more entrepreneurial</li><li>Celebrating others'' wins trains your brain to expect wins</li></ul>',
 '[{"id":"m14l1-1","text":"Introduce yourself in the Ascend community — your sport, your niche, your goal"},{"id":"m14l1-2","text":"Audit your offline environment: are the people around you building or consuming?"},{"id":"m14l1-3","text":"Engage with 3 other Ascend members'' posts this week"}]'::jsonb),

(70, 14, 'How to Give and Receive Feedback',
 'Master the feedback skills that accelerate your growth and strengthen the community.',
 2, 9, 'https://vimeo.com/placeholder/ascend-m14-l2',
 '<h2>Feedback Is a Gift — When Given and Received Correctly</h2><p>The best coaches give direct, honest, specific feedback. Not vague encouragement, not harsh criticism — precise, actionable observations. In the Ascend community, the quality of feedback you give is a direct indicator of how seriously you''re engaging with your own growth.</p><h3>Giving Feedback</h3><ul><li>Be specific: "Your hook was vague" beats "I didn''t like it"</li><li>Be actionable: always suggest the improvement, not just the problem</li><li>Be kind: tone matters as much as content</li></ul><h3>Receiving Feedback</h3><ul><li>Say thank you first — always</li><li>Ask clarifying questions before defending</li><li>Implement before judging whether the feedback was right</li></ul>',
 '[{"id":"m14l2-1","text":"Give specific, actionable feedback on 2 community posts this week"},{"id":"m14l2-2","text":"Share a piece of your work in the community and ask for honest feedback"},{"id":"m14l2-3","text":"Implement one piece of feedback you receive without defending yourself"}]'::jsonb),

(71, 14, 'Finding Your Accountability Partner',
 'Identify, approach, and structure an accountability partnership within the Ascend community.',
 3, 10, 'https://vimeo.com/placeholder/ascend-m14-l3',
 '<h2>The Right Partner Accelerates Everything</h2><p>An accountability partner is not a cheerleader — they''re a training partner. They celebrate wins AND call out patterns. They push you when you''re comfortable and steady you when you''re spiraling. Finding the right one is one of the highest-leverage actions in this program.</p><h3>What to Look for in a Partner</h3><ul><li>Similar stage and ambition level</li><li>Willing to be honest, not just supportive</li><li>Consistent — they show up to the weekly check-in</li><li>Complementary strengths (their weakness is your strength)</li></ul><h3>The Weekly Check-In Format</h3><p>15-20 min, every week: 3 commitments from last week (hit/missed), 3 commitments for next week, one thing you need help with.</p>',
 '[{"id":"m14l3-1","text":"Post in the community looking for an accountability partner"},{"id":"m14l3-2","text":"Have a 15-min intro call with a potential partner this week"},{"id":"m14l3-3","text":"Run your first official weekly check-in using the format above"}]'::jsonb),

(72, 14, 'Celebrate Wins: Building Community Momentum',
 'Use public celebration of wins to build momentum for yourself and fuel the community flywheel.',
 4, 8, 'https://vimeo.com/placeholder/ascend-m14-l4',
 '<h2>Wins Shared Are Wins Multiplied</h2><p>In a locker room, individual wins become team energy. When a teammate scores, everyone''s belief goes up. The Ascend community works the same way. Every win you share publicly makes three things happen: you reinforce your own momentum, you give someone else proof that it''s possible, and you raise the standard for the whole room.</p><h3>What Counts as a Win</h3><ul><li>First client signed (any amount)</li><li>First DM replied</li><li>First call booked</li><li>7-day non-negotiable streak</li><li>First piece of content posted</li><li>Any breakthrough — mental, tactical, or financial</li></ul><p>There is no win too small to share. Small wins celebrated consistently become big wins over time.</p>',
 '[{"id":"m14l4-1","text":"Share a win in the community today — no matter how small"},{"id":"m14l4-2","text":"Comment on someone else''s win with genuine encouragement"},{"id":"m14l4-3","text":"Make it a habit: share at least one win per week in the community"}]'::jsonb)

ON CONFLICT DO NOTHING;

-- ============================================================
-- RESOURCES (62 total)
-- ============================================================

INSERT INTO resources (id, title, description, category, file_url, module_id, download_count, tier_availability) VALUES

-- Module 1 resources (full_only)
(1, 'Identity Reset Workbook', 'Full workbook for processing your athletic identity transition', 'Worksheets', '/resources/module-1/identity-reset-workbook.pdf', 1, 0, 'full_only'),
(2, 'Belief Audit Worksheet', 'Structured worksheet to identify and rewrite limiting beliefs', 'Worksheets', '/resources/module-1/belief-audit-worksheet.pdf', 1, 0, 'full_only'),
(3, '2.0 Identity Statement Template', 'Fill-in-the-blank template for crafting your new identity statement', 'Templates', '/resources/module-1/20-identity-statement-template.pdf', 1, 0, 'full_only'),

-- Module 2 resources (full_only)
(4, 'Skill Audit Worksheet', 'Four-category grid to catalogue all your transferable skills', 'Worksheets', '/resources/module-2/skill-audit-worksheet.pdf', 2, 0, 'full_only'),
(5, 'Niche Selection Matrix', 'Scoring matrix to evaluate and choose your most viable niche', 'Worksheets', '/resources/module-2/niche-selection-matrix.xlsx', 2, 0, 'full_only'),
(6, 'Competitive Research Template', 'Template to document competitor offers, pricing, and positioning gaps', 'Templates', '/resources/module-2/competitive-research-template.xlsx', 2, 0, 'full_only'),

-- Module 3 resources (full_only)
(7, 'Offer Builder Worksheet', 'Step-by-step worksheet to construct your 6-part offer', 'Worksheets', '/resources/module-3/offer-builder-worksheet.pdf', 3, 0, 'full_only'),
(8, 'Transformation Statement Guide', 'Guide and examples for writing your core transformation statement', 'Guides', '/resources/module-3/transformation-statement-guide.pdf', 3, 0, 'full_only'),
(9, 'Pricing Calculator', 'Spreadsheet to calculate ROI-based pricing and tier your offers', 'Templates', '/resources/module-3/pricing-calculator.xlsx', 3, 0, 'full_only'),

-- Module 4 resources (full_only)
(10, 'Content Pillar Planner', 'Template for defining your 4 pillars and generating 20 post ideas', 'Templates', '/resources/module-4/content-pillar-planner.pdf', 4, 0, 'full_only'),
(11, 'Hook Writing Cheatsheet', '50 proven hook formulas with examples for athlete entrepreneurs', 'Checklists', '/resources/module-4/hook-writing-cheatsheet.pdf', 4, 0, 'full_only'),
(12, '30-Day Content Calendar', 'Pre-formatted monthly calendar with post type schedule', 'Templates', '/resources/module-4/30-day-content-calendar.xlsx', 4, 0, 'full_only'),
(13, 'Content Batching Checklist', 'Step-by-step checklist for a productive 4-hour content batching day', 'Checklists', '/resources/module-4/content-batching-checklist.pdf', 4, 0, 'full_only'),

-- Module 5 resources (full_only)
(14, 'DM Script Library', '5 proven DM templates for cold outreach, warm follow-up, and booking calls', 'Scripts', '/resources/module-5/dm-script-library.pdf', 5, 0, 'full_only'),
(15, 'Outreach Tracker Spreadsheet', 'CRM-style tracker for all DMs, conversations, and follow-ups', 'Trackers', '/resources/module-5/outreach-tracker.xlsx', 5, 0, 'full_only'),
(16, 'Follow-Up Sequence Scripts', '4-touch follow-up script including the breakup message', 'Scripts', '/resources/module-5/follow-up-sequence-scripts.pdf', 5, 0, 'full_only'),

-- Module 6 resources (full_only)
(17, 'Sales Call Script (5-Phase)', 'Word-for-word script for all 5 phases of a discovery call', 'Scripts', '/resources/module-6/sales-call-script-5-phase.pdf', 6, 0, 'full_only'),
(18, 'Power Questions Bank', '40 power questions organized by call phase and use case', 'Guides', '/resources/module-6/power-questions-bank.pdf', 6, 0, 'full_only'),
(19, 'Objection Handler Guide', 'Response scripts for the top 10 objections with context notes', 'Guides', '/resources/module-6/objection-handler-guide.pdf', 6, 0, 'full_only'),

-- Module 7 resources (full_only)
(20, 'Funnel Mapping Worksheet', 'Visual template to map your current and ideal client acquisition funnel', 'Worksheets', '/resources/module-7/funnel-mapping-worksheet.pdf', 7, 0, 'full_only'),
(21, 'Lead Magnet Creation Guide', 'Step-by-step guide to creating a high-converting lead magnet in one day', 'Guides', '/resources/module-7/lead-magnet-creation-guide.pdf', 7, 0, 'full_only'),
(22, 'Email Welcome Sequence Templates', '5-email welcome sequence templates ready to customize and deploy', 'Templates', '/resources/module-7/email-welcome-sequence-templates.pdf', 7, 0, 'full_only'),

-- Module 8 resources (full_only)
(23, 'Business Process Documentation Template', 'Notion-ready template for documenting any business process', 'Templates', '/resources/module-8/business-process-documentation-template.pdf', 8, 0, 'full_only'),
(24, 'Client Onboarding Checklist', '20-step checklist covering everything from payment to first call', 'Checklists', '/resources/module-8/client-onboarding-checklist.pdf', 8, 0, 'full_only'),
(25, '90-Day Scale Planner', 'Quarterly planning template with revenue goal reverse-engineering', 'Templates', '/resources/module-8/90-day-scale-planner.xlsx', 8, 0, 'full_only'),

-- Module 9 resources (both)
(26, 'Daily Non-Negotiables Tracker', 'Printable and digital tracker for your daily non-negotiable habits', 'Trackers', '/resources/module-9/daily-non-negotiables-tracker.pdf', 9, 0, 'both'),
(27, 'Morning Routine Template', 'Customizable morning routine template with time blocks', 'Templates', '/resources/module-9/morning-routine-template.pdf', 9, 0, 'both'),

-- Module 10 resources (both)
(28, '90-Day Goal Planner', 'Three-layer goal planner: outcome, performance, and process goals', 'Templates', '/resources/module-10/90-day-goal-planner.pdf', 10, 0, 'both'),
(29, 'Weekly Review Template', 'One-page weekly review form covering all key business metrics', 'Templates', '/resources/module-10/weekly-review-template.pdf', 10, 0, 'both'),

-- Module 11 resources (both)
(30, 'Evidence File Template', 'Structured document for cataloguing your accomplishments and credentials', 'Templates', '/resources/module-11/evidence-file-template.pdf', 11, 0, 'both'),

-- Module 12 resources (both)
(31, 'Confidence Ritual Guide', 'Pre-call and pre-camera ritual guide for peak performance state', 'Guides', '/resources/module-12/confidence-ritual-guide.pdf', 12, 0, 'both'),

-- Module 13 resources (both)
(32, 'Habit Tracker Template', 'Visual habit tracker for your keystone habit and non-negotiables', 'Trackers', '/resources/module-13/habit-tracker-template.pdf', 13, 0, 'both'),

-- Module 14 resources (both)
(33, 'Accountability Partner Agreement Template', 'Structured agreement and weekly check-in format for partners', 'Templates', '/resources/module-14/accountability-partner-agreement-template.pdf', 14, 0, 'both'),

-- General resources (both, no module)
(34, 'Athlete to Entrepreneur Roadmap', 'Visual overview of the complete Ascend 2.0 journey from sport to business', 'Guides', '/resources/general/athlete-to-entrepreneur-roadmap.pdf', NULL, 0, 'both'),
(35, 'Ascend 2.0 Quick Start Guide', 'How to get the most from Ascend 2.0 in your first 7 days', 'Guides', '/resources/general/ascend-20-quick-start-guide.pdf', NULL, 0, 'both'),
(36, 'Ascend Tech Stack Guide', 'Recommended tools for each stage of building your coaching business', 'Guides', '/resources/general/ascend-tech-stack-guide.pdf', NULL, 0, 'both'),
(37, 'Income Goal Calculator', 'Spreadsheet to reverse-engineer your income goal into daily actions', 'Trackers', '/resources/general/income-goal-calculator.xlsx', NULL, 0, 'both'),
(38, 'Community Guidelines & Standards', 'How to show up, contribute, and get the most from the Ascend community', 'Guides', '/resources/general/community-guidelines.pdf', NULL, 0, 'both')

ON CONFLICT DO NOTHING;

-- ============================================================
-- VERIFICATION
-- ============================================================

SELECT 'modules' AS table_name, COUNT(*) AS row_count FROM modules
UNION ALL
SELECT 'lessons', COUNT(*) FROM lessons
UNION ALL
SELECT 'resources', COUNT(*) FROM resources;
