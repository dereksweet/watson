import { createContext, useState, useContext, useEffect } from 'react'
import PropTypes from 'prop-types'

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))
  return match ? decodeURIComponent(match[2]) : null
}

export const AuthContext = createContext({
  token: null,
  setToken: () => {},
  loading: true,
})

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const storedToken = getCookie('watson_token')
    if (storedToken) {
      setToken(storedToken)
    }
    setLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ token, setToken, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

AuthContextProvider.propTypes = {
  children: PropTypes.element.isRequired,
}

export function useAuth() {
  const { token, setToken, loading } = useContext(AuthContext)
  return [token, setToken, loading]
}
