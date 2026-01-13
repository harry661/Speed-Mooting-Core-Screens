import { motion } from "framer-motion"
import { Clock, TrendingUp, BookOpen, Video, Scale, FileText, MessageSquare, GraduationCap, ChevronRight, Trophy, Users, Calendar, ArrowRight, LogIn } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

const stats = [
    { title: "Total Submissions", value: "12", icon: Clock, trend: "+2 this month" },
    { title: "Average Score", value: "78%", icon: TrendingUp, trend: "+5% improvment" },
    { title: "Active Exercises", value: "4", icon: BookOpen, trend: "2 ending soon" },
]

const recentSubmissions = [
    { id: 1, title: "Contract Breach - Offer & Acceptance", date: "2 hours ago", score: "82", status: "Analyzed" },
    { id: 2, title: "Negligence Case - Duty of Care", date: "Yesterday", score: "74", status: "Analyzed" },
    { id: 3, title: "Criminal Law - Mens Rea", date: "3 days ago", score: "--", status: "Processing" },
    { id: 4, title: "Constitutional Review", date: "5 days ago", score: "88", status: "Analyzed" },
    { id: 5, title: "Evidence Admissibility", date: "1 week ago", score: "79", status: "Analyzed" },
    { id: 6, title: "Property Law - Land Disputes", date: "1 week ago", score: "71", status: "Analyzed" },
]

const featuredTutorials = [
    { 
        id: 1, 
        title: "Video Uploads", 
        description: "Learn how to record and upload your mooting video submissions.",
        category: "Platform Features",
        icon: Video,
        bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
    },
    { 
        id: 2, 
        title: "Interpreting AI Feedback", 
        description: "Understand how to read and apply AI-generated feedback reports.",
        category: "Feedback",
        icon: MessageSquare,
        bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
    },
    { 
        id: 3, 
        title: "Skeleton Argument Submissions", 
        description: "Guidance on preparing and submitting skeleton arguments and case files.",
        category: "Submissions",
        icon: FileText,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop"
    },
]

const mockCompetitions = [
    {
        id: 1,
        name: "Internal Mooting Competition",
        description: "Annual internal competition for all students. Showcase your advocacy skills and compete for the championship title.",
        startDate: new Date("2026-01-15"),
        endDate: new Date("2026-02-15"),
        status: "upcoming" as const,
        participants: 45
    },
    {
        id: 2,
        name: "Speed Mooting Challenge",
        description: "Fast-paced mooting competition focusing on quick thinking and concise argumentation. Perfect for practicing under pressure.",
        startDate: new Date("2026-01-10"),
        endDate: new Date("2026-01-25"),
        status: "active" as const,
        participants: 32
    },
    {
        id: 3,
        name: "Regional Advocacy Championship",
        description: "Compete against teams from across the region. Open to all registered students with intermediate or advanced experience.",
        startDate: new Date("2026-03-01"),
        endDate: new Date("2026-03-20"),
        status: "upcoming" as const,
        participants: 0
    }
]

