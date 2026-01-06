import { useState, createContext, useContext } from "react"
import { useLocation } from "react-router-dom"
import { Search, Bell, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { Sidebar } from "./Sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarContextType {
    isCollapsed: boolean
    setIsCollapsed: (collapsed: boolean) => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function useSidebar() {
    const context = useContext(SidebarContext)
    if (!context) {
        throw new Error("useSidebar must be used within Layout")
    }
    return context
}

export function Layout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const location = useLocation()
    
    // Determine search placeholder based on current route
    const getSearchPlaceholder = () => {
        if (location.pathname === "/exercises") {
            return "Search cases..."
        } else if (location.pathname === "/admin/exercises") {
            return "Search exercises..."
        }
        return "Search exercises or submissions..."
    }
    
    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <div className="flex h-screen overflow-hidden">
                <Sidebar isCollapsed={isCollapsed} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="h-16 border-b bg-white flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
                        <div className="flex items-center gap-3 flex-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="bg-transparent border border-gray-300 rounded w-8 h-8 hover:bg-gray-100 text-gray-500 hover:text-gray-700"
                            >
                                {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                            </Button>
                            <div className="relative w-96">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    placeholder={getSearchPlaceholder()}
                                    className="w-full pl-10 pr-4 py-2 rounded-sm border border-gray-200 bg-gray-50 focus:outline-none focus:ring-1 focus:ring-accent transition-all text-sm font-sans"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-6">
                            <button className="relative text-gray-500 hover:text-[#00524d] transition-colors">
                                <Bell className="w-6 h-6" />
                                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900">Alex Thompson</p>
                                    <p className="text-xs text-gray-500">Student Advocate</p>
                                </div>
                                <Avatar className="border-2 border-[#00524d]/10">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>AT</AvatarFallback>
                                </Avatar>
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 overflow-y-auto">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarContext.Provider>
    )
}
