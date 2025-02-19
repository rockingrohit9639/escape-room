import { match } from 'ts-pattern'
import { StageObject } from '~/types/store'
import { v4 as uuid } from 'uuid'

export function generateStageObject(type: StageObject['type']): StageObject {
  const id = uuid()

  const basicOptions = {
    id,
    position: { x: 0, y: 0 },
    rotation: 0,
    size: { width: 100, height: 100 },
    disabled: false,
    isDraggable: false,
    isDroppable: false,
  }

  return match(type)
    .returnType<StageObject>()
    .with('TEXT', () => ({
      type: 'TEXT',
      ...basicOptions,
      label: 'Text',
      data: {
        text: 'Hello there',
        fontSize: 16,
        fill: '#FFFFFF',
        align: 'left',
      },
    }))
    .otherwise(() => {
      throw new Error(`Unknown object type: ${type}`)
    })
}
