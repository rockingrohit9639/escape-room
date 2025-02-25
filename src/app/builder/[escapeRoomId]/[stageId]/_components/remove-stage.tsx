"use client"

import { Trash2Icon } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "~/components/ui/alert-dialog"
import { Button } from "~/components/ui/button"
import { api } from "~/trpc/react"

type RemoveStageProps = {
  className?: string
  style?: React.CSSProperties
  stageId: string
}

export default function RemoveStage({ className, style, stageId }: RemoveStageProps) {
  const router = useRouter()
  const utils = api.useUtils()

  const removeStageMutation = api.stage.remove.useMutation({
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: async ({ escapeRoomId }) => {
      await utils.stage.findAll.invalidate(escapeRoomId)
      router.replace(`/dashboard/escape-rooms/${escapeRoomId}`)
    },
  })

  function handleRemoveStage() {
    removeStageMutation.mutate(stageId)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          icon={<Trash2Icon />}
          variant="destructive-outline"
          loading={removeStageMutation.isPending}
        />
      </AlertDialogTrigger>

      <AlertDialogContent className={className} style={style}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your stage
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={removeStageMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={removeStageMutation.isPending} onClick={handleRemoveStage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
