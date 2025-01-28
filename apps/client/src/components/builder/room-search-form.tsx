import { cn } from '~/lib/utils'
import { Input } from '../ui/input'

type RoomSearchFormProps = {
  className?: string
  style?: React.CSSProperties
}

export default function RoomSearchForm({ className, style }: RoomSearchFormProps) {
  return <Input placeholder="Search for your room..." className={cn('w-[400px]', className)} style={style} />
}
