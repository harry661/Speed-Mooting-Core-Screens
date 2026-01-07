import { motion } from "framer-motion"
import { useState, useMemo } from "react"
import { Search, BookOpen, ChevronRight, Star, Clock, TrendingUp, Filter, Sparkles, Users, Award } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import { cn } from "@/lib/utils"

const exercises = [
    { 
        id: 1, 
        title: "Contract Breach - Offer & Acceptance", 
        subject: "Contract Law", 
        difficulty: "Beginner" as const, 
        time: "15 mins", 
        rating: 4.8,
        attempts: 1247,
        completions: 892,
        recommended: true,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        description: "A comprehensive exercise examining the fundamental principles of contract formation, focusing on the elements of offer, acceptance, and consideration in a commercial dispute context."
    },
    { 
        id: 2, 
        title: "Negligence Case - Duty of Care", 
        subject: "Tort Law", 
        difficulty: "Intermediate" as const, 
        time: "20 mins", 
        rating: 4.5,
        attempts: 856,
        completions: 623,
        recommended: false,
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        description: "An intermediate-level exercise exploring the duty of care in negligence, examining the neighbor principle and the modern approach to establishing duty in novel situations."
    },
    { 
        id: 3, 
        title: "Criminal Law - Mens Rea", 
        subject: "Criminal Law", 
        difficulty: "Beginner" as const, 
        time: "12 mins", 
        rating: 4.9,
        attempts: 2103,
        completions: 1654,
        recommended: true,
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        description: "A beginner-friendly exercise focusing on the mental element in criminal law, examining different levels of mens rea and their application to various offenses."
    },
    { 
        id: 4, 
        title: "Constitutional Review", 
        subject: "Public Law", 
        difficulty: "Advanced" as const, 
        time: "30 mins", 
        rating: 4.7,
        attempts: 432,
        completions: 287,
        recommended: false,
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        description: "An advanced exercise examining judicial review principles, separation of powers, and constitutional interpretation in public law disputes."
    },
    { 
        id: 5, 
        title: "Property Dispute - Easements", 
        subject: "Property Law", 
        difficulty: "Intermediate" as const, 
        time: "25 mins", 
        rating: 4.2,
        attempts: 678,
        completions: 445,
        recommended: false,
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        description: "An intermediate exercise exploring easements, rights of way, and property disputes involving land use and access rights."
    },
    { 
        id: 6, 
        title: "Evidence Admissibility", 
        subject: "Litigation", 
        difficulty: "Advanced" as const, 
        time: "15 mins", 
        rating: 4.6,
        attempts: 543,
        completions: 389,
        recommended: false,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        description: "An advanced exercise focusing on the rules of evidence, admissibility of evidence, and the exclusionary rules in civil and criminal proceedings."
    },
]

const getDifficultyColor = (difficulty: "Beginner" | "Intermediate" | "Advanced") => {
    switch (difficulty) {
        case "Beginner":
            return "bg-green-100 text-green-700 border-green-200"
        case "Intermediate":
            return "bg-amber-100 text-amber-700 border-amber-200"
        case "Advanced":
            return "bg-red-100 text-red-700 border-red-200"
    }
}

