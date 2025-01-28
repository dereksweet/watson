import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { useNavigate, Link } from 'react-router-dom'

import { login } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const [, setToken] = useAuth()

  const loginMutation = useMutation({
    mutationFn: () => login({ username, password }),
    onSuccess: (data) => {
      setToken(data.token)
      navigate('/')
    },
    onError: () => alert('Failed to log in! Please check your credentials.'),
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    loginMutation.mutate()
  }

  return (
    <div className='login-container'>
      <div className='login-box'>
        <h2 className='login-title'>Login</h2>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='form-group'>
            <label htmlFor='username' className='form-label'>
              Username
            </label>
            <input
              type='text'
              id='username'
              className='form-input'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className='form-group'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              id='password'
              className='form-input'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type='submit'
            className='submit-button'
            disabled={!username || !password || loginMutation.isLoading}
          >
            {loginMutation.isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        <div className='back-link-container'>
          <Link to='/' className='back-link'>
            Back to main page
          </Link>
        </div>
      </div>
    </div>
  )
}
