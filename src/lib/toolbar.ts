import { type StageObjectType } from "@prisma/client"
import { TypeIcon, type LucideIcon } from "lucide-react"

export const TOOLBAR_TOOLS: Array<{
  tooltip: string
  icon: LucideIcon
  type: StageObjectType
}> = [
  {
    tooltip: "Add text",
    icon: TypeIcon,
    type: "TEXT",
  },
]
