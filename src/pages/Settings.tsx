import { useState } from "react"
import { motion } from "framer-motion"
import { User, Bell, Lock, Save } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

export default function Settings() {
    const [name, setName] = useState("Alex Thompson")
    const [email, setEmail] = useState("alex.thompson@example.com")
    const [role, setRole] = useState("Student Advocate")
    const [emailNotifications, setEmailNotifications] = useState(true)
    const [inAppNotifications, setInAppNotifications] = useState(true)

    const handleSave = () => {
        // Simulate save
        toast.success("Settings saved", {
            description: "Your preferences have been updated."
        })
    }

    return (
        <div className="flex-1 bg-[#FBFBF9] dark:bg-gray-950 min-h-screen p-6">
            <div className="w-full max-w-4xl mx-auto space-y-6">
                {/* Header */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 tracking-tight font-heading">Settings</h2>
                    <p className="text-gray-500 dark:text-gray-400 text-xs font-sans mt-1">Manage your account preferences and profile information.</p>
                </div>

                {/* Profile Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-none">
                        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                            <CardTitle className="text-base font-bold font-heading flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                <User className="w-5 h-5 text-primary dark:text-gray-300" />
                                Profile Information
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-sans mb-2 block">
                                    Full Name
                                </label>
                                <Input
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-sans mb-2 block">
                                    Email Address
                                </label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-sans mb-2 block">
                                    Role / Affiliation
                                </label>
                                <Input
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                    className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Notification Preferences */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-none">
                        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                            <CardTitle className="text-base font-bold font-heading flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                <Bell className="w-5 h-5 text-primary dark:text-gray-300" />
                                Notification Preferences
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-sans">
                                        Email Notifications
                                    </label>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1">
                                        Receive email notifications when your reports are ready
                                    </p>
                                </div>
                                <button
                                    onClick={() => setEmailNotifications(!emailNotifications)}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                        emailNotifications ? "bg-accent" : "bg-gray-300 dark:bg-gray-700"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform",
                                            emailNotifications ? "translate-x-6" : "translate-x-1"
                                        )}
                                    />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 dark:text-gray-200 font-sans">
                                        In-App Notifications
                                    </label>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-sans mt-1">
                                        Show notifications within the application
                                    </p>
                                </div>
                                <button
                                    onClick={() => setInAppNotifications(!inAppNotifications)}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                                        inAppNotifications ? "bg-accent" : "bg-gray-300 dark:bg-gray-700"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "inline-block h-4 w-4 transform rounded-full bg-white dark:bg-gray-900 transition-transform",
                                            inAppNotifications ? "translate-x-6" : "translate-x-1"
                                        )}
                                    />
                                </button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Account Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card className="rounded-sm border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-none">
                        <CardHeader className="border-b border-gray-100 dark:border-gray-800">
                            <CardTitle className="text-base font-bold font-heading flex items-center gap-2 text-gray-900 dark:text-gray-100">
                                <Lock className="w-5 h-5 text-primary dark:text-gray-300" />
                                Account Security
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <Button
                                variant="outline"
                                className="rounded-sm border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-heading font-bold text-[10px] uppercase tracking-widest"
                            >
                                Change Password
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Save Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleSave}
                        className="bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm px-8 h-11 font-heading font-bold uppercase tracking-widest text-[10px] flex items-center gap-2"
                    >
                        <Save className="w-4 h-4" />
                        Save Changes
                    </Button>
                </div>
            </div>
        </div>
    )
}

