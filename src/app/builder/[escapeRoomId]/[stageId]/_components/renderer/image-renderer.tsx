import { Image } from "react-konva"
import { type ObjectByType } from "~/server/api/routers/stage-object/stage-object.schema"
import useImage from "use-image"

type ImageRendererProps = {
  imageObject: ObjectByType<"IMAGE">
}

export default function ImageRenderer({ imageObject }: ImageRendererProps) {
  const [image] = useImage(imageObject.data.url)

  // eslint-disable-next-line
  return <Image image={image} {...imageObject.position} {...imageObject.size} />
}
