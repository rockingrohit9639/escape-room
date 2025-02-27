# Stage

A Stage is a fundamental unit of an escape room, representing a self-contained interactive environment where users solve puzzles or complete tasks. Each stage is designed to immerse players in a specific setting, such as a library, dungeon, or laboratory, with its own unique background, objects, and challenges.

Stages are structured sequentially, meaning players must complete the current stage to unlock the next. This allows for progressive gameplay and ensures a logical flow through the escape room.

## Possible schema of Stage

```ts
const stageBackground = z.discriminatedUnion("type", [
  z.object({ type: "IMAGE", url: z.string() }),
  z.object({ type: "VIDEO", url: z.string() }),
  z.object({ type: "COLOR", value: z.string().startsWith("#").length(7) }),
])

const stage = z.object({
  id: z.string(),
  label: z.string(),
  description: z.string(),
  background: stageBackground,
  timeLimit: z.number(),
  isLocked: z.boolean(),
  objects: z.array(stageObject),
  order: z.number(),
  onFinish: interaction,
})
```
