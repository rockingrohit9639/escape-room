import { createUploadthing, type FileRouter as UploadThingFileRouter } from "uploadthing/next"

const f = createUploadthing()

export const fileRouter = {
  imageUploader: f({
    image: {
      maxFileCount: 1,
      maxFileSize: "2MB",
      minFileCount: 1,
    },
  }).onUploadComplete(({ file }) => {
    return { url: file.ufsUrl }
  }),
} satisfies UploadThingFileRouter

export type FileRouter = typeof fileRouter
