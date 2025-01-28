import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { sendPrompt } from '../api/conversations.js'

const code = 'test_conversation'

export function SendPrompt() {
  const [prompt, setPrompt] = useState('')

  const queryClient = useQueryClient()
  const sendPromptMutation = useMutation({
    mutationFn: () => sendPrompt(code, prompt),
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations', code])
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
          placeholder='Type your question about Way2B1 here...'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button
          type='submit'
          className='btn'
          disabled={!prompt || sendPromptMutation.isPending}
        >
          {sendPromptMutation.isPending ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  )
}
