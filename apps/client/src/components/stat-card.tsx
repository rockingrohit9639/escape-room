import { LucideIcon } from 'lucide-react'
import { cn } from '~/lib/utils'

type StatCardProps = {
  className?: string
  style?: React.CSSProperties
  label: string
  value: React.ReactNode
  icon: LucideIcon
}

export default function StatCard({ className, style, label, value, icon: Icon }: StatCardProps) {
  return (
    <div className={cn('p-4 rounded-md shadow-sm bg-accent', className)} style={style}>
      <div className="flex items-center gap-2">
        <Icon className="size-4" />
        <p>{label}</p>
      </div>

      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
