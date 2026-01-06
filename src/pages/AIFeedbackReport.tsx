import { ArrowLeft, Download, FileText, CheckCircle2, AlertTriangle, Info, Play, MessageSquare, Briefcase } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useSearchParams, useNavigate } from "react-router-dom"

const rubricScores = [
    { label: "Clarity", value: 85, description: "Precise language and clear articulation." },
    { label: "Persuasiveness", value: 72, description: "Strong logical arguments, good eye contact." },
    { label: "Structure", value: 90, description: "Logical flow from intro to conclusion." },
    { label: "Knowledge of Law", value: 78, description: "Accurate citation of relevant cases." },
    { label: "Use of Authority", value: 65, description: "Some missed opportunities with case law." },
]

export default function AIFeedbackReport() {
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const submissionId = searchParams.get("submissionId")
    const fromHistory = submissionId !== null

    const handleBack = () => {
        if (fromHistory) {
            navigate("/history")
        } else {
            navigate("/")
        }
    }

    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Top Navigation */}
                <div className="flex items-center justify-between">
                    <Button 
                        variant="ghost" 
                        onClick={handleBack}
                        className="gap-2 text-primary hover:bg-primary/5 font-heading font-bold text-[10px] uppercase tracking-widest px-0"
                    >
                        <ArrowLeft className="w-4 h-4" /> {fromHistory ? "Back to History" : "Back to Dashboard"}
                    </Button>
                    <div className="flex gap-3">
                        <Button variant="outline" className="gap-2 border-gray-200 font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none">
                            <Download className="w-3.5 h-3.5" /> Export PDF
                        </Button>
                        <Button className="bg-accent hover:bg-accent/90 text-white font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm shadow-none px-6">Share Report</Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <Card className="lg:col-span-1 rounded-sm border-none bg-primary text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                        <CardContent className="p-10 text-center relative z-10">
                            <p className="text-white/40 uppercase font-bold tracking-[0.2em] text-[10px] mb-8 font-heading">Performance Audit</p>
                            <div className="relative inline-block scale-110">
                                <svg className="w-48 h-48">
                                    <circle className="text-white/10" strokeWidth="10" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                                    <circle className="text-accent" strokeWidth="10" strokeDasharray={500} strokeDashoffset={500 - (500 * 0.78)} strokeLinecap="square" stroke="currentColor" fill="transparent" r="80" cx="96" cy="96" />
                                </svg>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-6xl font-bold font-heading tracking-tighter tabular-nums">78</span>
                                    <span className="text-white/40 font-heading text-[10px] font-bold uppercase tracking-widest mt-1">Grade (B+)</span>
                                </div>
                            </div>
                            <div className="mt-8 space-y-3">
                                <p className="text-sm text-white font-heading font-bold italic leading-relaxed px-4">"Upper Second (2:1). Strong logic, but citation density needs work."</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="lg:col-span-2 rounded-sm border-gray-200 bg-white shadow-none">
                        <CardHeader className="border-b border-gray-100 p-5">
                            <CardTitle className="text-base font-bold font-heading">Rubric Component Analysis</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            {rubricScores.map((rubric) => (
                                <div key={rubric.label} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <span className="text-sm font-bold text-gray-900 font-heading uppercase tracking-wide">{rubric.label}</span>
                                            <p className="text-xs text-gray-500 font-sans">{rubric.description}</p>
                                        </div>
                                        <span className="font-bold text-accent font-sans tabular-nums">{rubric.value}%</span>
                                    </div>
                                    <Progress value={rubric.value} className="h-1.5 bg-gray-100" />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Analysis Tabs */}
                <Tabs defaultValue="insights" className="w-full">
                    <TabsList className="bg-gray-100/50 p-1 rounded-sm border border-gray-100">
                        <TabsTrigger value="insights" className="rounded-sm px-8 py-2 data-[state=active]:bg-white data-[state=active]:text-primary font-heading font-bold text-[10px] uppercase tracking-widest">AI Insights</TabsTrigger>
                        <TabsTrigger value="transcript" className="rounded-sm px-8 py-2 data-[state=active]:bg-white data-[state=active]:text-primary font-heading font-bold text-[10px] uppercase tracking-widest">Transcript</TabsTrigger>
                        <TabsTrigger value="accuracy" className="rounded-sm px-8 py-2 data-[state=active]:bg-white data-[state=active]:text-primary font-heading font-bold text-[10px] uppercase tracking-widest">Correctness Check</TabsTrigger>
                    </TabsList>

                    <TabsContent value="insights" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                                <CardHeader className="border-b border-gray-100">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-green-700 font-heading uppercase tracking-wide">
                                        <CheckCircle2 className="w-4 h-4" /> Key Strengths
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="p-4 bg-green-50/50 border-l-2 border-green-200 rounded-r-xl flex gap-4">
                                        <div className="bg-white p-2 rounded-sm border border-green-100 h-fit text-green-600">
                                            <MessageSquare className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs text-gray-700 leading-relaxed font-sans mt-0.5">Excellent use of rhetorical questions at 02:15 to challenge the opposing side's interpretation of *Carlill v Carbolic Smoke Ball Co.*</p>
                                    </div>
                                    <div className="p-4 bg-green-50/50 border-l-2 border-green-200 rounded-r-xl flex gap-4">
                                        <div className="bg-white p-2 rounded-sm border border-green-100 h-fit text-green-600">
                                            <Briefcase className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs text-gray-700 leading-relaxed font-sans mt-0.5">Posture and authoritative tone remained consistent throughout the 15-minute submission.</p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                                <CardHeader className="border-b border-gray-100">
                                    <CardTitle className="text-sm font-bold flex items-center gap-2 text-amber-700 font-heading uppercase tracking-wide">
                                        <AlertTriangle className="w-4 h-4" /> Areas for Improvement
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-6 space-y-4">
                                    <div className="p-4 bg-amber-50/50 border-l-2 border-amber-200 rounded-r-xl flex gap-4">
                                        <div className="bg-white p-2 rounded-sm border border-amber-100 h-fit text-amber-600">
                                            <FileText className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs text-gray-700 leading-relaxed font-sans mt-0.5">The 'reasonable person' test was slightly vague. Consider referencing *Blyth v Birmingham Waterworks* explicitly next time.</p>
                                    </div>
                                    <div className="p-4 bg-amber-50/50 border-l-2 border-amber-200 rounded-r-xl flex gap-4">
                                        <div className="bg-white p-2 rounded-sm border border-amber-100 h-fit text-amber-600">
                                            <Clock className="w-4 h-4" />
                                        </div>
                                        <p className="text-xs text-gray-700 leading-relaxed font-sans mt-0.5">The introduction was slightly too long (4 minutes). Aim to reach core legal submissions within the first 2 minutes.</p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="transcript" className="mt-6">
                        <Card className="rounded-sm border-gray-200 bg-white shadow-none overflow-hidden">
                            <ScrollArea className="h-[500px] w-full">
                                <div className="divide-y divide-gray-100 px-8">
                                    {[
                                        { time: "00:00", text: "May it please the court, my name is Alex Thompson and I appear on behalf of the Appellant in this matter." },
                                        { time: "00:30", text: "This case concerns a fundamental breach of contract arising from the purported offer made by the Respondent on the 14th of June.", highlight: true },
                                        { time: "01:20", text: "If we turn to the first point of submission, we must consider the intention to create legal relations. The Respondent argues that this was a mere 'puff', but we submit that the specificity of the terms suggests otherwise." },
                                        { time: "02:15", text: "As established in the case of *Carlill*, the notification of acceptance can be waived by the offeror through the nature of the transaction itself.", insight: "Strategic use of authority cited." },
                                    ].map((item, i) => (
                                        <div key={i} className={cn(
                                            "flex gap-8 py-6 relative group",
                                            item.highlight && "bg-accent/5 -mx-8 px-8 border-l-4 border-accent"
                                        )}>
                                            <div className="text-[10px] font-bold text-gray-400 mt-1 flex-shrink-0 w-12 font-heading tracking-widest">{item.time}</div>
                                            <div className="flex-1">
                                                <p className="text-sm text-gray-800 leading-relaxed font-sans">{item.text}</p>
                                                {item.insight && (
                                                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-primary text-white text-[9px] font-bold rounded-sm uppercase tracking-[0.15em]">
                                                        <Info className="w-3 h-3 text-accent" /> {item.insight}
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
                        <Card className="border-none shadow-md bg-white p-8">
                            <div className="flex items-start gap-4 p-6 bg-red-50 rounded-xl border border-red-100 mb-6">
                                <AlertTriangle className="w-6 h-6 text-red-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-red-900">Potential Misrepresentation Detected</h4>
                                    <p className="text-sm text-red-800 mt-1">
                                        You mentioned at 04:30 that the Respondent 'admitted liability' in the case file. Upon cross-checking with the uploaded Case File **(Appendix C)**, we found that the Respondent only admitted to 'knowledge of the incident' without admitting liability.
                                    </p>
                                    <Badge className="mt-4 bg-red-600 text-white border-none">Accuracy Deduction: -12 pts</Badge>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-6 bg-green-50 rounded-xl border border-green-100">
                                <CheckCircle2 className="w-6 h-6 text-green-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-green-900">Skeleton Argument Consistency</h4>
                                    <p className="text-sm text-green-800 mt-1">
                                        Your oral submissions perfectly match the points outlined in your uploaded Skeleton Argument (v2.pdf). The chain of reasoning is consistent.
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

import { cn } from "@/lib/utils"
import { Clock } from "lucide-react"
