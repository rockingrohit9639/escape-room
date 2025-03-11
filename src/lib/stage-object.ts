import { type StageObjectType } from "@prisma/client"
import { match } from "ts-pattern"
import { v4 as uuid } from "uuid"
import { type StageObject } from "~/server/api/routers/stage-object/stage-object.schema"

export function generateStageObject(type: StageObjectType) {
  const id = uuid()

  const basicOptions = {
    id,
    position: { x: 0, y: 0 },
    rotation: 0,
    size: { width: 100, height: 100 },
    scale: { x: 1, y: 1 },
    disabled: false,
    isDraggable: false,
    isDroppable: false,
  }

  return match(type)
    .returnType<StageObject>()
    .with("TEXT", () => ({
      ...basicOptions,
      type: "TEXT" as const,
      label: "Text",
      data: {
        text: "Hello there",
        fontSize: 16,
        fill: "#FFFFFF",
        align: "left",
      },
    }))
    .with("IMAGE", () => ({
      ...basicOptions,
      type: "IMAGE" as const,
      label: "Image",
      data: { url: "/images/placeholder.jpg" },
    }))
    .otherwise(() => {
      throw new Error(`Unknown object type ${type}`)
    })
}
