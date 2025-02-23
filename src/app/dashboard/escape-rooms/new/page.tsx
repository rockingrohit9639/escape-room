"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  escapeRoomSchema,
  type EscapeRoomSchema,
} from "~/server/api/routers/escape-room/escape-room.schema"
import { api } from "~/trpc/react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form"
import { Input } from "~/components/ui/input"
import { Textarea } from "~/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select"
import When from "~/components/when"
import Link from "next/link"
import { Button } from "~/components/ui/button"
import { ChevronLeftIcon, PuzzleIcon } from "lucide-react"
import { ESCAPE_ROOM_DIFFICULTY_MAP, ESCAPE_ROOM_VISIBILITY_MAP } from "~/lib/escape-room"

export default function CreateNewEscapeRoom() {
  const router = useRouter()
  const form = useForm<EscapeRoomSchema>({
    resolver: zodResolver(escapeRoomSchema),
    defaultValues: {
      label: "",
      description: "",
      difficulty: "EASY",
      tags: [],
      visibility: "PUBLIC",
    },
  })

  const newEscapeRoomMutation = api.escapeRoom.new.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: (createdRoom) => {
      toast.success("Success.", {
        description:
          "Escape room created successfully. You can start editing your escape room now.",
      })

      router.push(`/escaper-rooms/${createdRoom.id}`)
    },
  })

  const visibility = form.watch("visibility")

  function handleCreateNewRoom(body: EscapeRoomSchema) {
    newEscapeRoomMutation.mutate(body)
  }

  return (
    <Form {...form}>
      <form className="grid gap-4 p-4" onSubmit={form.handleSubmit(handleCreateNewRoom)}>
        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Label</FormLabel>
              <FormControl>
                <Input placeholder="Enter a name for your new escape room" {...field} />
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
                <Textarea rows={4} placeholder="Describe your escape room" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="difficulty"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(ESCAPE_ROOM_DIFFICULTY_MAP).map(([value, difficulty]) => (
                      <SelectItem key={value} value={value}>
                        {difficulty.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="visibility"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.entries(ESCAPE_ROOM_VISIBILITY_MAP).map(([value, visibility]) => (
                      <SelectItem key={value} value={value}>
                        {visibility.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <When condition={visibility === "PRIVATE"}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter secure password for your escape room"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </When>

        <div className="flex items-center gap-4">
          <Link href="..">
            <Button
              disabled={newEscapeRoomMutation.isPending}
              type="button"
              variant="secondary"
              icon={<ChevronLeftIcon />}
            >
              Cancel
            </Button>
          </Link>
          <Button icon={<PuzzleIcon />} loading={newEscapeRoomMutation.isPending}>
            Create now
          </Button>
        </div>
      </form>
    </Form>
  )
}
