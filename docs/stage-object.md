# Stage Objects

The StageObject is a fundamental building block within a stage in the escape room builder. It represents all interactive and non-interactive elements placed in a stage, such as puzzles, assets, clues, or decorative items.

StageObjects are highly configurable, enabling creators to define their appearance, behaviors, interactions, and relationships with other objects.

## Possible schema for StageObject

```ts
const baseObject = z.object({
  id: z.string(),
  name: z.string(),
  position: z.object({ x: z.number(), y: z.number(), rotation: z.number() }),
  size: z.object({ width: z.number(), height: z.number() }),
  scale: z.object({ x: z.number(), y: z.number() }).optional(),
  disabled: z.boolean(), // no-interactions if object is disabled
  isDraggable: z.boolean().optional().default(false),
  isDroppable: z.boolean().optional().default(false),
})

const imageObject = baseObject.extend({
  type: z.literal('IMAGE'),
  url: z.string().url(),
})

const videoObject = baseObject.extend({
  type: z.literal('VIDEO'),
  url: z.string().url(),
  thumbnail: z.string().url().optional(), // element rendered on the canvas to trigger play or in can be trigger by Interaction
})

const audioObject = baseObject.extend({
  type: z.literal('VIDEO'),
  url: z.string().url(),
  thumbnail: z.string().optional(), // element rendered on the screen to trigger play or in can be trigger by Interaction
})

const textObject = baseObject.extend({
  type: z.literal('TEXT'),
  text: z.string().min(1),
  style: z.object({ ...someCssProperties }),
})

const sliderObject = baseObject.extend({
  type: z.literal('SLIDER'),
  min: z.number(),
  max: z.number(),
  step: z.number().optional().default(1),
})

const stageObject = z.discriminatedUnion('type', [imageObject, videoObject, audioObject, textObject, sliderObject])
```
