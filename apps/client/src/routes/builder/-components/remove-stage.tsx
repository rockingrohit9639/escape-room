import { useRouter } from '@tanstack/react-router'
import { cloneElement } from 'react'
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
} from '~/components/ui/alert-dialog'
import { apiClient } from '~/lib/client'
import { handleError } from '~/lib/error'

type RemoveStageProps = {
  className?: string
  style?: React.CSSProperties
  children: React.ReactElement<{ loading?: boolean }>
  stageId: string
}

export default function RemoveStage({ className, style, children, stageId }: RemoveStageProps) {
  const router = useRouter()

  const deleteStageMutation = apiClient.stage.remove.useMutation({
    onError: handleError,
    onSuccess: () => {
      router.invalidate()
    },
  })

  function handleRemoveStage() {
    deleteStageMutation.mutate({ body: {}, params: { stageId } })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {cloneElement(children, { loading: deleteStageMutation.isPending })}
      </AlertDialogTrigger>

      <AlertDialogContent className={className} style={style}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your stage
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteStageMutation.isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction disabled={deleteStageMutation.isPending} onClick={handleRemoveStage}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
