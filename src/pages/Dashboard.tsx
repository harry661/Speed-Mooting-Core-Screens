import { motion } from "framer-motion"
import { Clock, TrendingUp, BookOpen, Video, Scale, FileText, MessageSquare, GraduationCap, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

const stats = [
    { title: "Total Submissions", value: "12", icon: Clock, trend: "+2 this month", color: "text-blue-600" },
    { title: "Average Score", value: "78%", icon: TrendingUp, trend: "+5% improvment", color: "text-green-600" },
    { title: "Active Exercises", value: "4", icon: BookOpen, trend: "2 ending soon", color: "text-orange-600" },
]

const recentSubmissions = [
    { id: 1, title: "Contract Breach - Offer & Acceptance", date: "2 hours ago", score: "82", status: "Analyzed" },
    { id: 2, title: "Negligence Case - Duty of Care", date: "Yesterday", score: "74", status: "Analyzed" },
    { id: 3, title: "Criminal Law - Mens Rea", date: "3 days ago", score: "--", status: "Processing" },
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

export default function Dashboard() {
    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen">
            <main className="p-6 space-y-6 w-full">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-heading">Dashboard Overview</h2>
                        <p className="text-gray-500 font-sans text-xs">Review your latest trial advocacy metrics and case preparation status.</p>
                    </div>
                    <Link to="/exercises">
                        <Button className="bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm px-6 h-10 font-heading font-bold uppercase tracking-widest text-[10px]">
                            Start New Exercise
                        </Button>
                    </Link>
                </div>

                {/* Redesigned Practice Suggestion as Notification */}
                <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-accent/10 p-2 rounded-sm">
                            <Scale className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-heading">High Priority Recommendation</h4>
                            <p className="text-sm text-gray-800 font-sans">Based on recent analytics, we recommend focusing on <span className="font-bold underline decoration-accent/30 underline-offset-2">Criminal Law: Mens Rea</span> to improve your performance.</p>
                        </div>
                    </div>
                    <Button variant="outline" className="text-accent border-accent hover:bg-accent/5 rounded-sm font-heading font-bold uppercase tracking-widest text-[9px] h-8 px-4">
                        Take Action
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                                <CardHeader className="flex flex-row items-center justify-between pb-2">
                                    <CardTitle className="text-[10px] font-bold text-gray-400 uppercase tracking-widest font-heading">{stat.title}</CardTitle>
                                    <stat.icon className={cn("w-4 h-4", stat.color)} />
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-gray-900 font-sans tabular-nums tracking-tight">{stat.value}</div>
                                    <p className="text-[10px] text-green-700 mt-1 flex items-center gap-1 font-bold font-heading uppercase tracking-wide">
                                        <TrendingUp className="w-3 h-3" />
                                        {stat.trend}
                                    </p>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-2 rounded-sm border-gray-200 bg-white shadow-none">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
                            <CardTitle className="text-base font-bold font-heading">Recent Case Practice</CardTitle>
                            <Link to="/report">
                                <Button variant="ghost" size="sm" className="text-accent hover:bg-accent/5 font-heading font-bold text-[10px] uppercase tracking-widest">Full History</Button>
                            </Link>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="divide-y divide-gray-100">
                                {recentSubmissions.map((sub, i) => (
                                    <motion.div
                                        key={sub.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.3 + (i * 0.1) }}
                                        className="p-4 hover:bg-gray-50/50 transition-colors flex items-center justify-between group"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={cn(
                                                "w-1 h-8 rounded-full",
                                                sub.status === "Analyzed" ? "bg-accent/40" : "bg-gray-200"
                                            )} />
                                            <div>
                                                <h4 className="font-bold text-sm text-gray-900 group-hover:text-accent transition-colors font-heading">{sub.title}</h4>
                                                <p className="text-xs text-gray-500 font-sans uppercase tracking-tight">{sub.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            {sub.score !== "--" && (
                                                <div className="text-right">
                                                    <p className="text-lg font-bold text-gray-900 font-sans tabular-nums">{sub.score}</p>
                                                    <p className="text-[9px] uppercase font-bold text-gray-400 font-heading tracking-widest leading-none">Score</p>
                                                </div>
                                            )}
                                            <Badge variant="outline" className={cn(
                                                "rounded-sm px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest",
                                                sub.status === "Analyzed" ? "border-green-200 text-green-700 bg-green-50" : "border-gray-200 text-gray-500 bg-gray-50"
                                            )}>
                                                {sub.status}
                                            </Badge>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-6">
                        <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                            <CardHeader className="border-b border-gray-100 py-4">
                                <CardTitle className="text-base font-bold font-heading">Advocacy Toolkit</CardTitle>
                            </CardHeader>
                            <CardContent className="p-4 space-y-2">
                                <Button variant="outline" className="w-full justify-start gap-4 border-gray-200 text-gray-700 hover:bg-accent hover:border-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest h-11 rounded-sm group transition-all">
                                    <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Legal Subject Guides
                                </Button>
                                <Button variant="outline" className="w-full justify-start gap-4 border-gray-200 text-gray-700 hover:bg-accent hover:border-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest h-11 rounded-sm group transition-all">
                                    <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Submission Checklist
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="rounded-r-xl border-l-4 border-primary bg-primary/5 p-5">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary font-heading mb-1">Upcoming Milestone</h4>
                            <p className="text-sm font-bold text-gray-900 font-heading">Internal Mooting Competition</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Clock className="w-3 h-3 text-primary" />
                                <span className="text-[11px] text-primary font-bold font-sans">12 Jan – 3 Days Left</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tutorials & Guidance Section */}
                <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-gray-100 py-4">
                        <div className="flex items-center gap-3">
                            <div className="bg-accent/10 p-2 rounded-sm">
                                <GraduationCap className="w-5 h-5 text-accent" />
                            </div>
                            <CardTitle className="text-base font-bold font-heading">Tutorials & Guidance</CardTitle>
                        </div>
                        <Link to="/tutorials">
                            <Button variant="ghost" size="sm" className="text-accent hover:bg-accent/5 font-heading font-bold text-[10px] uppercase tracking-widest">
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
                                        transition={{ delay: i * 0.1 }}
                                    >
                                        <Card className="h-full rounded-sm border-gray-200 hover:border-accent transition-colors bg-white flex flex-col group shadow-sm overflow-hidden">
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
                                                <p className="text-sm text-gray-600 font-sans leading-relaxed">
                                                    {tutorial.description}
                                                </p>
                                            </CardContent>
                                            <CardContent className="p-5 pt-0">
                                                <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-accent hover:border-accent hover:text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-9 group/btn">
                                                    Access Tutorial
                                                    <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
