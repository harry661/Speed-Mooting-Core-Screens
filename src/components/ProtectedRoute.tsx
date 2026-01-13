import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"

interface ProtectedRouteProps {
    children: ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
    const { isAuthenticated } = useAuth()
    const location = useLocation()

    if (!isAuthenticated) {
        // Redirect to login with return URL
        return <Navigate to={`/login?returnUrl=${encodeURIComponent(location.pathname)}`} replace />
    }

    return <>{children}</>
}

