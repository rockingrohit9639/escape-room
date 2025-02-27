import { PlayIcon } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs"
import { cn } from "~/lib/utils"
import PropertiesEditor from "./properties-editor/properties-editor"

type ObjectPropertiesSidebarProps = {
  className?: string
  style?: React.CSSProperties
}

export default function ObjectPropertiesSidebar({
  className,
  style,
}: ObjectPropertiesSidebarProps) {
  return (
    <Tabs
      className={cn(
        "fixed right-8 top-1/2 z-[100] h-[calc(100vh_-_60px)] w-80 -translate-y-1/2 overflow-hidden rounded-xl border bg-background",
        className,
      )}
      style={style}
      defaultValue="properties"
    >
      <div className="mt-2 flex items-center justify-end px-2">
        <Button variant="ghost" icon={<PlayIcon />} />
      </div>
      <TabsList className="my-2 w-full justify-start rounded-none border-y bg-transparent">
        <TabsTrigger
          value="properties"
          className="text-xs font-normal data-[state=active]:bg-accent/50"
        >
          Properties
        </TabsTrigger>

        <TabsTrigger
          value="events"
          className="text-xs font-normal data-[state=active]:bg-accent/50"
        >
          Events
        </TabsTrigger>
      </TabsList>

      <TabsContent value="properties" className="h-[calc(100%-120px)] overflow-y-auto px-4">
        <PropertiesEditor />
      </TabsContent>
      <TabsContent value="events">Events</TabsContent>
    </Tabs>
  )
}
