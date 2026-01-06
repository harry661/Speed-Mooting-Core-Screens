import { useState, createContext, useContext } from "react"
import { Sidebar } from "./Sidebar"

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
    
    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <div className="flex h-screen overflow-hidden">
                <Sidebar isCollapsed={isCollapsed} />
                <div className="flex-1 overflow-y-auto">
                    {children}
                </div>
            </div>
        </SidebarContext.Provider>
    )
}
