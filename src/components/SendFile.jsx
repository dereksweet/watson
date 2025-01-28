import PropTypes from 'prop-types'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useRef } from 'react'
import { sendFile } from '../api/conversations.js'

export function SendFile({ conversationCode }) {
  const [file, setFile] = useState('')
  const fileInputRef = useRef(null)

  const queryClient = useQueryClient()
  const sendFileMutation = useMutation({
    mutationFn: () => sendFile(conversationCode, file),
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations', conversationCode])
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
    <div>
      <form id='file-form' className='form' onSubmit={handleSubmit}>
        <label htmlFor='file-upload'>Upload Data File:</label>
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
          {sendFileMutation.isPending ? 'Sending...' : 'Send File'}
        </button>
      </form>
      <small>
        You can send any kind of custom data file you like so long as it is
        simple text and not a binary file like a Word or Excel document.
      </small>
    </div>
  )
}

SendFile.propTypes = {
  conversationCode: PropTypes.string.isRequired, // Must be a string and required
}
