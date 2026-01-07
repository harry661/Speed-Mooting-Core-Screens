import { useState } from "react"
import { toast } from "sonner"
import { Download, Trash2, Search, MoreVertical, ChevronRight, Upload, Info } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"

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
        status: "Analyzed",
        score: 76,
        grade: "B+",
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

    const handleExport = () => {
        toast.info("Export functionality coming soon", {
            description: "You'll be able to export your submission history as CSV or PDF."
        })
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
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-gray-100 border border-gray-200">
                        <span className="text-gray-600 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-gray-600 font-sans">{status}</span>
                    </div>
                )
        }
    }

    const getSubjectColorClasses = (subject: string) => {
        const subjectLower = subject.toLowerCase()
        if (subjectLower.includes("contract")) {
            return {
                badge: "bg-accent/10 text-accent border-accent/20",
                hover: "hover:bg-gray-50/50"
            }
        } else if (subjectLower.includes("tort")) {
            return {
                badge: "bg-blue-100 text-blue-700 border-blue-200",
                hover: "hover:bg-gray-50/50"
            }
        } else if (subjectLower.includes("criminal")) {
            return {
                badge: "bg-primary/10 text-primary border-primary/20",
                hover: "hover:bg-gray-50/50"
            }
        } else if (subjectLower.includes("public") || subjectLower.includes("constitutional") || subjectLower.includes("administrative")) {
            return {
                badge: "bg-purple-100 text-purple-700 border-purple-200",
                hover: "hover:bg-gray-50/50"
            }
        } else if (subjectLower.includes("property")) {
            return {
                badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
                hover: "hover:bg-gray-50/50"
            }
        } else if (subjectLower.includes("evidence") || subjectLower.includes("procedure")) {
            return {
                badge: "bg-teal-100 text-teal-700 border-teal-200",
                hover: "hover:bg-gray-50/50"
            }
        }
        // Default neutral
        return {
            badge: "bg-gray-100 text-gray-700 border-gray-200",
            hover: "hover:bg-gray-50/50"
        }
    }

    const getScoreColor = (score: number | null) => {
        if (score === null) return "text-gray-400"
        if (score >= 80) return "text-green-700"
        if (score >= 60) return "text-amber-700"
        return "text-red-700"
    }

    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                    <Link to="/history" className="hover:text-accent transition-colors">History</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 font-semibold">Submission History</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-heading">Submission History</h2>
                        <p className="text-gray-500 text-xs font-sans mt-1">Review your past video submissions and AI-generated feedback.</p>
                    </div>
                </div>

                {/* Compact Filter Bar */}
                <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                    <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
                            {/* Search */}
                            <div className="relative flex-1 w-full lg:w-auto min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search submission..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 rounded-sm border-gray-200 bg-white font-sans text-sm h-9"
                                />
                            </div>

                            {/* Type Filter - Using Exercise as Type */}
                            <Select value={exerciseFilter} onValueChange={setExerciseFilter}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white border-gray-200 rounded-sm h-9 font-sans text-xs">
                                    <SelectValue placeholder="Exercise: All" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                    <SelectItem value="all">All Exercises</SelectItem>
                                    {uniqueExercises.map(ex => (
                                        <SelectItem key={ex} value={ex}>{ex}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Status Filter */}
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full lg:w-[130px] bg-white border-gray-200 rounded-sm h-9 font-sans text-xs">
                                    <SelectValue placeholder="Status: All" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                    <SelectItem value="all">All Statuses</SelectItem>
                                    <SelectItem value="Analyzed">Completed</SelectItem>
                                    <SelectItem value="Processing">Pending</SelectItem>
                                    <SelectItem value="Failed">Canceled</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Date Range Filter */}
                            <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white border-gray-200 rounded-sm h-9 font-sans text-xs">
                                    <SelectValue placeholder="Date Range" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="last30">Last 30 days</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white border-gray-200 rounded-sm h-9 font-sans text-xs">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                    <SelectItem value="newest">Date (Newest)</SelectItem>
                                    <SelectItem value="oldest">Date (Oldest)</SelectItem>
                                    <SelectItem value="exercise">Exercise Name</SelectItem>
                                    <SelectItem value="score-high">Score (High)</SelectItem>
                                    <SelectItem value="score-low">Score (Low)</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Export Button */}
                            <Button
                                variant="outline"
                                onClick={handleExport}
                                className="gap-2 border-gray-200 font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none w-full lg:w-auto"
                            >
                                <Upload className="w-3.5 h-3.5" />
                                Export
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Data Retention Notice - Subtle */}
                <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-3 flex items-start gap-2">
                    <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 font-sans">Submissions are retained for 3 years per our data retention policy.</p>
                </div>

                {/* Table */}
                {filteredSubmissions.length === 0 ? (
                    <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                        <CardContent className="p-12 text-center">
                            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 font-heading mb-2">No submissions found</h3>
                            <p className="text-sm text-gray-600 font-sans">Try adjusting your filters or search query.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="rounded-sm border-gray-200 bg-white shadow-none overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50/50">
                                            <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 font-heading">Date</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 font-heading">Submission Name</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 font-heading">Exercise</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 font-heading">Type</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 font-heading">Score</th>
                                            <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 font-heading">Status</th>
                                            <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 font-heading">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredSubmissions.map((submission) => {
                                            const subjectColors = getSubjectColorClasses(submission.subject)
                                            const isClickable = submission.status === "Analyzed"
                                            const handleRowClick = (e: React.MouseEvent) => {
                                                // Don't navigate if clicking on the dropdown or its button
                                                if ((e.target as HTMLElement).closest('[role="menu"]') || 
                                                    (e.target as HTMLElement).closest('button')) {
                                                    return
                                                }
                                                if (isClickable) {
                                                    navigate(`/report?submissionId=${submission.id}`)
                                                }
                                            }
                                            return (
                                                <tr 
                                                    key={submission.id} 
                                                    onClick={handleRowClick}
                                                    className={cn(
                                                        "border-b border-gray-100 transition-colors",
                                                        isClickable ? "cursor-pointer hover:bg-gray-50/50" : "cursor-default",
                                                        !isClickable && subjectColors.hover
                                                    )}
                                                >
                                                    <td className="py-4 px-4">
                                                        <div className="text-sm text-gray-900 font-sans">
                                                            {formatTableDate(submission.submissionDate)}
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-sm font-semibold text-gray-900 font-heading">
                                                                {submission.exerciseName}
                                                            </span>
                                                            <Badge variant="outline" className="text-[9px] font-heading font-bold uppercase tracking-widest border-gray-200 text-gray-600 px-1.5 py-0">
                                                                v{submission.version}
                                                            </Badge>
                                                        </div>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <Badge className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 border ${subjectColors.badge}`}>
                                                            {submission.subject}
                                                        </Badge>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <span className="text-sm text-gray-700 font-sans">Video Submission</span>
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        {submission.score !== null ? (
                                                            <div className="flex items-center gap-1">
                                                                <span className={`text-sm font-bold font-sans tabular-nums ${getScoreColor(submission.score)}`}>{submission.score}</span>
                                                                <span className="text-xs text-gray-500 font-heading font-bold uppercase tracking-widest">({submission.grade})</span>
                                                            </div>
                                                        ) : (
                                                            <span className="text-sm text-gray-400 font-sans">--</span>
                                                        )}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        {getStatusBadge(submission.status)}
                                                    </td>
                                                    <td className="py-4 px-4">
                                                        <div className="flex justify-end" onClick={(e) => e.stopPropagation()}>
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button
                                                                        variant="ghost"
                                                                        className="h-8 w-8 p-0 hover:bg-gray-100"
                                                                        onClick={(e) => e.stopPropagation()}
                                                                    >
                                                                        <MoreVertical className="h-4 w-4 text-gray-600" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent align="end" className="w-48" onClick={(e) => e.stopPropagation()}>
                                                                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleExport(); }}>
                                                                        <Download className="mr-2 h-4 w-4" />
                                                                        Download PDF
                                                                    </DropdownMenuItem>
                                                                    <DropdownMenuSeparator />
                                                                    <DropdownMenuItem 
                                                                        onClick={(e) => { e.stopPropagation(); handleDeleteClick(submission.id); }}
                                                                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                                                                    >
                                                                        <Trash2 className="mr-2 h-4 w-4" />
                                                                        Delete
                                                                    </DropdownMenuItem>
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>
                        </div>
                    </Card>
                )}
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
