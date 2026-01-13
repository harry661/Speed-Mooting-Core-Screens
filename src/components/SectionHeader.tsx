import { LucideIcon } from "lucide-react"
import { IconBox } from "@/components/IconBox"
import { ReactNode } from "react"

interface SectionHeaderProps {
  icon: LucideIcon
  title: string
  actions?: ReactNode
  variant?: "accent" | "primary" | "success" | "neutral"
  className?: string
}

export function SectionHeader({
  icon,
  title,
  actions,
  variant = "accent",
  className
}: SectionHeaderProps) {
  return (
    <div className={`flex items-center justify-between mb-6 ${className || ""}`}>
      <div className="flex items-center gap-3">
        <IconBox icon={icon} variant={variant} size="md" />
        <h2 className="text-lg font-bold font-heading">{title}</h2>
      </div>
      {actions}
    </div>
  )
}
