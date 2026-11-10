import { Outlet } from 'react-router'
import NavBar from './NavBar'
import { useLocalStorage } from '../hooks/useLocalStorage'

function Layout() {
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Never trust stored data: anything other than "dark" becomes "light"
  const currentTheme = theme === 'dark' ? 'dark' : 'light'

  function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={`layout theme-${currentTheme}`}>
      <NavBar theme={currentTheme} onToggleTheme={toggleTheme} />
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
