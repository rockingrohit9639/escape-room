# Media Gallery

The Media Gallery is a public library that allows game creators to upload, manage, and share various types of media assets, such as images, videos, sounds, and more. It serves as a repository where creators can organize and access content that can be used to enhance their escape room stages. Creators can choose to make their uploads public, allowing other users to access and use these resources in their own escape room creations.

## Possible schema for GalleryItem

```ts
const galleryItem = z.object({
  id: z.string(),
  name: z.string(),
  type: z.enum(['image', 'video', 'audio']),
  url: z.string(),
  size: z.number(),
  isPublic: z.boolean().optional().default(true),
})
```
