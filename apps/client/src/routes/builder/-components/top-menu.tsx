import { useLoaderData } from '@tanstack/react-router'
import { ChevronDownIcon, SaveIcon, UploadIcon } from 'lucide-react'
import { Button } from '~/components/ui/button'
import { cn } from '~/lib/utils'

type TopMenuProps = {
  className?: string
  style?: React.CSSProperties
}

export default function TopMenu({ className, style }: TopMenuProps) {
  const { label } = useLoaderData({ from: '/builder/$escapeRoomId' })

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4 fixed top-0 left-0 border-b w-full h-16 px-6 z-50 bg-background',
        className,
      )}
      style={style}
    >
      <div className="flex items-center gap-2">
        <h1 className="text-2xl">Escape Room</h1>
      </div>

      <div className="flex items-center gap-2 cursor-pointer">
        <p>{label}</p>
        <ChevronDownIcon className="size-4" />
      </div>

      <div className="flex items-center gap-2">
        <Button icon={<SaveIcon />}>Save</Button>
        <Button icon={<UploadIcon />} variant="brand-outline">
          Publish
        </Button>
      </div>
    </div>
  )
}
