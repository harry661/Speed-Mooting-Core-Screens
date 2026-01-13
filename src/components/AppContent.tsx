import { Routes, Route, Outlet } from "react-router-dom"
import { Toaster } from "sonner"
import { Layout } from "./Layout"
import { ProtectedRoute } from "./ProtectedRoute"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import ExerciseLibrary from "../pages/ExerciseLibrary"
import ExerciseDetail from "../pages/ExerciseDetail"
import SubmissionFlow from "../pages/SubmissionFlow"
import AIFeedbackReport from "../pages/AIFeedbackReport"
import AdminExerciseManagement from "../pages/AdminExerciseManagement"
import TutorialsAndGuidance from "../pages/TutorialsAndGuidance"
import TutorialDetail from "../pages/TutorialDetail"
import SubjectGuideDetail from "../pages/SubjectGuideDetail"
import SubmissionHistory from "../pages/SubmissionHistory"
import Settings from "../pages/Settings"

export function AppContent() {
    return (
        <>
            <Toaster position="top-right" richColors />
            <Routes>
                {/* Public route outside Layout - no sidebar/header */}
                <Route path="/login" element={<Login />} />

                {/* All other routes wrapped in Layout */}
                <Route element={<Layout><Outlet /></Layout>}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/exercises" element={<ExerciseLibrary />} />
                    <Route path="/exercises/:id" element={<ExerciseDetail />} />
                    <Route path="/submit" element={
                        <ProtectedRoute>
                            <SubmissionFlow />
                        </ProtectedRoute>
                    } />
                    <Route path="/report" element={
                        <ProtectedRoute>
                            <AIFeedbackReport />
                        </ProtectedRoute>
                    } />
                    <Route path="/history" element={
                        <ProtectedRoute>
                            <SubmissionHistory />
                        </ProtectedRoute>
                    } />
                    <Route path="/tutorials" element={<TutorialsAndGuidance />} />
                    <Route path="/tutorials/:id" element={<TutorialDetail />} />
                    <Route path="/subjects/:id" element={<SubjectGuideDetail />} />
                    <Route path="/settings" element={
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    } />
                    <Route path="/admin/exercises" element={
                        <ProtectedRoute>
                            <AdminExerciseManagement />
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </>
    )
}

