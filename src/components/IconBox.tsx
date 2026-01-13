import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface IconBoxProps {
  icon: LucideIcon
  variant?: "accent" | "primary" | "success" | "neutral"
  size?: "sm" | "md" | "lg"
  className?: string
}

export function IconBox({
  icon: Icon,
  variant = "accent",
  size = "md",
  className
}: IconBoxProps) {
  const variantClasses = {
    accent: "bg-accent/10 dark:bg-accent/20 text-accent",
    primary: "bg-primary/10 dark:bg-primary/20 text-primary",
    success: "bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400",
    neutral: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400",
  }

  const sizeClasses = {
    sm: "p-1.5",
    md: "p-2",
    lg: "p-3",
  }

  const iconSizeClasses = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5",
  }

  return (
    <div className={cn(
      "rounded-sm",
      variantClasses[variant],
      sizeClasses[size],
      className
    )}>
      <Icon className={cn("shrink-0", iconSizeClasses[size])} />
    </div>
  )
}
