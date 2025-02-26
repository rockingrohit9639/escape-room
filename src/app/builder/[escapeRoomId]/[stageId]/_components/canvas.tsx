import { cn } from "~/lib/utils"
import { Layer, Stage, Text } from "react-konva"

type CanvasProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Canvas({ className, style }: CanvasProps) {
  return (
    <Stage
      className={cn("fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border", className)}
      style={style}
      width={750}
      height={450}
    >
      <Layer>
        <Text text="Hello" x={0} y={0} fill="white" fontSize={20} />
      </Layer>
    </Stage>
  )
}
