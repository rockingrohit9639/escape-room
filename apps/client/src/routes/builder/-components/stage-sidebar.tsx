import { cn } from '~/lib/utils'
import StageGrid from './stage-grid'
import CreateNewStage from './create-new-stage'

type StageSidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function StageSidebar({ className, style }: StageSidebarProps) {
  return (
    <div className={cn('p-4 size-full overflow-y-auto', className)} style={style}>
      <CreateNewStage />
      <StageGrid />
    </div>
  )
}
