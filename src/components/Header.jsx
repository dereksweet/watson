import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Header() {
  const [token, setToken] = useAuth()
  const { sub } = jwtDecode(token)

  return (
    <div>
      <h1 className='page-title'>Watson API Demo</h1>
      <small>
        Welcome, <User id={sub} />{' '}
        <button onClick={() => setToken(null)}>Logout</button>
      </small>
    </div>
  )
}
