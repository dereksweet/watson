import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext.jsx'

export const ProtectedRoute = ({ children }) => {
  const [token] = useAuth()

  if (!token) {
    // Redirect to /login if not authenticated
    return <Navigate to='/login' replace />
  }

  // Render the protected route if authenticated
  return children
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
}
