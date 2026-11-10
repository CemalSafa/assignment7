import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { login } from '../api/authApi'
import { useAuth } from '../context/AuthContext'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const { dispatch } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  // ProtectedRoute puts the originally requested path in location.state.from
  const from = location.state?.from ?? '/'

  async function handleSubmit(event) {
    event.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const user = await login(username, password)
      dispatch({ type: 'LOGGED_IN', payload: user })
      // replace: true removes the login page from the browser history
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
    </div>
  )
}

export default Login
