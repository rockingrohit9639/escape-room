# Interactions

In an interactive escape room builder, events are actions that happen when a player interacts with a stage object, such as clicking or pressing a key. Interactions are the responses or actions that occur in reaction to those events. Together, they define how a player can engage with the objects in the game world.

## Possible schema for Interaction

```ts
const event = z.enum(["CLICK", "DOUBLE_CLICK", "MOUSE_ENTER", "MOUSE_LEAVE", "HOLD"])

const showObjectAction = z.object({
  event,
  action: z.literal("SHOW_OBJECT"),
  object: z.string(), // id of the object
})

const hideObjectAction = z.object({
  event,
  action: z.literal("HIDE_OBJECT"),
  object: z.string(), // id of the object
})

const changeObjectPropertiesAction = z.object({
  event,
  action: z.literal("CHANGE_OBJECT_PROPERTIES"),
  newProperties: z.object({
    x: z.number().optional(),
    y: z.number().optional(),
    rotation: z.number().optional(),
    width: z.number().optional(),
    height: z.number().optional(),
    scaleX: z.number().optional(),
    scaleY: z.number().optional(),
  }),
})

const playMediaAction = z.object({
  event,
  action: z.literal("PLAY_MEDIA"),
  object: z.string(), // id of video/audio object only
})

const showMessageAction = z.object({
  event,
  action: z.literal("SHOW_MESSAGE"),
  message: z.string(),
  type: z.enum(["success", "error", "info"]),
})

const triggerCutsceneAction = z.object({
  event,
  action: z.literal("TRIGGER_CUTSCENE"),
  video: z.string(), // id of the video object only (will be played full screen to proceed in the story)
})

const finishStageActioin = z.object({
  event,
  action: z.literal("FINISH_STAGE"),
})

const interaction = z.discriminatedUnion("action", [
  showObjectAction,
  hideObjectAction,
  changeObjectPropertiesAction,
  playMediaAction,
  showMessageAction,
  triggerCutsceneAction,
  finishStageAction,
])
```
