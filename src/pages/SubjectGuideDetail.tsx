import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, BookOpen, Scale, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { subjectGuideContentMap } from "@/data/subject-guides"

export default function SubjectGuideDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const guideId = id ? parseInt(id) : null
    const guide = guideId ? subjectGuideContentMap[guideId] : null

    if (!guide) {
        return (
            <div className="flex-1 bg-[#FBFBF9] min-h-screen p-6">
                <div className="w-full space-y-6">
                    <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-2">Subject Guide Not Found</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mb-4">The subject guide you're looking for doesn't exist.</p>
                            <Link to="/tutorials?tab=subjects">
                                <Button className="gap-2 bg-accent hover:bg-accent/90 text-white rounded-sm font-heading font-bold text-[10px] uppercase tracking-widest px-3">
                                    <ArrowLeft className="w-4 h-4" /> Back to Subject Guides
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    const relatedGuides = guide.relatedGuides
        .map(id => subjectGuideContentMap[id])
        .filter(Boolean)

    return (
        <div className="flex-1 bg-[#FBFBF9] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Back Button */}
                <Link to="/tutorials?tab=subjects">
                    <Button 
                        variant="ghost" 
                        className="gap-2 text-primary dark:text-gray-300 hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest px-3 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Subject Guides
                    </Button>
                </Link>

                {/* Hero Section */}
                <div className="relative w-full h-80 rounded-sm overflow-hidden">
                    <img
                        src={guide.bannerImage}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Badge className="mb-3 bg-white dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                            Legal Subject
                        </Badge>
                        <h1 className="text-3xl font-bold text-white font-heading mb-2">{guide.name}</h1>
                        <p className="text-white/90 text-sm font-sans mb-3">{guide.description}</p>
                        <div className="flex items-center gap-4 text-white/80 text-xs font-sans">
                            <div className="flex items-center gap-1.5">
                                <BookOpen className="w-3.5 h-3.5" />
                                <span>{guide.topics}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
                    <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardContent className="p-8 lg:p-10">
                            {/* Introduction */}
                            <p className="text-base text-gray-700 dark:text-gray-200 font-sans leading-relaxed mb-8">
                                {guide.introduction}
                            </p>

                            <Separator className="mb-8" />

                            {/* Key Principles */}
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-6">Key Principles</h2>
                                    <div className="space-y-6">
                                        {guide.keyPrinciples.map((principle, index) => (
                                            <div key={index} className="space-y-2">
                                                <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100 font-heading">{principle.title}</h3>
                                                <p className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">
                                                    {principle.description}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Separator />

                                {/* Important Cases */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-6">Important Cases</h2>
                                    <div className="space-y-4">
                                        {guide.importantCases.map((caseItem, index) => (
                                            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-sm p-4 border-l-4 border-accent">
                                                <div className="flex items-start justify-between gap-3 mb-2">
                                                    <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 font-heading">{caseItem.name}</h4>
                                                    <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest shrink-0 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                                                        {caseItem.citation}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">
                                                    <span className="font-semibold">Principle: </span>
                                                    {caseItem.principle}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Statutory Provisions */}
                                {guide.statutoryProvisions && guide.statutoryProvisions.length > 0 && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-6">Statutory Provisions</h2>
                                            <div className="space-y-4">
                                                {guide.statutoryProvisions.map((statute, index) => (
                                                    <div key={index} className="bg-accent/5 dark:bg-accent/10 rounded-sm p-4 border-l-4 border-accent">
                                                        <div className="flex items-start justify-between gap-3 mb-2">
                                                            <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 font-heading">{statute.title}</h4>
                                                            <Badge variant="secondary" className="text-[10px] font-bold uppercase tracking-widest shrink-0 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-600">
                                                                {statute.reference}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">
                                                            {statute.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                )}

                                <Separator />

                                {/* Argument Structures */}
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-6">Common Argument Structures</h2>
                                    <div className="space-y-4">
                                        {guide.argumentStructures.map((structure, index) => (
                                            <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-sm p-4">
                                                <h4 className="text-base font-bold text-gray-900 dark:text-gray-100 font-heading mb-2">{structure.scenario}</h4>
                                                <p className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">
                                                    {structure.approach}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Sidebar - Related Guides */}
                    {relatedGuides.length > 0 && (
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none lg:sticky lg:top-6">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 p-5">
                                <CardTitle className="text-base font-bold font-heading text-gray-900 dark:text-gray-100">Related Guides</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="space-y-4">
                                    {relatedGuides.map((related) => (
                                        <Link 
                                            key={related.id} 
                                            to={`/subjects/${related.id}`}
                                            className="flex items-center gap-3 p-2 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                        >
                                            <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 flex-shrink-0">
                                                <img
                                                    src={related.bannerImage}
                                                    alt={related.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-accent transition-colors font-sans leading-tight">
                                                    {related.name}
                                                </h3>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    )
}

