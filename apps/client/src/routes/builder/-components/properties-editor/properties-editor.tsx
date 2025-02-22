import { PackageOpenIcon } from 'lucide-react'
import { match } from 'ts-pattern'
import { useStageStore } from '~/stores'
import TextEditor from './text-editor'

export default function PropertiesEditor() {
  const activeObject = useStageStore((store) => store.activeObject)

  if (!activeObject) {
    return (
      <div className="flex items-center justify-center h-full flex-col gap-2">
        <PackageOpenIcon className="size-6" />
        <p className="text-sm text-muted-foreground">Select an object to edit</p>
      </div>
    )
  }

  return match(activeObject)
    .returnType<React.ReactNode>()
    .with({ type: 'TEXT' }, (textObject) => <TextEditor object={textObject} />)
    .otherwise(() => null)
}
