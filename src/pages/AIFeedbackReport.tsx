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

// Report data for each submission
const reportDataMap: Record<number, {
    submissionData: {
        exerciseName: string
        submissionDate: Date
        version: number
        subject: string
        overallScore: number
        grade: string
        maxScore: number
    }
    coreRubricScores: Array<{ label: string; value: number; description: string; deduction: number }>
    additionalRubricScores: Array<{ label: string; value: number; description: string; deduction: number }>
    deductions: Array<{ category: string; points: number; description: string; timestamp: string; severity: string }>
    strengths: Array<{ icon: any; text: string }>
    suggestedImprovements: Array<{ priority: string; title: string; description: string; action: string; timestamp: string }>
    transcript: Array<{ time: string; text: string; highlight?: boolean; insight?: string; issue?: string }>
    summary: string
}> = {
    1: {
        submissionData: {
            exerciseName: "Contract Breach - Offer & Acceptance",
            submissionDate: new Date("2024-01-15T14:30:00"),
            version: 3,
            subject: "Contract Law",
            overallScore: 82,
            grade: "A-",
            maxScore: 100,
        },
        coreRubricScores: [
            { label: "Clarity", value: 88, description: "Precise language and clear articulation.", deduction: 0 },
            { label: "Persuasiveness", value: 80, description: "Strong logical arguments, excellent eye contact.", deduction: -5 },
            { label: "Structure", value: 85, description: "Logical flow from intro to conclusion.", deduction: 0 },
        ],
        additionalRubricScores: [
            { label: "Knowledge of Law", value: 82, description: "Accurate citation of relevant cases.", deduction: -3 },
            { label: "Use of Authority", value: 75, description: "Good use of case law with room for improvement.", deduction: -10 },
        ],
        deductions: [
            { category: "Citation", points: -10, description: "Missed opportunity to cite *Blyth v Birmingham Waterworks* when discussing reasonable person test", timestamp: "06:45", severity: "medium" },
            { category: "Structure", points: -3, description: "Introduction slightly exceeded recommended length (3 minutes vs 2 minutes target)", timestamp: "00:00-03:00", severity: "low" },
            { category: "Authority", points: -5, description: "Could have developed case law citations more thoroughly", timestamp: "08:00", severity: "medium" },
        ],
        strengths: [
            { icon: MessageSquare, text: "Excellent use of rhetorical questions at 02:15 to challenge the opposing side's interpretation of *Carlill v Carbolic Smoke Ball Co.*" },
            { icon: Briefcase, text: "Posture and authoritative tone remained consistent throughout the 15-minute submission." },
            { icon: FileText, text: "Strong logical structure with clear progression from introduction through to conclusion." },
        ],
        suggestedImprovements: [
            {
                priority: "medium",
                title: "Improve citation density",
                description: "Several opportunities to cite relevant case law were missed, particularly when discussing the reasonable person test.",
                action: "Prepare a list of key cases for each legal principle you plan to discuss. Reference them explicitly during your submission.",
                timestamp: "06:45"
            },
            {
                priority: "low",
                title: "Optimize introduction length",
                description: "Your introduction took 3 minutes, which is slightly longer than the recommended 2 minutes.",
                action: "Practice delivering a more concise introduction that reaches core submissions within 2 minutes.",
                timestamp: "00:00-03:00"
            },
        ],
        transcript: [
            { time: "00:00", text: "May it please the court, my name is Alex Thompson and I appear on behalf of the Appellant in this matter." },
            { time: "00:15", text: "I would like to begin by thanking the court for its time and attention to this important case." },
            { time: "00:30", text: "This case concerns a fundamental breach of contract arising from the purported offer made by the Respondent on the 14th of June.", highlight: true },
            { time: "01:20", text: "If we turn to the first point of submission, we must consider the intention to create legal relations. The Respondent argues that this was a mere 'puff', but we submit that the specificity of the terms suggests otherwise." },
            { time: "02:15", text: "As established in the case of *Carlill v Carbolic Smoke Ball Co.*, the notification of acceptance can be waived by the offeror through the nature of the transaction itself.", insight: "Strategic use of authority cited." },
            { time: "03:30", text: "The Respondent's argument that this was not a serious offer is contradicted by the evidence. The advertisement contained specific terms, including the exact amount and conditions for acceptance." },
            { time: "05:45", text: "Turning now to the second point, we must examine the postal rule as it applies to this case. The acceptance was posted on the 15th of June, which was within the time limit specified in the offer." },
            { time: "06:45", text: "The reasonable person test would suggest that the offeror should have anticipated that acceptance might be communicated by post, given the nature of the transaction.", issue: "Should reference *Blyth v Birmingham Waterworks* explicitly" },
            { time: "08:00", text: "In *Adams v Lindsell*, the court established that acceptance is effective upon posting, not upon receipt. This principle directly applies to our case." },
            { time: "09:30", text: "The Respondent's argument that the offer had lapsed is without merit. The offer clearly stated it would remain open until the 20th of June, and our acceptance was posted well before that date." },
            { time: "11:00", text: "We submit that the contract was validly formed, and the Respondent is in breach of their obligations under that contract." },
            { time: "12:30", text: "In conclusion, we respectfully submit that the Appellant's case is well-founded, and we ask the court to find in our favor." },
        ],
        summary: "First Class (1st). Excellent structure and clarity, with strong use of authority."
    },
    2: {
        submissionData: {
            exerciseName: "Contract Breach - Offer & Acceptance",
            submissionDate: new Date("2024-01-10T10:15:00"),
            version: 2,
            subject: "Contract Law",
            overallScore: 78,
            grade: "B+",
            maxScore: 100,
        },
        coreRubricScores: [
            { label: "Clarity", value: 85, description: "Precise language and clear articulation.", deduction: 0 },
            { label: "Persuasiveness", value: 72, description: "Strong logical arguments, good eye contact.", deduction: -8 },
            { label: "Structure", value: 90, description: "Logical flow from intro to conclusion.", deduction: 0 },
        ],
        additionalRubricScores: [
            { label: "Knowledge of Law", value: 78, description: "Accurate citation of relevant cases.", deduction: -2 },
            { label: "Use of Authority", value: 65, description: "Some missed opportunities with case law.", deduction: -12 },
        ],
        deductions: [
            { category: "Accuracy", points: -12, description: "Misrepresentation detected: Claimed Respondent 'admitted liability' when case file shows only 'knowledge of the incident'", timestamp: "04:30", severity: "high" },
            { category: "Citation", points: -8, description: "Missed opportunity to cite *Blyth v Birmingham Waterworks* when discussing reasonable person test", timestamp: "06:45", severity: "medium" },
            { category: "Structure", points: -2, description: "Introduction exceeded recommended length (4 minutes vs 2 minutes target)", timestamp: "00:00-04:00", severity: "low" },
        ],
        strengths: [
            { icon: MessageSquare, text: "Excellent use of rhetorical questions at 02:15 to challenge the opposing side's interpretation of *Carlill v Carbolic Smoke Ball Co.*" },
            { icon: Briefcase, text: "Posture and authoritative tone remained consistent throughout the 15-minute submission." },
        ],
        suggestedImprovements: [
            {
                priority: "high",
                title: "Verify factual claims against case files",
                description: "At 04:30, you stated the Respondent 'admitted liability'. Cross-check all factual claims against uploaded case files to ensure accuracy.",
                action: "Review case files before making factual assertions. Accuracy deductions significantly impact your score.",
                timestamp: "04:30"
            },
            {
                priority: "high",
                title: "Improve citation density",
                description: "Several opportunities to cite relevant case law were missed, particularly when discussing the reasonable person test.",
                action: "Prepare a list of key cases for each legal principle you plan to discuss. Reference them explicitly during your submission.",
                timestamp: "06:45"
            },
            {
                priority: "medium",
                title: "Optimize introduction length",
                description: "Your introduction took 4 minutes, which is longer than the recommended 2 minutes for a 15-minute submission.",
                action: "Practice delivering a concise introduction that covers: (1) Your name and representation, (2) Brief case overview, (3) Main points you'll address. Aim to reach core submissions within 2 minutes.",
                timestamp: "00:00-04:00"
            },
        ],
        transcript: [
            { time: "00:00", text: "May it please the court, my name is Alex Thompson and I appear on behalf of the Appellant in this matter." },
            { time: "00:15", text: "I would like to begin by thanking the court for its time and attention to this important case." },
            { time: "00:30", text: "This case concerns a fundamental breach of contract arising from the purported offer made by the Respondent on the 14th of June.", highlight: true },
            { time: "01:20", text: "If we turn to the first point of submission, we must consider the intention to create legal relations. The Respondent argues that this was a mere 'puff', but we submit that the specificity of the terms suggests otherwise." },
            { time: "02:15", text: "As established in the case of *Carlill v Carbolic Smoke Ball Co.*, the notification of acceptance can be waived by the offeror through the nature of the transaction itself.", insight: "Strategic use of authority cited." },
            { time: "03:30", text: "The Respondent's argument that this was not a serious offer is contradicted by the evidence. The advertisement contained specific terms, including the exact amount and conditions for acceptance." },
            { time: "04:30", text: "Furthermore, the Respondent admitted liability in the case file, which clearly demonstrates their acknowledgment of the contract's validity.", highlight: true, issue: "Misrepresentation: Respondent only admitted 'knowledge of the incident', not liability" },
            { time: "05:45", text: "Turning now to the second point, we must examine the postal rule as it applies to this case. The acceptance was posted on the 15th of June, which was within the time limit specified in the offer." },
            { time: "06:45", text: "The reasonable person test would suggest that the offeror should have anticipated that acceptance might be communicated by post, given the nature of the transaction.", issue: "Should reference *Blyth v Birmingham Waterworks* explicitly" },
            { time: "08:00", text: "In *Adams v Lindsell*, the court established that acceptance is effective upon posting, not upon receipt. This principle directly applies to our case." },
            { time: "09:30", text: "The Respondent's argument that the offer had lapsed is without merit. The offer clearly stated it would remain open until the 20th of June, and our acceptance was posted well before that date." },
            { time: "11:00", text: "We submit that the contract was validly formed, and the Respondent is in breach of their obligations under that contract." },
            { time: "12:30", text: "In conclusion, we respectfully submit that the Appellant's case is well-founded, and we ask the court to find in our favor." },
        ],
        summary: "Upper Second (2:1). Strong logic, but citation density needs work."
    },
    3: {
        submissionData: {
            exerciseName: "Negligence Case - Duty of Care",
            submissionDate: new Date("2024-01-12T16:45:00"),
            version: 1,
            subject: "Tort Law",
            overallScore: 74,
            grade: "B",
            maxScore: 100,
        },
        coreRubricScores: [
            { label: "Clarity", value: 75, description: "Generally clear but some areas could be more precise.", deduction: -5 },
            { label: "Persuasiveness", value: 70, description: "Logical arguments presented, but could be more compelling.", deduction: -10 },
            { label: "Structure", value: 78, description: "Good structure with minor flow issues.", deduction: -2 },
        ],
        additionalRubricScores: [
            { label: "Knowledge of Law", value: 72, description: "Adequate understanding of legal principles.", deduction: -8 },
            { label: "Use of Authority", value: 60, description: "Limited use of case law to support arguments.", deduction: -20 },
        ],
        deductions: [
            { category: "Authority", points: -20, description: "Insufficient case law citations throughout the submission", timestamp: "Throughout", severity: "high" },
            { category: "Clarity", points: -5, description: "Some legal terminology used imprecisely", timestamp: "05:00", severity: "medium" },
            { category: "Persuasiveness", points: -10, description: "Arguments could be strengthened with more rhetorical techniques", timestamp: "Throughout", severity: "medium" },
        ],
        strengths: [
            { icon: Briefcase, text: "Good understanding of the duty of care principle and its application." },
            { icon: FileText, text: "Clear structure with logical progression of arguments." },
        ],
        suggestedImprovements: [
            {
                priority: "high",
                title: "Increase case law citations",
                description: "Your submission lacked sufficient reference to relevant case law, particularly in discussing the neighbor principle.",
                action: "Research and prepare key cases for each legal principle. Aim to cite at least 3-4 cases in a 15-minute submission.",
                timestamp: "Throughout"
            },
            {
                priority: "medium",
                title: "Improve legal terminology",
                description: "Some terms were used imprecisely, which may have affected clarity.",
                action: "Review legal terminology before submission. Ensure precise use of terms like 'duty', 'breach', and 'causation'.",
                timestamp: "05:00"
            },
        ],
        transcript: [
            { time: "00:00", text: "May it please the court, my name is Alex Thompson and I appear on behalf of the Claimant in this negligence matter." },
            { time: "00:30", text: "This case concerns whether the Defendant owed a duty of care to the Claimant in the circumstances of this accident." },
            { time: "02:00", text: "The neighbor principle, established in Donoghue v Stevenson, requires us to consider whether the Defendant could reasonably foresee harm to the Claimant." },
            { time: "04:00", text: "In this case, the Defendant was driving at the speed limit but failed to notice the Claimant due to poor visibility." },
            { time: "05:00", text: "The duty of care requires that a reasonable person would have taken precautions in these circumstances.", issue: "Terminology could be more precise here" },
            { time: "07:00", text: "We submit that the Defendant breached this duty by failing to exercise reasonable care." },
            { time: "09:00", text: "The causation element is satisfied as the Defendant's breach directly led to the Claimant's injuries." },
            { time: "11:00", text: "In conclusion, we respectfully ask the court to find in favor of the Claimant." },
        ],
        summary: "Upper Second (2:1). Solid understanding but needs more case law support."
    },
    5: {
        submissionData: {
            exerciseName: "Contract Breach - Offer & Acceptance",
            submissionDate: new Date("2024-01-05T11:00:00"),
            version: 1,
            subject: "Contract Law",
            overallScore: 71,
            grade: "B-",
            maxScore: 100,
        },
        coreRubricScores: [
            { label: "Clarity", value: 70, description: "Some areas lacked clarity and precision.", deduction: -10 },
            { label: "Persuasiveness", value: 68, description: "Arguments were logical but not particularly compelling.", deduction: -12 },
            { label: "Structure", value: 75, description: "Adequate structure but could be improved.", deduction: -5 },
        ],
        additionalRubricScores: [
            { label: "Knowledge of Law", value: 70, description: "Basic understanding of legal principles.", deduction: -10 },
            { label: "Use of Authority", value: 58, description: "Limited and sometimes incorrect use of case law.", deduction: -22 },
        ],
        deductions: [
            { category: "Authority", points: -22, description: "Incorrect citation of case law and missed key cases", timestamp: "Throughout", severity: "high" },
            { category: "Clarity", points: -10, description: "Some arguments were unclear or poorly articulated", timestamp: "03:00-07:00", severity: "high" },
            { category: "Structure", points: -5, description: "Transitions between arguments could be smoother", timestamp: "Throughout", severity: "medium" },
        ],
        strengths: [
            { icon: Briefcase, text: "Demonstrated understanding of basic contract formation principles." },
        ],
        suggestedImprovements: [
            {
                priority: "high",
                title: "Improve case law knowledge",
                description: "Several case citations were incorrect or incomplete. This significantly impacted your score.",
                action: "Thoroughly research and verify all case citations before submission. Create a reference list of key cases for contract law.",
                timestamp: "Throughout"
            },
            {
                priority: "high",
                title: "Enhance clarity and articulation",
                description: "Some arguments were difficult to follow due to unclear language.",
                action: "Practice articulating legal arguments more clearly. Consider recording yourself and reviewing for clarity.",
                timestamp: "03:00-07:00"
            },
        ],
        transcript: [
            { time: "00:00", text: "May it please the court, my name is Alex Thompson and I appear on behalf of the Appellant." },
            { time: "01:00", text: "This case is about a contract that was broken by the Respondent." },
            { time: "03:00", text: "The offer was made and we think it was accepted, so there should be a contract.", issue: "Arguments could be more clearly articulated" },
            { time: "05:00", text: "There's a case called Carlill that says offers can be accepted in different ways." },
            { time: "07:00", text: "We think the contract is valid and the Respondent broke it." },
            { time: "09:00", text: "Thank you for your time." },
        ],
        summary: "Lower Second (2:2). Basic understanding but needs significant improvement in case law and clarity."
    },
    4: {
        submissionData: {
            exerciseName: "Criminal Law - Mens Rea",
            submissionDate: new Date("2024-01-14T09:20:00"),
            version: 1,
            subject: "Criminal Law",
            overallScore: 76,
            grade: "B+",
            maxScore: 100,
        },
        coreRubricScores: [
            { label: "Clarity", value: 80, description: "Clear articulation of legal concepts.", deduction: -5 },
            { label: "Persuasiveness", value: 75, description: "Good logical arguments with effective presentation.", deduction: -8 },
            { label: "Structure", value: 78, description: "Well-organized structure with clear progression.", deduction: -3 },
        ],
        additionalRubricScores: [
            { label: "Knowledge of Law", value: 80, description: "Strong understanding of mens rea principles.", deduction: -5 },
            { label: "Use of Authority", value: 70, description: "Good use of case law, could cite more recent authorities.", deduction: -15 },
        ],
        deductions: [
            { category: "Authority", points: -15, description: "Could have cited more recent cases on mens rea, particularly *R v Woollin*", timestamp: "06:00", severity: "medium" },
            { category: "Clarity", points: -5, description: "Some technical terms could have been explained more clearly", timestamp: "04:00", severity: "low" },
            { category: "Structure", points: -3, description: "Minor transition issues between different levels of mens rea", timestamp: "07:00", severity: "low" },
        ],
        strengths: [
            { icon: MessageSquare, text: "Excellent explanation of the different levels of mens rea (intention, recklessness, negligence)." },
            { icon: Briefcase, text: "Strong understanding of the distinction between subjective and objective tests." },
            { icon: FileText, text: "Good use of case law including *R v G and Another* and *R v Caldwell*." },
        ],
        suggestedImprovements: [
            {
                priority: "medium",
                title: "Include more recent authorities",
                description: "While you cited classic cases, consider including more recent developments in mens rea jurisprudence.",
                action: "Research recent cases on mens rea, particularly those dealing with recklessness and the subjective test.",
                timestamp: "06:00"
            },
            {
                priority: "low",
                title: "Clarify technical terminology",
                description: "Some technical terms like 'oblique intention' could benefit from brief explanation for clarity.",
                action: "When introducing technical legal terms, provide a brief definition or explanation to aid understanding.",
                timestamp: "04:00"
            },
        ],
        transcript: [
            { time: "00:00", text: "May it please the court, my name is Alex Thompson and I appear on behalf of the Defendant in this matter." },
            { time: "00:30", text: "This case concerns the mental element, or mens rea, required for the offense of criminal damage.", highlight: true },
            { time: "02:00", text: "Mens rea, the guilty mind, is a fundamental requirement in criminal law. We must distinguish between different levels of mental culpability." },
            { time: "04:00", text: "The highest level is intention, which can be direct or oblique. Oblique intention arises when the defendant foresees a consequence as virtually certain.", issue: "Could explain 'oblique intention' more clearly" },
            { time: "06:00", text: "As established in *R v G and Another*, recklessness requires that the defendant was aware of a risk and unreasonably took that risk.", issue: "Could cite more recent authorities" },
            { time: "08:00", text: "The subjective test, as opposed to the objective test in *Caldwell*, requires us to look at what the defendant actually knew or foresaw." },
            { time: "10:00", text: "In this case, the Defendant did not have the necessary mens rea for the offense, as they lacked both intention and recklessness." },
            { time: "12:00", text: "We therefore submit that the Defendant should be acquitted of this charge." },
        ],
        summary: "Upper Second (2:1). Strong understanding of mens rea with good case law application."
    },
    6: {
        submissionData: {
            exerciseName: "Constitutional Review",
            submissionDate: new Date("2024-01-08T13:30:00"),
            version: 1,
            subject: "Public Law",
            overallScore: 88,
            grade: "A",
            maxScore: 100,
        },
        coreRubricScores: [
            { label: "Clarity", value: 92, description: "Exceptionally clear and precise language throughout.", deduction: 0 },
            { label: "Persuasiveness", value: 88, description: "Highly compelling arguments with excellent rhetorical techniques.", deduction: -2 },
            { label: "Structure", value: 90, description: "Excellent logical flow and organization.", deduction: 0 },
        ],
        additionalRubricScores: [
            { label: "Knowledge of Law", value: 90, description: "Outstanding understanding and application of legal principles.", deduction: 0 },
            { label: "Use of Authority", value: 85, description: "Excellent use of case law and statutory authority.", deduction: -5 },
        ],
        deductions: [
            { category: "Authority", points: -5, description: "Minor opportunity to cite additional relevant authorities", timestamp: "07:00", severity: "low" },
            { category: "Persuasiveness", points: -2, description: "Could have used one more rhetorical question for emphasis", timestamp: "09:00", severity: "low" },
        ],
        strengths: [
            { icon: MessageSquare, text: "Outstanding use of rhetorical techniques and persuasive language throughout." },
            { icon: Briefcase, text: "Exceptional command of constitutional law principles and their application." },
            { icon: FileText, text: "Perfect structure with seamless transitions between arguments." },
            { icon: CheckCircle2, text: "Comprehensive citation of relevant case law and statutory provisions." },
        ],
        suggestedImprovements: [
            {
                priority: "low",
                title: "Consider additional authorities",
                description: "While your use of authority was excellent, there were opportunities to cite additional relevant cases.",
                action: "Continue building your case law library. Consider including more recent authorities where relevant.",
                timestamp: "07:00"
            },
        ],
        transcript: [
            { time: "00:00", text: "May it please the court, my name is Alex Thompson and I appear on behalf of the Applicant in this matter of constitutional review." },
            { time: "00:30", text: "This case raises fundamental questions about the separation of powers and the limits of judicial review in our constitutional framework.", highlight: true },
            { time: "02:00", text: "As established in *R v Secretary of State for the Home Department, ex parte Fire Brigades Union*, the courts have a duty to ensure that executive action does not exceed constitutional boundaries." },
            { time: "04:00", text: "The principle of legality, as articulated in *R (Jackson) v Attorney General*, requires that fundamental rights cannot be abrogated without clear statutory authority." },
            { time: "06:00", text: "In the present case, the Respondent's actions clearly contravene these established constitutional principles.", insight: "Excellent application of constitutional principles" },
            { time: "08:00", text: "We submit that the court must exercise its powers of judicial review to protect the constitutional order and the rights of citizens." },
            { time: "10:00", text: "In conclusion, we respectfully submit that the application for judicial review should be granted." },
        ],
        summary: "First Class (1st). Outstanding performance with exceptional clarity and authority."
    },
}

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
        <div className="flex-1 bg-[#fcf8f8] dark:bg-gray-950 min-h-screen p-6">
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
