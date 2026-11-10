import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'

function NavBar() {
  const { user, dispatch } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    dispatch({ type: 'LOGGED_OUT' })
    navigate('/')
  }

  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>

      <div className="navbar-right">
        {user ? (
          <>
            <span>{user.username}</span>
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </nav>
  )
}

export default NavBar
