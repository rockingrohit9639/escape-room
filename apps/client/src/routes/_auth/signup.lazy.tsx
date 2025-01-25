import { createLazyFileRoute, useNavigate } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { authContract } from '@escape-room/contracts'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Button } from '~/components/ui/button'
import { apiClient } from '~/lib/client'
import { useQueryClient } from '@tanstack/react-query'
import { handleError } from '~/lib/error'
import { CURRENT_USER_QUERY_KEY } from '~/lib/constants'
import { Link } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/signup')({
  component: Signup,
})

type SignupSchema = z.infer<typeof authContract.signup.body>

function Signup() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const form = useForm<SignupSchema>({
    resolver: zodResolver(authContract.signup.body),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  const signupMutation = apiClient.auth.signup.useMutation({
    onError: handleError,
    onSuccess: ({ body }) => {
      queryClient.setQueryData(CURRENT_USER_QUERY_KEY, { status: 200, body })
      navigate({ to: '/', replace: true })
    },
  })

  function handleSignup(body: SignupSchema) {
    signupMutation.mutate({ body })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSignup)} className="grid grid-cols-1 gap-4 p-4">
        <div>
          <h1 className="text-2xl font-bold">Join the Adventure</h1>
          <p className="text-muted-foreground">Step into the unknown—secure your spot in the escape room challenge.</p>
        </div>

        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adventurer's Alias</FormLabel>
              <FormControl>
                <Input placeholder="Your alias..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Family Lineage</FormLabel>
              <FormControl>
                <Input placeholder="Your family name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

        <Button className="mb-4" loading={signupMutation.isPending}>
          Continue
        </Button>

        <div className="text-muted-foreground text-center text-sm">
          Already have an account ?{' '}
          <Link to="/login" className="text-foreground underline">
            Login now!
          </Link>
        </div>
      </form>
    </Form>
  )
}
