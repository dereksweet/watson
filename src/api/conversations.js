export const getConversation = async (token, code) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/conversations/${code}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return await res.json()
}

export const sendPrompt = async (token, code, prompt) => {
  const formData = new FormData()
  formData.append('prompt', prompt)

  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/conversations/${code}`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return await res.json()
}

export const sendFile = async (token, code, file) => {
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
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return await res.json()
}

export const resetConversation = async (token, code) => {
  const res = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/conversations/${code}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )

  return await res.json()
}
