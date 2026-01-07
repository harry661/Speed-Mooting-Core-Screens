import { motion } from "framer-motion"
import { useEffect } from "react"
import { Search, BookOpen, Database, FileText, Video, MessageSquare, Navigation, Target, Scale, Info, ExternalLink, Shield, ChevronRight } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useSearchParams, Link } from "react-router-dom"

const legalDatabases = [
    { 
        id: 1, 
        name: "Westlaw", 
        description: "Comprehensive legal research database with case law, statutes, and secondary sources.",
        icon: Database,
        bannerImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=400&fit=crop",
        access: "Institutional Access Required"
    },
    { 
        id: 2, 
        name: "LexisNexis", 
        description: "Leading legal research platform providing access to case law, legislation, and legal commentary.",
        icon: Database,
        bannerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop",
        access: "Institutional Access Required"
    },
    { 
        id: 3, 
        name: "HeinOnline", 
        description: "Digital library of legal journals, historical legal materials, and government documents.",
        icon: BookOpen,
        bannerImage: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=800&h=400&fit=crop",
        access: "Institutional Access Required"
    },
    { 
        id: 4, 
        name: "Official Government Publications", 
        description: "Primary sources including legislation, statutory instruments, and official reports.",
        icon: FileText,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        access: "Public Access"
    },
    { 
        id: 5, 
        name: "Google Scholar", 
        description: "Legal section with monitored source differentiation. Use with caution and verify sources.",
        icon: Search,
        bannerImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop",
        access: "Public Access",
        note: "Source monitoring required"
    }
]

const legalSubjects = [
    { 
        id: 1, 
        name: "Contract Law", 
        description: "Fundamental principles of contract formation, breach, and remedies.",
        icon: FileText,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        topics: "Offer, acceptance, consideration, breach of contract"
    },
    { 
        id: 2, 
        name: "Tort Law", 
        description: "Civil wrongs including negligence, nuisance, and defamation.",
        icon: Scale,
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        topics: "Duty of care, negligence, causation, damages"
    },
    { 
        id: 3, 
        name: "Criminal Law", 
        description: "Criminal offenses, mens rea, actus reus, and defenses.",
        icon: Shield,
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        topics: "Mens rea, actus reus, defenses, sentencing"
    },
    { 
        id: 4, 
        name: "Constitutional Law", 
        description: "Constitutional principles, separation of powers, and human rights.",
        icon: BookOpen,
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        topics: "Separation of powers, judicial review, human rights"
    },
    { 
        id: 5, 
        name: "Civil Procedure", 
        description: "Rules and procedures governing civil litigation.",
        icon: FileText,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop",
        topics: "Pleadings, discovery, trial procedure, appeals"
    },
    { 
        id: 6, 
        name: "Evidence Law", 
        description: "Rules of evidence, admissibility, and proof in legal proceedings.",
        icon: Scale,
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop",
        topics: "Admissibility, hearsay, expert evidence, privilege"
    },
    { 
        id: 7, 
        name: "Property Law", 
        description: "Real and personal property, ownership, and land law.",
        icon: BookOpen,
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        topics: "Ownership, leases, easements, land registration"
    },
    { 
        id: 8, 
        name: "Administrative Law", 
        description: "Judicial review, administrative decision-making, and public law principles.",
        icon: Shield,
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop",
        topics: "Judicial review, procedural fairness, delegated legislation"
    }
]

const tutorials = [
    { 
        id: 1, 
        title: "Video Uploads", 
        description: "Learn how to record and upload your mooting video submissions.",
        category: "Platform Features",
        icon: Video,
        bannerImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop"
    },
    { 
        id: 2, 
        title: "Skeleton Argument Submissions", 
        description: "Guidance on preparing and submitting skeleton arguments and case files.",
        category: "Submissions",
        icon: FileText,
        bannerImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=400&fit=crop"
    },
    { 
        id: 3, 
        title: "Interpreting AI Feedback", 
        description: "Understand how to read and apply AI-generated feedback reports.",
        category: "Feedback",
        icon: MessageSquare,
        bannerImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=400&fit=crop"
    },
    { 
        id: 4, 
        title: "User Interface Navigation", 
        description: "Navigate the platform efficiently and find the features you need.",
        category: "Platform Features",
        icon: Navigation,
        bannerImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop"
    },
    { 
        id: 5, 
        title: "Topic Selection", 
        description: "Choose appropriate legal topics and exercises for your skill level.",
        category: "Getting Started",
        icon: Target,
        bannerImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=400&fit=crop"
    },
    { 
        id: 6, 
        title: "Understanding Speed Mooting Rules", 
        description: "Learn the rules, format, and expectations for speed mooting competitions.",
        category: "Mooting",
        icon: Scale,
        bannerImage: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=400&fit=crop"
    },
    { 
        id: 7, 
        title: "Legal Subject Guides", 
        description: "Access comprehensive guides for different areas of law relevant to mooting.",
        category: "Legal Resources",
        icon: BookOpen,
        bannerImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop"
    }
]

