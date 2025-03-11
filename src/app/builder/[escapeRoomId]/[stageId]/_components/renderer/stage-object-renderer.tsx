import { Group } from "react-konva"
import { match } from "ts-pattern"
import { type StageObject } from "~/server/api/routers/stage-object/stage-object.schema"
import { useStageStore } from "~/stores"
import TextRenderer from "./text-renderer"
import { useState } from "react"

type StageObjectRenderer = {
  stageObject: StageObject
}

export default function StageObjectRenderer({ stageObject }: StageObjectRenderer) {
  const setActiveObject = useStageStore((store) => store.setActiveObject)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Group
      onClick={() => {
        setActiveObject(stageObject)
      }}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      {match(stageObject)
        .with({ type: "TEXT" }, (textObject) => (
          <TextRenderer textObject={textObject} isHovered={isHovered} />
        ))
        .otherwise(() => null)}
    </Group>
  )
}
