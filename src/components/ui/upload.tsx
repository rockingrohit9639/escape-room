import { generateUploadButton, generateUploadDropzone } from "@uploadthing/react"
import { type FileRouter } from "~/uploadthing/file-router"

export const UploadButton = generateUploadButton<FileRouter>()
export const UploadDropzone = generateUploadDropzone<FileRouter>()