export default function TutorialsAndGuidance() {
    const [searchParams] = useSearchParams()
    
    // Get tab from URL params, default to "databases"
    const tabParam = searchParams.get("tab")
    const currentTab = tabParam && ["databases", "subjects", "tutorials"].includes(tabParam) ? tabParam : "databases"

    // Title and description mapping based on active tab
    const pageContent = {
        databases: {
            title: "Legal Databases",
            description: "Access comprehensive legal research databases with case law, statutes, and secondary sources."
        },
        subjects: {
            title: "Subject Guides",
            description: "Explore comprehensive guides for different areas of law relevant to mooting."
        },
        tutorials: {
            title: "Tutorials",
            description: "Learn how to use the platform effectively with step-by-step guides and tutorials."
        }
    }

    const currentContent = pageContent[currentTab as keyof typeof pageContent]

    // Update document title
    useEffect(() => {
        document.title = `${currentContent.title} - SpeedMooting`
    }, [currentTab, currentContent.title])

    return (
        <div className="flex-1 bg-[#fcf8f8] min-h-screen p-6">
            <div className="w-full space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 tracking-tight font-heading">{currentContent.title}</h2>
                        <p className="text-gray-500 text-xs font-sans mt-1">{currentContent.description}</p>
                    </div>
                </div>

                {currentTab === "databases" && (
                    <div className="mt-6">
                        <div className="space-y-4">
                            <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-4 flex items-start gap-4">
                                <Info className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                                <div>
                                    <h4 className="text-xs font-bold uppercase tracking-widest text-accent font-heading mb-1">Licensing & Compliance</h4>
                                    <p className="text-sm text-gray-700 font-sans">All database access adheres to licensing restrictions and usage agreements. System logs all data source usage for auditing and compliance purposes.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {legalDatabases.map((db, i) => {
                                    return (
                                        <motion.div
                                            key={db.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Card className="h-full rounded-sm border-gray-200 hover:border-accent transition-colors bg-white flex flex-col group shadow-sm overflow-hidden">
                                                <div className="relative w-full h-32 overflow-hidden">
                                                    <img 
                                                        src={db.bannerImage} 
                                                        alt={db.name}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                    {db.note && (
                                                        <div className="absolute top-3 right-3">
                                                            <Badge variant="secondary" className="bg-amber-50 text-amber-700 border-amber-200 text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                                                {db.note}
                                                            </Badge>
                                                        </div>
                                                    )}
                                                </div>
                                                <CardHeader className="p-5 pb-3">
                                                    <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight">
                                                        {db.name}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-5 pt-0 flex-1">
                                                    <p className="text-sm text-gray-600 font-sans mb-4 leading-relaxed">
                                                        {db.description}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-[11px] text-gray-500 font-sans uppercase font-bold tracking-wider">
                                                        <Shield className="w-3.5 h-3.5" />
                                                        {db.access}
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )}

                {currentTab === "subjects" && (
                    <div className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {legalSubjects.map((subject, i) => {
                                return (
                                    <motion.div
                                        key={subject.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                    >
                                        <Card className="h-full rounded-sm border-gray-200 hover:border-accent transition-colors bg-white flex flex-col group shadow-sm overflow-hidden">
                                            <div className="relative w-full h-32 overflow-hidden">
                                                <img 
                                                    src={subject.bannerImage} 
                                                    alt={subject.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                            </div>
                                            <CardHeader className="p-5 pb-3">
                                                <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight">
                                                    {subject.name}
                                                </CardTitle>
                                            </CardHeader>
                                            <CardContent className="p-5 pt-0 flex-1">
                                                <p className="text-sm text-gray-600 font-sans mb-4 leading-relaxed">
                                                    {subject.description}
                                                </p>
                                                <div className="space-y-2">
                                                    <p className="text-[10px] font-bold text-gray-400 font-heading uppercase tracking-widest">Key Topics</p>
                                                    <p className="text-xs text-gray-700 font-sans">{subject.topics}</p>
                                                </div>
                                            </CardContent>
                                            <CardContent className="p-5 pt-0">
                                                <Link to={`/subjects/${subject.id}`}>
                                                    <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-accent hover:border-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest h-9 rounded-sm group/btn">
                                                        View Guide
                                                        <ExternalLink className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                    </Button>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </div>
                )}

                {currentTab === "tutorials" && (
                    <div className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {tutorials.map((tutorial, i) => {
                                    return (
                                        <motion.div
                                            key={tutorial.id}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                        >
                                            <Card className="h-full rounded-sm border-gray-200 hover:border-accent transition-colors bg-white flex flex-col group shadow-sm overflow-hidden">
                                                <div className="relative w-full h-32 overflow-hidden">
                                                    <img 
                                                        src={tutorial.bannerImage} 
                                                        alt={tutorial.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                                                    <div className="absolute top-3 right-3">
                                                        <Badge variant="secondary" className="bg-white/90 text-gray-700 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                                                            {tutorial.category}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <CardHeader className="p-5 pb-3">
                                                    <CardTitle className="text-base group-hover:text-accent transition-colors font-heading font-bold leading-tight">
                                                        {tutorial.title}
                                                    </CardTitle>
                                                </CardHeader>
                                                <CardContent className="p-5 pt-0 flex-1">
                                                    <p className="text-sm text-gray-600 font-sans leading-relaxed">
                                                        {tutorial.description}
                                                    </p>
                                                </CardContent>
                                                <CardContent className="p-5 pt-0">
                                                    <Link to={`/tutorials/${tutorial.id}`}>
                                                        <Button variant="outline" className="w-full border-gray-200 text-gray-700 hover:bg-accent hover:border-accent hover:text-white shadow-none rounded-sm font-heading font-bold uppercase tracking-widest text-[10px] h-9 group/btn">
                                                            Access Tutorial
                                                            <ChevronRight className="w-3.5 h-3.5 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                                                        </Button>
                                                    </Link>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    )
                                })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

