import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface User {
    id: string
    name: string
    email: string
    role: 'student' | 'admin'
    avatar?: string
}

interface AuthContextType {
    isAuthenticated: boolean
    user: User | null
    login: (email: string, password: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        const savedAuth = localStorage.getItem("isAuthenticated")
        return savedAuth === "true"
    })
    
    const [user, setUser] = useState<User | null>(() => {
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
            try {
                return JSON.parse(savedUser)
            } catch {
                return null
            }
        }
        return null
    })

    useEffect(() => {
        if (isAuthenticated && user) {
            localStorage.setItem("isAuthenticated", "true")
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("isAuthenticated")
            localStorage.removeItem("user")
        }
    }, [isAuthenticated, user])

    const login = async (email: string, password: string): Promise<void> => {
        // Mock login - accepts any credentials
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const mockUser: User = {
            id: "1",
            name: "Alex Thompson",
            email: email,
            role: "student",
            avatar: "https://github.com/shadcn.png"
        }
        
        setUser(mockUser)
        setIsAuthenticated(true)
    }

    const logout = () => {
        setUser(null)
        setIsAuthenticated(false)
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider")
    }
    return context
}

