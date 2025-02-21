import { PackageOpenIcon } from 'lucide-react'
import { match } from 'ts-pattern'
import { useStageStore } from '~/stores'
import TextEditor from './text-editor'
import { cn } from '~/lib/utils'

type PropertiesEditorProps = {
  className?: string
  style?: React.CSSProperties
}

export default function PropertiesEditor({ className, style }: PropertiesEditorProps) {
  const activeObject = useStageStore((store) => store.activeObject)

  if (!activeObject) {
    return (
      <div className="flex items-center justify-center h-96 flex-col gap-2">
        <PackageOpenIcon className="size-6" />
        <p className="text-sm text-muted-foreground">Select an object</p>
      </div>
    )
  }

  return (
    <div className={cn('px-4', className)} style={style}>
      {match(activeObject)
        .returnType<React.ReactNode>()
        .with({ type: 'TEXT' }, (textObject) => <TextEditor object={textObject} />)
        .otherwise(() => null)}
    </div>
  )
}
