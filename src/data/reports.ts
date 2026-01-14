import { MessageSquare, Briefcase, FileText, CheckCircle2 } from "lucide-react"

// Report data for each submission
export const reportDataMap: Record<number, {
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
