import { textObject } from '@escape-room/contracts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { useStageStore } from '~/stores'

type TextObject = z.infer<typeof textObject>

type TextEditorProps = {
  object: TextObject
}

export default function TextEditor({ object }: TextEditorProps) {
  const updateObject = useStageStore((store) => store.updateObject)
  const form = useForm<TextObject>({
    resolver: zodResolver(textObject),
    defaultValues: object,
    mode: 'all',
  })

  function handleUpdateProperties(updatedObject: TextObject) {
    updateObject(updatedObject)
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(handleUpdateProperties)}>
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
      </form>
    </Form>
  )
}
