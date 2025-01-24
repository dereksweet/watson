export const getConversation = async (code) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/conversations/${code}`,
  )
  return await res.json()
}

export const sendPrompt = async (code, prompt) => {
  const formData = new FormData()
  formData.append('prompt', prompt)

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/conversations/${code}`,
    {
      method: 'POST',
      body: formData,
    },
  )

  return await res.json()
}

export const sendFile = async (code, file) => {
  const formData = new FormData()
  formData.append(
    'prompt',
    'Please take the contents of this data into consideration when answering all future questions.',
  )
  formData.append('file', file)

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/conversations/${code}`,
    {
      method: 'POST',
      body: formData,
    },
  )

  return await res.json()
}

export const resetConversation = async (code) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/conversations/${code}`,
    {
      method: 'DELETE',
    },
  )

  return await res.json()
}
