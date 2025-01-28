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
      <button
        id='reset-btn'
        className='btn reset-btn'
        disabled={resetConversationMutation.isPending}
      >
        {resetConversationMutation.isPending
          ? 'Resetting...'
          : 'Reset This Conversation'}
      </button>
    </form>
  )
}
