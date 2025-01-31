import { CogIcon, DownloadIcon, RedoIcon, SaveIcon, ShareIcon, UndoIcon } from 'lucide-react'
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from '~/components/ui/menubar'
import { cn } from '~/lib/utils'

type TopMenuProps = {
  className?: string
  style?: React.CSSProperties
}

export default function TopMenu({ className, style }: TopMenuProps) {
  return (
    <div className={cn('flex items-center justify-between gap-4', className)} style={style}>
      <Menubar>
        {/* File */}
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <SaveIcon className="size-4 mr-1" /> Save
            </MenubarItem>

            <MenubarItem>
              <DownloadIcon className="size-4 mr-1" />
              Export
            </MenubarItem>
            <MenubarItem>
              <ShareIcon className="size-4 mr-1" />
              Share
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Edit */}
        <MenubarMenu>
          <MenubarTrigger>Edit</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <UndoIcon className="size-4 mr-1" /> Undo
            </MenubarItem>
            <MenubarItem>
              <RedoIcon className="size-4 mr-1" />
              Redo
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        {/* Settings */}
        <MenubarMenu>
          <MenubarTrigger>Settings</MenubarTrigger>
          <MenubarContent>
            <MenubarItem>
              <CogIcon className="size-4 mr-1" />
              Settings
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  )
}
