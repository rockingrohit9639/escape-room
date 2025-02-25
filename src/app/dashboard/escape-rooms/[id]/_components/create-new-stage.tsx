"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "~/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet"
import { Textarea } from "~/components/ui/textarea"
import When from "~/components/when"
import { cn } from "~/lib/utils"
import { createStageSchema, type CreateStageSchema } from "~/server/api/routers/stage/stage.schema"
import { api } from "~/trpc/react"

type CreateNewStageProps = {
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  escapeRoomId: string
}

type CreateNewStageSchema = Omit<CreateStageSchema, "escapeRoomId">

export default function CreateNewStage({
  className,
  style,
  children,
  escapeRoomId,
}: CreateNewStageProps) {
  const [isOpen, setIsOpen] = useState(false)

  const form = useForm<CreateNewStageSchema>({
    resolver: zodResolver(createStageSchema.omit({ escapeRoomId: true })),
    defaultValues: {
      label: "",
      description: "",
      timeLimit: 10,
      background: { type: "COLOR", color: "#FFFFFF" },
    },
  })

  const utils = api.useUtils()

  const createStageMutation = api.stage.new.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async () => {
      form.reset()
      await utils.stage.findAll.invalidate(escapeRoomId)
      setIsOpen(false)
      toast.success("Stage created successfully.")
    },
  })

  const bgType = form.watch("background.type")

  function handleSubmit(input: CreateNewStageSchema) {
    createStageMutation.mutate({ ...input, escapeRoomId })
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent className={cn("min-w-[600px]", className)} style={style}>
        <SheetHeader className="mb-4">
          <SheetTitle>Create new stage</SheetTitle>
          <SheetDescription>
            Design a new stage for your escape room. Customize its layout, appearance, and
            interactions to build an immersive experience for players.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter a unique stage label" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Briefly describe this stage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="timeLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Time Limit <span className="text-sm text-muted-foreground">(in minutes)</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter time limit"
                      min={10}
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
              name="background.type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background type</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select the background type" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="COLOR">Color</SelectItem>
                        <SelectItem value="IMAGE">Image</SelectItem>
                        <SelectItem value="VIDEO">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <When condition={bgType === "COLOR"}>
              <FormField
                control={form.control}
                name="background.color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input type="color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </When>

            <Button loading={createStageMutation.isPending}>Create now</Button>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  )
}
