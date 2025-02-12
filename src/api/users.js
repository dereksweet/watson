export const login = async ({ username, password }) => {
  const formData = new FormData()
  formData.append('username', username)
  formData.append('password', password)

  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
    method: 'POST',
    credentials: 'include',
    body: formData,
  })

  if (!res.ok) throw new Error('failed to login')
  return await res.json()
}

export const logout = async (setToken) => {
  fetch(`${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
    method: 'POST',
    credentials: 'include',
  })
    .then(() => {
      setToken(null)
    })
    .catch((err) => console.error(err))
}

export const getUserInfo = async (id) => {
  const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })
  return await res.json()
}
