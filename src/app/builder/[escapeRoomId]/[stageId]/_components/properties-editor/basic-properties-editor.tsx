import { useFormContext } from "react-hook-form"
import { type z } from "zod"
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Label } from "~/components/ui/label"
import { Separator } from "~/components/ui/separator"
import { Switch } from "~/components/ui/switch"
import { type baseObject } from "~/server/api/routers/stage-object/stage-object.schema"

export default function BasicPropertiesEditor() {
  const form = useFormContext<z.infer<typeof baseObject>>()

  return (
    <>
      <div>
        <Label className="mb-2 block">Position</Label>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="position.x"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="x"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.valueAsNumber)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="position.y"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="y"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.valueAsNumber)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
      <Separator />

      <FormField
        control={form.control}
        name="rotation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rotation</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Rotation"
                {...field}
                onChange={(event) => {
                  field.onChange(event.target.valueAsNumber)
                }}
              />
            </FormControl>
          </FormItem>
        )}
      />

      <Separator />

      <div>
        <Label className="mb-2 block">Scale</Label>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="scale.x"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="x"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.valueAsNumber)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="scale.y"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="y"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.valueAsNumber)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      <div>
        <Label className="mb-2 block">Size</Label>
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="size.width"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="width"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.valueAsNumber)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="size.height"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input
                    type="number"
                    placeholder="height"
                    {...field}
                    onChange={(event) => {
                      field.onChange(event.target.valueAsNumber)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      <Separator />

      <FormField
        control={form.control}
        name="disabled"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between gap-2 rounded-md border p-3 shadow-sm">
            <FormLabel htmlFor="disabled" className="cursor-pointer space-y-0.5">
              <p>Disabled</p>
              <FormDescription>
                Setting this to true will disable all the interactions
              </FormDescription>
            </FormLabel>
            <FormControl>
              <Switch id="disabled" checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isDraggable"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between gap-2 rounded-md border p-3 shadow-sm">
            <FormLabel htmlFor="isDraggable" className="cursor-pointer space-y-0.5">
              <p>Draggable</p>
              <FormDescription>User can drag this object if enabled.</FormDescription>
            </FormLabel>
            <FormControl>
              <Switch id="isDraggable" checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="isDroppable"
        render={({ field }) => (
          <FormItem className="flex items-center justify-between gap-2 rounded-md border p-3 shadow-sm">
            <FormLabel htmlFor="isDroppable" className="cursor-pointer space-y-0.5">
              <p>Droppable</p>
              <FormDescription>
                User can drop other objects on this object if enabled.
              </FormDescription>
            </FormLabel>
            <FormControl>
              <Switch id="isDroppable" checked={field.value} onCheckedChange={field.onChange} />
            </FormControl>
          </FormItem>
        )}
      />
    </>
  )
}
