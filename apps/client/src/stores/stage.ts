import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { generateStageObject } from '~/lib/stage-object'
import { StageStoreActions, StageStoreState } from '~/types/store'

export const useStageStore = create<StageStoreState & StageStoreActions>()(
  immer((set) => ({
    objects: [],
    activeObject: undefined,
    addObject: (type) => {
      const object = generateStageObject(type)

      set((state) => {
        state.objects.push(object)
      })
    },
    setActiveObject: (object) => {
      set((state) => {
        state.activeObject = object
      })
    },
    updateObject: (object) => {
      set((state) => {
        const index = state.objects.findIndex((o) => o.id === object.id)
        state.objects[index] = object
      })
    },
  })),
)
