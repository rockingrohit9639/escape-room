import { type RoomVisibility, type RoomDifficulty } from "@prisma/client"
import colors from "tailwindcss/colors"

export const ESCAPE_ROOM_DIFFICULTY_MAP: Record<RoomDifficulty, { label: string; color: string }> =
  {
    EASY: { label: "Easy", color: colors.emerald["500"] },
    MEDIUM: { label: "Medium", color: colors.amber["500"] },
    HARD: { label: "Hard", color: colors.red["500"] },
  }

export const ESCAPE_ROOM_VISIBILITY_MAP: Record<RoomVisibility, { label: string; color: string }> =
  {
    PRIVATE: { label: "Private", color: colors.blue["500"] },
    PUBLIC: { label: "Public", color: colors.gray["500"] },
  }
