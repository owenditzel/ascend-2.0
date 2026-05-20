import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Layout } from '@/components/layout/Layout'
import { AuthLayout } from '@/components/layout/AuthLayout'

import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import DashboardPage from '@/pages/DashboardPage'
import ModulesPage from '@/pages/ModulesPage'
import ModuleDetailPage from '@/pages/ModuleDetailPage'
import LessonPage from '@/pages/LessonPage'
import ResourcesPage from '@/pages/ResourcesPage'
import AccountabilityPage from '@/pages/AccountabilityPage'
import LeaderboardPage from '@/pages/LeaderboardPage'
import CommunityPage from '@/pages/CommunityPage'
import ProfilePage from '@/pages/ProfilePage'
import UpgradePage from '@/pages/UpgradePage'
import ResourceDetailPage from '@/pages/ResourceDetailPage'
import AdminPage from '@/pages/AdminPage'
import NotFoundPage from '@/pages/NotFoundPage'
import { ToastContainer } from '@/components/ui/toast'

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Layout />
    </ProtectedRoute>
  )
}

function AdminLayout() {
  return (
    <ProtectedRoute adminOnly>
      <Layout />
    </ProtectedRoute>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />

          <Route element={<AuthLayout />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          </Route>

          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/modules" element={<ModulesPage />} />
            <Route path="/modules/:id" element={<ModuleDetailPage />} />
            <Route path="/modules/:id/lessons/:lessonId" element={<LessonPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            <Route path="/resources/:id" element={<ResourceDetailPage />} />
            <Route path="/upgrade" element={<UpgradePage />} />
            <Route path="/accountability" element={<AccountabilityPage />} />
            <Route path="/leaderboard" element={<LeaderboardPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminPage />} />
          </Route>

          <Route path="/app" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      <ToastContainer />
      </AuthProvider>
    </BrowserRouter>
  )
}
