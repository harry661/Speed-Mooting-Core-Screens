import { useState } from "react"
import { toast } from "sonner"
import { Download, Eye, MoreVertical, Search, Info, ChevronRight, Database, BookOpen, GraduationCap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Link } from "react-router-dom"

interface ResourceHistory {
    id: number
    name: string
    type: "Legal Database" | "Subject Guide" | "Tutorial"
    category: string
    accessedDate: Date
    status?: "Completed" | "In Progress" | "Bookmarked"
}

const sampleResourceHistory: ResourceHistory[] = [
    // Legal Databases
    {
        id: 1,
        name: "Westlaw",
        type: "Legal Database",
        category: "Case Law",
        accessedDate: new Date("2024-01-15T10:30:00"),
        status: "Completed"
    },
    {
        id: 2,
        name: "LexisNexis",
        type: "Legal Database",
        category: "Legislation",
        accessedDate: new Date("2024-01-14T14:20:00"),
        status: "In Progress"
    },
    {
        id: 3,
        name: "HeinOnline",
        type: "Legal Database",
        category: "Legal Journals",
        accessedDate: new Date("2024-01-12T09:15:00"),
        status: "Bookmarked"
    },
    {
        id: 4,
        name: "Official Government Publications",
        type: "Legal Database",
        category: "Legislation",
        accessedDate: new Date("2024-01-10T16:45:00"),
        status: "Completed"
    },
    // Subject Guides
    {
        id: 5,
        name: "Contract Law",
        type: "Subject Guide",
        category: "Commercial Law",
        accessedDate: new Date("2024-01-13T11:20:00"),
        status: "Completed"
    },
    {
        id: 6,
        name: "Tort Law",
        type: "Subject Guide",
        category: "Civil Law",
        accessedDate: new Date("2024-01-11T13:30:00"),
        status: "In Progress"
    },
    {
        id: 7,
        name: "Criminal Law",
        type: "Subject Guide",
        category: "Public Law",
        accessedDate: new Date("2024-01-09T10:00:00"),
        status: "Completed"
    },
    {
        id: 8,
        name: "Constitutional Law",
        type: "Subject Guide",
        category: "Public Law",
        accessedDate: new Date("2024-01-08T15:20:00"),
        status: "Bookmarked"
    },
    {
        id: 9,
        name: "Civil Procedure",
        type: "Subject Guide",
        category: "Procedural Law",
        accessedDate: new Date("2024-01-07T09:45:00"),
        status: "Completed"
    },
    // Tutorials
    {
        id: 10,
        name: "Video Uploads",
        type: "Tutorial",
        category: "Platform Features",
        accessedDate: new Date("2024-01-14T08:30:00"),
        status: "Completed"
    },
    {
        id: 11,
        name: "Skeleton Argument Submissions",
        type: "Tutorial",
        category: "Submissions",
        accessedDate: new Date("2024-01-12T12:15:00"),
        status: "Completed"
    },
    {
        id: 12,
        name: "Interpreting AI Feedback",
        type: "Tutorial",
        category: "Feedback",
        accessedDate: new Date("2024-01-11T14:00:00"),
        status: "In Progress"
    },
    {
        id: 13,
        name: "User Interface Navigation",
        type: "Tutorial",
        category: "Platform Features",
        accessedDate: new Date("2024-01-09T10:30:00"),
        status: "Completed"
    },
    {
        id: 14,
        name: "Topic Selection",
        type: "Tutorial",
        category: "Getting Started",
        accessedDate: new Date("2024-01-06T11:45:00"),
        status: "Completed"
    },
    {
        id: 15,
        name: "Understanding Speed Mooting Rules",
        type: "Tutorial",
        category: "Mooting",
        accessedDate: new Date("2024-01-05T13:20:00"),
        status: "Completed"
    }
]

