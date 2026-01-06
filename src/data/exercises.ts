export interface Exercise {
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
}

export const exerciseData: Record<number, Exercise> = {
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
            factualBackground: "The Defendant was charged with causing death by dangerous driving. Evidence shows the Defendant was driving at 45 mph in a 30 mph zone when they struck and killed a pedestrian. The Defendant claims they were unaware of the speed limit due to a missing road sign and were distracted by a phone notification. Medical evidence shows the Defendant had consumed alcohol but was below the legal limit.",
            legalIssues: "Whether the Defendant's conduct amounted to dangerous driving under section 1 of the Road Traffic Act 1988, and whether the Defendant's mental state (mens rea) is relevant to the offense."
        },
        argumentsFor: [
            "The Defendant's speed (45 mph in a 30 mph zone) clearly falls below the standard of a competent and careful driver, establishing the required mens rea.",
            "The Defendant's failure to observe the speed limit, combined with the consumption of alcohol, demonstrates a disregard for the safety of others."
        ],
        argumentsAgainst: [
            "The missing road sign created an unforeseeable circumstance that prevented the Defendant from knowing the speed limit.",
            "The phone notification was an unforeseeable distraction that does not establish the required mental element."
        ],
        rules: "Section 1 of the Road Traffic Act 1988 defines dangerous driving as driving that falls far below what would be expected of a competent and careful driver, and it would be obvious to such a driver that driving in that way would be dangerous.",
        rubric: [
            { name: "Legal Knowledge", description: "Demonstrates understanding of contract law principles" },
            { name: "Argumentation", description: "Constructs clear and logical arguments" },
            { name: "Case Analysis", description: "Applies relevant case law effectively" },
            { name: "Presentation", description: "Clear and professional delivery" }
        ],
        topics: ["Contract Formation", "Offer and Acceptance", "Consideration"],
        keywords: ["contract", "offer", "acceptance", "consideration", "breach"],
        caseFiles: [
            { name: "Case_Brief_v1.pdf", size: "2.4 MB", type: "PDF" },
            { name: "Evidence_Exhibit_A.pdf", size: "1.8 MB", type: "PDF" }
        ]
    },
    2: {
        id: 2,
        title: "Negligence Case - Duty of Care",
        description: "An intermediate-level exercise exploring the duty of care in negligence, examining the neighbor principle and the modern approach to establishing duty in novel situations.",
        subject: "Tort Law",
        difficulty: "Intermediate",
        type: "Moot Court",
        time: "20 mins",
        rating: 4.5,
        caseDetails: {
            factualBackground: "The Claimant was injured when the Defendant's vehicle collided with theirs. The Defendant claims the accident was unavoidable due to adverse weather conditions.",
            legalIssues: "Whether the Defendant owed a duty of care to the Claimant and whether that duty was breached."
        },
        argumentsFor: [
            "The Defendant had a clear duty of care to other road users.",
            "The Defendant failed to adjust their driving to account for adverse weather conditions."
        ],
        argumentsAgainst: [
            "The weather conditions were so severe that no reasonable driver could have avoided the accident.",
            "The Claimant contributed to the accident through their own negligence."
        ],
        rules: "The duty of care in negligence requires establishing that the Defendant owed a duty, breached that duty, and caused damage.",
        rubric: [
            { name: "Legal Knowledge", description: "Understanding of negligence principles" },
            { name: "Argumentation", description: "Clear and logical arguments" },
            { name: "Case Analysis", description: "Application of relevant case law" },
            { name: "Presentation", description: "Professional delivery" }
        ],
        topics: ["Negligence", "Duty of Care", "Breach of Duty"],
        keywords: ["negligence", "duty of care", "breach", "causation"],
        caseFiles: [
            { name: "Case_Brief_v2.pdf", size: "3.1 MB", type: "PDF" }
        ]
    }
}

export const getExerciseById = (id: number): Exercise | undefined => {
    return exerciseData[id]
}

export const getAllExercises = (): Exercise[] => {
    return Object.values(exerciseData)
}

