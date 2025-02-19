import { LucideIcon, TextIcon } from 'lucide-react'
import { stageObjectSchema } from '@escape-room/contracts'
import { z } from 'zod'

export const TOOLS: Array<{
  tooltip: string
  icon: LucideIcon
  type: z.infer<typeof stageObjectSchema>['type']
}> = [
  {
    tooltip: 'Add text',
    icon: TextIcon,
    type: 'TEXT',
  },
]
