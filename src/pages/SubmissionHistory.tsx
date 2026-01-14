import { useState } from "react"
import { motion } from "framer-motion"
import { toast } from "sonner"
import { Trash2, Search, MoreVertical, ChevronRight, FileText } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

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
        status: "Processing",
        score: null,
        grade: null,
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
        status: "Failed",
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
        status: "Processing",
        score: null,
        grade: null,
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
    const navigate = useNavigate()
    const [submissions, setSubmissions] = useState<Submission[]>(sampleSubmissions)
    const [searchQuery, setSearchQuery] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("all")
    const [exerciseFilter, setExerciseFilter] = useState<string>("all")
    const [dateRangeFilter, setDateRangeFilter] = useState<string>("all")
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
            
            // Date range filter
            let matchesDateRange = true
            if (dateRangeFilter === "last30") {
                const thirtyDaysAgo = new Date()
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                matchesDateRange = sub.submissionDate >= thirtyDaysAgo
            }
            
            return matchesSearch && matchesStatus && matchesExercise && matchesDateRange
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

    const formatTableDate = (date: Date) => {
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        })
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


    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Analyzed":
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-green-100 border border-green-200">
                        <span className="text-green-700 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-green-700 font-sans">Completed</span>
                    </div>
                )
            case "Processing":
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-amber-100 border border-amber-200">
                        <span className="text-amber-700 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-amber-700 font-sans">Pending</span>
                    </div>
                )
            case "Failed":
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-red-100 border border-red-200">
                        <span className="text-red-700 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-red-700 font-sans">Canceled</span>
                    </div>
                )
            default:
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-300 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-300 font-sans">{status}</span>
                    </div>
                )
        }
    }

    const getSubjectColorClasses = (subject: string) => {
        const subjectLower = subject.toLowerCase()
        if (subjectLower.includes("contract")) {
            return {
                badge: "bg-accent/10 text-accent border-accent/20",
                hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            }
        } else if (subjectLower.includes("tort")) {
            return {
                badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800",
                hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            }
        } else if (subjectLower.includes("criminal")) {
            return {
                badge: "bg-primary/10 dark:bg-primary/30 text-primary dark:text-green-400 border-primary/20 dark:border-green-700",
                hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            }
        } else if (subjectLower.includes("public") || subjectLower.includes("constitutional") || subjectLower.includes("administrative")) {
            return {
                badge: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 border-purple-200 dark:border-purple-800",
                hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            }
        } else if (subjectLower.includes("property")) {
            return {
                badge: "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800",
                hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            }
        } else if (subjectLower.includes("evidence") || subjectLower.includes("procedure")) {
            return {
                badge: "bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 border-teal-200 dark:border-teal-800",
                hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
            }
        }
        // Default neutral
        return {
            badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
            hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50"
        }
    }

    const getScoreColor = (score: number | null) => {
        if (score === null) return "text-gray-400 dark:text-gray-500"
        if (score >= 80) return "text-green-700 dark:text-green-400"
        if (score >= 60) return "text-amber-700 dark:text-amber-400"
        return "text-red-700 dark:text-red-400"
    }

    return (
        <div className="flex-1 bg-[#FBFBF9] dark:bg-gray-950 min-h-screen p-6">
            <motion.div 
                className="w-full space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-sans">
                    <Link to="/history" className="hover:text-accent transition-colors">History</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-gray-100 font-semibold">Submission History</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading">Submission History</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-sans mt-1">Review your past video submissions and AI-generated feedback.</p>
                    </div>
                </div>

                {/* Compact Filter Bar */}
                <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                    <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
                            {/* Search */}
                            <div className="relative flex-1 w-full lg:w-auto min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                                <Input
                                    placeholder="Search submission..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 font-sans text-sm h-9 text-gray-900 dark:text-gray-100"
                                    aria-label="Search submissions by exercise name or subject"
                                />
                            </div>

                            {/* Type Filter - Using Exercise as Type */}
                            <Select value={exerciseFilter} onValueChange={setExerciseFilter}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100" aria-label="Filter submissions by exercise">
                                    <SelectValue placeholder="Exercise: All" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-800 shadow-none bg-white dark:bg-gray-900">
                                    <SelectItem value="all">All Exercises</SelectItem>
                                    {uniqueExercises.map(ex => (
                                        <SelectItem key={ex} value={ex}>{ex}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full lg:w-[130px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100" aria-label="Filter submissions by status">
                                    <SelectValue placeholder="Status: All" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-800 shadow-none bg-white dark:bg-gray-900">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Analyzed">Completed</SelectItem>
                                    <SelectItem value="Processing">Pending</SelectItem>
                                    <SelectItem value="Failed">Canceled</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Date Range Filter */}
                            <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100" aria-label="Filter submissions by date range">
                                    <SelectValue placeholder="Date Range" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-800 shadow-none bg-white dark:bg-gray-900">
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="last30">Last 30 days</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100" aria-label="Sort submissions">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-800 shadow-none bg-white dark:bg-gray-900">
                                    <SelectItem value="newest">Date (Newest)</SelectItem>
                                    <SelectItem value="oldest">Date (Oldest)</SelectItem>
                                    <SelectItem value="exercise">Exercise Name</SelectItem>
                                    <SelectItem value="score-high">Score (High)</SelectItem>
                                    <SelectItem value="score-low">Score (Low)</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </CardContent>
                </Card>

                {/* Empty State or Card Grid */}
                {filteredSubmissions.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4">
                        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-full mb-4">
                            <FileText className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                        </div>
                        <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 font-heading mb-2">
                            No submissions found
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 text-center max-w-sm">
                            {searchQuery || exerciseFilter !== "all" || statusFilter !== "all"
                                ? "Try adjusting your filters to see more results."
                                : "You haven't submitted any exercises yet. Get started with your first mooting exercise!"}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredSubmissions.map((submission, i) => {
                            const subjectColors = getSubjectColorClasses(submission.subject)
                            const isClickable = submission.status === "Analyzed"

                            return (
                                <motion.div
                                    key={submission.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                >
                                    <Card
                                        className={cn(
                                            "h-full rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex flex-col group shadow-none hover:border-accent transition-colors",
                                            isClickable && "cursor-pointer"
                                        )}
                                        onClick={() => {
                                            if (isClickable) {
                                                navigate(`/report?submissionId=${submission.id}`)
                                            }
                                        }}
                                    >
                                        <CardHeader className="p-5 pb-3">
                                            <div className="flex items-center justify-between mb-3">
                                                <Badge variant="outline" className={cn(
                                                    "text-[9px] font-heading font-bold uppercase tracking-widest rounded-sm px-1.5 py-0.5 border",
                                                    subjectColors.badge
                                                )}>
                                                    {submission.subject}
                                                </Badge>
                                                <Badge variant="outline" className={cn(
                                                    "rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest",
                                                    submission.status === "Analyzed"
                                                        ? "border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30"
                                                        : submission.status === "Processing"
                                                        ? "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800"
                                                        : "border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30"
                                                )}>
                                                    {submission.status === "Analyzed" ? "COMPLETED" : submission.status === "Processing" ? "PENDING" : "CANCELED"}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight text-gray-900 dark:text-gray-100">
                                                {submission.exerciseName}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-5 pt-0 flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase tracking-tight">
                                                    {format(submission.submissionDate, "MMM dd, yyyy")}
                                                </p>
                                                <span className="text-gray-300 dark:text-gray-600">•</span>
                                                <Badge variant="outline" className="text-[9px] px-1.5 py-0 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                                    V{submission.version}
                                                </Badge>
                                            </div>
                                            {submission.score !== null && (
                                                <div className="flex items-baseline gap-2">
                                                    <p className={cn(
                                                        "text-2xl font-bold tabular-nums font-sans",
                                                        getScoreColor(submission.score)
                                                    )}>
                                                        {submission.score}
                                                    </p>
                                                    <p className="text-xs uppercase font-bold text-gray-400 dark:text-gray-500 font-heading tracking-widest">
                                                        {submission.grade}
                                                    </p>
                                                </div>
                                            )}
                                        </CardContent>
                                        <CardFooter className="p-5 pt-0 flex items-center justify-between">
                                            {isClickable ? (
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="rounded-sm border-accent/20 text-accent group-hover:bg-accent group-hover:text-white font-heading font-semibold text-xs transition-colors"
                                                    onClick={(e) => {
                                                        e.stopPropagation()
                                                        navigate(`/report?submissionId=${submission.id}`)
                                                    }}
                                                >
                                                    View Report
                                                </Button>
                                            ) : (
                                                <div className="flex-1"></div>
                                            )}
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        onClick={(e) => e.stopPropagation()}
                                                        aria-label="Submission actions"
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="rounded-sm">
                                                    <DropdownMenuItem
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleDeleteClick(submission.id)
                                                        }}
                                                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                    >
                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            )
                        })}
                    </div>
                )}

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
            </motion.div>
        </div>
    )
}
