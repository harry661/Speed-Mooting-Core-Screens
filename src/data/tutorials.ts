// Tutorial content data
export const tutorialContentMap: Record<number, {
    id: number
    title: string
    description: string
    category: string
    icon: any
    bannerImage: string
    estimatedTime: string
    content: {
        introduction: string
        sections: Array<{
            title: string
            content: string | string[]
            type: "paragraph" | "steps" | "tips"
        }>
    }
    relatedTutorials: number[]
}> = {
    1: {
        id: 1,
        title: "Video Uploads",
        description: "Learn how to record and upload your mooting video submissions.",
        category: "Platform Features",
        icon: null,
        bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
        estimatedTime: "5 min read",
        content: {
            introduction: "Recording and uploading your mooting video is a straightforward process. This guide will walk you through everything you need to know to successfully submit your video for AI analysis.",
            sections: [
                {
                    title: "Preparing Your Recording",
                    type: "paragraph",
                    content: "Before you start recording, ensure you have a quiet environment with good lighting. Position yourself so you're clearly visible and audible. Use a stable camera setup - a laptop webcam or smartphone on a tripod works well."
                },
                {
                    title: "Recording Requirements",
                    type: "steps",
                    content: [
                        "Video format: MP4, MOV, or WEBM",
                        "Maximum file size: 500MB",
                        "Minimum resolution: 720p recommended",
                        "Audio: Clear audio is essential for transcription",
                        "Duration: Follow the exercise time limit (typically 10-20 minutes)"
                    ]
                },
                {
                    title: "Step-by-Step Upload Process",
                    type: "steps",
                    content: [
                        "Navigate to the exercise you want to submit",
                        "Click 'Start New Exercise' or select an existing exercise",
                        "In the submission form, locate the 'Video Upload' section",
                        "Click the upload area or drag and drop your video file",
                        "Wait for the upload to complete (you'll see a progress indicator)",
                        "Verify the file name and size are correct",
                        "Complete the description field and any other required information",
                        "Click 'Proceed' to review your submission"
                    ]
                },
                {
                    title: "Tips for Best Results",
                    type: "tips",
                    content: [
                        "Test your recording setup before the actual submission",
                        "Record in a well-lit room to ensure clear visibility",
                        "Speak clearly and at a moderate pace for better transcription",
                        "Keep your video file size under 500MB by using appropriate compression",
                        "Save your video file with a descriptive name for easy identification"
                    ]
                },
                {
                    title: "Troubleshooting",
                    type: "paragraph",
                    content: "If you encounter upload issues, check your internet connection and file size. Supported formats are MP4, MOV, and WEBM. If problems persist, try compressing your video or using a different browser."
                }
            ]
        },
        relatedTutorials: [2, 3, 4]
    },
    2: {
        id: 2,
        title: "Skeleton Argument Submissions",
        description: "Guidance on preparing and submitting skeleton arguments and case files.",
        category: "Submissions",
        icon: null,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        estimatedTime: "8 min read",
        content: {
            introduction: "Skeleton arguments are essential documents in mooting that outline your legal arguments. This tutorial explains how to prepare and submit them effectively through the platform.",
            sections: [
                {
                    title: "What is a Skeleton Argument?",
                    type: "paragraph",
                    content: "A skeleton argument is a written document that sets out the main points of your legal case. It provides a structured overview of your arguments, case law, and legal principles. While optional, submitting a skeleton argument can significantly improve your AI feedback quality."
                },
                {
                    title: "Preparing Your Skeleton Argument",
                    type: "steps",
                    content: [
                        "Structure your argument logically with clear headings",
                        "Include all key legal points you plan to make orally",
                        "Cite relevant case law and statutory provisions",
                        "Use clear, concise language",
                        "Follow standard legal citation formats (OSCOLA for UK law)",
                        "Keep it focused - typically 2-5 pages for a 15-minute submission"
                    ]
                },
                {
                    title: "File Format Requirements",
                    type: "steps",
                    content: [
                        "Accepted formats: Word (.doc, .docx) or PDF",
                        "Ensure your document is properly formatted",
                        "Check that all citations are complete and accurate",
                        "Proofread for spelling and grammar errors",
                        "Save with a clear filename (e.g., 'Skeleton_Argument_v1.pdf')"
                    ]
                },
                {
                    title: "Uploading Your Skeleton Argument",
                    type: "steps",
                    content: [
                        "In the submission form, locate the 'Supporting Documents' section",
                        "Find the 'Skeleton Argument' upload area",
                        "Click to browse or drag and drop your file",
                        "Wait for the upload confirmation",
                        "Verify the file appears correctly in your submission"
                    ]
                },
                {
                    title: "Best Practices",
                    type: "tips",
                    content: [
                        "Align your skeleton argument with your oral submission",
                        "Use consistent terminology throughout",
                        "Include page numbers for easy reference",
                        "Highlight key cases and principles",
                        "Ensure your skeleton argument matches what you say in your video"
                    ]
                }
            ]
        },
        relatedTutorials: [1, 3, 4]
    },
    3: {
        id: 3,
        title: "Interpreting AI Feedback",
        description: "Understand how to read and apply AI-generated feedback reports.",
        category: "Feedback",
        icon: null,
        bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop",
        estimatedTime: "10 min read",
        content: {
            introduction: "The AI feedback report provides comprehensive analysis of your submission. Understanding how to interpret and apply this feedback is crucial for improving your mooting performance.",
            sections: [
                {
                    title: "Understanding Your Score",
                    type: "paragraph",
                    content: "Your overall score is based on adherence to guidelines and rubric criteria. The score reflects your performance across multiple dimensions: Clarity, Persuasiveness, Structure, Knowledge of Law, and Use of Authority."
                },
                {
                    title: "Reading the Rubric Breakdown",
                    type: "paragraph",
                    content: "The rubric breakdown shows your performance in each category. Higher scores indicate stronger performance. Pay attention to areas with lower scores as these represent opportunities for improvement."
                },
                {
                    title: "Understanding Deductions",
                    type: "steps",
                    content: [
                        "Deductions are shown with point values and explanations",
                        "High severity deductions significantly impact your score",
                        "Review each deduction carefully to understand what went wrong",
                        "Cross-reference deductions with your transcript to see where issues occurred",
                        "Use deductions as learning opportunities for future submissions"
                    ]
                },
                {
                    title: "Key Strengths Section",
                    type: "paragraph",
                    content: "The strengths section highlights what you did well. These are areas to maintain and build upon in future submissions. Pay attention to specific techniques or approaches that the AI identified as effective."
                },
                {
                    title: "Suggested Improvements",
                    type: "steps",
                    content: [
                        "Improvements are prioritized (High, Medium, Low)",
                        "Focus on high-priority improvements first",
                        "Each improvement includes an actionable step",
                        "Reference timestamps to see where improvements apply",
                        "Use improvements as a roadmap for your next submission"
                    ]
                },
                {
                    title: "Using the Transcript",
                    type: "paragraph",
                    content: "The transcript provides a word-for-word record of your submission. Use it to review specific moments, identify where you made strong points, and see where improvements are needed. Highlights and insights mark particularly important sections."
                },
                {
                    title: "Applying Feedback",
                    type: "tips",
                    content: [
                        "Review your feedback report thoroughly before your next submission",
                        "Create a checklist of improvements to address",
                        "Practice the specific techniques mentioned in your strengths",
                        "Work on eliminating the issues identified in deductions",
                        "Compare feedback across multiple submissions to track progress"
                    ]
                }
            ]
        },
        relatedTutorials: [1, 2, 4]
    },
    4: {
        id: 4,
        title: "User Interface Navigation",
        description: "Navigate the platform efficiently and find the features you need.",
        category: "Platform Features",
        icon: null,
        bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
        estimatedTime: "6 min read",
        content: {
            introduction: "This guide will help you navigate the SpeedMooting platform efficiently, ensuring you can quickly access all the features and resources you need.",
            sections: [
                {
                    title: "Main Navigation",
                    type: "paragraph",
                    content: "The left sidebar provides access to all main sections: Dashboard, Exercises, History, and Resources. Each section has a clear purpose and can be accessed with a single click."
                },
                {
                    title: "Dashboard Overview",
                    type: "steps",
                    content: [
                        "View your recent submissions and performance metrics",
                        "Access quick actions like 'Start New Exercise'",
                        "See practice recommendations and upcoming milestones",
                        "Browse featured tutorials and resources"
                    ]
                },
                {
                    title: "Exercise Library",
                    type: "paragraph",
                    content: "The Exercise Library contains all available mooting exercises. You can filter by subject, difficulty, and search for specific exercises. Click on any exercise to view details and start a submission."
                },
                {
                    title: "Submission History",
                    type: "steps",
                    content: [
                        "View all your past submissions in one place",
                        "Filter by status, exercise, or date range",
                        "Click on any analyzed submission to view the full AI feedback report",
                        "Export your submission history if needed"
                    ]
                },
                {
                    title: "Tutorials & Guidance",
                    type: "paragraph",
                    content: "Access comprehensive tutorials, legal databases, and subject guides. Use the tabs to navigate between different resource types. All resources are searchable and organized by category."
                },
                {
                    title: "Quick Tips",
                    type: "tips",
                    content: [
                        "Use the search bar at the top to quickly find exercises or submissions",
                        "Bookmark frequently used exercises for quick access",
                        "Check your dashboard regularly for practice recommendations",
                        "Use filters to narrow down large lists of exercises or submissions"
                    ]
                }
            ]
        },
        relatedTutorials: [5, 1, 3]
    },
    5: {
        id: 5,
        title: "Topic Selection",
        description: "Choose appropriate legal topics and exercises for your skill level.",
        category: "Getting Started",
        icon: null,
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        estimatedTime: "7 min read",
        content: {
            introduction: "Selecting the right exercises and topics is crucial for effective learning and skill development. This guide will help you choose exercises that match your current skill level and learning goals.",
            sections: [
                {
                    title: "Understanding Difficulty Levels",
                    type: "paragraph",
                    content: "Exercises are categorized as Beginner, Intermediate, or Advanced. Start with Beginner exercises if you're new to mooting, and gradually progress to more challenging exercises as your skills improve."
                },
                {
                    title: "Choosing by Subject",
                    type: "steps",
                    content: [
                        "Select subjects you're currently studying or need to practice",
                        "Consider your areas of weakness and focus on those",
                        "Balance between familiar and new subjects for comprehensive learning",
                        "Use subject filters in the Exercise Library to narrow your search"
                    ]
                },
                {
                    title: "Matching Exercises to Goals",
                    type: "paragraph",
                    content: "Different exercises serve different purposes. Some focus on specific legal principles, while others test broader advocacy skills. Review exercise descriptions to find ones that align with your learning objectives."
                },
                {
                    title: "Progression Strategy",
                    type: "steps",
                    content: [
                        "Start with exercises in subjects you know well",
                        "Gradually introduce more challenging topics",
                        "Revisit exercises to track improvement over time",
                        "Use AI feedback to identify areas needing more practice",
                        "Build a diverse portfolio of submissions across different subjects"
                    ]
                },
                {
                    title: "Exercise Details",
                    type: "paragraph",
                    content: "Before starting an exercise, review the exercise detail page. This shows the case background, legal issues, arguments for and against, and the assessment rubric. Understanding these details will help you prepare more effectively."
                },
                {
                    title: "Recommendations",
                    type: "tips",
                    content: [
                        "Pay attention to practice recommendations on your dashboard",
                        "Try exercises recommended based on your performance analytics",
                        "Don't avoid challenging exercises - they're opportunities for growth",
                        "Balance practice across different legal subjects for well-rounded skills"
                    ]
                }
            ]
        },
        relatedTutorials: [4, 6, 7]
    },
    6: {
        id: 6,
        title: "Understanding Speed Mooting Rules",
        description: "Learn the rules, format, and expectations for speed mooting competitions.",
        category: "Mooting",
        icon: null,
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        estimatedTime: "12 min read",
        content: {
            introduction: "Speed mooting has specific rules and formats that differ from traditional mooting. Understanding these rules is essential for success in speed mooting competitions and exercises.",
            sections: [
                {
                    title: "What is Speed Mooting?",
                    type: "paragraph",
                    content: "Speed mooting is a condensed format of traditional mooting where participants must present their arguments within a strict time limit, typically 10-20 minutes. This format tests your ability to be concise, clear, and persuasive under time pressure."
                },
                {
                    title: "Time Management",
                    type: "steps",
                    content: [
                        "Introduction: 1-2 minutes (introduce yourself and outline your case)",
                        "Main submissions: 8-15 minutes (present your legal arguments)",
                        "Conclusion: 1-2 minutes (summarize and make your final submission)",
                        "Practice timing each section to stay within limits",
                        "Use a timer during practice to develop time awareness"
                    ]
                },
                {
                    title: "Format Requirements",
                    type: "paragraph",
                    content: "Speed mooting submissions must follow a clear structure: introduction, main arguments, and conclusion. Your arguments should be well-organized with logical flow. Skeleton arguments, while optional, are highly recommended."
                },
                {
                    title: "Assessment Criteria",
                    type: "steps",
                    content: [
                        "Clarity: Clear articulation and precise language",
                        "Persuasiveness: Strong logical arguments and rhetorical techniques",
                        "Structure: Logical flow from introduction to conclusion",
                        "Knowledge of Law: Accurate understanding and application of legal principles",
                        "Use of Authority: Effective use of case law and legal sources"
                    ]
                },
                {
                    title: "Common Mistakes to Avoid",
                    type: "tips",
                    content: [
                        "Don't exceed the time limit - practice pacing",
                        "Avoid reading directly from notes - speak naturally",
                        "Don't rush through arguments - clarity is more important than speed",
                        "Avoid factual misrepresentations - always verify against case files",
                        "Don't skip the conclusion - it's your final opportunity to persuade"
                    ]
                },
                {
                    title: "Preparation Tips",
                    type: "paragraph",
                    content: "Effective preparation is key to success in speed mooting. Prepare your skeleton argument in advance, practice your timing, and familiarize yourself with the case materials. Review the exercise rubric to understand what will be assessed."
                }
            ]
        },
        relatedTutorials: [5, 1, 2]
    },
    7: {
        id: 7,
        title: "Legal Subject Guides",
        description: "Access comprehensive guides for different areas of law relevant to mooting.",
        category: "Legal Resources",
        icon: null,
        bannerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        estimatedTime: "15 min read",
        content: {
            introduction: "Legal subject guides provide comprehensive overviews of different areas of law relevant to mooting. These guides help you understand key principles, important cases, and how to structure arguments in each legal domain.",
            sections: [
                {
                    title: "Using Subject Guides",
                    type: "paragraph",
                    content: "Subject guides are available for all major areas of law covered in mooting exercises. Each guide provides an overview of key principles, important cases, and common argument structures for that subject area."
                },
                {
                    title: "Available Subjects",
                    type: "steps",
                    content: [
                        "Contract Law: Offer, acceptance, consideration, breach, remedies",
                        "Tort Law: Duty of care, negligence, causation, damages",
                        "Criminal Law: Mens rea, actus reus, defenses, sentencing",
                        "Constitutional Law: Separation of powers, judicial review, human rights",
                        "Property Law: Ownership, leases, easements, land registration",
                        "Evidence Law: Admissibility, hearsay, expert evidence, privilege",
                        "Administrative Law: Judicial review, procedural fairness, delegated legislation"
                    ]
                },
                {
                    title: "How to Use Guides Effectively",
                    type: "steps",
                    content: [
                        "Review the relevant subject guide before starting an exercise",
                        "Identify key cases and principles mentioned in the guide",
                        "Use the guide to understand common argument structures",
                        "Reference the guide when preparing your skeleton argument",
                        "Cross-reference guide content with exercise-specific requirements"
                    ]
                },
                {
                    title: "Integrating Guides with Exercises",
                    type: "paragraph",
                    content: "Subject guides provide general knowledge, but each exercise has specific case details and legal issues. Use guides as a foundation, then apply the general principles to the specific facts of your exercise."
                },
                {
                    title: "Building Your Legal Knowledge",
                    type: "tips",
                    content: [
                        "Read subject guides regularly to build foundational knowledge",
                        "Take notes on key cases and principles for quick reference",
                        "Create your own summaries based on multiple guides",
                        "Use guides to identify areas where you need more study",
                        "Combine guide knowledge with case law research for comprehensive understanding"
                    ]
                }
            ]
        },
        relatedTutorials: [5, 2, 6]
    }
}
