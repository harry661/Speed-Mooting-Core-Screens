import { useState, useEffect } from "react"
import { BookOpen, History, Settings, LogOut, LayoutDashboard, FileText, Shield, GraduationCap, ChevronDown, ChevronUp, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useLocation } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/" },
    { icon: BookOpen, label: "Exercises", href: "/exercises" },
    { icon: FileText, label: "AI Report", href: "/report" },
    { icon: History, label: "History", href: "#" },
    { icon: Settings, label: "Settings", href: "#" },
]

const resourcesSubmenu = [
    { label: "Legal Databases", href: "/tutorials?tab=databases", icon: Database },
    { label: "Subject Guides", href: "/tutorials?tab=subjects", icon: BookOpen },
    { label: "Tutorials", href: "/tutorials?tab=tutorials", icon: GraduationCap },
]

interface SidebarProps {
    isCollapsed: boolean
}

export function Sidebar({ isCollapsed }: SidebarProps) {
    const location = useLocation()
    const [isResourcesOpen, setIsResourcesOpen] = useState(location.pathname === "/tutorials")
    
    // Keep dropdown open when on tutorials page
    useEffect(() => {
        if (location.pathname === "/tutorials") {
            setIsResourcesOpen(true)
        }
    }, [location.pathname])

    return (
        <div className={cn(
            "bg-primary text-white h-screen flex flex-col transition-all duration-300 shadow-none border-r border-[#1a3d34] z-20 relative",
            isCollapsed ? "w-20 p-4" : "w-64 p-6"
        )}>
            <div className={cn(
                "flex items-center gap-3 mb-12 px-2",
                isCollapsed && "justify-center px-0"
            )}>
                <img src="/logo.png" alt="SpeedMooting Logo" className="w-8 h-8 object-contain invert brightness-0 opacity-80" />
                {!isCollapsed && (
                    <h1 className="text-lg font-bold tracking-tight font-heading whitespace-nowrap">SpeedMooting</h1>
                )}
            </div>

            <nav className="flex-1 space-y-1">
                {menuItems.map((item) => (
                    <Link key={item.label} to={item.href}>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-4 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 mb-0.5 font-heading font-medium tracking-wide rounded-l-sm rounded-r-none h-11",
                                isCollapsed ? "px-0 justify-center" : "px-3",
                                location.pathname === item.href && "bg-white/5 text-white font-bold border-r-2 border-accent"
                            )}
                        >
                            <item.icon className={cn("w-4 h-4 shrink-0", location.pathname === item.href ? "text-accent" : "text-white/40")} />
                            {!isCollapsed && <span className="text-[11px] uppercase tracking-[0.1em]">{item.label}</span>}
                        </Button>
                    </Link>
                ))}

                {/* Resources Dropdown */}
                {isCollapsed ? (
                    <Link to="/tutorials">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-center text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 mb-0.5 font-heading font-medium tracking-wide rounded-l-sm rounded-r-none h-11 px-0",
                                location.pathname === "/tutorials" && "bg-white/5 text-white font-bold border-r-2 border-accent"
                            )}
                        >
                            <GraduationCap className={cn("w-4 h-4 shrink-0", location.pathname === "/tutorials" ? "text-accent" : "text-white/40")} />
                        </Button>
                    </Link>
                ) : (
                    <div className="space-y-1">
                        <Button
                            variant="ghost"
                            onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                            className={cn(
                                "w-full justify-between gap-4 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 mb-0.5 font-heading font-medium tracking-wide rounded-l-sm rounded-r-none h-11 px-3",
                                location.pathname === "/tutorials" && "bg-white/5 text-white font-bold"
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <GraduationCap className={cn("w-4 h-4 shrink-0", location.pathname === "/tutorials" ? "text-accent" : "text-white/40")} />
                                <span className="text-[11px] uppercase tracking-[0.1em]">Resources</span>
                            </div>
                            {isResourcesOpen ? (
                                <ChevronUp className="w-4 h-4 text-white/40" />
                            ) : (
                                <ChevronDown className="w-4 h-4 text-white/40" />
                            )}
                        </Button>
                        <AnimatePresence>
                            {isResourcesOpen && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pl-7 space-y-1">
                                        {resourcesSubmenu.map((subItem) => {
                                            const searchParams = new URLSearchParams(location.search)
                                            const isActive = location.pathname === "/tutorials" && searchParams.get("tab") === subItem.href.split("tab=")[1]
                                            const SubIcon = subItem.icon
                                            return (
                                                <Link key={subItem.label} to={subItem.href}>
                                                    <Button
                                                        variant="ghost"
                                                        className={cn(
                                                            "w-full justify-start gap-3 text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200 mb-0.5 font-heading font-medium tracking-wide rounded-l-sm rounded-r-none h-9 px-3 text-[10px]",
                                                            isActive && "bg-white/5 text-white font-bold border-r-2 border-accent"
                                                        )}
                                                    >
                                                        <SubIcon className={cn("w-3.5 h-3.5 shrink-0", isActive ? "text-accent" : "text-white/30")} />
                                                        <span className="uppercase tracking-[0.1em]">{subItem.label}</span>
                                                    </Button>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                <div className={cn("pt-8 pb-2", isCollapsed && "flex flex-col items-center")}>
                    {!isCollapsed ? (
                        <p className="text-[10px] uppercase font-bold text-white/30 mb-3 font-heading tracking-[0.15em] px-3">Management</p>
                    ) : (
                        <div className="h-px w-8 bg-white/10 mb-4" />
                    )}
                    <Link to="/admin/exercises">
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-4 text-white/60 hover:text-white hover:bg-white/5 transition-all duration-200 mb-0.5 font-heading font-medium tracking-wide rounded-l-sm rounded-r-none h-11",
                                isCollapsed ? "px-0 justify-center" : "px-3",
                                location.pathname.startsWith("/admin") && "bg-white/5 text-white font-bold border-r-2 border-accent"
                            )}
                        >
                            <Shield className={cn("w-4 h-4 shrink-0", location.pathname.startsWith("/admin") ? "text-accent" : "text-white/40")} />
                            {!isCollapsed && <span className="text-[11px] uppercase tracking-[0.1em]">Admin Studio</span>}
                        </Button>
                    </Link>
                </div>
            </nav>

            <div className="mt-auto pt-6 border-t border-white/10">
                {!isCollapsed && (
                    <div className="bg-white/5 rounded-xl p-4 mb-6">
                        <p className="text-[10px] uppercase font-bold text-white/40 mb-2 font-heading tracking-widest leading-none">Practice Goal</p>
                        <p className="text-sm font-semibold font-sans mb-2">3 Exercises this week</p>
                        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <div className="h-full bg-white w-2/3"></div>
                        </div>
                    </div>
                )}

                <Button
                    variant="ghost"
                    className={cn(
                        "w-full justify-start gap-3 text-white/70 hover:text-white hover:bg-white/10 font-heading font-medium",
                        isCollapsed ? "px-0 justify-center" : "px-3"
                    )}
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {!isCollapsed && "Log Out"}
                </Button>
            </div>
        </div>
    )
}
