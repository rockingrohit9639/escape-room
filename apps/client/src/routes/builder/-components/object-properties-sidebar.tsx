import { cn } from '~/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs'
import { Button } from '~/components/ui/button'
import { PlayIcon } from 'lucide-react'
import PropertiesEditor from './properties-editor/properties-editor'

type ObjectPropertiesSidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function ObjectPropertiesSidebar({ className, style }: ObjectPropertiesSidebarProps) {
  return (
    <Tabs
      className={cn(
        'w-80 border h-[calc(100vh_-_60px)] fixed right-8 top-1/2 -translate-y-1/2 rounded-xl overflow-hidden bg-background',
        className,
      )}
      style={style}
      defaultValue="properties"
    >
      <div className="mt-2 px-2 flex items-center justify-end">
        <Button variant="ghost" icon={<PlayIcon />} />
      </div>
      <TabsList className="w-full rounded-none bg-transparent justify-start border-y my-2">
        <TabsTrigger value="properties" className="data-[state=active]:bg-accent/50 text-xs font-normal">
          Properties
        </TabsTrigger>

        <TabsTrigger value="events" className="data-[state=active]:bg-accent/50 text-xs font-normal">
          Events
        </TabsTrigger>
      </TabsList>

      <TabsContent value="properties">
        <PropertiesEditor />
      </TabsContent>
      <TabsContent value="events">Events</TabsContent>
    </Tabs>
  )
}
