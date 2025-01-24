# Escape Room

The **Escape Room** is the core entity of the builder. It represents the overall game structure and serves as a container for multiple stages. Each escape room is designed with a unique theme, a series of puzzles, and challenges that players need to complete to progress.

## Possible schema for EscapeRoom

```ts
const baseEscapeRoom = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  stages: z.array(stage),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  tags: z.array(z.string()), // e.g. horror, adventure etc
  status: z.enum(['DRAFT', 'PUBLISHED']), // allow no further changes if published
})

const escapeRoom = z.discriminatedUnion('visibility', [
  baseEscapeRoom.extend({
    visibility: z.literal('PRIVATE'),
    password: z.string().min(8), // allow access to private rooms with a password
  }),
  baseEscapeRoom.extend({
    visibility: z.literal('PUBLIC'),
  }),
])
```
