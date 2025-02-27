import { zodResolver } from "@hookform/resolvers/zod"
import { AlignCenterIcon, AlignLeftIcon, AlignRightIcon } from "lucide-react"
import { useForm } from "react-hook-form"
import { type z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group"
import { cn } from "~/lib/utils"
import { textObject } from "~/server/api/routers/stage-object/stage-object.schema"
import BasicPropertiesEditor from "./basic-properties-editor"
import { useStageStore } from "~/stores"

type TextObject = z.infer<typeof textObject>

type TextEditorProps = {
  object: TextObject
}

export default function TextEditor({ object }: TextEditorProps) {
  const updateActiveObject = useStageStore((store) => store.updateActiveObject)

  const form = useForm<TextObject>({
    resolver: zodResolver(textObject),
    defaultValues: object,
    mode: "onBlur",
  })

  function handleUpdateProperties(updatedObject: TextObject) {
    updateActiveObject(updatedObject)
  }

  return (
    <Form {...form}>
      <form
        className="grid grid-cols-1 gap-4"
        onSubmit={form.handleSubmit(handleUpdateProperties)}
        onChange={form.handleSubmit(handleUpdateProperties)}
      >
        <FormField
          control={form.control}
          name="data.text"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Input placeholder="Enter text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="data.fontSize"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font size</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Font size"
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
          name="data.fill"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fill</FormLabel>
              <FormControl>
                <Input type="color" placeholder="Fill" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="data.align"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Align</FormLabel>
              <FormControl>
                <RadioGroup
                  className="flex w-max items-center gap-2 rounded-md border p-1"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormLabel
                    htmlFor="left"
                    className={cn(
                      "flex cursor-pointer items-center justify-center rounded p-2 hover:bg-accent",
                      field.value === "left" && "bg-accent",
                    )}
                  >
                    <RadioGroupItem id="left" className="sr-only" value="left" />
                    <AlignLeftIcon className="size-5" />
                  </FormLabel>

                  <FormLabel
                    htmlFor="center"
                    className={cn(
                      "flex cursor-pointer items-center justify-center rounded p-2 hover:bg-accent",
                      field.value === "center" && "bg-accent",
                    )}
                  >
                    <RadioGroupItem id="center" className="sr-only" value="center" />
                    <AlignCenterIcon className="size-5" />
                  </FormLabel>

                  <FormLabel
                    htmlFor="right"
                    className={cn(
                      "flex cursor-pointer items-center justify-center rounded p-2 hover:bg-accent",
                      field.value === "right" && "bg-accent",
                    )}
                  >
                    <RadioGroupItem id="right" className="sr-only" value="right" />
                    <AlignRightIcon className="size-5" />
                  </FormLabel>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <BasicPropertiesEditor />
      </form>
    </Form>
  )
}
