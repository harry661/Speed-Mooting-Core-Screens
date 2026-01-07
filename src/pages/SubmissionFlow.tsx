import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSearchParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { Upload, FileText, CheckCircle2, ChevronRight, ChevronLeft, Video, ArrowLeft, X, Tag, User, Clock, File, Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { getExerciseById } from "@/data/exercises"
import { formatFileSize, getFileType } from "@/utils/fileUtils"

const steps = [
    { id: 1, title: "Upload & Details", description: "Upload files and add description", icon: Upload },
    { id: 2, title: "Review & Submit", description: "Review and submit for analysis", icon: CheckCircle2 },
]

export default function SubmissionFlow() {
    const [currentStep, setCurrentStep] = useState(1)
    const [searchParams] = useSearchParams()
    const exerciseId = searchParams.get("exercise")
    
    // State for files
    const [videoFile, setVideoFile] = useState<File | null>(null)
    const [skeletonArgument, setSkeletonArgument] = useState<File | null>(null)
    const [caseFiles, setCaseFiles] = useState<File[]>([])
    const [description, setDescription] = useState("")
    const [uploadTimestamp, setUploadTimestamp] = useState<Date | null>(null)
    const [isUploading, setIsUploading] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [uploadErrors, setUploadErrors] = useState<{
        video?: string
        skeleton?: string
        caseFiles?: string
    }>({})
    
    // File input refs
    const videoInputRef = useRef<HTMLInputElement>(null)
    const skeletonInputRef = useRef<HTMLInputElement>(null)
    const caseFilesInputRef = useRef<HTMLInputElement>(null)
    
    // Get exercise data
    const exercise = exerciseId ? getExerciseById(Number(exerciseId)) : null
    const exerciseName = exercise?.title || "Unknown Exercise"
    const exerciseTopics = exercise?.topics || []
    
    const progress = (currentStep / steps.length) * 100
    const returnPath = exerciseId ? `/exercises/${exerciseId}` : "/exercises"
    
    // File upload handlers
    const handleVideoUpload = async (file: File) => {
        setUploadErrors(prev => ({ ...prev, video: undefined }))
        
        if (file.size > 500 * 1024 * 1024) {
            const error = "Video file size must be less than 500MB"
            setUploadErrors(prev => ({ ...prev, video: error }))
            toast.error("File too large", {
                description: error
            })
            return
        }
        const validTypes = ["video/mp4", "video/mov", "video/webm"]
        if (!validTypes.includes(file.type)) {
            const error = "Please upload MP4, MOV, or WEBM video files only"
            setUploadErrors(prev => ({ ...prev, video: error }))
            toast.error("Invalid file type", {
                description: error
            })
            return
        }
        setIsUploading(true)
        // Simulate upload process
        await new Promise(resolve => setTimeout(resolve, 500))
        setVideoFile(file)
        setIsUploading(false)
        toast.success("Video uploaded", {
            description: file.name
        })
        if (!uploadTimestamp) {
            setUploadTimestamp(new Date())
        }
    }
    
    const handleSkeletonUpload = (file: File) => {
        setUploadErrors(prev => ({ ...prev, skeleton: undefined }))
        
        const validTypes = [".doc", ".docx", ".pdf"]
        const ext = file.name.toLowerCase().split('.').pop()
        if (!ext || !validTypes.includes(`.${ext}`)) {
            const error = "Please upload Word (.doc, .docx) or PDF files only"
            setUploadErrors(prev => ({ ...prev, skeleton: error }))
            toast.error("Invalid file type", {
                description: error
            })
            return
        }
        setSkeletonArgument(file)
        toast.success("Skeleton argument uploaded", {
            description: file.name
        })
        if (!uploadTimestamp) {
            setUploadTimestamp(new Date())
        }
    }
    
    const handleCaseFilesUpload = (files: FileList | null) => {
        if (!files) return
        const validTypes = [".pdf", ".doc", ".docx"]
        const newFiles = Array.from(files).filter(file => {
            const ext = file.name.toLowerCase().split('.').pop()
            return ext && validTypes.includes(`.${ext}`)
        })
        const invalidFiles = Array.from(files).filter(file => {
            const ext = file.name.toLowerCase().split('.').pop()
            return !ext || !validTypes.includes(`.${ext}`)
        })
        
        if (invalidFiles.length > 0) {
            toast.error("Some files were skipped", {
                description: `Only PDF, Word (.doc, .docx) files are allowed. ${invalidFiles.length} file(s) skipped.`
            })
        }
        
        if (newFiles.length > 0) {
            setCaseFiles(prev => [...prev, ...newFiles])
            toast.success(`${newFiles.length} case file(s) uploaded`)
            if (!uploadTimestamp) {
                setUploadTimestamp(new Date())
            }
        }
    }
    
    const removeCaseFile = (index: number) => {
        setCaseFiles(prev => prev.filter((_, i) => i !== index))
    }
    
    // Validation
    const canProceedToStep2 = videoFile !== null && description.trim().length > 0
    
    const handleProceed = async () => {
        if (currentStep === 1 && !canProceedToStep2) {
            toast.error("Missing required information", {
                description: "Please upload a video file and provide a description before proceeding"
            })
            return
        }
        if (currentStep < steps.length) {
            setCurrentStep(prev => prev + 1)
        } else {
            // Handle submission
            setIsSubmitting(true)
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500))
            setIsSubmitting(false)
            toast.success("Submission submitted", {
                description: "Your submission is being processed. You'll be notified when the report is ready."
            })
            // In real app, would submit to API and redirect
            setTimeout(() => {
                window.location.href = "/history"
            }, 2000)
        }
    }
    
    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
            <div className="w-full space-y-6 max-w-[95vw] mx-auto">
                {/* Return Button */}
                <Link to={returnPath}>
                    <Button 
                        variant="ghost" 
                        className="gap-2 text-primary hover:bg-primary/5 font-heading font-bold text-[10px] uppercase tracking-widest px-0 mb-4"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Exercise
                    </Button>
                </Link>

                {/* Progress Stepper */}
                <div className="space-y-3">
                    <div className="flex justify-between items-end">
                        <div className="space-y-0.5">
                            <h2 className="text-xl font-bold text-gray-900 font-heading tracking-tight">New Submission</h2>
                            <p className="text-gray-500 font-sans text-xs">Exercise: {exerciseName}</p>
                        </div>
                        <p className="text-[11px] font-bold text-primary font-heading uppercase tracking-widest">Step {currentStep} of {steps.length}</p>
                    </div>
                    <Progress value={progress} className="h-1.5 bg-gray-100" />
                    <div className="flex justify-between mt-4">
                        {steps.map((step) => (
                            <div key={step.id} className="flex flex-col items-center gap-2 flex-1">
                                <div className={cn(
                                    "w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-bold transition-all duration-300",
                                    currentStep >= step.id ? "bg-primary text-white border border-primary shadow-none" : "bg-white text-gray-300 border border-gray-100"
                                )}>
                                    {currentStep > step.id ? <CheckCircle2 className="w-4 h-4" /> : step.id}
                                </div>
                                <span className={cn(
                                    "text-[9px] uppercase font-bold tracking-[0.15em] font-heading text-center",
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
                                    <CardContent className="p-5">
                                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] xl:grid-cols-[1fr_340px] gap-6">
                                            {/* Left Column - Main Content */}
                                            <div className="space-y-4">
                                                {/* Video Upload Section */}
                                                <div>
                                                    <h3 className="text-lg font-bold font-heading mb-3 flex items-center gap-2">
                                                        <Video className="w-4 h-4 text-primary" />
                                                        Video Upload <span className="text-red-500">*</span>
                                                    </h3>
                                                    <input
                                                        type="file"
                                                        ref={videoInputRef}
                                                        accept="video/mp4,video/mov,video/webm"
                                                        onChange={(e) => e.target.files?.[0] && handleVideoUpload(e.target.files[0])}
                                                        className="hidden"
                                                    />
                                                    {!videoFile ? (
                                                        <div
                                                            onClick={() => !isUploading && videoInputRef.current?.click()}
                                                            onDrop={(e) => {
                                                                e.preventDefault()
                                                                if (isUploading) return
                                                                const file = e.dataTransfer.files[0]
                                                                if (file) handleVideoUpload(file)
                                                            }}
                                                            onDragOver={(e) => e.preventDefault()}
                                                            className={cn(
                                                                "border-2 border-dashed rounded-xl p-6 transition-all text-center",
                                                                isUploading 
                                                                    ? "border-gray-300 bg-gray-50 cursor-wait" 
                                                                    : "border-gray-200 hover:border-primary hover:bg-primary/5 cursor-pointer"
                                                            )}
                                                        >
                                                            {isUploading ? (
                                                                <>
                                                                    <Loader2 className="w-8 h-8 text-primary mx-auto mb-2 animate-spin" />
                                                                    <p className="text-sm font-medium text-gray-600 font-sans">Uploading video...</p>
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                                                                    <p className="text-sm font-medium text-gray-600 font-sans mb-1">Click to browse or drag file here</p>
                                                                    <p className="text-xs text-gray-400 font-sans">MP4, MOV or WEBM • Max 500MB</p>
                                                                </>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex items-center justify-between">
                                                            <div className="flex items-center gap-3">
                                                                <Video className="w-8 h-8 text-primary" />
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-900 font-sans">{videoFile.name}</p>
                                                                    <p className="text-xs text-gray-500 font-sans">{formatFileSize(videoFile.size)} • {getFileType(videoFile)}</p>
                                                                </div>
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="sm"
                                                                onClick={() => {
                                                                    setVideoFile(null)
                                                                    if (videoInputRef.current) videoInputRef.current.value = ""
                                                                }}
                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Description Section */}
                                                <div className="flex flex-col">
                                                    <label className="text-xs font-semibold text-gray-700 font-sans mb-2 block">
                                                        Description <span className="text-red-500">*</span>
                                                    </label>
                                                    <div className="flex flex-col">
                                                        <Textarea
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)}
                                                            placeholder="Provide a brief description of your submission..."
                                                            className="min-h-[140px] rounded-xl border-gray-200 font-sans resize-none"
                                                            maxLength={500}
                                                        />
                                                        <p className="text-xs text-gray-500 mt-1.5 font-sans">
                                                            {description.length}/500 characters
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Exercise Topics Display */}
                                                {exerciseTopics.length > 0 && (
                                                    <div>
                                                        <label className="text-sm font-semibold text-gray-700 font-sans mb-1.5 block flex items-center gap-2">
                                                            <Tag className="w-4 h-4" />
                                                            Exercise Topics
                                                        </label>
                                                        <div className="flex flex-wrap gap-2">
                                                            {exerciseTopics.map((topic: string) => (
                                                                <Badge key={topic} className="px-3 py-1 bg-primary/10 text-primary border-none text-xs font-semibold font-heading">
                                                                    {topic}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                        <p className="text-xs text-gray-500 mt-1.5 font-sans">
                                                            Topics are automatically detected from the exercise
                                                        </p>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Right Column - Sidebar */}
                                            <div className="flex flex-col lg:sticky lg:top-6 lg:self-start">
                                                {/* Documents Upload Section */}
                                                <div className="flex-1 flex flex-col">
                                                    <h3 className="text-base font-bold font-heading mb-3 flex items-center gap-2">
                                                        <FileText className="w-3.5 h-3.5 text-primary" />
                                                        Supporting Documents
                                                    </h3>
                                                    
                                                    <div className="flex-1 flex flex-col space-y-6">
                                                        {/* Skeleton Argument */}
                                                        <div className="flex-1 flex flex-col">
                                                            <input
                                                                type="file"
                                                                ref={skeletonInputRef}
                                                                accept=".doc,.docx,.pdf"
                                                                onChange={(e) => e.target.files?.[0] && handleSkeletonUpload(e.target.files[0])}
                                                                className="hidden"
                                                            />
                                                            {!skeletonArgument ? (
                                                                <div
                                                                    onClick={() => skeletonInputRef.current?.click()}
                                                                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-center flex flex-col items-center justify-center min-h-[140px]"
                                                                >
                                                                    <FileText className="w-8 h-8 text-primary mb-2" />
                                                                    <h3 className="text-lg font-bold font-heading mb-2">Skeleton Argument</h3>
                                                                    <p className="text-sm font-medium text-gray-600 font-sans mb-1">Click to browse or drag file here</p>
                                                                    <p className="text-xs text-gray-400 font-sans">Word (.doc, .docx) or PDF • Optional</p>
                                                                </div>
                                                            ) : (
                                                                <div className="border border-gray-200 rounded-xl p-4 bg-gray-50 flex items-center justify-between min-h-[140px]">
                                                                    <div className="flex items-center gap-3">
                                                                        <FileText className="w-8 h-8 text-primary" />
                                                                        <div>
                                                                            <h3 className="text-sm font-bold font-heading mb-1">Skeleton Argument</h3>
                                                                            <p className="text-sm font-semibold text-gray-900 font-sans">{skeletonArgument.name}</p>
                                                                            <p className="text-xs text-gray-500 font-sans">{formatFileSize(skeletonArgument.size)} • {getFileType(skeletonArgument)}</p>
                                                                        </div>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="sm"
                                                                        onClick={() => {
                                                                            setSkeletonArgument(null)
                                                                            if (skeletonInputRef.current) skeletonInputRef.current.value = ""
                                                                        }}
                                                                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            )}
                                                            {uploadErrors.skeleton && (
                                                                <p className="text-xs text-red-600 font-sans mt-1.5 flex items-center gap-1">
                                                                    <X className="w-3 h-3" />
                                                                    {uploadErrors.skeleton}
                                                                </p>
                                                            )}
                                                        </div>

                                                        {/* Case Files */}
                                                        <div className="flex-1 flex flex-col">
                                                            <input
                                                                type="file"
                                                                ref={caseFilesInputRef}
                                                                accept=".pdf,.doc,.docx"
                                                                multiple
                                                                onChange={(e) => handleCaseFilesUpload(e.target.files)}
                                                                className="hidden"
                                                            />
                                                            {caseFiles.length === 0 ? (
                                                                <div
                                                                    onClick={() => caseFilesInputRef.current?.click()}
                                                                    className="border-2 border-dashed border-gray-200 rounded-xl p-6 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-center flex flex-col items-center justify-center min-h-[140px]"
                                                                >
                                                                    <File className="w-8 h-8 text-primary mb-2" />
                                                                    <h3 className="text-lg font-bold font-heading mb-2">Case Files</h3>
                                                                    <p className="text-sm font-medium text-gray-600 font-sans mb-1">Click to browse or drag files here</p>
                                                                    <p className="text-xs text-gray-400 font-sans">PDF, Word (.doc, .docx) • Optional</p>
                                                                </div>
                                                            ) : (
                                                                <div className="flex-1 flex flex-col space-y-2">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <File className="w-5 h-5 text-primary" />
                                                                        <h3 className="text-base font-bold font-heading">Case Files</h3>
                                                                    </div>
                                                                    {caseFiles.map((file, index) => (
                                                                        <div key={index} className="border border-gray-200 rounded-xl p-3 bg-gray-50 flex items-center justify-between">
                                                                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                                                                <File className="w-4 h-4 text-primary shrink-0" />
                                                                                <div className="min-w-0 flex-1">
                                                                                    <p className="text-xs font-medium text-gray-900 font-sans truncate">{file.name}</p>
                                                                                    <p className="text-[10px] text-gray-500 font-sans">{formatFileSize(file.size)}</p>
                                                                                </div>
                                                                            </div>
                                                                            <Button
                                                                                variant="ghost"
                                                                                size="sm"
                                                                                onClick={() => removeCaseFile(index)}
                                                                                className="text-red-600 hover:text-red-700 hover:bg-red-50 shrink-0 h-6 w-6 p-0"
                                                                            >
                                                                                <X className="w-3 h-3" />
                                                                            </Button>
                                                                        </div>
                                                                    ))}
                                                                    <div
                                                                        onClick={() => caseFilesInputRef.current?.click()}
                                                                        className="border border-dashed border-gray-200 rounded-xl p-3 hover:border-primary hover:bg-primary/5 transition-all cursor-pointer text-center"
                                                                    >
                                                                        <p className="text-[10px] text-gray-600 font-sans">+ Add more files</p>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                )}

                                {currentStep === 2 && (
                                    <CardContent className="p-5">
                                        <div className="text-center mb-5">
                                            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                                                <CheckCircle2 className="w-10 h-10" />
                                            </div>
                                            <h3 className="text-xl font-bold font-heading mb-1.5">Review Your Submission</h3>
                                            <p className="text-sm text-gray-500 font-sans">Please review all details before submitting</p>
                                        </div>

                                        <div className="space-y-4">
                                            {/* Exercise Information */}
                                            <div className="border-b border-gray-200 pb-3">
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-heading mb-2">Exercise</h4>
                                                <p className="text-lg font-semibold text-gray-900 font-heading">{exerciseName}</p>
                                                {exercise && (
                                                    <div className="flex items-center gap-2 mt-2">
                                                        <Badge variant="secondary" className="bg-gray-50 text-gray-600 border-none text-[10px]">
                                                            {exercise.subject}
                                                        </Badge>
                                                        <Badge variant="secondary" className="bg-gray-50 text-gray-600 border-none text-[10px]">
                                                            {exercise.difficulty}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Files Review */}
                                            <div className="border-b border-gray-200 pb-3">
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-heading mb-2">Uploaded Files</h4>
                                                <div className="space-y-2">
                                                    {videoFile && (
                                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                                                            <div className="flex items-center gap-3">
                                                                <Video className="w-5 h-5 text-primary" />
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-900 font-sans">{videoFile.name}</p>
                                                                    <p className="text-xs text-gray-500 font-sans">{formatFileSize(videoFile.size)} • {getFileType(videoFile)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {skeletonArgument && (
                                                        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                                                            <div className="flex items-center gap-3">
                                                                <FileText className="w-5 h-5 text-primary" />
                                                                <div>
                                                                    <p className="text-sm font-semibold text-gray-900 font-sans">{skeletonArgument.name}</p>
                                                                    <p className="text-xs text-gray-500 font-sans">{formatFileSize(skeletonArgument.size)} • {getFileType(skeletonArgument)}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                    {caseFiles.length > 0 && (
                                                        <div className="space-y-2">
                                                            {caseFiles.map((file, index) => (
                                                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-sm">
                                                                    <div className="flex items-center gap-3">
                                                                        <File className="w-5 h-5 text-primary" />
                                                                        <div>
                                                                            <p className="text-sm font-semibold text-gray-900 font-sans">{file.name}</p>
                                                                            <p className="text-xs text-gray-500 font-sans">{formatFileSize(file.size)}</p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Description Review */}
                                            <div className="border-b border-gray-200 pb-3">
                                                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-heading mb-2">Description</h4>
                                                <p className="text-sm text-gray-700 font-sans whitespace-pre-wrap">{description || "No description provided"}</p>
                                            </div>

                                            {/* Topics Review */}
                                            {exerciseTopics.length > 0 && (
                                                <div className="border-b border-gray-200 pb-3">
                                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest font-heading mb-2">Topics</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {exerciseTopics.map((topic: string) => (
                                                            <Badge key={topic} className="px-3 py-1 bg-primary/10 text-primary border-none text-xs font-semibold font-heading">
                                                                {topic}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}

                                            {/* Metadata */}
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                                                    <User className="w-4 h-4" />
                                                    <span>User: Alex Thompson</span>
                                                </div>
                                                {uploadTimestamp && (
                                                    <div className="flex items-center gap-2 text-sm text-gray-600 font-sans">
                                                        <Clock className="w-4 h-4" />
                                                        <span>Uploaded: {uploadTimestamp.toLocaleString()}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Terms */}
                                            <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-3 mt-4">
                                                <p className="text-sm text-gray-700 font-sans">
                                                    By submitting, you agree to our terms of analysis. The AI report usually takes 2-5 minutes to generate.
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                )}
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between pt-4">
                    <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                        disabled={currentStep === 1}
                        className="gap-2 font-heading font-bold text-[10px] uppercase tracking-widest h-11 px-6 text-gray-400 hover:text-primary hover:bg-transparent"
                    >
                        <ChevronLeft className="w-4 h-4" /> Previous
                    </Button>
                    <Button
                        onClick={handleProceed}
                        disabled={(currentStep === 1 && !canProceedToStep2) || isSubmitting}
                        className="bg-accent hover:bg-accent/90 text-white px-10 h-11 rounded-sm shadow-none text-[11px] font-bold font-heading uppercase tracking-widest transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Submitting...
                            </>
                        ) : (
                            <>
                                {currentStep === steps.length ? "Submit for Audit" : "Proceed"}
                                {currentStep !== steps.length && <ChevronRight className="w-4 h-4 ml-2" />}
                            </>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    )
}
