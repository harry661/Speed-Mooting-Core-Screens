import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Clock, Scale, FileText, Download, ChevronRight, Star, Tag } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { getExerciseById } from "@/data/exercises"

// Fallback exercise data structure (for backwards compatibility - keeping full data from ExerciseDetail)
const fallbackExerciseData: Record<number, {
    id: number
    title: string
    description: string
    subject: string
    difficulty: "Beginner" | "Intermediate" | "Advanced"
    type: string
    time: string
    rating: number
    caseDetails: {
        factualBackground: string
        legalIssues: string
    }
    argumentsFor: string[]
    argumentsAgainst: string[]
    rules: string
    rubric: Array<{ name: string; description: string }>
    topics: string[]
    keywords: string[]
    caseFiles: Array<{ name: string; size: string; type: string }>
}> = {
    1: {
        id: 1,
        title: "Contract Breach - Offer & Acceptance",
        description: "A comprehensive exercise examining the fundamental principles of contract formation, focusing on the elements of offer, acceptance, and consideration in a commercial dispute context.",
        subject: "Contract Law",
        difficulty: "Beginner",
        type: "Mock Trial",
        time: "15 mins",
        rating: 4.8,
        caseDetails: {
            factualBackground: "On 1st January 2024, ABC Ltd sent a letter to XYZ Corp offering to supply 100 units of industrial equipment at £5,000 per unit, with delivery within 30 days. The letter stated 'This offer remains open until 15th January 2024'. On 10th January, XYZ Corp sent a letter accepting the offer but requesting delivery within 20 days instead of 30. ABC Ltd received this on 12th January but did not respond. On 14th January, XYZ Corp sent another letter accepting the original terms. ABC Ltd now claims no contract exists.",
            legalIssues: "Whether the first response from XYZ Corp constituted a counter-offer or conditional acceptance; whether the second acceptance was valid; the application of the postal rule; and the requirement for certainty of terms in contract formation."
        },
        argumentsFor: [
            "The first communication from XYZ Corp was a counter-offer, which terminated the original offer under the principle in Hyde v Wrench (1840).",
            "The second acceptance was valid as it matched the original offer terms exactly, creating a binding contract.",
            "The postal rule applies, meaning acceptance was effective upon posting on 14th January, before the offer's expiry."
        ],
        argumentsAgainst: [
            "The first communication was a mere inquiry about delivery terms, not a counter-offer, and the original offer remained open.",
            "ABC Ltd's silence after receiving the first communication should be interpreted as acceptance of the modified terms.",
            "The offer had lapsed by the time of the second acceptance due to the passage of time and changed circumstances."
        ],
        rules: "Participants must present arguments for both sides. Each submission must be between 10-15 minutes. Reference to at least three relevant cases is required. Skeleton arguments must be submitted 48 hours before the oral presentation.",
        rubric: [
            { name: "Clarity", description: "Precise language, clear articulation, and effective communication of legal concepts." },
            { name: "Persuasiveness", description: "Strength of logical arguments, use of rhetorical techniques, and ability to convince." },
            { name: "Structure", description: "Logical flow from introduction to conclusion, clear organization of arguments." },
            { name: "Knowledge of Law", description: "Accurate understanding and application of legal principles, correct citation of cases." },
            { name: "Use of Authority", description: "Effective use of case law, statutes, and legal commentary to support arguments." }
        ],
        topics: ["Contract Formation", "Offer and Acceptance", "Postal Rule", "Counter-Offers", "Certainty of Terms"],
        keywords: ["contract", "offer", "acceptance", "postal rule", "counter-offer", "certainty", "commercial law"],
        caseFiles: [
            { name: "Case_File_ABC_v_XYZ.pdf", size: "2.4 MB", type: "PDF" },
            { name: "Exhibit_A_Letter_ABC.pdf", size: "156 KB", type: "PDF" },
            { name: "Exhibit_B_Letter_XYZ.pdf", size: "142 KB", type: "PDF" },
            { name: "Relevant_Case_Law.zip", size: "5.1 MB", type: "ZIP" }
        ]
    },
    2: {
        id: 2,
        title: "Negligence Case - Duty of Care",
        description: "An intermediate-level exercise exploring the duty of care in negligence, examining the neighbor principle and the modern approach to establishing duty in novel situations.",
        subject: "Tort Law",
        difficulty: "Intermediate",
        type: "Mock Trial",
        time: "20 mins",
        rating: 4.5,
        caseDetails: {
            factualBackground: "The Claimant, a pedestrian, was injured when struck by a vehicle driven by the Defendant. The accident occurred at a pedestrian crossing where the traffic lights were malfunctioning. The local council had been notified of the fault three days prior but had not yet repaired it. The Defendant was driving at the speed limit but failed to notice the Claimant due to poor visibility caused by heavy rain.",
            legalIssues: "Whether the Defendant owed a duty of care to the Claimant; whether the Defendant breached that duty; causation and remoteness of damage; and potential contributory negligence by the Claimant."
        },
        argumentsFor: [
            "The Defendant owed a duty of care to all road users, including pedestrians, under the principle established in Donoghue v Stevenson (1932).",
            "The Defendant breached this duty by failing to exercise reasonable care in the circumstances, particularly given the known traffic light malfunction.",
            "The Defendant's failure to notice the Claimant was a direct cause of the injury, satisfying the 'but for' test."
        ],
        argumentsAgainst: [
            "The primary duty lay with the local council to maintain safe road conditions, and the Defendant was entitled to rely on the traffic system functioning correctly.",
            "The poor visibility and weather conditions created an unforeseeable situation that no reasonable driver could have anticipated.",
            "The Claimant contributed to the accident by crossing when visibility was poor, constituting contributory negligence."
        ],
        rules: "Participants must address both the driver's duty and the council's potential liability. Minimum 12 minutes presentation. Must reference at least four cases. Skeleton argument required.",
        rubric: [
            { name: "Clarity", description: "Clear explanation of legal principles and their application to the facts." },
            { name: "Persuasiveness", description: "Compelling arguments supported by authority and logical reasoning." },
            { name: "Structure", description: "Well-organized presentation with clear introduction, body, and conclusion." },
            { name: "Knowledge of Law", description: "Accurate understanding of negligence principles and relevant case law." },
            { name: "Use of Authority", description: "Effective citation and application of leading cases in negligence." }
        ],
        topics: ["Duty of Care", "Breach of Duty", "Causation", "Contributory Negligence", "Public Authority Liability"],
        keywords: ["negligence", "duty of care", "breach", "causation", "contributory negligence", "tort"],
        caseFiles: [
            { name: "Accident_Report.pdf", size: "1.8 MB", type: "PDF" },
            { name: "Witness_Statements.pdf", size: "3.2 MB", type: "PDF" },
            { name: "Traffic_Light_Maintenance_Records.pdf", size: "892 KB", type: "PDF" }
        ]
    },
    3: {
        id: 3,
        title: "Criminal Law - Mens Rea",
        description: "A beginner-friendly exercise focusing on the mental element in criminal law, examining different levels of mens rea and their application to various offenses.",
        subject: "Criminal Law",
        difficulty: "Beginner",
        type: "Mock Trial",
        time: "12 mins",
        rating: 4.9,
        caseDetails: {
            factualBackground: "The Defendant was charged with causing death by dangerous driving. Evidence shows the Defendant was driving at 45 mph in a 30 mph zone when they struck and killed a pedestrian. The Defendant claims they were unaware of the speed limit due to a missing road sign and were distracted by a phone notification. Medical evidence shows the Defendant had consumed alcohol but was below the legal limit.",
            legalIssues: "Whether the Defendant had the necessary mens rea for the offense; the distinction between intention, recklessness, and negligence; whether the Defendant's state of mind meets the required standard for causing death by dangerous driving."
        },
        argumentsFor: [
            "The Defendant demonstrated recklessness by driving above the speed limit and while distracted, showing a conscious disregard for the risk to others.",
            "The combination of speeding, distraction, and alcohol consumption (even if below the limit) indicates a gross deviation from the standard of care expected of a reasonable driver.",
            "The Defendant's awareness of the risk is evidenced by their decision to check their phone while driving."
        ],
        argumentsAgainst: [
            "The Defendant lacked the necessary mens rea as they were genuinely unaware of the speed limit due to the missing sign, negating any intention or recklessness.",
            "The Defendant's actions constituted mere negligence, not the higher standard required for causing death by dangerous driving.",
            "The phone notification was an unforeseeable distraction that does not establish the required mental element."
        ],
        rules: "Must address both actus reus and mens rea. Presentation between 10-12 minutes. Reference to at least three criminal law cases required.",
        rubric: [
            { name: "Clarity", description: "Clear explanation of mens rea concepts and their application." },
            { name: "Persuasiveness", description: "Strong arguments supported by criminal law principles." },
            { name: "Structure", description: "Logical presentation of legal arguments." },
            { name: "Knowledge of Law", description: "Accurate understanding of criminal law principles and mens rea." },
            { name: "Use of Authority", description: "Effective use of criminal cases and statutory interpretation." }
        ],
        topics: ["Mens Rea", "Actus Reus", "Intention", "Recklessness", "Negligence", "Dangerous Driving"],
        keywords: ["mens rea", "actus reus", "intention", "recklessness", "criminal law", "dangerous driving"],
        caseFiles: [
            { name: "Police_Report.pdf", size: "2.1 MB", type: "PDF" },
            { name: "Medical_Evidence.pdf", size: "1.5 MB", type: "PDF" },
            { name: "Road_Sign_Photographs.pdf", size: "3.4 MB", type: "PDF" }
        ]
    },
    4: {
        id: 4,
        title: "Constitutional Review",
        description: "An advanced exercise examining judicial review principles, separation of powers, and constitutional interpretation in public law disputes.",
        subject: "Public Law",
        difficulty: "Advanced",
        type: "Mock Trial",
        time: "30 mins",
        rating: 4.7,
        caseDetails: {
            factualBackground: "The Government introduced new regulations under the Public Health Act 2020 that restrict public gatherings during health emergencies. A civil liberties organization challenges these regulations, arguing they violate fundamental rights protected under the Constitution. The regulations were made using delegated powers, and the organization claims the powers are too broad and unconstitutional.",
            legalIssues: "Whether the delegated powers are constitutionally valid; whether the regulations violate fundamental rights; the scope of judicial review of delegated legislation; and the balance between public health and individual liberties."
        },
        argumentsFor: [
            "The delegated powers are too broad and violate the separation of powers principle, as they allow the executive to make law without adequate parliamentary oversight.",
            "The regulations disproportionately restrict fundamental rights and fail to meet the proportionality test required for such restrictions.",
            "The enabling Act does not provide sufficient guidance on how the powers should be exercised, making the delegation unconstitutional."
        ],
        argumentsAgainst: [
            "The delegated powers are necessary and proportionate to address public health emergencies, which require swift executive action.",
            "The regulations are subject to parliamentary scrutiny and can be annulled, providing adequate democratic oversight.",
            "The restrictions are temporary, necessary, and justified by the compelling public interest in protecting public health."
        ],
        rules: "Must address both constitutional principles and human rights law. Presentation 25-30 minutes. Reference to constitutional cases and human rights jurisprudence required.",
        rubric: [
            { name: "Clarity", description: "Clear explanation of complex constitutional principles." },
            { name: "Persuasiveness", description: "Compelling arguments balancing competing interests." },
            { name: "Structure", description: "Well-organized analysis of legal principles." },
            { name: "Knowledge of Law", description: "Accurate understanding of constitutional and public law." },
            { name: "Use of Authority", description: "Effective use of constitutional cases and human rights law." }
        ],
        topics: ["Judicial Review", "Separation of Powers", "Delegated Legislation", "Human Rights", "Proportionality"],
        keywords: ["constitutional", "judicial review", "separation of powers", "human rights", "delegated legislation"],
        caseFiles: [
            { name: "Public_Health_Act_2020.pdf", size: "1.2 MB", type: "PDF" },
            { name: "Regulations_Challenge.pdf", size: "856 KB", type: "PDF" },
            { name: "Constitutional_Cases.zip", size: "4.8 MB", type: "ZIP" }
        ]
    },
    5: {
        id: 5,
        title: "Property Dispute - Easedments",
        description: "An intermediate exercise exploring easements, rights of way, and property disputes involving land use and access rights.",
        subject: "Property Law",
        difficulty: "Intermediate",
        type: "Mock Trial",
        time: "25 mins",
        rating: 4.2,
        caseDetails: {
            factualBackground: "The Claimant owns a property that has been accessed via a track across the Defendant's land for over 40 years. The track was used by the previous owner of the Claimant's property and has been maintained by the Claimant for the past 20 years. The Defendant now wishes to block the track, claiming there is no legal right of way. The track is not registered as an easement in the land registry.",
            legalIssues: "Whether an easement by prescription has been established; the requirements for prescriptive easements; whether the use was 'as of right'; and the impact of the Land Registration Act 2002 on prescriptive rights."
        },
        argumentsFor: [
            "The use of the track for over 40 years establishes a prescriptive easement under common law principles, as the use was continuous, open, and without permission.",
            "The Claimant's maintenance of the track demonstrates the use was 'as of right' and not merely permissive.",
            "The long period of use creates a strong presumption in favor of the easement, which the Defendant must rebut."
        ],
        argumentsAgainst: [
            "The use was permissive and not 'as of right', as the previous owners had a friendly relationship and the use was by consent.",
            "The Land Registration Act 2002 requires registration of easements, and the failure to register means no legal right exists.",
            "The track was used for convenience, not necessity, and no easement is required for reasonable access."
        ],
        rules: "Must address both common law and statutory requirements. Presentation 20-25 minutes. Reference to property law cases and land registration principles required.",
        rubric: [
            { name: "Clarity", description: "Clear explanation of property law concepts." },
            { name: "Persuasiveness", description: "Strong arguments supported by property law principles." },
            { name: "Structure", description: "Logical presentation of legal analysis." },
            { name: "Knowledge of Law", description: "Accurate understanding of easements and property law." },
            { name: "Use of Authority", description: "Effective citation of property law cases." }
        ],
        topics: ["Easements", "Prescription", "Rights of Way", "Land Registration", "Property Rights"],
        keywords: ["easement", "prescription", "right of way", "property", "land registration"],
        caseFiles: [
            { name: "Title_Deeds.pdf", size: "2.3 MB", type: "PDF" },
            { name: "Land_Registry_Records.pdf", size: "1.8 MB", type: "PDF" },
            { name: "Historical_Photographs.pdf", size: "5.2 MB", type: "PDF" }
        ]
    },
    6: {
        id: 6,
        title: "Evidence Admissibility",
        description: "An advanced exercise focusing on the rules of evidence, admissibility of evidence, and the exclusionary rules in civil and criminal proceedings.",
        subject: "Litigation",
        difficulty: "Advanced",
        type: "Mock Trial",
        time: "15 mins",
        rating: 4.6,
        caseDetails: {
            factualBackground: "In a commercial fraud trial, the prosecution seeks to admit evidence obtained from the Defendant's personal computer during a search conducted under a warrant. The defense argues the evidence is inadmissible because the warrant was overly broad, the search exceeded the warrant's scope, and some evidence was obtained through hacking software installed by the police. The evidence includes emails, financial records, and encrypted files that were decrypted by forensic experts.",
            legalIssues: "Whether the search warrant was valid and sufficiently specific; whether the search exceeded the warrant's scope; the admissibility of evidence obtained through potentially unlawful means; and the application of the exclusionary rule in criminal proceedings."
        },
        argumentsFor: [
            "The warrant was valid and specific, and the evidence was obtained within its scope, making it admissible.",
            "The evidence is highly probative and its exclusion would undermine the administration of justice.",
            "Any technical breaches of the warrant were minor and do not justify exclusion of crucial evidence."
        ],
        argumentsAgainst: [
            "The warrant was overly broad and failed to specify the items to be seized, making it invalid under the relevant legislation.",
            "The use of hacking software exceeded the warrant's scope and constituted an unlawful search.",
            "The evidence should be excluded under the exclusionary rule to protect the integrity of the criminal justice system and deter police misconduct."
        ],
        rules: "Must address both statutory and common law rules of evidence. Presentation 12-15 minutes. Reference to evidence law cases and statutory provisions required.",
        rubric: [
            { name: "Clarity", description: "Clear explanation of complex evidence law principles." },
            { name: "Persuasiveness", description: "Compelling arguments on admissibility issues." },
            { name: "Structure", description: "Well-organized analysis of evidence rules." },
            { name: "Knowledge of Law", description: "Accurate understanding of evidence law and criminal procedure." },
            { name: "Use of Authority", description: "Effective citation of evidence cases and statutory provisions." }
        ],
        topics: ["Evidence Admissibility", "Search Warrants", "Exclusionary Rule", "Criminal Procedure", "Digital Evidence"],
        keywords: ["evidence", "admissibility", "search warrant", "exclusionary rule", "criminal procedure"],
        caseFiles: [
            { name: "Search_Warrant.pdf", size: "456 KB", type: "PDF" },
            { name: "Forensic_Report.pdf", size: "3.1 MB", type: "PDF" },
            { name: "Evidence_Exhibits.zip", size: "12.4 MB", type: "ZIP" }
        ]
    }
}

