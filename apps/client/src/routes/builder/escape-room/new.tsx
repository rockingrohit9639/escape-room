import { escapeRoomContract } from '@escape-room/contracts'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ChevronLeftIcon, PuzzleIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '~/components/ui/select'
import { Textarea } from '~/components/ui/textarea'
import When from '~/components/when'
import { apiClient } from '~/lib/client'
import { handleError } from '~/lib/error'
import { ESCAPE_ROOM_DIFFICULTY_MAP, ESCAPE_ROOM_VISIBILITY_MAP } from '~/lib/escape-room'

export const Route = createFileRoute('/builder/escape-room/new')({
  component: CreateEscapeRoom,
})

type NewEscapeRoomSchema = z.infer<typeof escapeRoomContract.new.body>

function CreateEscapeRoom() {
  const navigate = useNavigate()

  const form = useForm<NewEscapeRoomSchema>({
    resolver: zodResolver(escapeRoomContract.new.body),
    defaultValues: {
      label: '',
      description: '',
      difficulty: 'EASY',
      tags: [],
      visibility: 'PUBLIC',
    },
  })

  const newEscapeRoomMutation = apiClient.escapeRoom.new.useMutation({
    onError: handleError,
    onSuccess: ({ body }) => {
      toast.success('Success.', {
        description: 'Escape room created successfully. You can start editing your escape room now.',
      })

      navigate({ to: '/builder/escape-room' })
    },
  })

  const visibility = form.watch('visibility')

  function handleCreateNewRoom(body: NewEscapeRoomSchema) {
    newEscapeRoomMutation.mutate({ body })
  }

  return (
    <Form {...form}>
      <form className="p-4 grid gap-4" onSubmit={form.handleSubmit(handleCreateNewRoom)}>
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

        <When condition={visibility === 'PRIVATE'}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Enter secure password for your escape room" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </When>

        <div className="flex items-center gap-4">
          <Link to=".." disabled={newEscapeRoomMutation.isPending}>
            <Button type="button" variant="secondary" icon={<ChevronLeftIcon />}>
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
