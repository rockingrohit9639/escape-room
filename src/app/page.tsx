import Link from "next/link"
import ThemeToggler from "~/components/theme-toggler"
import { buttonVariants } from "~/components/ui/button"
import { UserButton } from "@clerk/nextjs"

export default function Home() {
  return (
    <div>
      <nav className="h-16 border-b">
        <div className="mx-auto flex h-full w-full max-w-screen-lg items-center justify-between">
          <h1 className="text-2xl">Escape Room</h1>

          <div className="flex items-center gap-2">
            <Link href="/dashboard" className={buttonVariants({})}>
              Dashboard
            </Link>

            <ThemeToggler />

            <UserButton />
          </div>
        </div>
      </nav>

      <div className="flex h-[calc(100vh_-_64px)] items-center justify-center font-heading text-4xl md:text-8xl">
        Welcome to Escape Room
      </div>
    </div>
  )
}
