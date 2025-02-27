import { create } from "zustand"
import { immer } from "zustand/middleware/immer"
import { generateStageObject } from "~/lib/stage-object"
import type { StageStoreActions, StageStoreState } from "~/types/stage"

export const useStageStore = create<StageStoreState & StageStoreActions>()(
  immer((set) => ({
    objects: [],
    addObject: (type) => {
      const stageObject = generateStageObject(type)

      set((state) => {
        state.objects.push(stageObject)
      })
    },
  })),
)
