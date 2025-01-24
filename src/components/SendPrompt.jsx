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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='prompt'>Prompt: </label>
        <input
          type='text'
          name='prompt'
          id='prompt'
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>
      <input
        type='submit'
        value={sendPromptMutation.isPending ? 'Sending...' : 'Send'}
        disabled={!prompt || sendPromptMutation.isPending}
      />
    </form>
  )
}