// Sample submissions data to check if user has started an exercise
// In a real app, this would come from an API or context
const sampleSubmissions = [
    { exerciseId: 1 }, // Contract Breach - user has started
    { exerciseId: 2 }, // Negligence Case - user has started
    { exerciseId: 3 }, // Criminal Law - user has started
    { exerciseId: 4 }, // Constitutional Review - user has started
]

export default function ExerciseDetail() {
    const { id } = useParams<{ id: string }>()
    const exerciseId = id ? parseInt(id, 10) : null
    const exercise = getExerciseById(exerciseId || 0) || fallbackExerciseData[exerciseId || 0]
    
    // Check if user has started this exercise (has any submission for this exerciseId)
    const hasStarted = exerciseId ? sampleSubmissions.some(sub => sub.exerciseId === exerciseId) : false

    if (!exercise) {
        return (
            <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
                <div className="max-w-4xl mx-auto">
                    <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <CardContent className="p-8 text-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-2">Exercise Not Found</h2>
                            <p className="text-gray-600 dark:text-gray-300 font-sans mb-6">The exercise you're looking for doesn't exist.</p>
                            <Link to="/exercises">
                                <Button className="gap-2 bg-accent hover:bg-accent/90 text-white rounded-sm font-heading font-bold text-[10px] uppercase tracking-widest">
                                    <ArrowLeft className="w-4 h-4" /> Back to Exercise Library
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    return (
        <div className="flex-1 bg-[#fcf8f8] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full max-w-[95vw] mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                    <Link to="/exercises">
                        <Button variant="ghost" size="icon" className="rounded-sm text-primary dark:text-gray-300 hover:bg-accent hover:text-white transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading mb-3">{exercise.title}</h1>
                        <p className="text-gray-700 dark:text-gray-200 font-sans leading-relaxed text-sm">{exercise.description}</p>
                    </div>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] xl:grid-cols-[1fr_450px] gap-6">
                    {/* Main Content Area */}
                    <div className="space-y-4">
                        {/* Case Details */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <CardTitle className="text-base font-bold font-heading flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-accent" />
                                    Case Details
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div>
                                    <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 font-heading uppercase tracking-widest mb-2">Factual Background</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">{exercise.caseDetails.factualBackground}</p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-xs font-bold text-gray-900 dark:text-gray-100 font-heading uppercase tracking-widest mb-2">Relevant Legal Issues</h3>
                                    <p className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">{exercise.caseDetails.legalIssues}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Arguments */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <CardTitle className="text-base font-bold font-heading flex items-center gap-2">
                                    <Scale className="w-4 h-4 text-accent" />
                                    Arguments
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <Tabs defaultValue="for" className="w-full">
                                    <TabsList className="bg-gray-100/50 dark:bg-gray-800/50 p-1 rounded-sm border border-gray-100 dark:border-gray-800 h-9">
                                        <TabsTrigger value="for" className="rounded-sm px-4 py-1.5 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-primary dark:data-[state=active]:text-white text-gray-700 dark:text-gray-300 font-heading font-bold uppercase tracking-widest">
                                            Arguments For
                                        </TabsTrigger>
                                        <TabsTrigger value="against" className="rounded-sm px-4 py-1.5 text-xs data-[state=active]:bg-white dark:data-[state=active]:bg-gray-900 data-[state=active]:text-primary dark:data-[state=active]:text-white text-gray-700 dark:text-gray-300 font-heading font-bold uppercase tracking-widest">
                                            Arguments Against
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="for" className="mt-4">
                                        <div className="space-y-2.5">
                                            {exercise.argumentsFor.map((arg, i) => (
                                                <div key={i} className="bg-green-50/50 border-l-2 border-green-200 rounded-r-xl p-3">
                                                    <p className="text-xs text-gray-800 font-sans leading-relaxed">{arg}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="against" className="mt-4">
                                        <div className="space-y-2.5">
                                            {exercise.argumentsAgainst.map((arg, i) => (
                                                <div key={i} className="bg-amber-50/50 border-l-2 border-amber-200 rounded-r-xl p-3">
                                                    <p className="text-xs text-gray-800 font-sans leading-relaxed">{arg}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        {/* Rules & Guidelines */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <CardTitle className="text-base font-bold font-heading">Rules & Guidelines</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-4">
                                    <p className="text-xs text-gray-800 font-sans leading-relaxed whitespace-pre-line">{exercise.rules}</p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Evaluation Rubric */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <CardTitle className="text-base font-bold font-heading">Evaluation Rubric</CardTitle>
                                <p className="text-xs text-gray-500 font-sans mt-1">You will be evaluated on the following criteria:</p>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {exercise.rubric.map((criterion, i) => (
                                        <div key={i} className="bg-gray-50/50 rounded-sm p-3 border border-gray-100 dark:border-gray-800">
                                            <h4 className="text-xs font-bold text-gray-900 dark:text-gray-100 font-heading mb-1">{criterion.name}</h4>
                                            <p className="text-xs text-gray-600 dark:text-gray-300 font-sans leading-relaxed">{criterion.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Sidebar */}
                    <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">
                        {/* Exercise Metadata */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <CardTitle className="text-base font-bold font-heading">Exercise Details</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                        {exercise.subject}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                        {exercise.difficulty}
                                    </Badge>
                                    <Badge variant="secondary" className="bg-gray-50 text-gray-500 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest">
                                        {exercise.type}
                                    </Badge>
                                </div>
                                <div className="space-y-3 pt-2 border-t border-gray-100 dark:border-gray-800">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <Clock className="w-4 h-4" />
                                            <span className="font-sans">Duration</span>
                                        </div>
                                        <span className="font-semibold text-gray-900 dark:text-gray-100 font-sans">{exercise.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                                            <Star className="w-4 h-4 text-accent fill-current" />
                                            <span className="font-sans">Rating</span>
                                        </div>
                                        <span className="font-semibold text-gray-900 dark:text-gray-100 font-sans">{exercise.rating}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardContent className="p-5 space-y-3">
                                <Link to={`/submit?exercise=${exercise.id}`} className="block">
                                    <Button className="w-full bg-accent hover:bg-accent/90 text-white rounded-sm h-11 font-heading font-bold uppercase tracking-widest text-[11px] group">
                                        {hasStarted ? "Continue Exercise" : "Start Exercise"}
                                        <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </Link>
                                <Link to="/exercises" className="block">
                                    <Button variant="ghost" className="w-full gap-2 text-primary dark:text-gray-300 hover:bg-accent hover:text-white rounded-sm border-gray-200 dark:border-gray-800 font-heading font-bold text-[10px] uppercase tracking-widest transition-colors">
                                        <ArrowLeft className="w-4 h-4" />
                                        Back to Library
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Case Files */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <CardTitle className="text-base font-bold font-heading flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-accent" />
                                    Case Files
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="space-y-2">
                                    {exercise.caseFiles.map((file, i) => (
                                        <div key={i} className="flex items-center justify-between p-2.5 bg-gray-50/50 rounded-sm border border-gray-100 dark:border-gray-800 hover:bg-gray-100/50 transition-colors group">
                                            <div className="flex items-center gap-2.5 min-w-0 flex-1">
                                                <FileText className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                                                <div className="min-w-0 flex-1">
                                                    <p className="text-xs font-medium text-gray-900 dark:text-gray-100 font-sans truncate">{file.name}</p>
                                                    <p className="text-[10px] text-gray-500 font-sans">{file.size} • {file.type}</p>
                                                </div>
                                            </div>
                                            <Button variant="ghost" size="sm" className="text-accent hover:bg-accent hover:text-white rounded-sm h-7 px-2 shrink-0 transition-colors">
                                                <Download className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        {/* Legal Topics & Keywords */}
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 py-4">
                                <CardTitle className="text-base font-bold font-heading flex items-center gap-2">
                                    <Tag className="w-4 h-4 text-accent" />
                                    Topics & Keywords
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-5 space-y-4">
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-500 font-heading uppercase tracking-widest mb-2">Relevant Topics</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exercise.topics.map((topic, i) => (
                                            <Badge key={i} variant="secondary" className="bg-accent/10 text-accent border-none px-2 py-0.5 rounded-sm text-[9px] font-bold">
                                                {topic}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="text-[10px] font-bold text-gray-500 font-heading uppercase tracking-widest mb-2">Keywords</h3>
                                    <div className="flex flex-wrap gap-1.5">
                                        {exercise.keywords.map((keyword, i) => (
                                            <Badge key={i} variant="secondary" className="bg-gray-100 text-gray-600 dark:text-gray-300 border-none px-1.5 py-0.5 rounded-sm text-[8px] font-medium">
                                                {keyword}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}