export default function ResourceHistory() {
    const [resources] = useState<ResourceHistory[]>(sampleResourceHistory)
    const [searchQuery, setSearchQuery] = useState("")
    const [typeFilter, setTypeFilter] = useState<string>("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [dateRangeFilter, setDateRangeFilter] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("newest")

    // Get unique categories based on selected type
    const getCategoriesForType = () => {
        if (typeFilter === "all") {
            return Array.from(new Set(resources.map(r => r.category))).sort()
        }
        return Array.from(new Set(resources.filter(r => r.type === typeFilter).map(r => r.category))).sort()
    }

    const categories = getCategoriesForType()

    // Filter and sort resources
    const filteredResources = resources
        .filter(resource => {
            const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 resource.category.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesType = typeFilter === "all" || resource.type === typeFilter
            const matchesCategory = categoryFilter === "all" || resource.category === categoryFilter
            
            // Date range filter
            let matchesDateRange = true
            if (dateRangeFilter === "last30") {
                const thirtyDaysAgo = new Date()
                thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)
                matchesDateRange = resource.accessedDate >= thirtyDaysAgo
            }
            
            return matchesSearch && matchesType && matchesCategory && matchesDateRange
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return b.accessedDate.getTime() - a.accessedDate.getTime()
                case "oldest":
                    return a.accessedDate.getTime() - b.accessedDate.getTime()
                case "name":
                    return a.name.localeCompare(b.name)
                case "type":
                    return a.type.localeCompare(b.type)
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


    const getTypeIcon = (type: string) => {
        switch (type) {
            case "Legal Database":
                return Database
            case "Subject Guide":
                return BookOpen
            case "Tutorial":
                return GraduationCap
            default:
                return Database
        }
    }

    const getTypeColorClasses = (type: string) => {
        switch (type) {
            case "Legal Database":
                return {
                    badge: "bg-primary/10 text-primary border-primary/20",
                    hover: "hover:bg-gray-50/50",
                    icon: "text-primary"
                }
            case "Subject Guide":
                return {
                    badge: "bg-accent/10 text-accent border-accent/20",
                    hover: "hover:bg-gray-50/50",
                    icon: "text-accent"
                }
            case "Tutorial":
                return {
                    badge: "bg-blue-100 text-blue-700 border-blue-200",
                    hover: "hover:bg-gray-50/50",
                    icon: "text-blue-600"
                }
            default:
        return {
            badge: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700",
            hover: "hover:bg-gray-50/50 dark:hover:bg-gray-800/50",
            icon: "text-gray-400 dark:text-gray-500"
        }
        }
    }

    const getStatusBadge = (status: string | undefined) => {
        if (!status) return null
        switch (status) {
            case "Completed":
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-800">
                        <span className="text-green-700 dark:text-green-400 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-green-700 dark:text-green-400 font-sans">Completed</span>
                    </div>
                )
            case "In Progress":
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-amber-100 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800">
                        <span className="text-amber-700 dark:text-amber-400 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-amber-700 dark:text-amber-400 font-sans">In Progress</span>
                    </div>
                )
            case "Bookmarked":
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
                        <span className="text-blue-700 dark:text-blue-400 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 font-sans">Bookmarked</span>
                    </div>
                )
            default:
                return (
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-sm bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <span className="text-gray-600 dark:text-gray-400 font-bold text-xs">•</span>
                        <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 font-sans">{status}</span>
                    </div>
                )
        }
    }

    return (
        <div className="flex-1 bg-[#fcf8f8] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 font-sans">
                    <Link to="/history" className="hover:text-accent transition-colors">History</Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-gray-900 dark:text-gray-100 font-semibold">Resource History</span>
                </div>

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading">Resource History</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-sans mt-1">Track your access to legal databases, subject guides, and tutorials.</p>
                    </div>
                </div>

                {/* Compact Filter Bar */}
                <Card className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-none">
                    <CardContent className="p-4">
                        <div className="flex flex-col lg:flex-row gap-3 items-start lg:items-center">
                            {/* Search */}
                            <div className="relative flex-1 w-full lg:w-auto min-w-[200px]">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Search resource..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 font-sans text-sm h-9 text-gray-900 dark:text-gray-100"
                                />
                            </div>

                            {/* Type Filter - Primary Filter */}
                            <Select value={typeFilter} onValueChange={(value) => {
                                setTypeFilter(value)
                                setCategoryFilter("all") // Reset category when type changes
                            }}>
                                <SelectTrigger className="w-full lg:w-[160px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Type: All" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-700 shadow-none bg-white dark:bg-gray-800">
                                    <SelectItem value="all">All Types</SelectItem>
                                    <SelectItem value="Legal Database">Legal Databases</SelectItem>
                                    <SelectItem value="Subject Guide">Subject Guides</SelectItem>
                                    <SelectItem value="Tutorial">Tutorials</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Category Filter */}
                            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                <SelectTrigger className="w-full lg:w-[150px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Category: All" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-700 shadow-none bg-white dark:bg-gray-800">
                                    <SelectItem value="all">All Categories</SelectItem>
                                    {categories.map(cat => (
                                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            {/* Date Range Filter */}
                            <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Date Range" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-700 shadow-none bg-white dark:bg-gray-800">
                                    <SelectItem value="all">All Time</SelectItem>
                                    <SelectItem value="last30">Last 30 days</SelectItem>
                                </SelectContent>
                            </Select>

                            {/* Sort */}
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-full lg:w-[140px] bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-sm h-9 font-sans text-xs text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-700 shadow-none bg-white dark:bg-gray-800">
                                    <SelectItem value="newest">Date (Newest)</SelectItem>
                                    <SelectItem value="oldest">Date (Oldest)</SelectItem>
                                    <SelectItem value="name">Name (A-Z)</SelectItem>
                                    <SelectItem value="type">Type</SelectItem>
                                </SelectContent>
                            </Select>

                        </div>
                    </CardContent>
                </Card>

                {/* Data Retention Notice - Subtle */}
                <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-3 flex items-start gap-2">
                    <Info className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 font-sans">Resource access history is retained for 3 years per our data retention policy.</p>
                </div>

                {/* Table */}
                {filteredResources.length === 0 ? (
                    <Card className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-none">
                        <CardContent className="p-12 text-center">
                            <Search className="w-12 h-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 font-heading mb-2">No resources found</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-sans">Try adjusting your filters or search query.</p>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-none overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 font-heading">Date</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 font-heading">Resource Name</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 font-heading">Type</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 font-heading">Category</th>
                                        <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 font-heading">Status</th>
                                        <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-widest text-gray-600 dark:text-gray-400 font-heading">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredResources.map((resource) => {
                                        const TypeIcon = getTypeIcon(resource.type)
                                        const typeColors = getTypeColorClasses(resource.type)
                                        return (
                                            <tr 
                                                key={resource.id} 
                                                className={`border-b border-gray-100 dark:border-gray-800 ${typeColors.hover} transition-colors`}
                                            >
                                                <td className="py-4 px-4">
                                                    <div className="text-sm text-gray-900 dark:text-gray-100 font-sans">
                                                        {formatTableDate(resource.accessedDate)}
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex items-center gap-2">
                                                        <TypeIcon className={`w-4 h-4 ${typeColors.icon}`} />
                                                        <span className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-heading">
                                                            {resource.name}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <Badge className={`text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 border ${typeColors.badge}`}>
                                                        {resource.type}
                                                    </Badge>
                                                </td>
                                                <td className="py-4 px-4">
                                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-sans">{resource.category}</span>
                                                </td>
                                                <td className="py-4 px-4">
                                                    {resource.status ? getStatusBadge(resource.status) : (
                                                        <span className="text-sm text-gray-400 dark:text-gray-500 font-sans">--</span>
                                                    )}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <div className="flex justify-end">
                                                        <DropdownMenu>
                                                            <DropdownMenuTrigger asChild>
                                                                <Button
                                                                    variant="ghost"
                                                                    className="h-8 w-8 p-0 hover:bg-gray-100"
                                                                >
                                                                    <MoreVertical className="h-4 w-4 text-gray-600" />
                                                                </Button>
                                                            </DropdownMenuTrigger>
                                                            <DropdownMenuContent align="end" className="w-48">
                                                                <DropdownMenuItem asChild>
                                                                    <Link to="/tutorials" className="cursor-pointer">
                                                                        <Eye className="mr-2 h-4 w-4" />
                                                                        View Resource
                                                                    </Link>
                                                                </DropdownMenuItem>
                                                                <DropdownMenuSeparator />
                                                                <DropdownMenuItem onClick={() => handleExport()}>
                                                                    <Download className="mr-2 h-4 w-4" />
                                                                    Download
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
        </div>
    )
}

