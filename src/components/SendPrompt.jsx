import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { sendPrompt } from '../api/conversations.js'

export function SendPrompt({ conversationCode }) {
  const [prompt, setPrompt] = useState('')

  const queryClient = useQueryClient()
  const sendPromptMutation = useMutation({
    mutationFn: () => sendPrompt(conversationCode, prompt),
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations', conversationCode])
      setPrompt('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    sendPromptMutation.mutate()
  }

  return (
    <div>
      <form id='text-form' className='form' onSubmit={handleSubmit}>
        <label htmlFor='prompt'>Text Prompt:</label>
        <input
          type='text'
          id='prompt'
          name='prompt'
          placeholder='Type your question or comment for Watson here...'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type='submit'
          className='btn'
          disabled={!prompt || sendPromptMutation.isPending}
        >
          {sendPromptMutation.isPending ? 'Sending...' : 'Send Prompt'}
        </button>
      </form>
    </div>
  )
}

SendPrompt.propTypes = {
  conversationCode: PropTypes.string.isRequired, // Must be a string and required
}
