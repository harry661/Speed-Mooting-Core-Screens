import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, CheckCircle2, ChevronRight, ChevronLeft, Video, Link } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

const steps = [
    { id: 1, title: "Video Upload", description: "Record or upload your mooting video", icon: Video },
    { id: 2, title: "Documents", description: "Skeleton argument & case files", icon: FileText },
    { id: 3, title: "Topic Detail", description: "Confirm legal subjects", icon: Link },
    { id: 4, title: "Review", description: "Final check before analysis", icon: CheckCircle2 },
]

export default function SubmissionFlow() {
    const [currentStep, setCurrentStep] = useState(1)
    const progress = (currentStep / steps.length) * 100

    return (
        <div className="flex-1 bg-background min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Progress Stepper */}
                <div className="space-y-4">
                    <div className="flex justify-between items-end">
                        <div className="space-y-1">
                            <h2 className="text-2xl font-bold text-gray-900 font-heading tracking-tight">New Submission</h2>
                            <p className="text-gray-500 font-sans text-xs">Exercise: Contract Breach - Offer & Acceptance</p>
                        </div>
                        <p className="text-[11px] font-bold text-primary font-heading uppercase tracking-widest">Step {currentStep} of {steps.length}</p>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-gray-100" />
                    <div className="flex justify-between mt-6">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center gap-2">
                                <div className={cn(
                                    "w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-bold transition-all duration-300",
                                    currentStep >= step.id ? "bg-primary text-white border border-primary shadow-none" : "bg-white text-gray-300 border border-gray-100"
                                )}>
                                    {currentStep > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                                </div>
                                <span className={cn(
                                    "text-[9px] uppercase font-bold tracking-[0.15em] font-heading",
                                    currentStep >= step.id ? "text-primary" : "text-gray-300"
                                )}>
                                    {step.title}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Form Area */}
                <div className="relative min-h-[400px]">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentStep}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="w-full"
                        >
                            <Card className="rounded-sm border-gray-200 bg-white shadow-none">
                                {currentStep === 1 && (
                                    <div className="p-16 text-center">
                                        <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <Upload className="w-10 h-10 text-primary" />
                                        </div>
                                        <h3 className="text-2xl font-bold font-heading mb-2">Upload your Video</h3>
                                        <p className="text-gray-500 mb-8 max-w-sm mx-auto font-sans">
                                            Drag and drop your MP4, MOV or WEBM file here. Max file size: 500MB.
                                        </p>
                                        <div className="border-2 border-dashed border-gray-200 rounded-xl p-16 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
                                            <p className="text-sm font-medium text-gray-600 font-sans">Click to browse or drag file here</p>
                                            <p className="text-xs text-gray-400 mt-2 font-sans">Recommended: 1080p, landscape orientation</p>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 2 && (
                                    <div className="p-16 space-y-6">
                                        <h3 className="text-2xl font-bold font-heading">Upload Supporting Documents</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="border rounded-xl p-8 hover:shadow-md transition-shadow cursor-pointer border-gray-100 bg-gray-50/50 group">
                                                <FileText className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                                <h4 className="text-lg font-bold font-heading">Skeleton Argument</h4>
                                                <p className="text-sm text-gray-500 mt-1 font-sans">Word or PDF format required.</p>
                                            </div>
                                            <div className="border rounded-xl p-8 hover:shadow-md transition-shadow cursor-pointer border-gray-100 bg-gray-50/50 group">
                                                <Link className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
                                                <h4 className="text-lg font-bold font-heading">Original Case Files</h4>
                                                <p className="text-sm text-gray-500 mt-1 font-sans">Add relevant legal case documents.</p>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentStep === 3 && (
                                    <div className="p-16 text-center">
                                        <h3 className="text-2xl font-bold mb-6 text-left font-heading">Confirm Legal Topics</h3>
                                        <div className="flex flex-wrap gap-3">
                                            {["Contract Law", "Offer & Acceptance", "Breach", "Civil Procedure"].map(tag => (
                                                <Badge key={tag} className="px-6 py-2 bg-primary/10 text-primary border-none text-sm font-semibold font-heading">
                                                    {tag}
                                                </Badge>
                                            ))}
                                            <Button variant="outline" size="sm" className="rounded-full border-primary text-primary hover:bg-primary/5 font-heading font-semibold">
                                                + Add Topic
                                            </Button>
                                        </div>
                                        <p className="text-left text-sm text-gray-500 mt-8 font-sans">
                                            We've automatically detected these topics from your exercise. Confirm them to ensure accurate AI analysis.
                                        </p>
                                    </div>
                                )}

                                {currentStep === 4 && (
                                    <div className="p-16 text-center">
                                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <h3 className="text-3xl font-bold font-heading mb-4">Almost Ready!</h3>
                                        <div className="text-left space-y-4 bg-gray-50 p-8 rounded-xl border max-w-lg mx-auto mb-8 font-sans">
                                            <div className="flex justify-between text-base">
                                                <span className="text-gray-500">Video:</span>
                                                <span className="font-semibold">moot_submission_v1.mp4</span>
                                            </div>
                                            <div className="flex justify-between text-base">
                                                <span className="text-gray-500">Skeleton:</span>
                                                <span className="font-semibold">argument_alex_t.pdf</span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500 mb-8 font-sans">
                                            By submitting, you agree to our terms of analysis. The AI report usually takes 2-5 minutes to generate.
                                        </p>
                                    </div>
                                )}
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-6">
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                        disabled={currentStep === 1}
                        className="gap-2 font-heading font-bold text-[10px] uppercase tracking-widest h-11 px-6 text-gray-400 hover:text-primary hover:bg-transparent"
                    >
                        <ChevronLeft className="w-4 h-4" /> Previous
                    </Button>
                    <Button
                        onClick={() => setCurrentStep(prev => Math.min(steps.length, prev + 1))}
                        className="bg-accent hover:bg-accent/90 text-white px-10 h-11 rounded-sm shadow-none text-[11px] font-bold font-heading uppercase tracking-widest transition-all"
                    >
                        {currentStep === steps.length ? "Submit for Audit" : "Proceed"}
                        {currentStep !== steps.length && <ChevronRight className="w-4 h-4 ml-2" />}
                    </Button>
                </div>
            </div>
        </div>
    )
}

import { cn } from "@/lib/utils"
