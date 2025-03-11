import { type ObjectByType } from "~/server/api/routers/stage-object/stage-object.schema"
import { Rect, Text } from "react-konva"
import { useRef } from "react"
import When from "~/components/when"
import { useStageStore } from "~/stores"

type TextRendererProps = {
  textObject: ObjectByType<"TEXT">
  isHovered: boolean
}

export default function TextRenderer({ textObject, isHovered }: TextRendererProps) {
  const isActive = useStageStore((store) => store.isActiveObject(textObject.id))
  const textRef = useRef<React.ComponentRef<typeof Text>>(null)

  return (
    <>
      <Text
        ref={textRef}
        {...textObject.position}
        rotation={textObject.rotation}
        scale={textObject.scale}
        text={textObject.data.text}
        fontSize={textObject.data.fontSize}
        fill={textObject.data.fill}
        align={textObject.data.align}
        opacity={textObject.disabled ? 0.5 : 1}
      />

      <When condition={isHovered || isActive}>
        <Rect {...textRef.current?.getClientRect()} stroke="gray" strokeWidth={2} />
      </When>
    </>
  )
}
