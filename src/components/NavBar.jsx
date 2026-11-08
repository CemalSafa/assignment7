import { NavLink } from 'react-router'

function NavBar() {
  return (
    <nav className="navbar">
      <NavLink to="/" end>
        Home
      </NavLink>
      <NavLink to="/products">Products</NavLink>
      <NavLink to="/cart">Cart</NavLink>
      <NavLink to="/login">Login</NavLink>
    </nav>
  )
}

export default NavBar
