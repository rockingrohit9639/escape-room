import { createFileRoute, Link } from '@tanstack/react-router'
import ThemeToggler from '~/components/theme-toggler'
import { buttonVariants } from '~/components/ui/button'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <div>
      <nav className="h-16 border-b">
        <div className="w-full max-w-screen-lg mx-auto h-full flex items-center justify-between">
          <h1 className="text-2xl">Escape Room</h1>

          <div className="flex items-center gap-2">
            <Link to="/builder" className={buttonVariants({})}>
              Builder
            </Link>

            <ThemeToggler />
          </div>
        </div>
      </nav>
    </div>
  )
}
