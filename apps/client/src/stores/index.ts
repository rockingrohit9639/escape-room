import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'

import { EscapeRoomState, EscapeRoomActions } from '~/types/store'

export const useEscapeRoomStore = create<EscapeRoomState & EscapeRoomActions>()(
  immer((set) => ({
    activeStage: undefined,
    setActiveStage: (stage) => set({ activeStage: stage }),
  })),
)
