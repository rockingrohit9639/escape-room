import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { generateStageObject } from "~/lib/stage-object"
import type { StageStoreActions, StageStoreState } from "~/types/stage"

export const useStageStore = create<StageStoreState & StageStoreActions>()(
  immer((set, get) => ({
    // States
    objects: [],
    activeObject: undefined,

    // Actions
    addObject: (type) => {
      const stageObject = generateStageObject(type)

      set((state) => {
        state.objects.push(stageObject)
      })
    },
    setActiveObject: (stageObject) => {
      set((state) => {
        state.activeObject = stageObject
      })
    },
    updateActiveObject: (stageObject) => {
      set((state) => {
        const index = state.objects.findIndex((o) => o.id === stageObject.id)
        state.objects[index] = stageObject
      })
    },
    isActiveObject: (id) => {
      return get().activeObject?.id === id
    },
  })),
)
