import { Outlet } from 'react-router'
import NavBar from './NavBar'

function Layout() {
  return (
    <div className="layout">
      <NavBar />
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <p>Online Shop - Web Programming Assignment 7</p>
      </footer>
    </div>
  )
}

export default Layout
