import { useState, FormEvent } from "react"
import { useNavigate, Link, useSearchParams, useLocation } from "react-router-dom"
import { motion } from "framer-motion"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { useAuth } from "@/contexts/AuthContext"
import { cn } from "@/lib/utils"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    
    const { login } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const location = useLocation()
    const returnUrl = searchParams.get('returnUrl') || location.state?.returnUrl || '/'

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError("")
        setIsLoading(true)

        try {
            await login(email, password)
            navigate(returnUrl, { replace: true })
        } catch (err) {
            setError("Failed to sign in. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = () => {
        // Mock Google sign in
        setError("Google sign in is not yet implemented")
    }

    return (
        <div className="min-h-screen flex">
            <div className="w-full flex">
                {/* Left Panel - Courtroom Image */}
                <div className="hidden lg:flex lg:w-2/5 relative overflow-hidden">
                    <div 
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: "url(https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1920&h=1080&fit=crop&q=80)"
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50"></div>
                    </div>
                <div className="relative z-10 flex flex-col justify-between p-16 w-full">
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="SpeedMooting Logo" className="w-10 h-10 object-contain brightness-0 invert" />
                        <h1 className="text-2xl font-bold tracking-tight font-heading text-white">SpeedMooting</h1>
                    </div>
                    <div className="mt-auto">
                        <div className="bg-white/10 backdrop-blur-md rounded-sm p-6 border border-white/20 max-w-md">
                            <p className="text-base italic text-white font-sans mb-3 leading-relaxed">
                                "Simply all the tools that my team and I need."
                            </p>
                            <p className="text-sm font-bold text-white font-heading">Alex Thompson</p>
                            <p className="text-xs text-gray-300 font-sans">Student Advocate</p>
                        </div>
                    </div>
                </div>
            </div>

                {/* Right Panel - Login Form */}
                <div className="flex-1 lg:w-3/5 flex flex-col justify-center p-8 lg:p-16 bg-white dark:bg-gray-900">
                <div className="w-full max-w-md mx-auto space-y-8">
                    <div className="lg:hidden flex items-center gap-3 mb-8">
                        <img src="/logo.png" alt="SpeedMooting Logo" className="w-8 h-8 object-contain" />
                        <h1 className="text-xl font-bold tracking-tight font-heading text-gray-900 dark:text-gray-100">SpeedMooting</h1>
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 font-heading">
                            Welcome back
                        </h2>
                        <p className="text-gray-600 dark:text-gray-400 font-sans text-sm">
                            Sign in to access your practice exercises and AI feedback.
                        </p>
                    </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-sm text-sm text-red-700 dark:text-red-400 font-sans"
                                >
                                    {error}
                                </motion.div>
                            )}

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-heading">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="alex.jordan@gmail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        className="pl-10 border-gray-200 dark:border-gray-700 rounded-sm h-11 font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus-visible:ring-accent"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="password" className="text-sm font-semibold text-gray-900 dark:text-gray-100 font-heading">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        className="pl-10 pr-10 border-gray-200 dark:border-gray-700 rounded-sm h-11 font-sans bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus-visible:ring-accent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
                                    />
                                    <span className="text-sm text-gray-700 dark:text-gray-300 font-sans group-hover:text-gray-900 dark:group-hover:text-gray-100">
                                        Remember sign in details
                                    </span>
                                </label>
                                <Link
                                    to="#"
                                    className="text-sm text-accent hover:text-accent/80 font-sans font-medium transition-colors"
                                >
                                    Forgot password?
                                </Link>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-accent hover:bg-accent/90 text-white rounded-sm h-11 font-heading font-bold uppercase tracking-widest text-xs shadow-none"
                            >
                                {isLoading ? "Signing in..." : "Log in"}
                            </Button>
                        </form>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400 font-sans font-bold tracking-widest">
                                    OR
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleGoogleSignIn}
                            className="w-full border-gray-200 dark:border-gray-700 rounded-sm h-11 font-sans text-sm hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                <path
                                    fill="currentColor"
                                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                />
                                <path
                                    fill="currentColor"
                                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                />
                            </svg>
                            Continue with Google
                        </Button>

                        <p className="text-center text-sm text-gray-600 dark:text-gray-400 font-sans">
                            Don't have an account?{" "}
                            <Link
                                to="#"
                                className="text-accent hover:text-accent/80 font-semibold transition-colors"
                            >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

