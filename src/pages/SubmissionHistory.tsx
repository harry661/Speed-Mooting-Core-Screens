import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Calendar, Clock, FileText, Download, Trash2, Eye, Search, AlertCircle, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Link } from "react-router-dom"

interface Submission {
    id: number
    exerciseId: number
    exerciseName: string
    subject: string
    submissionDate: Date
    version: number
    status: "Analyzed" | "Processing" | "Failed"
    score: number | null
    grade: string | null
    videoFile: string
    skeletonArgument?: string
    caseFiles?: string[]
}

const sampleSubmissions: Submission[] = [
    {
        id: 1,
        exerciseId: 1,
        exerciseName: "Contract Breach - Offer & Acceptance",
        subject: "Contract Law",
        submissionDate: new Date("2024-01-15T14:30:00"),
        version: 3,
        status: "Analyzed",
        score: 82,
        grade: "A-",
        videoFile: "submission_v3_contract_breach.mp4",
        skeletonArgument: "skeleton_v3.pdf",
        caseFiles: ["case_file_1.pdf", "case_file_2.pdf"]
    },
    {
        id: 2,
        exerciseId: 1,
        exerciseName: "Contract Breach - Offer & Acceptance",
        subject: "Contract Law",
        submissionDate: new Date("2024-01-10T10:15:00"),
        version: 2,
        status: "Analyzed",
        score: 78,
        grade: "B+",
        videoFile: "submission_v2_contract_breach.mp4",
        skeletonArgument: "skeleton_v2.pdf"
    },
    {
        id: 3,
        exerciseId: 2,
        exerciseName: "Negligence Case - Duty of Care",
        subject: "Tort Law",
        submissionDate: new Date("2024-01-12T16:45:00"),
        version: 1,
        status: "Analyzed",
        score: 74,
        grade: "B",
        videoFile: "submission_v1_negligence.mp4",
        skeletonArgument: "skeleton_negligence.pdf",
        caseFiles: ["medical_report.pdf"]
    },
    {
        id: 4,
        exerciseId: 3,
        exerciseName: "Criminal Law - Mens Rea",
        subject: "Criminal Law",
        submissionDate: new Date("2024-01-14T09:20:00"),
        version: 1,
        status: "Processing",
        score: null,
        grade: null,
        videoFile: "submission_v1_mens_rea.mp4"
    },
    {
        id: 5,
        exerciseId: 1,
        exerciseName: "Contract Breach - Offer & Acceptance",
        subject: "Contract Law",
        submissionDate: new Date("2024-01-05T11:00:00"),
        version: 1,
        status: "Analyzed",
        score: 71,
        grade: "B-",
        videoFile: "submission_v1_contract_breach.mp4",
        skeletonArgument: "skeleton_v1.pdf"
    },
    {
        id: 6,
        exerciseId: 4,
        exerciseName: "Constitutional Review",
        subject: "Public Law",
        submissionDate: new Date("2024-01-08T13:30:00"),
        version: 1,
        status: "Analyzed",
        score: 88,
        grade: "A",
        videoFile: "submission_v1_constitutional.mp4",
        skeletonArgument: "skeleton_constitutional.pdf",
        caseFiles: ["act_2020.pdf", "regulations.pdf"]
    }
]

