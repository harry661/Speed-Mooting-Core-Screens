import { motion } from "framer-motion"
import { Search, Bell, Clock, TrendingUp, BookOpen, Video, Scale, ChevronLeft, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"
import { useSidebar } from "@/components/Layout"

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

export default function Dashboard() {
    const { isCollapsed, setIsCollapsed } = useSidebar()
    
    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen">
            <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
                <div className="flex items-center gap-3 flex-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="bg-transparent border border-gray-300 rounded w-8 h-8 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                    >
                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
                    </Button>
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            placeholder="Search exercises or submissions..."
                            className="w-full pl-10 pr-4 py-2 rounded-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-sans"
                        />
                    </div>
                </div>

                <div className="flex items-center gap-6">
                    <button className="relative text-gray-500 hover:text-[#00524d] transition-colors">
                        <Bell className="w-6 h-6" />
                        <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900">Alex Thompson</p>
                            <p className="text-xs text-gray-500">Student Advocate</p>
                        </div>
                        <Avatar className="border-2 border-[#00524d]/10">
                            <AvatarImage src="https://github.com/shadcn.png" />
                            <AvatarFallback>AT</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </header>

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
                <div className="bg-white border-l-4 border-accent p-4 flex items-center justify-between shadow-none ring-1 ring-gray-100">
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
                                <Button variant="outline" className="w-full justify-start gap-4 border-gray-200 hover:border-accent hover:text-accent font-heading font-bold text-[10px] uppercase tracking-widest h-11 rounded-sm group transition-all">
                                    <BookOpen className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Legal Subject Guides
                                </Button>
                                <Button variant="outline" className="w-full justify-start gap-4 border-gray-200 hover:border-accent hover:text-accent font-heading font-bold text-[10px] uppercase tracking-widest h-11 rounded-sm group transition-all">
                                    <Video className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Submission Checklist
                                </Button>
                            </CardContent>
                        </Card>

                        <div className="rounded-sm border-l-4 border-primary bg-primary/5 p-5">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary font-heading mb-1">Upcoming Milestone</h4>
                            <p className="text-sm font-bold text-gray-900 font-heading">Internal Mooting Competition</p>
                            <div className="flex items-center gap-2 mt-2">
                                <Clock className="w-3 h-3 text-primary" />
                                <span className="text-[11px] text-primary font-bold font-sans">12 Jan – 3 Days Left</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
