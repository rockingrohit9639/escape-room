import { Group, Text } from "react-konva"
import { match } from "ts-pattern"
import { type StageObject } from "~/server/api/routers/stage-object/stage-object.schema"
import { useStageStore } from "~/stores"

type StageObjectRenderer = {
  stageObject: StageObject
}

export default function StageObjectRenderer({ stageObject }: StageObjectRenderer) {
  const setActiveObject = useStageStore((store) => store.setActiveObject)

  return (
    <Group
      onClick={() => {
        setActiveObject(stageObject)
      }}
    >
      {match(stageObject)
        .with({ type: "TEXT" }, (textObject) => (
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
