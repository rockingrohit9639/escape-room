import { cn } from '~/lib/utils'
import { Stage, Layer, Text } from 'react-konva'

type CanvasProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Canvas({ className, style }: CanvasProps) {
  return (
    <Stage
      className={cn('border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className)}
      style={style}
      width={750}
      height={450}
    >
      <Layer>
        <Text text="This is canvas" fill="white" />
      </Layer>
    </Stage>
  )
}
