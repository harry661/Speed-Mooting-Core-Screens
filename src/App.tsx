import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "sonner"
import { ErrorBoundary } from "./components/ErrorBoundary"
import { Layout } from "./components/Layout"
import { ThemeProvider } from "./contexts/ThemeContext"
import Dashboard from "./pages/Dashboard"
import ExerciseLibrary from "./pages/ExerciseLibrary"
import ExerciseDetail from "./pages/ExerciseDetail"
import SubmissionFlow from "./pages/SubmissionFlow"
import AIFeedbackReport from "./pages/AIFeedbackReport"
import AdminExerciseManagement from "./pages/AdminExerciseManagement"
import TutorialsAndGuidance from "./pages/TutorialsAndGuidance"
import TutorialDetail from "./pages/TutorialDetail"
import SubjectGuideDetail from "./pages/SubjectGuideDetail"
import SubmissionHistory from "./pages/SubmissionHistory"
// import ResourceHistory from "./pages/ResourceHistory"
import Settings from "./pages/Settings"

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Router>
          <Layout>
            <Toaster position="top-right" richColors />
            <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/exercises" element={<ExerciseLibrary />} />
            <Route path="/exercises/:id" element={<ExerciseDetail />} />
            <Route path="/submit" element={<SubmissionFlow />} />
            <Route path="/report" element={<AIFeedbackReport />} />
            <Route path="/history" element={<SubmissionHistory />} />
            {/* <Route path="/history/resources" element={<ResourceHistory />} /> */}
            <Route path="/tutorials" element={<TutorialsAndGuidance />} />
            <Route path="/tutorials/:id" element={<TutorialDetail />} />
            <Route path="/subjects/:id" element={<SubjectGuideDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/admin/exercises" element={<AdminExerciseManagement />} />
            </Routes>
          </Layout>
        </Router>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
