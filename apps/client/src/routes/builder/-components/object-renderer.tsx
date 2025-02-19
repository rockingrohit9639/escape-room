import { Text } from 'react-konva'
import { match } from 'ts-pattern'
import { StageObject } from '~/types/store'

type ObjectRendererProps = {
  object: StageObject
}

export default function ObjectRenderer({ object }: ObjectRendererProps) {
  return match(object)
    .with({ type: 'TEXT' }, (textObject) => (
      <Text
        {...textObject.position}
        rotation={textObject.rotation}
        scale={textObject.scale}
        text={textObject.data.text}
        fontSize={textObject.data.fontSize}
        fill={textObject.data.fill}
        align={textObject.data.align}
      />
    ))
    .otherwise(() => null)
}
