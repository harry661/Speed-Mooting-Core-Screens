import { Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { Layout } from "./Layout"
import { ProtectedRoute } from "./ProtectedRoute"
import { useLoginModal } from "@/contexts/AuthContext"
import { LoginModal } from "./LoginModal"
import Dashboard from "../pages/Dashboard"
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
    const { isLoginModalOpen, closeLoginModal } = useLoginModal()

    return (
        <>
            <Routes>
                <Route path="/*" element={
                    <Layout>
                        <Toaster position="top-right" richColors />
                        <Routes>
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
                        </Routes>
                    </Layout>
                } />
            </Routes>
            <LoginModal open={isLoginModalOpen} onOpenChange={(open) => {
                if (!open) closeLoginModal()
            }} />
        </>
    )
}

