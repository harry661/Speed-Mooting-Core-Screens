import { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, Download, FileText, CheckCircle2, AlertTriangle, Info, Play, MessageSquare, Briefcase, Calendar, BookOpen, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams, useNavigate } from "react-router-dom"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { reportDataMap } from "@/data/reports"

export default function AIFeedbackReport() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [isExporting, setIsExporting] = useState(false)
    const [isDeductionsOpen, setIsDeductionsOpen] = useState(false)
    const submissionId = searchParams.get("submissionId")
    const fromHistory = submissionId !== null

    // Get report data based on submissionId, default to submission 2 (B+ example)
    const reportData = useMemo(() => {
        const id = submissionId ? parseInt(submissionId) : 2
        return reportDataMap[id] || reportDataMap[2]
    }, [submissionId])

    const {
        submissionData,
        coreRubricScores,
        additionalRubricScores,
        deductions,
        strengths,
        suggestedImprovements,
        transcript: transcriptData,
        summary
    } = reportData

    const handleBack = () => {
        if (fromHistory) {
            navigate("/history")
        } else {
            navigate("/")
        }
    }

    const handleExportPDF = async () => {
        setIsExporting(true)
        // Simulate PDF generation
        await new Promise(resolve => setTimeout(resolve, 2000))
        setIsExporting(false)
        toast.success("PDF exported successfully", {
            description: "Your report has been downloaded."
        })
    }

    const totalDeductions = deductions.reduce((sum, d) => sum + d.points, 0)
    
    // Calculate progress wheel animation values
    const circumference = 2 * Math.PI * 80 // r = 80
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (circumference * submissionData.overallScore / 100)

    return (
        <div className="flex-1 bg-[#FBFBF9] dark:bg-gray-950 min-h-screen p-6">
            <motion.div 
                className="w-full space-y-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        onClick={handleBack}
                        className="gap-2 text-primary dark:text-gray-300 hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest px-3 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> {fromHistory ? "Back to History" : "Back to Dashboard"}
                    </Button>
                    <div className="flex gap-3">
                        <Button 
                            variant="outline" 
                            onClick={handleExportPDF}
                            disabled={isExporting}
                            className="gap-2 border-gray-200 dark:border-gray-800 font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none"
                        >
                            {isExporting ? (
                                <>
                                    <Loader2 className="w-3.5 h-3.5 animate-spin" /> Exporting...
                                </>
                            ) : (
                                <>
                            <Download className="w-3.5 h-3.5" /> Export PDF
                                </>
                            )}
                        </Button>
                        <Button className="bg-accent hover:bg-accent/90 text-white font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none px-6">Share Report</Button>
                    </div>
                </div>

                {/* Submission Metadata */}
                <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                    <CardContent className="p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <BookOpen className="w-4 h-4 text-primary dark:text-gray-300" />
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading">{submissionData.exerciseName}</h1>
                                </div>
                                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-600 dark:text-gray-300 font-sans">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3.5 h-3.5" />
                                        <span>{submissionData.submissionDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>
                                    <Badge variant="outline" className="text-[9px] font-heading font-bold uppercase tracking-widest border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 px-1.5 py-0">
                                        Version {submissionData.version}
                                    </Badge>
                                    <Badge className="text-[10px] font-heading font-semibold uppercase tracking-wider px-2 py-0.5 border bg-accent/10 dark:bg-accent/20 text-accent dark:text-accent/90 border-accent/20 dark:border-accent/40">
                                        {submissionData.subject}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Overall Score Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-1 rounded-sm border-none bg-primary text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white dark:bg-gray-900/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <CardContent className="p-8 text-center relative z-10">
                            <p className="text-white/40 uppercase font-bold tracking-[0.2em] text-[10px] mb-2 font-heading">Performance Audit</p>
                            <p className="text-white/60 text-[9px] mb-6 font-sans">Score based on adherence to guidelines</p>
                            <div className="relative inline-block scale-110">
                                <svg className="w-48 h-48">
                                    <circle className="text-white/10" strokeWidth="10" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                                    <motion.circle
                                        className="text-accent"
                                        strokeWidth="10"
                                        strokeDasharray={strokeDasharray}
                                        strokeDashoffset={strokeDasharray}
                                        strokeLinecap="square"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="80"
                                        cx="96"
                                        cy="96"
                                        initial={{ strokeDashoffset: strokeDasharray }}
                                        animate={{ strokeDashoffset: strokeDashoffset }}
                                        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                                    />
                                </svg>
                                <motion.div 
                                    className="absolute inset-0 flex flex-col items-center justify-center"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                >
                                    <span className="text-6xl font-bold font-heading tracking-tighter tabular-nums">{submissionData.overallScore}</span>
                                    <span className="text-white/40 font-heading text-[10px] font-bold uppercase tracking-widest mt-1">Grade ({submissionData.grade})</span>
                                </motion.div>
                            </div>
                            <div className="mt-6 space-y-2">
                                <p className="text-sm text-white font-heading font-bold italic leading-relaxed px-4">"{summary}"</p>
                                {totalDeductions < 0 && (
                                    <div className="pt-2 border-t border-white/10">
                                        <p className="text-[10px] text-white/60 font-sans mb-1">Total Deductions</p>
                                        <p className="text-lg font-bold font-heading tabular-nums text-red-200">{totalDeductions} points</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Rubric Breakdown */}
                    <Card className="lg:col-span-2 rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardHeader className="border-b border-gray-100 dark:border-gray-800 p-5">
                            <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Rubric Component Analysis</CardTitle>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1">Breakdown based on Clarity, Persuasiveness, and Structure criteria</p>
                        </CardHeader>
                        <CardContent className="p-6 space-y-5">
                            {/* Core Criteria */}
                            <div className="space-y-5">
                                {coreRubricScores.map((rubric, index) => (
                                    <motion.div 
                                        key={rubric.label} 
                                        className="space-y-2"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }}
                                    >
                                        <div className="flex justify-between items-end">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100 font-heading uppercase tracking-wide">{rubric.label}</span>
                                                    {rubric.deduction < 0 && (
                                                        <Badge variant="outline" className="text-[9px] font-bold border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-1.5 py-0">
                                                            {rubric.deduction} pts
                                                        </Badge>
                                                    )}
                                                </div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-0.5">{rubric.description}</p>
                                            </div>
                                            <span className="font-bold text-accent font-sans tabular-nums ml-4">{rubric.value}%</span>
                                        </div>
                                        <div className="relative h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-accent rounded-full"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${rubric.value}%` }}
                                                transition={{ duration: 0.8, delay: 0.3 + (index * 0.1), ease: "easeOut" }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional Criteria */}
                            {additionalRubricScores.length > 0 && (
                                <>
                                    <div className="border-t border-gray-100 dark:border-gray-800 pt-5 mt-5">
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest font-heading mb-4">Additional Criteria</p>
                                        <div className="space-y-5">
                                            {additionalRubricScores.map((rubric, index) => (
                                                <motion.div 
                                                    key={rubric.label} 
                                                    className="space-y-2"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                                                >
                                    <div className="flex justify-between items-end">
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-2">
                                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100 font-heading uppercase tracking-wide">{rubric.label}</span>
                                                                {rubric.deduction < 0 && (
                                                                    <Badge variant="outline" className="text-[9px] font-bold border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-1.5 py-0">
                                                                        {rubric.deduction} pts
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-0.5">{rubric.description}</p>
                                                        </div>
                                                        <span className="font-bold text-accent font-sans tabular-nums ml-4">{rubric.value}%</span>
                                                    </div>
                                                    <div className="relative h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                                        <motion.div
                                                            className="h-full bg-accent rounded-full"
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${rubric.value}%` }}
                                                            transition={{ duration: 0.8, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                                                        />
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Deductions Section */}
                {deductions.length > 0 && (
                    <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardHeader 
                            onClick={() => setIsDeductionsOpen(!isDeductionsOpen)}
                            className="border-b border-gray-100 dark:border-gray-800 p-5 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-colors group"
                        >
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                    <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Specific Deductions</CardTitle>
                                    <Badge variant="outline" className="text-[9px] font-bold border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30 px-1.5 py-0">
                                        {deductions.length} {deductions.length === 1 ? 'deduction' : 'deductions'}
                                    </Badge>
                                </div>
                                {isDeductionsOpen ? (
                                    <ChevronUp className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:text-gray-300 transition-colors" />
                                ) : (
                                    <ChevronDown className="w-6 h-6 text-gray-400 group-hover:text-gray-600 dark:text-gray-300 transition-colors" />
                                )}
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1">Point deductions with detailed explanations</p>
                        </CardHeader>
                        <AnimatePresence>
                            {isDeductionsOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <CardContent className="p-5">
                                        <div className="space-y-3">
                                            {deductions.map((deduction, index) => (
                                    <div 
                                        key={index}
                                        className={cn(
                                            "p-4 rounded-r-xl border-l-4 flex gap-4",
                                            deduction.severity === "high" && "bg-red-50 dark:bg-red-900/30 border-red-300 dark:border-red-700",
                                            deduction.severity === "medium" && "bg-amber-50 dark:bg-amber-900/30 border-amber-300 dark:border-amber-700",
                                            deduction.severity === "low" && "bg-yellow-50 dark:bg-yellow-900/30 border-yellow-300 dark:border-yellow-700"
                                        )}
                                    >
                                        <div className={cn(
                                            "p-2 rounded-sm border h-fit",
                                            deduction.severity === "high" && "bg-white dark:bg-gray-900 border-red-100 dark:border-red-800 text-red-600 dark:text-red-400",
                                            deduction.severity === "medium" && "bg-white dark:bg-gray-900 border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400",
                                            deduction.severity === "low" && "bg-white dark:bg-gray-900 border-yellow-100 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400"
                                        )}>
                                            <AlertTriangle className="w-4 h-4" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                                <Badge className={cn(
                                                    "text-[10px] font-bold border-none",
                                                    deduction.severity === "high" && "bg-red-600 text-white",
                                                    deduction.severity === "medium" && "bg-amber-600 text-white",
                                                    deduction.severity === "low" && "bg-yellow-600 text-white"
                                                )}>
                                                    {deduction.category}
                                                </Badge>
                                                <Badge variant="outline" className="text-[10px] font-bold border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-900/30">
                                                    {deduction.points} points
                                                </Badge>
                                                <span className="text-xs text-gray-500 dark:text-gray-400 font-sans">@ {deduction.timestamp}</span>
                                            </div>
                                            <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans">{deduction.description}</p>
                                        </div>
                                    </div>
                                ))}
                                        </div>
                                    </CardContent>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Card>
                )}

                {/* Analysis Tabs */}
                <Tabs defaultValue="insights" className="w-full">
                    <TabsList className="bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-sm border border-gray-100 dark:border-gray-800">
                        <TabsTrigger value="insights" className="rounded-sm px-8 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:border-2 dark:data-[state=active]:border-gray-600 data-[state=active]:text-primary dark:data-[state=active]:text-white dark:data-[state=active]:shadow-sm font-heading font-bold text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-400 transition-all">AI Insights</TabsTrigger>
                        <TabsTrigger value="transcript" className="rounded-sm px-8 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:border-2 dark:data-[state=active]:border-gray-600 data-[state=active]:text-primary dark:data-[state=active]:text-white dark:data-[state=active]:shadow-sm font-heading font-bold text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-400 transition-all">Transcript</TabsTrigger>
                        <TabsTrigger value="accuracy" className="rounded-sm px-8 py-2 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 dark:data-[state=active]:border-2 dark:data-[state=active]:border-gray-600 data-[state=active]:text-primary dark:data-[state=active]:text-white dark:data-[state=active]:shadow-sm font-heading font-bold text-[10px] uppercase tracking-widest text-gray-700 dark:text-gray-400 transition-all">Correctness Check</TabsTrigger>
                    </TabsList>

                    <TabsContent value="insights" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-green-700 dark:text-green-400 font-heading uppercase tracking-wide">
                                        <CheckCircle2 className="w-4 h-4" /> Key Strengths
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-5 space-y-3">
                                    {strengths.map((strength, index) => {
                                        const IconComponent = strength.icon
                                        return (
                                            <div key={index} className="p-4 bg-green-50/50 dark:bg-green-900/30 border-l-2 border-green-200 dark:border-green-700 rounded-r-xl flex gap-4">
                                        <div className="bg-white dark:bg-gray-900 p-2 rounded-sm border border-green-100 dark:border-green-800 h-fit text-green-600 dark:text-green-400">
                                                    <IconComponent className="w-4 h-4" />
                                        </div>
                                                <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed font-sans mt-0.5">{strength.text}</p>
                                    </div>
                                        )
                                    })}
                                </CardContent>
                            </Card>

                            <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                                <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700 dark:text-amber-400 font-heading uppercase tracking-wide">
                                        <AlertTriangle className="w-4 h-4" /> Suggested Improvements
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-5 space-y-3">
                                    {suggestedImprovements.map((improvement, index) => (
                                        <div 
                                            key={index}
                                            className={cn(
                                                "p-4 border-l-2 rounded-r-xl flex gap-4",
                                                improvement.priority === "high" && "bg-red-50/50 dark:bg-red-900/30 border-red-200 dark:border-red-700",
                                                improvement.priority === "medium" && "bg-amber-50/50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700",
                                                improvement.priority === "low" && "bg-yellow-50/50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-700"
                                            )}
                                        >
                                            <div className={cn(
                                                "bg-white dark:bg-gray-900 p-2 rounded-sm border h-fit",
                                                improvement.priority === "high" && "border-red-100 dark:border-red-800 text-red-600 dark:text-red-400",
                                                improvement.priority === "medium" && "border-amber-100 dark:border-amber-800 text-amber-600 dark:text-amber-400",
                                                improvement.priority === "low" && "border-yellow-100 dark:border-yellow-800 text-yellow-600 dark:text-yellow-400"
                                            )}>
                                                <AlertTriangle className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 font-heading">{improvement.title}</h4>
                                                    <Badge className={cn(
                                                        "text-[9px] font-bold border-none",
                                                        improvement.priority === "high" && "bg-red-600 text-white",
                                                        improvement.priority === "medium" && "bg-amber-600 text-white",
                                                        improvement.priority === "low" && "bg-yellow-600 text-white"
                                                    )}>
                                                        {improvement.priority.toUpperCase()}
                                                    </Badge>
                                                </div>
                                                <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed font-sans mb-2">{improvement.description}</p>
                                                <div className="bg-white dark:bg-gray-900/80 p-2 rounded-sm border border-gray-200 dark:border-gray-800">
                                                    <p className="text-[10px] font-semibold text-gray-900 dark:text-gray-100 font-sans mb-1">Action:</p>
                                                    <p className="text-xs text-gray-700 dark:text-gray-200 leading-relaxed font-sans">{improvement.action}</p>
                                        </div>
                                                {improvement.timestamp && (
                                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-sans mt-1.5">Reference: {improvement.timestamp}</p>
                                                )}
                                    </div>
                                        </div>
                                    ))}
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="transcript" className="mt-6">
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none overflow-hidden">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 p-5">
                                <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Full Video Transcript</CardTitle>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1">Complete transcription with timestamps and AI insights</p>
                            </CardHeader>
                            <ScrollArea className="h-[600px] w-full">
                                <div className="divide-y divide-gray-100 dark:divide-gray-800 px-8 py-4">
                                    {transcriptData.map((item, i) => (
                                        <div 
                                            key={i} 
                                            className={cn(
                                            "flex gap-8 py-6 relative group",
                                                item.highlight && "bg-accent/5 dark:bg-accent/10 -mx-8 px-8 border-l-4 border-accent",
                                                item.issue && "bg-red-50/30 dark:bg-red-900/30 -mx-8 px-8"
                                            )}
                                        >
                                            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-1 flex-shrink-0 w-12 font-heading tracking-widest">{item.time}</div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-sans">{item.text}</p>
                                                {item.insight && (
                                                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-primary dark:bg-primary/80 text-white dark:text-gray-100 text-[9px] font-bold rounded-sm uppercase tracking-[0.15em]">
                                                        <Info className="w-3 h-3 text-accent dark:text-accent-foreground" /> {item.insight}
                                                    </div>
                                                )}
                                                {item.issue && (
                                                    <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-400 text-[9px] font-bold rounded-sm">
                                                        <AlertTriangle className="w-3 h-3" /> {item.issue}
                                                    </div>
                                                )}
                                            </div>
                                            <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 hover:bg-accent/10 hover:text-accent">
                                                <Play className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </Card>
                    </TabsContent>

                    <TabsContent value="accuracy" className="mt-6">
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 p-5">
                                <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Accuracy & Consistency Check</CardTitle>
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1">Cross-referencing with uploaded case files and skeleton arguments</p>
                            </CardHeader>
                            <CardContent className="p-5 space-y-3">
                                <div className="flex items-start gap-4 p-5 bg-red-50 dark:bg-red-900/30 rounded-r-xl border-l-4 border-red-300 dark:border-red-700">
                                    <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-red-900 dark:text-red-300 font-heading mb-1 text-sm">Potential Misrepresentation Detected</h4>
                                        <p className="text-xs text-red-800 dark:text-red-300 font-sans mb-2 leading-relaxed">
                                        You mentioned at 04:30 that the Respondent 'admitted liability' in the case file. Upon cross-checking with the uploaded Case File **(Appendix C)**, we found that the Respondent only admitted to 'knowledge of the incident' without admitting liability.
                                    </p>
                                        <Badge className="bg-red-600 text-white border-none text-[10px]">Accuracy Deduction: -12 pts</Badge>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4 p-5 bg-green-50 dark:bg-green-900/30 rounded-r-xl border-l-4 border-green-300 dark:border-green-700">
                                    <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
                                    <div className="flex-1">
                                        <h4 className="font-bold text-green-900 dark:text-green-300 font-heading mb-1 text-sm">Skeleton Argument Consistency</h4>
                                        <p className="text-xs text-green-800 dark:text-green-300 font-sans leading-relaxed">
                                            Your oral submissions perfectly match the points outlined in your uploaded Skeleton Argument (v2.pdf). The chain of reasoning is consistent throughout.
                                    </p>
                                </div>
                            </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </motion.div>
        </div>
    )
}
