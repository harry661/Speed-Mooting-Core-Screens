import { ReactNode } from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lock, LogIn } from "lucide-react"
import { useAuth, useLoginModal } from "@/contexts/AuthContext"

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth()
    const { openLoginModal } = useLoginModal()

    if (!isAuthenticated) {
        return (
            <div className="flex-1 bg-[#fcf8f8] dark:bg-gray-950 min-h-screen p-6 flex items-center justify-center">
                <Card className="w-full max-w-md rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none">
                    <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 bg-accent/10 dark:bg-accent/20 p-4 rounded-full w-16 h-16 flex items-center justify-center">
                            <Lock className="w-8 h-8 text-accent" />
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-heading">
                            Sign In Required
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-gray-600 dark:text-gray-400 font-sans text-center">
                            You need to be signed in to access this page. Please sign in to continue.
                        </p>
                        <div className="flex flex-col gap-3">
                            <Button 
                                onClick={openLoginModal}
                                className="w-full bg-accent hover:bg-accent/90 text-white shadow-none rounded-sm h-11 font-heading font-bold uppercase tracking-widest text-xs"
                            >
                                <LogIn className="w-4 h-4 mr-2" />
                                Sign In
                            </Button>
                            <Link to="/" className="w-full">
                                <Button variant="outline" className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-sm h-11 font-heading font-bold uppercase tracking-widest text-xs">
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return <>{children}</>
}

