import { User } from './User.jsx'
import { jwtDecode } from 'jwt-decode'
import { logout } from '../api/users.js'
import { useAuth } from '../contexts/AuthContext.jsx'

export function Header() {
  const [token, setToken] = useAuth()
  const { sub } = jwtDecode(token)

  return (
    <div className='header-container'>
      <h1 className='page-title'>Watson API Demo</h1>
      <div className='user-info'>
        <span>
          Welcome, <User id={sub} />
        </span>
        <button className='btn logout-btn' onClick={() => logout(setToken)}>
          Logout
        </button>
      </div>
    </div>
  )
}
