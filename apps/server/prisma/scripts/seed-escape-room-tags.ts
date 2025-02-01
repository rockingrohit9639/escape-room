import { PrismaClient } from '@prisma/client'

const ESCAPE_ROOM_TAGS = [
  'mystery',
  'horror',
  'adventure',
  'thriller',
  'sci-fi',
  'fantasy',
  'detective',
  'historical',
  'steampunk',
  'cyberpunk',
  'post-apocalyptic',
  'dystopian',
  'time-travel',
  'supernatural',
  'haunted',
  'spy',
  'prison-break',
  'heist',
  'magic',
  'puzzle-heavy',
  'story-driven',
  'action',
  'exploration',
  'crime',
  'alien-invasion',
  'survival',
  'mystical',
  'psychological',
  'clue-hunting',
  'teamwork',
  'mind-bending',
  'trapped',
  'escape-or-die',
  'dark-theme',
  'lighthearted',
  'retro',
  'futuristic',
  'whodunit',
  'underwater',
  'space-station',
  'abandoned-facility',
  'zombie-outbreak',
  'ancient-ruins',
  'robotics',
  'AI-controlled',
  'forensic-investigation',
  'dream-world',
  'virtual-reality',
  'secret-society',
  'government-conspiracy',
]

export async function seedEscapeRoomTags() {
  const prisma = new PrismaClient()

  await prisma.escapeRoomTag.createMany({
    data: ESCAPE_ROOM_TAGS.map((escapeRoomTag) => ({
      name: escapeRoomTag,
    })),
  })

  console.log(`🟢Escape room tags seeded successfully.🟢`)
}

seedEscapeRoomTags()
