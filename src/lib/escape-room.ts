import { type RoomVisibility, type RoomDifficulty } from "@prisma/client"

export const ESCAPE_ROOM_DIFFICULTY_MAP: Record<RoomDifficulty, { label: string }> = {
  EASY: { label: "Easy" },
  MEDIUM: { label: "Medium" },
  HARD: { label: "Hard" },
}

export const ESCAPE_ROOM_VISIBILITY_MAP: Record<RoomVisibility, { label: string }> = {
  PRIVATE: { label: "Private" },
  PUBLIC: { label: "Public" },
}
