import { Building2Icon, CheckCircleIcon, UsersIcon } from "lucide-react"
import StatCard from "~/components/stat-card"

export default function Dashboard() {
  return (
    <div className="grid grid-cols-6 gap-4 p-4">
      <StatCard className="col-span-2" label="Rooms Created" value="12" icon={Building2Icon} />
      <StatCard className="col-span-2" label="Total Players" value="100" icon={UsersIcon} />
      <StatCard
        className="col-span-2"
        label="Average Completion Rate"
        value="73%"
        icon={CheckCircleIcon}
      />
    </div>
  )
}
