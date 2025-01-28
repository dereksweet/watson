import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resetConversation } from '../api/conversations.js'

export function ResetConversation({ conversationCode }) {
  const queryClient = useQueryClient()
  const resetConversationMutation = useMutation({
    mutationFn: () => resetConversation(conversationCode),
    onSuccess: () =>
      queryClient.invalidateQueries(['conversations', conversationCode]),
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

ResetConversation.propTypes = {
  conversationCode: PropTypes.string.isRequired, // Must be a string and required
}
