import { Badge } from "@/components/ui/badge"

interface StatusBadgeProps {
  status: "analyzed" | "processing" | "upcoming" | "failed"
  size?: "sm" | "md"
  className?: string
}

export function StatusBadge({ status, size = "md", className }: StatusBadgeProps) {
  const variantMap = {
    analyzed: "analyzed",
    processing: "processing",
    upcoming: "upcoming",
    failed: "failed",
  } as const

  const labelMap = {
    analyzed: "COMPLETED",
    processing: "PENDING",
    upcoming: "UPCOMING",
    failed: "CANCELED",
  }

  return (
    <Badge variant={variantMap[status]} className={className}>
      {labelMap[status]}
    </Badge>
  )
}
