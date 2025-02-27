"use client"

import { cn } from "~/lib/utils"
import { Layer, Stage } from "react-konva"
import { useStageStore } from "~/stores"
import StageObjectRenderer from "./stage-object-renderer"

type CanvasProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Canvas({ className, style }: CanvasProps) {
  const stageObjects = useStageStore((store) => store.objects)

  return (
    <Stage
      className={cn("fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border", className)}
      style={style}
      width={750}
      height={450}
    >
      <Layer>
        {stageObjects.map((stageObject) => (
          <StageObjectRenderer key={stageObject.id} stageObject={stageObject} />
        ))}
      </Layer>
    </Stage>
  )
}
