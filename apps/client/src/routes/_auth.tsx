import { createFileRoute, Outlet } from '@tanstack/react-router'
import { Card, CardContent } from '~/components/ui/card'

export const Route = createFileRoute('/_auth')({
  component: AuthLayout,
})

function AuthLayout() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden">
            <CardContent className="grid p-0 md:grid-cols-2">
              <Outlet />
              <div className="relative hidden bg-muted md:block">
                <img
                  src="https://images.unsplash.com/photo-1496361769828-9e27149aa2e0"
                  alt="enter-the-matrix"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5]"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
            By clicking continue, you agree to our Terms of Service and Privacy Policy.
          </div>
        </div>
      </div>
    </div>
  )
}
