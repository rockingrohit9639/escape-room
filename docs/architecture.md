# Architecture of Escape Room

## Escape Room on broader level\*\*

- Puzzle (Escape Room)

  - Metadata (name, description etc.)
  - Global Interactions (Timer, background music)
  - Stage
    - Inventory
    - Metadata
    - Elements (Buttons, Inputs, Shape, Text)
    - Assets
      - Position
      - Size
      - Interactions
      - Style

- Multimedia Gallery
  It's like a library of assets, you can find images, videos, audios etc. You can upload your own files here.

What I am thinking is, there can be multiple types of assets in a room. Then each asset will have some interactions
and based on those interactions some kind of action will be performed (should I allow multiple actions on single asset?).
Can I merge elements and assets together ?

## Events

- click
- double click
- hold
- mouse enter
- mouse leave
- key press

I should add some conditions for the events, for example there can be some events which should be triggered after a particular time or maybe
after acquiring some kind of key in stage.
I should also create an inventory, where user can collect items from stage and use them later to proceed further.

## Actions

- Show/Hide an item
- Change properties on asset (e.g. color, size, opacity, position)
- Play/pause any media in stage
- Finish Stage
- End game
- Show message (success, failure, info, hint)
- Trigger cutscene
- Add to inventory
