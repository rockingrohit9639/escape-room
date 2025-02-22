import { Group, Text } from 'react-konva'
import { match } from 'ts-pattern'
import { useStageStore } from '~/stores'
import { StageObject } from '~/types/store'

type ObjectRendererProps = {
  object: StageObject
}

export default function ObjectRenderer({ object }: ObjectRendererProps) {
  const setActiveObject = useStageStore((store) => store.setActiveObject)

  return (
    <Group
      onClick={() => {
        setActiveObject(object)
      }}
    >
      {match(object)
        .with({ type: 'TEXT' }, (textObject) => (
          <Text
            {...textObject.position}
            rotation={textObject.rotation}
            scale={textObject.scale}
            text={textObject.data.text}
            fontSize={textObject.data.fontSize}
            fill={textObject.data.fill}
            align={textObject.data.align}
            opacity={textObject.disabled ? 0.5 : 1}
          />
        ))
        .otherwise(() => null)}
    </Group>
  )
}
