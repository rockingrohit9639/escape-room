import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { generateStageObject } from '~/lib/stage-object'
import { StageStoreActions, StageStoreState } from '~/types/store'

export const useStageStore = create<StageStoreState & StageStoreActions>()(
  immer((set) => ({
    objects: [],
    addObject: (type) => {
      const object = generateStageObject(type)

      set((state) => {
        state.objects.push(object)
      })
    },
  })),
)