export default function Dashboard() {
    const navigate = useNavigate()
    const { isAuthenticated } = useAuth()

    const handleSubmissionClick = (submission: typeof recentSubmissions[0]) => {
        if (submission.status === "Analyzed") {
            navigate(`/report?submissionId=${submission.id}`)
        }
    }

    const formatDate = (date: Date) => {
        return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    }

    const getDaysUntil = (date: Date) => {
        const now = new Date()
        const diff = date.getTime() - now.getTime()
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return days
    }

    // Guest View
    if (!isAuthenticated) {
        return (
            <div className="flex-1 bg-[#FBFBF9] dark:bg-gray-950 min-h-screen p-6">
                <div className="w-full space-y-6">
                    {/* Hero Section */}
                    <div className="relative overflow-hidden rounded-sm bg-gradient-to-br from-primary/10 via-accent/5 to-transparent dark:from-primary/20 dark:via-accent/10 border border-primary/20 dark:border-primary/30 p-8 lg:p-12">
                        <div className="relative z-10">
                            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading mb-4">
                                Welcome to SpeedMooting
                            </h1>
                            <p className="text-lg text-gray-700 dark:text-gray-300 font-sans mb-6 max-w-2xl">
                                Enhance your advocacy skills with AI-powered feedback, comprehensive legal exercises, and active mooting competitions.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link to="/login">
                                    <Button className="bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm px-6 h-11 font-heading font-bold uppercase tracking-widest text-xs">
                                        <LogIn className="w-4 h-4 mr-2" />
                                        Sign In to Get Started
                                    </Button>
                                </Link>
                                <Link to="/tutorials">
                                    <Button variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-accent hover:border-accent hover:text-white rounded-sm px-6 h-11 font-heading font-bold uppercase tracking-widest text-xs">
                                        Browse Tutorials
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    </div>

                    {/* Active Competitions Section */}
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <div className="space-y-1">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading">Active Competitions</h2>
                                <p className="text-gray-500 dark:text-gray-400 font-sans text-xs">Join ongoing and upcoming mooting competitions</p>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mockCompetitions.map((competition, i) => {
                                const daysUntil = getDaysUntil(competition.endDate)
                                const isActive = competition.status === "active"
                                const isUpcoming = competition.status === "upcoming"
                                
                                return (
                                    <motion.div
                                        key={competition.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        <Card className="h-full rounded-sm border-gray-200 dark:border-gray-800 hover:border-accent transition-colors bg-white dark:bg-gray-900 flex flex-col group shadow-none overflow-hidden">
                                            <CardHeader className="p-5 pb-3">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-sm">
                                                        <Trophy className="w-5 h-5 text-accent" />
                                                    </div>
                                                    <Badge 
                                                        variant="outline" 
                                                        className={cn(
                                                            "rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest",
                                                            isActive && "border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
                                                            isUpcoming && "border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                                                        )}
                                                    >
                                                        {competition.status}
                                                    </Badge>
                                                </div>
                                                <CardTitle className="text-lg group-hover:text-accent transition-colors font-heading font-bold leading-tight">
                                                    {competition.name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-5 pt-0 flex-1">
                                                <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed mb-4">
                                                    {competition.description}
                                                </p>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-sans">
                                                        <Calendar className="w-3.5 h-3.5" />
                                                        <span>{formatDate(competition.startDate)} - {formatDate(competition.endDate)}</span>
                                                    </div>
                                                    {competition.participants > 0 && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 font-sans">
                                                            <Users className="w-3.5 h-3.5" />
                                                            <span>{competition.participants} participants</span>
                                                        </div>
                                                    )}
                                                    {isUpcoming && daysUntil > 0 && (
                                                        <div className="flex items-center gap-2 text-xs font-bold text-accent font-heading">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{daysUntil} days until start</span>
                                                        </div>
                                                    )}
                                                    {isActive && daysUntil > 0 && (
                                                        <div className="flex items-center gap-2 text-xs font-bold text-green-600 dark:text-green-400 font-heading">
                                                            <Clock className="w-3.5 h-3.5" />
                                                            <span>{daysUntil} days remaining</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </CardContent>
                                            <CardContent className="p-5 pt-0">
                                                <Link to="/login">
                                                    <Button variant="outline" className="w-full border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-accent hover:border-accent hover:text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-9 group/btn">
                                                        {isActive ? "Join Competition" : "Learn More"}
                                                        <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>

                    {/* Featured Tutorials Section */}
                    <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800 py-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-sm">
                                    <GraduationCap className="w-5 h-5 text-accent" />
                                </div>
                                <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Featured Tutorials</CardTitle>
                            </div>
                            <Link to="/tutorials">
                                <Button variant="ghost" size="sm" className="text-accent hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest transition-colors">
                                    Browse More
                                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                                </Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {featuredTutorials.map((tutorial, i) => {
                                    return (
                                        <motion.div
                                            key={tutorial.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                                        >
                                            <Card className="h-full rounded-sm border-gray-200 dark:border-gray-800 hover:border-accent transition-colors bg-white dark:bg-gray-900 flex flex-col group shadow-none overflow-hidden">
                                                <div className="relative w-full h-32 overflow-hidden">
                                                    <img 
                                                        src={tutorial.bannerImage} 
                                                        alt={tutorial.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                    <div className="absolute top-3 right-3">
                                                        <Badge variant="secondary" className="bg-white/90 text-gray-700 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                                            {tutorial.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <CardHeader className="p-5 pb-3">
                                                    <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight">
                                                        {tutorial.title}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-5 pt-0 flex-1">
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                                                        {tutorial.description}
                                                    </p>
                                                </CardContent>
                                                <CardContent className="p-5 pt-0">
                                                    <Link to={`/tutorials/${tutorial.id}`}>
                                                        <Button variant="outline" className="w-full border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-accent hover:border-accent hover:text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-9 group/btn">
                                                        Access Tutorial
                                                        <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Call to Action */}
                    <Card className="rounded-sm border-accent/30 dark:border-accent/20 bg-accent/5 dark:bg-accent/10 shadow-none">
                        <CardContent className="p-8 text-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-3">
                                Ready to Start Your Journey?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 font-sans mb-6 max-w-2xl mx-auto">
                                Sign in to access personalized exercises, AI-powered feedback, and track your progress.
                            </p>
                            <Link to="/login">
                                <Button className="bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm px-8 h-11 font-heading font-bold uppercase tracking-widest text-xs">
                                    <LogIn className="w-4 h-4 mr-2" />
                                    Sign In Now
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    // Authenticated View (existing content)
    return (
        <div className="flex-1 bg-[#FBFBF9] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading">Dashboard Overview</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-sans text-xs">Review your latest trial advocacy metrics and case preparation status.</p>
                    </div>
                    <Link to="/exercises">
                        <Button className="bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm px-6 h-10 font-heading font-bold uppercase tracking-widest text-[10px]">
                            Start New Exercise
                        </Button>
                    </Link>
                </div>

                {/* Redesigned Practice Suggestion as Notification */}
                <div className="bg-accent/5 border-l-2 border-accent rounded-r-sm p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-accent/10 p-2 rounded-sm">
                            <Scale className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-heading">High Priority Recommendation</h4>
                            <p className="text-sm text-gray-800 dark:text-gray-200 font-sans">Based on recent analytics, we recommend focusing on <span className="font-bold underline decoration-accent/30 underline-offset-2">Criminal Law: Mens Rea</span> to improve your performance.</p>
                        </div>
                    </div>
                    <Link to="/subjects/3">
                        <Button variant="outline" className="text-accent border-accent dark:border-accent/80 hover:bg-accent hover:text-white rounded-sm font-heading font-bold uppercase tracking-widest text-[9px] h-8 px-4 transition-colors">
                            Take Action
                        </Button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                        >
                            <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest font-heading">{stat.title}</CardTitle>
                                    <stat.icon className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-sans tabular-nums tracking-tight">{stat.value}</div>
                                    <p className="text-[10px] text-green-700 dark:text-green-400 mt-1 flex items-center gap-1 font-bold font-heading uppercase tracking-wide">
                                        <TrendingUp className="w-3 h-3" />
                                        {stat.trend}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                            <div className="flex items-center gap-3">
                                <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-sm">
                                    <FileText className="w-5 h-5 text-accent" />
                                </div>
                                <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Recent Case Practice</CardTitle>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                {recentSubmissions.map((sub, i) => (
                                    <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1), ease: [0.25, 1, 0.5, 1] }}
                                        onClick={() => handleSubmissionClick(sub)}
                                        className={cn(
                                            "p-4 transition-colors flex items-center justify-between group",
                                            sub.status === "Analyzed" ? "hover:bg-gray-50/50 dark:hover:bg-gray-800/50 cursor-pointer" : "hover:bg-gray-50/30 dark:hover:bg-gray-800/30 cursor-default"
                                        )}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-1 h-8 rounded-full",
                                                sub.status === "Analyzed" ? "bg-accent/40" : "bg-gray-200"
                                            )} />
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-900 dark:text-gray-100 group-hover:text-accent transition-colors font-heading">{sub.title}</h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono uppercase tracking-tight">{sub.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {sub.score !== "--" && (
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-gray-900 dark:text-gray-100 font-sans tabular-nums">{sub.score}</p>
                                                    <p className="text-[9px] uppercase font-bold text-gray-400 dark:text-gray-500 font-heading tracking-widest leading-none">Score</p>
                                                </div>
                                            )}
                                            <Badge variant="outline" className={cn(
                                                "rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest",
                                                sub.status === "Analyzed" ? "border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30" : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800"
                                            )}>
                                                {sub.status}
                                            </Badge>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                                <Link to="/history">
                                    <Button variant="ghost" className="w-full text-accent hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest h-9">
                                        View Full History
                                        <ChevronRight className="w-3.5 h-3.5 ml-2" />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-6 h-full">
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none flex-1 flex flex-col">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-sm">
                                        <BookOpen className="w-5 h-5 text-accent" />
                                    </div>
                                    <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Advocacy Toolkit</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2 flex-1 flex flex-col justify-center">
                                <Link to="/tutorials?tab=subjects">
                                    <Button variant="ghost" className="w-full justify-start gap-4 text-accent hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest h-9">
                                        <BookOpen className="w-4 h-4" />
                                        Legal Subject Guides
                                    </Button>
                                </Link>
                                <Link to="/tutorials/1">
                                    <Button variant="ghost" className="w-full justify-start gap-4 text-accent hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest h-9">
                                        <Video className="w-4 h-4" />
                                        Submission Checklist
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none flex-1 flex flex-col">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-sm">
                                        <Trophy className="w-5 h-5 text-accent" />
                                    </div>
                                    <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Upcoming Competitions</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent className="p-4 flex-1 flex flex-col">
                                <div className="space-y-4 mb-6 flex-1">
                                    {mockCompetitions
                                        .filter(comp => comp.status === "upcoming" || comp.status === "active")
                                        .slice(0, 2)
                                        .map((competition) => {
                                            const daysUntil = getDaysUntil(competition.endDate)
                                            const isActive = competition.status === "active"
                                            
                                            return (
                                                <div
                                                    key={competition.id}
                                                    className="p-3 rounded-sm border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 hover:border-accent transition-colors group"
                                                >
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h4 className="text-sm font-bold text-gray-900 dark:text-gray-100 font-heading group-hover:text-accent transition-colors leading-tight">
                                                            {competition.name}
                                                        </h4>
                                                        <Badge 
                                                            variant="outline" 
                                                            className={cn(
                                                                "rounded-sm px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest shrink-0",
                                                                isActive && "border-green-200 dark:border-green-800 text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30",
                                                                !isActive && "border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30"
                                                            )}
                                                        >
                                                            {competition.status}
                                                        </Badge>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                                                            <Calendar className="w-3 h-3 shrink-0" />
                                                            <span className="truncate">{formatDate(competition.startDate)} - {formatDate(competition.endDate)}</span>
                                                        </div>
                                                        {isActive && daysUntil > 0 && (
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-green-600 dark:text-green-400 font-heading">
                                                                <Clock className="w-3 h-3 shrink-0" />
                                                                <span>{daysUntil} days remaining</span>
                                                            </div>
                                                        )}
                                                        {!isActive && daysUntil > 0 && (
                                                            <div className="flex items-center gap-1.5 text-[10px] font-bold text-accent font-heading">
                                                                <Clock className="w-3 h-3 shrink-0" />
                                                                <span>{daysUntil} days until start</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )
                                        })}
                                </div>
                                {mockCompetitions.filter(comp => comp.status === "upcoming" || comp.status === "active").length > 2 && (
                                    <Link to="/">
                                        <Button variant="ghost" className="w-full text-accent hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest h-9">
                                            View All Competitions
                                            <ChevronRight className="w-3.5 h-3.5 ml-2" />
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tutorials & Guidance Section */}
                <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 dark:border-gray-800 py-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-sm">
                                <GraduationCap className="w-5 h-5 text-accent" />
                            </div>
                            <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Tutorials & Guidance</CardTitle>
                        </div>
                        <Link to="/tutorials">
                            <Button variant="ghost" size="sm" className="text-accent hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest transition-colors">
                                Browse More
                                <ChevronRight className="w-3.5 h-3.5 ml-1" />
                            </Button>
                        </Link>
                    </CardHeader>
                    <CardContent className="p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featuredTutorials.map((tutorial, i) => {
                                return (
                                    <motion.div
                                        key={tutorial.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.1, ease: [0.25, 1, 0.5, 1] }}
                                    >
                                        <Card className="h-full rounded-sm border-gray-200 dark:border-gray-800 hover:border-accent transition-colors bg-white dark:bg-gray-900 flex flex-col group shadow-none overflow-hidden">
                                            <div className="relative w-full h-32 overflow-hidden">
                                                <img 
                                                    src={tutorial.bannerImage} 
                                                    alt={tutorial.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                <div className="absolute top-3 right-3">
                                                    <Badge variant="secondary" className="bg-white/90 text-gray-700 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                                        {tutorial.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <CardHeader className="p-5 pb-3">
                                                <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight">
                                                    {tutorial.title}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-5 pt-0 flex-1">
                                                <p className="text-sm text-gray-600 dark:text-gray-300 font-sans leading-relaxed">
                                                    {tutorial.description}
                                                </p>
                                            </CardContent>
                                            <CardContent className="p-5 pt-0">
                                                <Link to={`/tutorials/${tutorial.id}`}>
                                                    <Button variant="outline" className="w-full border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-accent hover:border-accent hover:text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-9 group/btn">
                                                        Access Tutorial
                                                        <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
