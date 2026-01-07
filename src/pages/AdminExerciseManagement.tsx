import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, MoreVertical, Edit2, Trash2, Scale, BookOpen, CheckCircle2, ChevronRight, X, Upload } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"

const categories = ["Contract Law", "Tort Law", "Criminal Law", "Public Law", "Property Law", "Litigation"]
const difficulties = ["Beginner", "Intermediate", "Advanced"]

const initialExercises = [
    { id: 1, title: "Contract Breach - Offer & Acceptance", subject: "Contract Law", difficulty: "Beginner", status: "Published", submissions: 12 },
    { id: 2, title: "Negligence Case - Duty of Care", subject: "Tort Law", difficulty: "Intermediate", status: "Published", submissions: 8 },
    { id: 3, title: "Criminal Law - Mens Rea", subject: "Criminal Law", difficulty: "Beginner", status: "Draft", submissions: 0 },
]

const initialRubrics = [
    { id: 1, name: "Standard Advocacy Rubric", criteria: 5, weighted: "Equal" },
    { id: 2, name: "Evidence Specialized", criteria: 8, weighted: "Custom" },
]

export default function AdminExerciseManagement() {
    const [view, setView] = useState<"list" | "create">("list")
    const [step, setStep] = useState(1)

    // Create form state
    const [newExercise, setNewExercise] = useState({
        title: "",
        subject: "",
        difficulty: "",
        description: "",
        caseDetails: "",
        argumentsFor: [""],
        argumentsAgainst: [""],
        rules: "",
        rubricId: ""
    })

    const handleAddArgument = (type: "for" | "against") => {
        if (type === "for") {
            setNewExercise({ ...newExercise, argumentsFor: [...newExercise.argumentsFor, ""] })
        } else {
            setNewExercise({ ...newExercise, argumentsAgainst: [...newExercise.argumentsAgainst, ""] })
        }
    }

    const handleUpdateArgument = (type: "for" | "against", index: number, value: string) => {
        const updated = type === "for" ? [...newExercise.argumentsFor] : [...newExercise.argumentsAgainst]
        updated[index] = value
        if (type === "for") {
            setNewExercise({ ...newExercise, argumentsFor: updated })
        } else {
            setNewExercise({ ...newExercise, argumentsAgainst: updated })
        }
    }

    return (
        <div className="flex-1 bg-[#fcf8f8] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading">Management Studio</h2>
                        <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 text-xs font-sans">Define, organize, and manage SpeedMooting exercises and rubrics.</p>
                    </div>
                    {view === "list" && (
                        <Button
                            onClick={() => setView("create")}
                            className="bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm px-6 h-10 font-heading font-bold uppercase tracking-widest text-[10px]"
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Create New Exercise
                        </Button>
                    )}
                </div>

                <Tabs defaultValue="exercises" className="w-full">
                    <TabsList className="bg-gray-100 dark:bg-gray-800/50 p-1 rounded-sm border border-gray-100 dark:border-gray-800">
                        <TabsTrigger value="exercises" className="rounded-sm px-8 py-2 data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-primary font-heading font-bold text-[10px] uppercase tracking-widest">Exercises</TabsTrigger>
                        <TabsTrigger value="rubrics" className="rounded-sm px-8 py-2 data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-primary font-heading font-bold text-[10px] uppercase tracking-widest">Rubrics</TabsTrigger>
                        <TabsTrigger value="analytics" className="rounded-sm px-8 py-2 data-[state=active]:bg-white dark:bg-gray-900 data-[state=active]:text-primary font-heading font-bold text-[10px] uppercase tracking-widest">Analytics</TabsTrigger>
                    </TabsList>

                    <TabsContent value="exercises">
                        <AnimatePresence mode="wait">
                            {view === "list" ? (
                                <motion.div
                                    key="list-view"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >

                                    {/* Exercise Cards */}
                                    <div className="grid grid-cols-1 gap-1">
                                        {initialExercises.map((ex) => (
                                            <Card key={ex.id} className="rounded-sm border border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:bg-gray-800/50 transition-colors shadow-none group">
                                                <div className="flex items-center">
                                                    <div className={cn(
                                                        "w-1 self-stretch",
                                                        ex.status === "Published" ? "bg-accent" : "bg-gray-200"
                                                    )} />
                                                    <div className="flex-1 p-4 flex items-center justify-between">
                                                        <div className="flex items-center gap-6">
                                                            <div className="bg-gray-50 dark:bg-gray-800 p-2.5 rounded-sm border border-gray-100 dark:border-gray-800 text-gray-400 dark:text-gray-500 group-hover:text-accent transition-colors">
                                                                <BookOpen className="w-5 h-5" />
                                                            </div>
                                                            <div>
                                                                <div className="flex items-center gap-3">
                                                                    <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 font-heading">{ex.title}</h3>
                                                                    <Badge className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 dark:text-gray-500 border-none rounded-sm text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">{ex.status}</Badge>
                                                                </div>
                                                                <div className="flex items-center gap-4 mt-1 text-[10px] text-gray-400 dark:text-gray-500 font-sans uppercase font-bold tracking-wider">
                                                                    <span className="flex items-center gap-1.5">{ex.subject}</span>
                                                                    <span className="flex items-center gap-1.5">{ex.difficulty}</span>
                                                                    <span className="flex items-center gap-1.5">{ex.submissions} Submissions</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50/50 hover:text-blue-600 rounded-sm transition-colors">
                                                                <Edit2 className="w-3.5 h-3.5" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50/50 hover:text-red-600 rounded-sm transition-colors">
                                                                <Trash2 className="w-3.5 h-3.5" />
                                                            </Button>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-sm">
                                                                <MoreVertical className="w-3.5 h-3.5" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="create-view"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="max-w-4xl mx-auto"
                                >
                                    {/* Create Form Multi-step */}
                                    <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none overflow-hidden">
                                        <CardHeader className="border-b bg-gray-50 dark:bg-gray-800/50 p-6">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <CardTitle className="text-xl font-bold font-heading">Define New Exercise</CardTitle>
                                                    <CardDescription className="font-sans text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500 mt-1">Progress: Step {step} of 4</CardDescription>
                                                </div>
                                                <Button variant="ghost" size="icon" className="rounded-sm" onClick={() => setView("list")}><X className="w-4 h-4" /></Button>
                                            </div>
                                            <Progress value={(step / 4) * 100} className="h-1 mt-6 bg-gray-100 dark:bg-gray-800" />
                                        </CardHeader>

                                        <CardContent className="p-6">
                                            {step === 1 && (
                                                <div className="space-y-4">
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Exercise Title</label>
                                                            <Input
                                                                placeholder="e.g. Contract Breach - Offer & Acceptance"
                                                                className="border-gray-200 dark:border-gray-800 rounded-sm focus:ring-accent transition-all font-sans text-sm"
                                                                value={newExercise.title}
                                                                onChange={(e) => setNewExercise({ ...newExercise, title: e.target.value })}
                                                            />
                                                        </div>
                                                        <div className="space-y-1.5">
                                                            <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Legal Subject</label>
                                                            <Select onValueChange={(v) => setNewExercise({ ...newExercise, subject: v })}>
                                                                <SelectTrigger className="border-gray-200 dark:border-gray-800 rounded-sm h-10">
                                                                    <SelectValue placeholder="Select Subject" />
                                                                </SelectTrigger>
                                                                <SelectContent className="rounded-sm">
                                                                    {categories.map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                                                                </SelectContent>
                                                            </Select>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Short Description</label>
                                                        <Input
                                                            placeholder="A brief summary for the exercise library..."
                                                            className="border-gray-200 dark:border-gray-800 rounded-sm font-sans text-sm"
                                                            value={newExercise.description}
                                                            onChange={(e) => setNewExercise({ ...newExercise, description: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Difficulty Level</label>
                                                        <div className="flex gap-px bg-gray-100 dark:bg-gray-800 p-px">
                                                            {difficulties.map(d => (
                                                                <Button
                                                                    key={d}
                                                                    variant="ghost"
                                                                    className={cn(
                                                                        "flex-1 font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm",
                                                                        newExercise.difficulty === d ? "bg-white dark:bg-gray-900 text-primary" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:text-gray-300"
                                                                    )}
                                                                    onClick={() => setNewExercise({ ...newExercise, difficulty: d })}
                                                                >
                                                                    {d}
                                                                </Button>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 2 && (
                                                <div className="space-y-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Case Background & Details</label>
                                                        <textarea
                                                            className="w-full h-40 p-3 border rounded-sm border-gray-200 dark:border-gray-800 focus:outline-none focus:ring-1 focus:ring-accent transition-all font-sans text-sm"
                                                            placeholder="Describe the full case facts here..."
                                                            value={newExercise.caseDetails}
                                                            onChange={(e) => setNewExercise({ ...newExercise, caseDetails: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="p-4 bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-800 rounded-sm space-y-3">
                                                        <div className="flex items-center gap-2 text-primary">
                                                            <Upload className="w-4 h-4" />
                                                            <span className="font-bold font-heading text-[10px] uppercase tracking-widest">Case Files & Bundles</span>
                                                        </div>
                                                        <div className="border border-dashed border-gray-200 dark:border-gray-800 rounded-sm p-6 text-center cursor-pointer hover:bg-white dark:bg-gray-900 transition-colors">
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">Click to upload primary bundle</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 3 && (
                                                <div className="space-y-6">
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Arguments for Appellant/Claimant</label>
                                                            <Button variant="ghost" size="sm" onClick={() => handleAddArgument("for")} className="text-accent hover:bg-accent hover:text-white font-bold text-[9px] uppercase tracking-widest rounded-sm transition-colors">+ Add Point</Button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {newExercise.argumentsFor.map((arg, i) => (
                                                                <Input
                                                                    key={i}
                                                                    value={arg}
                                                                    onChange={(e) => handleUpdateArgument("for", i, e.target.value)}
                                                                    placeholder={`Point ${i + 1}`}
                                                                    className="border-gray-100 dark:border-gray-800 rounded-sm text-sm"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Arguments for Respondent</label>
                                                            <Button variant="ghost" size="sm" onClick={() => handleAddArgument("against")} className="text-accent hover:bg-accent hover:text-white font-bold text-[9px] uppercase tracking-widest rounded-sm transition-colors">+ Add Point</Button>
                                                        </div>
                                                        <div className="space-y-2">
                                                            {newExercise.argumentsAgainst.map((arg, i) => (
                                                                <Input
                                                                    key={i}
                                                                    value={arg}
                                                                    onChange={(e) => handleUpdateArgument("against", i, e.target.value)}
                                                                    placeholder={`Point ${i + 1}`}
                                                                    className="border-gray-100 dark:border-gray-800 rounded-sm text-sm"
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {step === 4 && (
                                                <div className="space-y-4">
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Assign Rubric</label>
                                                        <Select onValueChange={(v) => setNewExercise({ ...newExercise, rubricId: v })}>
                                                            <SelectTrigger className="border-gray-200 dark:border-gray-800 rounded-sm">
                                                                <SelectValue placeholder="Select Rubric" />
                                                            </SelectTrigger>
                                                            <SelectContent className="rounded-sm">
                                                                {initialRubrics.map(r => <SelectItem key={r.id} value={r.id.toString()}>{r.name} ({r.criteria} criteria)</SelectItem>)}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                    <div className="space-y-1.5">
                                                        <label className="text-[10px] font-bold font-heading uppercase tracking-widest text-gray-400 dark:text-gray-500">Exercise Specific Rules (Optional)</label>
                                                        <textarea
                                                            className="w-full h-32 p-3 border rounded-sm border-gray-200 dark:border-gray-800 focus:ring-accent transition-all font-sans text-sm"
                                                            placeholder="Set any time limits or restricted authorities..."
                                                            value={newExercise.rules}
                                                            onChange={(e) => setNewExercise({ ...newExercise, rules: e.target.value })}
                                                        />
                                                    </div>
                                                    <div className="p-4 bg-accent/5 border border-accent/10 rounded-xl flex gap-4">
                                                        <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                                                        <div>
                                                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent font-heading">Ready to Publish</h4>
                                                            <p className="text-xs text-gray-600 dark:text-gray-300 font-sans mt-0.5">All mandatory audit fields are completed. You can save as draft or publish immediately.</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>

                                        <CardFooter className="border-t bg-gray-50 dark:bg-gray-800/50 p-6 flex justify-between">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                                                disabled={step === 1}
                                                className="font-heading font-bold text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 hover:text-primary hover:bg-transparent rounded-sm"
                                            >
                                                Previous
                                            </Button>
                                            <div className="flex gap-2">
                                                <Button variant="outline" className="font-heading font-bold text-[10px] uppercase tracking-widest border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 rounded-sm h-10 px-6">Save Draft</Button>
                                                {step < 4 ? (
                                                    <Button
                                                        onClick={() => setStep(prev => prev + 1)}
                                                        className="bg-primary hover:bg-primary/90 text-white px-8 font-heading font-bold text-[10px] uppercase tracking-widest rounded-sm h-10 transition-all"
                                                    >
                                                        Next Step <ChevronRight className="w-4 h-4 ml-2" />
                                                    </Button>
                                                ) : (
                                                    <Button
                                                        onClick={() => setView("list")}
                                                        className="bg-accent hover:bg-accent/90 text-white px-8 font-heading font-bold text-[10px] uppercase tracking-widest rounded-sm h-10 shadow-none transition-all"
                                                    >
                                                        Publish Studio Item
                                                    </Button>
                                                )}
                                            </div>
                                        </CardFooter>
                                    </Card>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </TabsContent>

                    <TabsContent value="rubrics">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {initialRubrics.map((rubric) => (
                                <Card key={rubric.id} className="rounded-sm border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:bg-gray-800/50 transition-colors shadow-none group relative overflow-hidden bg-white dark:bg-gray-900">
                                    <div className="absolute top-0 right-0 w-12 h-12 bg-gray-50 dark:bg-gray-800 rounded-bl-full group-hover:bg-accent/10 transition-colors"></div>
                                    <CardHeader className="pb-4">
                                        <CardTitle className="text-lg font-bold font-heading mt-2">{rubric.name}</CardTitle>
                                        <CardDescription className="font-sans text-[10px] uppercase font-bold tracking-widest text-gray-400 dark:text-gray-500">Audit Template</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4 pb-4">
                                        <div className="flex justify-between items-center text-[11px] font-sans">
                                            <span className="text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider">Criteria:</span>
                                            <span className="font-bold text-primary">{rubric.criteria}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-[11px] font-sans">
                                            <span className="text-gray-400 dark:text-gray-500 uppercase font-bold tracking-wider">Weighting:</span>
                                            <Badge className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 dark:text-gray-500 border-none rounded-sm text-[8px] font-bold uppercase tracking-widest px-2 py-0.5">{rubric.weighted}</Badge>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="pt-4 flex gap-2 border-t border-gray-50">
                                        <Button variant="ghost" className="flex-1 hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest rounded-sm h-9 px-4 transition-colors">Modify Rubric</Button>
                                        <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 dark:text-gray-500 hover:text-red-500 rounded-sm"><Trash2 className="w-3.5 h-3.5" /></Button>
                                    </CardFooter>
                                </Card>
                            ))}
                            <Button variant="outline" className="h-[220px] border-dashed border-2 flex flex-col gap-3 group bg-white dark:bg-gray-900/50 hover:bg-accent/5 hover:border-accent transition-all rounded-sm">
                                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-sm text-gray-400 dark:text-gray-500 group-hover:text-accent transition-colors border border-gray-100 dark:border-gray-800">
                                    <Plus className="w-6 h-6" />
                                </div>
                                <span className="font-bold font-heading text-[10px] uppercase tracking-widest text-gray-400 dark:text-gray-500 group-hover:text-accent">Create New Template</span>
                            </Button>
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics">
                        <Card className="border-none shadow-sm bg-white dark:bg-gray-900 p-12 text-center flex flex-col items-center">
                            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6 text-gray-400 dark:text-gray-500">
                                <Scale className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-bold font-heading mb-2">Advanced Analytics Coming Soon</h3>
                            <p className="text-gray-500 dark:text-gray-400 dark:text-gray-500 max-w-sm font-sans">Track global performance trends across different legal subjects and rubric criteria once more data is collected.</p>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}


