import { useState, createContext, useContext } from "react"
import { Bell, PanelLeftClose, PanelLeftOpen, Moon, Sun, CheckCircle2, AlertCircle, Info, X, Clock, FileText } from "lucide-react"
import { Sidebar } from "./Sidebar"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/contexts/ThemeContext"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"

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

interface Notification {
    id: string
    type: "success" | "info" | "warning"
    title: string
    message: string
    timestamp: Date
    read: boolean
    actionUrl?: string
}

const sampleNotifications: Notification[] = [
    {
        id: "1",
        type: "success",
        title: "Report Ready",
        message: "Your AI feedback report for 'Contract Breach - Offer & Acceptance' is ready to view.",
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        read: false,
        actionUrl: "/report?submissionId=2"
    },
    {
        id: "2",
        type: "info",
        title: "Submission Processed",
        message: "Your video submission has been received and is being analyzed.",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        read: false,
        actionUrl: "/history"
    },
    {
        id: "3",
        type: "warning",
        title: "Exercise Reminder",
        message: "You have 3 days left to complete the 'Criminal Law - Mens Rea' exercise.",
        timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
        read: true,
        actionUrl: "/exercises/3"
    },
    {
        id: "4",
        type: "success",
        title: "New Tutorial Available",
        message: "Check out the new tutorial on 'Interpreting AI Feedback'.",
        timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        read: true,
        actionUrl: "/tutorials/3"
    }
]

export function Layout({ children }: { children: React.ReactNode }) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const [notifications, setNotifications] = useState<Notification[]>(sampleNotifications)
    const navigate = useNavigate()
    
    const unreadCount = notifications.filter(n => !n.read).length
    
    const formatTimestamp = (date: Date) => {
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)
        
        if (diffMins < 1) return "Just now"
        if (diffMins < 60) return `${diffMins}m ago`
        if (diffHours < 24) return `${diffHours}h ago`
        if (diffDays < 7) return `${diffDays}d ago`
        return date.toLocaleDateString()
    }
    
    const markAsRead = (id: string) => {
        setNotifications(prev => 
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        )
    }
    
    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }
    
    const removeNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }
    
    const handleNotificationClick = (notification: Notification) => {
        markAsRead(notification.id)
        if (notification.actionUrl) {
            navigate(notification.actionUrl)
        }
    }
    
    const getNotificationIcon = (type: Notification["type"]) => {
        switch (type) {
            case "success":
                return <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400" />
            case "warning":
                return <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            case "info":
                return <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
        }
    }
    
    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <div className="flex h-screen overflow-hidden">
                <Sidebar isCollapsed={isCollapsed} />
                <div className="flex-1 flex flex-col overflow-hidden">
                    <header className="h-16 border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm">
                        <div className="flex items-center gap-3">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCollapsed(!isCollapsed)}
                                className="bg-transparent border border-gray-300 dark:border-gray-700 rounded w-8 h-8 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                            >
                                {isCollapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
                            </Button>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="w-9 h-9 text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                                aria-label="Toggle theme"
                            >
                                {theme === "light" ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="relative w-9 h-9 text-gray-500 dark:text-gray-400 hover:text-[#00524d] dark:hover:text-accent hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                    >
                                        <Bell className="w-6 h-6" />
                                        {unreadCount > 0 && (
                                            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                                        )}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent 
                                    align="end" 
                                    className="w-80 rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-lg p-0"
                                >
                                    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
                                        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 font-heading">Notifications</h3>
                                        {unreadCount > 0 && (
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={markAllAsRead}
                                                className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 h-auto p-0 font-sans"
                                            >
                                                Mark all as read
                                            </Button>
                                        )}
                                    </div>
                                    <ScrollArea className="h-[400px]">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center">
                                                <Bell className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto mb-3" />
                                                <p className="text-sm text-gray-500 dark:text-gray-400 font-sans">No notifications</p>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-100 dark:divide-gray-800">
                                                {notifications.map((notification) => (
                                                    <div
                                                        key={notification.id}
                                                        className={cn(
                                                            "p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group relative",
                                                            !notification.read && "bg-primary/5 dark:bg-primary/10"
                                                        )}
                                                        onClick={() => handleNotificationClick(notification)}
                                                    >
                                                        <div className="flex items-start gap-3">
                                                            <div className="mt-0.5 shrink-0">
                                                                {getNotificationIcon(notification.type)}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-start justify-between gap-2 mb-1">
                                                                    <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-heading">
                                                                        {notification.title}
                                                                    </h4>
                                                                    {!notification.read && (
                                                                        <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5"></div>
                                                                    )}
                                                                </div>
                                                                <p className="text-xs text-gray-600 dark:text-gray-300 font-sans leading-relaxed mb-2">
                                                                    {notification.message}
                                                                </p>
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 font-sans">
                                                                        <Clock className="w-3 h-3" />
                                                                        <span>{formatTimestamp(notification.timestamp)}</span>
                                                                    </div>
                                                                    <Button
                                                                        variant="ghost"
                                                                        size="icon"
                                                                        className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-600 dark:hover:text-red-400"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation()
                                                                            removeNotification(notification.id)
                                                                        }}
                                                                    >
                                                                        <X className="w-3 h-3" />
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </ScrollArea>
                                    {notifications.length > 0 && (
                                        <div className="p-3 border-t border-gray-100 dark:border-gray-800">
                                            <Button
                                                variant="ghost"
                                                className="w-full text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 font-sans justify-center"
                                                onClick={() => setNotifications([])}
                                            >
                                                Clear all notifications
                                            </Button>
                                        </div>
                                    )}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <div className="flex items-center gap-3">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Alex Thompson</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Student Advocate</p>
                                </div>
                                <Avatar className="border-2 border-[#00524d]/10 dark:border-accent/30">
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
