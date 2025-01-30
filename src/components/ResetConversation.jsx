import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { resetConversation } from '../api/conversations.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function ResetConversation({ conversationCode }) {
  const [token] = useAuth()

  const queryClient = useQueryClient()
  const resetConversationMutation = useMutation({
    mutationFn: () => resetConversation(token, conversationCode),
    onSuccess: () =>
      queryClient.invalidateQueries(['conversations', conversationCode]),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    resetConversationMutation.mutate()
  }

  return (
    <div className='reset-conversation-wrapper'>
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
    </div>
  )
}

ResetConversation.propTypes = {
  conversationCode: PropTypes.string.isRequired,
}
