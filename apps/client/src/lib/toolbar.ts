import { LucideIcon, TextIcon } from 'lucide-react'
import { StageObject } from '~/types/store'

export const TOOLBAR_OBJECTS: Array<{
  tooltip: string
  icon: LucideIcon
  type: StageObject['type']
}> = [
  {
    tooltip: 'Add text',
    icon: TextIcon,
    type: 'TEXT',
  },
]
