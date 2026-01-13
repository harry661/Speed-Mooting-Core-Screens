import { LucideIcon } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconBox } from "@/components/IconBox"

interface MetricCardProps {
  title: string
  value: string | number
  change?: string
  icon: LucideIcon
  trend?: "up" | "down" | "neutral"
  className?: string
}

export function MetricCard({
  title,
  value,
  change,
  icon,
  trend = "neutral",
  className
}: MetricCardProps) {
  const trendColor = {
    up: "text-green-600 dark:text-green-400",
    down: "text-red-600 dark:text-red-400",
    neutral: "text-muted-foreground",
  }

  return (
    <Card className={`rounded-sm border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-none ${className || ""}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-[10px] font-medium uppercase tracking-widest text-gray-500 dark:text-gray-400 font-heading">
          {title}
        </CardTitle>
        <IconBox icon={icon} variant="accent" size="md" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className={`text-xs ${trendColor[trend]}`}>
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
