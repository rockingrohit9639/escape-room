"use client"

import Link from "next/link"
import { useSidebar } from "~/components/ui/sidebar"

export default function SidebarHeader() {
  const { state } = useSidebar()

  if (state === "collapsed") {
    return <div className="size-8 rounded-md bg-accent-foreground" />
  }

  return (
    <Link href="/dashboard" className="mt-2 text-center font-heading text-2xl">
      Escape Room
    </Link>
  )
}
