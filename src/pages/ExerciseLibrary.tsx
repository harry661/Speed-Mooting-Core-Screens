import { motion } from "framer-motion"
import { Search, BookOpen, ChevronRight, Star } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Link } from "react-router-dom"

const exercises = [
    { id: 1, title: "Contract Breach - Offer & Acceptance", subject: "Contract Law", difficulty: "Beginner", time: "15 mins", rating: 4.8 },
    { id: 2, title: "Negligence Case - Duty of Care", subject: "Tort Law", difficulty: "Intermediate", time: "20 mins", rating: 4.5 },
    { id: 3, title: "Criminal Law - Mens Rea", subject: "Criminal Law", difficulty: "Beginner", time: "12 mins", rating: 4.9 },
    { id: 4, title: "Constitutional Review", subject: "Public Law", difficulty: "Advanced", time: "30 mins", rating: 4.7 },
    { id: 5, title: "Property Dispute - Easedments", subject: "Property Law", difficulty: "Intermediate", time: "25 mins", rating: 4.2 },
    { id: 6, title: "Evidence Admissibility", subject: "Litigation", difficulty: "Advanced", time: "15 mins", rating: 4.6 },
]

export default function ExerciseLibrary() {
    return (
        <div className="flex-1 bg-background min-h-screen p-6">
            <div className="w-full space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-heading">Exercise Library</h2>
                        <p className="text-gray-500 text-xs font-sans">Browse and select legal scenarios for mooting practice.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                placeholder="Search cases..."
                                className="w-full pl-10 pr-4 py-2 rounded-sm border border-gray-200 bg-white focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-sans"
                            />
                        </div>
                        <Select>
                            <SelectTrigger className="w-[180px] bg-white border-gray-200 rounded-sm h-10 font-sans text-xs">
                                <SelectValue placeholder="All Subjects" />
                            </SelectTrigger>
                            <SelectContent className="rounded-sm border-gray-200 shadow-none">
                                <SelectItem value="all">All Subjects</SelectItem>
                                <SelectItem value="contract">Contract Law</SelectItem>
                                <SelectItem value="tort">Tort Law</SelectItem>
                                <SelectItem value="criminal">Criminal Law</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {/* Exercises Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {exercises.map((ex, i) => (
                        <motion.div
                            key={ex.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                        >
                            <Card className="h-full rounded-sm border-gray-200 hover:border-accent transition-colors bg-white flex flex-col group shadow-none">
                                <CardHeader className="p-5 pb-3">
                                    <div className="flex items-center justify-between mb-3">
                                        <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                            {ex.subject}
                                        </Badge>
                                        <div className="flex items-center gap-1 text-[11px] font-bold text-accent">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            {ex.rating}
                                        </div>
                                    </div>
                                    <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight">
                                        {ex.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-5 pt-0 flex-1">
                                    <div className="flex items-center gap-4 text-[11px] text-gray-400 font-sans uppercase font-bold tracking-wider">
                                        <div className="flex items-center gap-1.5">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {ex.difficulty}
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Search className="w-3.5 h-3.5" />
                                            {ex.time}
                                        </div>
                                    </div>
                                </CardContent>
                                <CardFooter className="p-5 pt-0">
                                    <Link to="/submit" className="w-full">
                                        <Button className="w-full bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-11 group/btn">
                                            Start Exercise
                                            <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}
