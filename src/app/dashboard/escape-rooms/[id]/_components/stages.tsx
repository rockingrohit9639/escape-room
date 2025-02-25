"use client"

import Link from "next/link"
import { match } from "ts-pattern"
import ErrorMessage from "~/components/error-message"
import { Skeleton } from "~/components/ui/skeleton"
import { cn } from "~/lib/utils"
import { api } from "~/trpc/react"

type StagesProps = {
  className?: string
  style?: React.CSSProperties
  escapeRoomId: string
}

export default function Stages({ className, style, escapeRoomId }: StagesProps) {
  const stages = api.stage.findAll.useQuery(escapeRoomId)

  return match(stages)
    .with({ status: "pending" }, () =>
      Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-40 w-full rounded-md border" />
      )),
    )
    .with({ status: "error" }, ({ error }) => <ErrorMessage description={error.message} />)
    .with({ status: "success" }, ({ data }) =>
      data.map((stage) => (
        <div
          key={stage.id}
          className={cn("h-40 w-full rounded-md border", className)}
          style={style}
        >
          <Link
            className="flex size-full items-center justify-center bg-muted"
            href={`/builder/${stage.id}`}
          >
            {stage.label}
          </Link>
        </div>
      )),
    )
    .exhaustive()
}
