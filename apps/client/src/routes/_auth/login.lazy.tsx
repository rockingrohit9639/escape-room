import { authContract } from '@escape-room/contracts'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { Link } from '@tanstack/react-router'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { apiClient } from '~/lib/client'
import { CURRENT_USER_QUERY_KEY } from '~/lib/constants'
import { handleError } from '~/lib/error'

export const Route = createLazyFileRoute('/_auth/login')({
  component: Login,
})

type LoginSchema = z.infer<typeof authContract.login.body>

function Login() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<LoginSchema>({
    resolver: zodResolver(authContract.login.body),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginMutation = apiClient.auth.login.useMutation({
    onError: handleError,
    onSuccess: ({ body }) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, { status: 200, body })
      navigate({ to: '/', replace: true })
    },
  })

  function handleLogin(body: LoginSchema) {
    loginMutation.mutate({ body })
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)} className="grid grid-cols-1 gap-4 p-4">
        <div>
          <h1 className="text-2xl font-bold">Return to the Quest</h1>
          <p className="text-muted-foreground">Your journey awaits—unlock your progress and resume the escape.</p>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Messenger's Address</FormLabel>
              <FormControl>
                <Input placeholder="Your email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Secret Code</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Your code..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button loading={loginMutation.isPending}>Continue</Button>

        <div className="text-muted-foreground text-center text-sm">
          Don't have an account ?{' '}
          <Link to="/signup" className="text-foreground underline">
            Signup now!
          </Link>
        </div>
      </form>
    </Form>
  )
}
