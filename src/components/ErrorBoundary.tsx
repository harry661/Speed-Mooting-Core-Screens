import { Component } from "react"
import type { ErrorInfo, ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface Props {
    children: ReactNode
}

interface State {
    hasError: boolean
    error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    }

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo)
    }

    private handleNavigateHome = () => {
        // Use window.location for navigation since we can't use React Router hooks in class component
        // This will cause a full page reload but ensures navigation works
        window.location.pathname = "/"
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="flex-1 bg-[#fcf8f8] dark:bg-gray-950 min-h-screen p-6 flex items-center justify-center">
                    <Card className="max-w-md w-full rounded-sm border-red-200 dark:border-red-800 bg-white dark:bg-gray-900 shadow-none">
                        <CardContent className="p-8 text-center">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 font-heading mb-2">
                                Something went wrong
                            </h2>
                            <p className="text-sm text-gray-600 dark:text-gray-300 font-sans mb-6">
                                {this.state.error?.message || "An unexpected error occurred. Please try refreshing the page."}
                            </p>
                            <div className="flex gap-3 justify-center">
                                <Button
                                    onClick={() => window.location.reload()}
                                    className="bg-accent hover:bg-accent/90 text-white rounded-sm font-heading font-bold text-[10px] uppercase tracking-widest px-4"
                                >
                                    Refresh Page
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={this.handleNavigateHome}
                                    className="rounded-sm border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 font-heading font-bold text-[10px] uppercase tracking-widest px-4"
                                >
                                    Go to Dashboard
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )
        }

        return this.props.children
    }
}

