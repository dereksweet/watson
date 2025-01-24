import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resetConversation } from '../api/conversations.js'

const code = 'test_conversation'

export function ResetConversation() {
  const queryClient = useQueryClient()
  const resetConversationMutation = useMutation({
    mutationFn: () => resetConversation(code),
    onSuccess: () => queryClient.invalidateQueries(['conversations', code]),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetConversationMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type='submit'
          value={
            resetConversationMutation.isPending
              ? 'Resetting...'
              : 'Reset Conversation'
          }
          disabled={resetConversationMutation.isPending}
        />
      </div>
    </form>
  )
}
