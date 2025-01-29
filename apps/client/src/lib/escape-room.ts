import { ESCAPE_ROOM_DIFFICULTY, ESCAPE_ROOM_VISIBILITY } from '@escape-room/contracts'
import colors from 'tailwindcss/colors'

export const ESCAPE_ROOM_DIFFICULTY_MAP: Record<keyof typeof ESCAPE_ROOM_DIFFICULTY, { label: string; color: string }> =
  {
    EASY: { label: 'Easy', color: colors.emerald['500'] },
    MEDIUM: { label: 'Medium', color: colors.amber['500'] },
    HARD: { label: 'Hard', color: colors.red['500'] },
  }

export const ESCAPE_ROOM_VISIBILITY_MAP: Record<keyof typeof ESCAPE_ROOM_VISIBILITY, { label: string; color: string }> =
  {
    PUBLIC: { label: 'Public', color: colors.blue['500'] },
    PRIVATE: { label: 'Private', color: colors.gray['500'] },
  }
