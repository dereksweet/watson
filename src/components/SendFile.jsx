import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { sendFile } from '../api/conversations.js'

const code = 'test_conversation'

export function SendFile() {
  const [file, setFile] = useState('')

  const queryClient = useQueryClient()
  const sendFileMutation = useMutation({
    mutationFn: () => sendFile(code, file),
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations', code])
      setFile('')
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    sendFileMutation.mutate()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='file'>File: </label>
        <input
          type='file'
          name='file'
          id='file'
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <input
        type='submit'
        value={sendFileMutation.isPending ? 'Sending...' : 'Send'}
        disabled={!file || sendFileMutation.isPending}
      />
    </form>
  )
}