export default function ExerciseLibrary() {
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedSubject, setSelectedSubject] = useState<string>("all")
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all")
    const [sortBy, setSortBy] = useState<string>("rating")

    const recommendedExercises = exercises.filter(ex => ex.recommended)
    const allSubjects = Array.from(new Set(exercises.map(ex => ex.subject)))

    const filteredAndSortedExercises = useMemo(() => {
        let filtered = exercises.filter(ex => {
            const matchesSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 ex.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                 ex.subject.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesSubject = selectedSubject === "all" || ex.subject === selectedSubject
            const matchesDifficulty = selectedDifficulty === "all" || ex.difficulty === selectedDifficulty
            
            return matchesSearch && matchesSubject && matchesDifficulty
        })

        // Sort exercises
        filtered.sort((a, b) => {
            switch (sortBy) {
                case "rating":
                    return b.rating - a.rating
                case "popularity":
                    return b.attempts - a.attempts
                case "difficulty":
                    const difficultyOrder = { "Beginner": 1, "Intermediate": 2, "Advanced": 3 }
                    return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
                case "time":
                    return parseInt(a.time) - parseInt(b.time)
                default:
                    return 0
            }
        })

        return filtered
    }, [searchQuery, selectedSubject, selectedDifficulty, sortBy])

    return (
        <div className="flex-1 bg-[#fcf8f8] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading">Exercise Library</h2>
                        <p className="text-gray-500 dark:text-gray-400 text-xs font-sans mt-1">Browse and select legal scenarios for mooting practice.</p>
                    </div>
                </div>

                {/* Recommended Section */}
                {recommendedExercises.length > 0 && (
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-accent" />
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-heading">Recommended for You</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {recommendedExercises.map((ex, i) => (
                                <motion.div
                                    key={ex.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Card className="h-full rounded-sm border-2 border-accent/30 dark:border-accent/50 hover:border-accent transition-colors bg-white dark:bg-gray-900 flex flex-col group shadow-none overflow-hidden relative">
                                        <div className="absolute top-3 right-3 z-10">
                                            <Badge className="bg-accent text-white border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                                Recommended
                                            </Badge>
                                        </div>
                                        <div className="relative w-full h-32 overflow-hidden">
                                            <img 
                                                src={ex.bannerImage} 
                                                alt={ex.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        </div>
                                        <CardHeader className="p-5 pb-3">
                                            <div className="flex items-center justify-between mb-3">
                                                <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                                    {ex.subject}
                                                </Badge>
                                                <Badge className={cn("px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest border", getDifficultyColor(ex.difficulty))}>
                                                    {ex.difficulty}
                                                </Badge>
                                            </div>
                                            <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight text-gray-900 dark:text-gray-100">
                                                {ex.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="p-5 pt-0 flex-1">
                                            <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mb-4 leading-relaxed line-clamp-2">
                                                {ex.description}
                                            </p>
                                            <div className="flex items-center gap-4 text-[11px] text-gray-400 dark:text-gray-500 font-sans mb-3">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {ex.time}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-3.5 h-3.5" />
                                                    {ex.attempts} attempts
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex items-center gap-1 text-[11px] font-bold text-accent">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    {ex.rating}
                                                </div>
                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 font-sans">
                                                    ({ex.completions} completed)
                                                </div>
                                            </div>
                                        </CardContent>
                                        <CardFooter className="p-5 pt-0">
                                            <Link to={`/exercises/${ex.id}`} className="w-full">
                                                <Button variant="outline" className="w-full border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-accent hover:border-accent hover:text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-11 group/btn">
                                                    View Details
                                                    <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                </Button>
                                            </Link>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Filters and Search */}
                                <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                    <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-1 relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                                <Input
                                    placeholder="Search exercises..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10 border-gray-200 dark:border-gray-700 rounded-sm h-10 font-sans text-sm bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm h-10 font-sans text-xs text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="All Subjects" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-800 shadow-none bg-white dark:bg-gray-900">
                                    <SelectItem value="all">All Subjects</SelectItem>
                                    {allSubjects.map(subject => (
                                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                                <SelectTrigger className="w-[160px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm h-10 font-sans text-xs text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="All Difficulties" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-800 shadow-none bg-white dark:bg-gray-900">
                                    <SelectItem value="all">All Difficulties</SelectItem>
                                    <SelectItem value="Beginner">Beginner</SelectItem>
                                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                                    <SelectItem value="Advanced">Advanced</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select value={sortBy} onValueChange={setSortBy}>
                                <SelectTrigger className="w-[160px] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 rounded-sm h-10 font-sans text-xs text-gray-900 dark:text-gray-100">
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent className="rounded-sm border-gray-200 dark:border-gray-800 shadow-none bg-white dark:bg-gray-900">
                                    <SelectItem value="rating">Highest Rated</SelectItem>
                                    <SelectItem value="popularity">Most Popular</SelectItem>
                                    <SelectItem value="difficulty">Difficulty</SelectItem>
                                    <SelectItem value="time">Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* All Exercises Grid */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-heading">
                            All Exercises ({filteredAndSortedExercises.length})
                        </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAndSortedExercises.map((ex, i) => (
                            <motion.div
                                key={ex.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                            >
                                <Card className="h-full rounded-sm border-gray-200 dark:border-gray-800 hover:border-accent transition-colors bg-white dark:bg-gray-900 flex flex-col group shadow-none overflow-hidden">
                                    <div className="relative w-full h-32 overflow-hidden">
                                        <img 
                                            src={ex.bannerImage} 
                                            alt={ex.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                        <div className="absolute top-3 left-3">
                                            <Badge className={cn("px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest border", getDifficultyColor(ex.difficulty))}>
                                                {ex.difficulty}
                                            </Badge>
                                        </div>
                                        <div className="absolute top-3 right-3">
                                            <div className="flex items-center gap-1 bg-black/50 backdrop-blur-sm px-2 py-1 rounded-sm">
                                                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                                <span className="text-[10px] font-bold text-white">{ex.rating}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <CardHeader className="p-5 pb-3">
                                        <div className="flex items-center justify-between mb-3">
                                            <Badge variant="secondary" className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                                {ex.subject}
                                            </Badge>
                                            {ex.attempts > 1000 && (
                                                <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                                    <TrendingUp className="w-3 h-3 mr-1" />
                                                    Popular
                                                </Badge>
                                            )}
                                        </div>
                                        <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight text-gray-900 dark:text-gray-100">
                                            {ex.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="p-5 pt-0 flex-1">
                                        <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mb-4 leading-relaxed line-clamp-3">
                                            {ex.description}
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-4 text-[11px] text-gray-400 dark:text-gray-500 font-sans">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock className="w-3.5 h-3.5" />
                                                    {ex.time}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Users className="w-3.5 h-3.5" />
                                                    {ex.attempts} attempts
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center gap-1 text-[11px] font-bold text-accent">
                                                    <Star className="w-3.5 h-3.5 fill-current" />
                                                    {ex.rating}
                                                </div>
                                                <div className="text-[10px] text-gray-400 dark:text-gray-500 font-sans">
                                                    {ex.completions} completed
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-5 pt-0">
                                        <Link to={`/exercises/${ex.id}`} className="w-full">
                                            <Button variant="outline" className="w-full border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 hover:bg-accent hover:border-accent hover:text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-11 group/btn">
                                                View Details
                                                <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                    </CardFooter>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    {filteredAndSortedExercises.length === 0 && (
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardContent className="p-12 text-center">
                                <Search className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-heading mb-2">No exercises found</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 font-sans">Try adjusting your filters or search query.</p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}
