import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import { sendFile } from '../api/conversations.js'

const code = 'test_conversation'

export function SendFile() {
  const [file, setFile] = useState('')
  const fileInputRef = useRef(null)

  const queryClient = useQueryClient()
  const sendFileMutation = useMutation({
    mutationFn: () => sendFile(code, file),
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations', code])
      setFile('')
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    },
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    sendFileMutation.mutate()
  }

  return (
    <form id='file-form' className='form' onSubmit={handleSubmit}>
      <label htmlFor='file-upload'>Upload File:</label>
      <input
        type='file'
        id='file'
        name='file'
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button
        type='submit'
        className='btn'
        disabled={!file || sendFileMutation.isPending}
      >
        {sendFileMutation.isPending ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}
