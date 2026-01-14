import { useParams, Link, useNavigate } from "react-router-dom"
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Info, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { tutorialContentMap } from "@/data/tutorials"

export default function TutorialDetail() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const tutorialId = id ? parseInt(id) : null
    const tutorial = tutorialId ? tutorialContentMap[tutorialId] : null

    if (!tutorial) {
        return (
            <div className="flex-1 bg-[#FBFBF9] min-h-screen p-6">
                <div className="w-full space-y-6">
                    <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardContent className="p-12 text-center">
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-2">Tutorial Not Found</h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mb-4">The tutorial you're looking for doesn't exist.</p>
                            <Link to="/tutorials?tab=tutorials">
                                <Button className="gap-2 bg-accent hover:bg-accent/90 text-white rounded-sm font-heading font-bold text-[10px] uppercase tracking-widest px-3">
                                    <ArrowLeft className="w-4 h-4" /> Back to Tutorials
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        )
    }

    const relatedTutorials = tutorial.relatedTutorials
        .map(id => tutorialContentMap[id])
        .filter(Boolean)

    return (
        <div className="flex-1 bg-[#FBFBF9] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full space-y-6">
                {/* Back Button */}
                <Link to="/tutorials?tab=tutorials">
                    <Button 
                        variant="ghost" 
                        className="gap-2 text-primary dark:text-gray-300 hover:bg-accent hover:text-white font-heading font-bold text-[10px] uppercase tracking-widest px-3 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Tutorials
                    </Button>
                </Link>

                {/* Hero Section */}
                <div className="relative w-full h-80 rounded-sm overflow-hidden">
                    <img
                        src={tutorial.bannerImage}
                        alt={tutorial.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <Badge className="mb-3 bg-white dark:bg-gray-900/90 text-gray-700 dark:text-gray-200 border-none px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-widest backdrop-blur-sm">
                            {tutorial.category}
                        </Badge>
                        <h1 className="text-3xl font-bold text-white font-heading mb-2">{tutorial.title}</h1>
                        <p className="text-white/90 text-sm font-sans mb-3">{tutorial.description}</p>
                        <div className="flex items-center gap-4 text-white/80 text-xs font-sans">
                            <div className="flex items-center gap-1.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span>{tutorial.estimatedTime}</span>
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
                            {tutorial.content.introduction}
                        </p>

                        <Separator className="mb-8" />

                        {/* Content Sections */}
                        <div className="space-y-8">
                            {tutorial.content.sections.map((section, index) => (
                                <div key={index} className="space-y-4">
                                    <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading">{section.title}</h2>
                                    
                                    {section.type === "paragraph" && (
                                        <p className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">
                                            {section.content as string}
                                        </p>
                                    )}

                                    {section.type === "steps" && (
                                        <ol className="space-y-3 list-decimal list-inside">
                                            {(section.content as string[]).map((step, stepIndex) => (
                                                <li key={stepIndex} className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">
                                                    {step}
                                                </li>
                                            ))}
                                        </ol>
                                    )}

                                    {section.type === "tips" && (
                                        <div className="bg-accent/5 border-l-4 border-accent rounded-r-xl p-4">
                                            <div className="flex items-start gap-3">
                                                <Info className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                                                <ul className="space-y-2 flex-1">
                                                    {(section.content as string[]).map((tip, tipIndex) => (
                                                        <li key={tipIndex} className="text-sm text-gray-700 dark:text-gray-200 font-sans leading-relaxed">
                                                            {tip}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                    {/* Sidebar - Related Tutorials */}
                    {relatedTutorials.length > 0 && (
                        <Card className="rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none lg:sticky lg:top-6">
                            <CardHeader className="border-b border-gray-100 dark:border-gray-800 p-5">
                                <CardTitle className="text-base font-bold font-heading">Related Tutorials</CardTitle>
                            </CardHeader>
                            <CardContent className="p-5">
                                <div className="space-y-4">
                                    {relatedTutorials.map((related) => (
                                        <Link 
                                            key={related.id} 
                                            to={`/tutorials/${related.id}`}
                                            className="flex items-center gap-3 p-2 rounded-sm hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                        >
                                            <div className="w-16 h-16 rounded-sm overflow-hidden shrink-0 flex-shrink-0">
                                                <img
                                                    src={related.bannerImage}
                                                    alt={related.title}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 group-hover:text-accent transition-colors font-sans leading-tight">
                                                    {related.title}
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