export default function SubmissionHistory() {
    const [submissions, setSubmissions] = useState<Submission[]>(sampleSubmissions)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [exerciseFilter, setExerciseFilter] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("newest")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [submissionToDelete, setSubmissionToDelete] = useState<number | null>(null)

    // Get unique exercises for filter
    const uniqueExercises = Array.from(new Set(submissions.map(s => s.exerciseName))).sort()

    // Filter and sort submissions
    const filteredSubmissions = submissions
        .filter(sub => {
            const matchesSearch = sub.exerciseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 sub.subject.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesStatus = statusFilter === "all" || sub.status === statusFilter
            const matchesExercise = exerciseFilter === "all" || sub.exerciseName === exerciseFilter
            return matchesSearch && matchesStatus && matchesExercise
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return b.submissionDate.getTime() - a.submissionDate.getTime()
                case "oldest":
                    return a.submissionDate.getTime() - b.submissionDate.getTime()
                case "exercise":
                    return a.exerciseName.localeCompare(b.exerciseName)
                case "score-high":
                    return (b.score || 0) - (a.score || 0)
                case "score-low":
                    return (a.score || 0) - (b.score || 0)
                default:
                    return 0
            }
        })

    const formatDate = (date: Date) => {
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 60) {
            return `${diffMins} ${diffMins === 1 ? 'minute' : 'minutes'} ago`
        } else if (diffHours < 24) {
            return `${diffHours} ${diffHours === 1 ? 'hour' : 'hours'} ago`
        } else if (diffDays < 7) {
            return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`
        } else {
            return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
        }
    }

    const handleDeleteClick = (id: number) => {
        setSubmissionToDelete(id)
        setDeleteDialogOpen(true)
    }
    
    const handleDeleteConfirm = () => {
        if (submissionToDelete) {
            setSubmissions(submissions.filter(s => s.id !== submissionToDelete))
            toast.success("Submission deleted", {
                description: "The submission has been permanently removed."
            })
            setDeleteDialogOpen(false)
            setSubmissionToDelete(null)
        }
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Analyzed":
                return "bg-green-100 text-green-800 border-green-200"
            case "Processing":
                return "bg-amber-100 text-amber-800 border-amber-200"
            case "Failed":
                return "bg-red-100 text-red-800 border-red-200"
            default:
                return "bg-gray-100 text-gray-800 border-gray-200"
        }
    }

    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-heading">Submission History</h2>
                        <p className="text-gray-500 text-xs font-sans mt-1">Review your past video submissions and AI-generated feedback.</p>
                    </div>
                </div>

                {/* Data Retention Notice */}
                <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-4 flex items-start gap-3">
                    <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-heading mb-1">Data Retention Policy</h4>
                        <p className="text-sm text-gray-800 font-sans">Your submission history is retained for 3 years in accordance with our data retention policy. Submissions older than 3 years may be automatically archived or deleted.</p>
                    </div>
                </div>

                {/* Filters and Search */}
                <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="relative flex-1">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search by exercise name or subject..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 rounded-sm border-gray-200 bg-white font-sans text-sm"
                                />
                            </div>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-[180px] bg-white border-gray-200 rounded-sm h-10 font-sans text-xs">
                                    <SelectValue placeholder="All Statuses" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Analyzed">Analyzed</SelectItem>
                                    <SelectItem value="Processing">Processing</SelectItem>
                                    <SelectItem value="Failed">Failed</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Exercise Filter */}
                            <Select value={exerciseFilter} onValueChange={setExerciseFilter}>
                                <SelectTrigger className="w-[180px] bg-white border-gray-200 rounded-sm h-10 font-sans text-xs">
                                    <SelectValue placeholder="All Exercises" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                    <SelectItem value="all">All Exercises</SelectItem>
                                    {uniqueExercises.map(ex => (
                                        <SelectItem key={ex} value={ex}>{ex}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[180px] bg-white border-gray-200 rounded-sm h-10 font-sans text-xs">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                    <SelectItem value="newest">Newest First</SelectItem>
                                    <SelectItem value="oldest">Oldest First</SelectItem>
                                    <SelectItem value="exercise">By Exercise Name</SelectItem>
                                    <SelectItem value="score-high">Score (High to Low)</SelectItem>
                                    <SelectItem value="score-low">Score (Low to High)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Submissions List */}
                {filteredSubmissions.length === 0 ? (
                    <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                        <CardContent className="p-12 text-center">
                            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 font-heading mb-2">No submissions found</h3>
                            <p className="text-sm text-gray-600 font-sans">Try adjusting your filters or search query.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredSubmissions.map((submission, index) => (
                            <motion.div
                                key={submission.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <Card className="rounded-sm border-gray-200 bg-white shadow-none hover:shadow-sm transition-shadow">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            {/* Left: Exercise Info */}
                                            <div className="flex-1 space-y-3">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-2">
                                                            <h3 className="text-lg font-bold text-gray-900 font-heading">
                                                                {submission.exerciseName}
                                                            </h3>
                                                            <Badge variant="outline" className="text-[10px] font-heading font-bold uppercase tracking-widest border-gray-200 text-gray-600">
                                                                Version {submission.version}
                                                            </Badge>
                                                            <Badge className={`text-[10px] font-heading font-bold uppercase tracking-widest border ${getStatusColor(submission.status)}`}>
                                                                {submission.status}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-600 font-sans">{submission.subject}</p>
                                                    </div>
                                                    {submission.score !== null && (
                                                        <div className="text-right">
                                                            <div className="text-2xl font-bold text-gray-900 font-sans tabular-nums">{submission.score}</div>
                                                            <div className="text-xs text-gray-500 font-heading font-bold uppercase tracking-widest">{submission.grade}</div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center gap-6 text-xs text-gray-500 font-sans">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-4 h-4" />
                                                        {submission.submissionDate.toLocaleDateString('en-GB', { 
                                                            day: 'numeric', 
                                                            month: 'short', 
                                                            year: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Clock className="w-4 h-4" />
                                                        {formatDate(submission.submissionDate)}
                                                    </div>
                                                </div>

                                                {/* Files Info */}
                                                <div className="flex items-center gap-4 text-xs text-gray-600 font-sans">
                                                    <span className="flex items-center gap-1.5">
                                                        <FileText className="w-3.5 h-3.5" />
                                                        {submission.videoFile}
                                                    </span>
                                                    {submission.skeletonArgument && (
                                                        <span className="text-gray-400">•</span>
                                                    )}
                                                    {submission.skeletonArgument && (
                                                        <span>{submission.skeletonArgument}</span>
                                                    )}
                                                    {submission.caseFiles && submission.caseFiles.length > 0 && (
                                                        <>
                                                            <span className="text-gray-400">•</span>
                                                            <span>{submission.caseFiles.length} case file{submission.caseFiles.length > 1 ? 's' : ''}</span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Right: Actions */}
                                            <div className="flex items-center gap-2">
                                                {submission.status === "Analyzed" && (
                                                    <Link to={`/report?submissionId=${submission.id}`}>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm"
                                                            className="gap-2 border-gray-200 font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none"
                                                        >
                                                            <Eye className="w-3.5 h-3.5" />
                                                            View Report
                                                        </Button>
                                                    </Link>
                                                )}
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    className="gap-2 border-gray-200 font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                    Download
                                                </Button>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleDeleteClick(submission.id)}
                                                    className="gap-2 border-red-200 text-red-600 hover:bg-red-50 font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Submission Limit Notice */}
                <div className="bg-amber-50/50 border-l-4 border-amber-200 rounded-r-xl p-4 flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-amber-700 font-heading mb-1">Submission Limits</h4>
                        <p className="text-sm text-gray-800 font-sans">The system limits the number of submissions allowed per exercise to prevent abuse. This limit is configurable by administrators. If you've reached the limit for an exercise, please contact support.</p>
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent className="rounded-sm">
                    <DialogHeader>
                        <DialogTitle>Delete Submission</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete this submission? This action cannot be undone and the submission will be permanently removed from your history.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setDeleteDialogOpen(false)
                                setSubmissionToDelete(null)
                            }}
                            className="rounded-sm"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleDeleteConfirm}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-sm"
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

