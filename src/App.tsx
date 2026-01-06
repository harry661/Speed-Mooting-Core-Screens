import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Layout } from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import ExerciseLibrary from "./pages/ExerciseLibrary"
import SubmissionFlow from "./pages/SubmissionFlow"
import AIFeedbackReport from "./pages/AIFeedbackReport"
import AdminExerciseManagement from "./pages/AdminExerciseManagement"

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/exercises" element={<ExerciseLibrary />} />
          <Route path="/submit" element={<SubmissionFlow />} />
          <Route path="/report" element={<AIFeedbackReport />} />
          <Route path="/admin/exercises" element={<AdminExerciseManagement />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
