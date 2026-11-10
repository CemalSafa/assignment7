import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'
import { useCartStore } from '../store/cartStore'

function NavBar() {
  const { user, dispatch } = useAuth()
  const navigate = useNavigate()

  // The selector returns a number (a primitive): NavBar re-renders only
  // when the count itself changes, not on every change of the store
  const itemCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

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
      <NavLink to="/cart">Cart ({itemCount})</NavLink>

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
