import { Navigate, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    // Remember where the user wanted to go so Login can send them back
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname + location.search }}
      />
    )
  }

  return children
}

export default ProtectedRoute
