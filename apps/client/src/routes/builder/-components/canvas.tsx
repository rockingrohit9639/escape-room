import { cn } from '~/lib/utils'
import { Stage, Layer } from 'react-konva'
import { useStageStore } from '~/stores'
import ObjectRenderer from './object-renderer'

type CanvasProps = {
  className?: string
  style?: React.CSSProperties
}

export default function Canvas({ className, style }: CanvasProps) {
  const objects = useStageStore((store) => store.objects)

  return (
    <Stage
      className={cn('border fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2', className)}
      style={style}
      width={750}
      height={450}
    >
      <Layer>
        {objects.map((object) => (
          <ObjectRenderer key={object.id} object={object} />
        ))}
      </Layer>
    </Stage>
  )
}
