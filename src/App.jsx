import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import ProductList from './pages/ProductList'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Login from './pages/Login'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="products">
        <Route index element={<ProductList />} />
        <Route path=":id" element={<ProductDetail />} />
      </Route>
      <Route path="cart" element={<Cart />} />
      <Route path="login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Appimport { useFetch } from './hooks/useFetch'
import { fetchProducts } from './api/productsApi'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const state = useFetch((signal) => fetchProducts(signal), [])
  console.log(state)
  const [test, setTest] = useLocalStorage('test', 'light')

  return (
    <div>
      <h1>Online Shop</h1>
      <button onClick={() => setTest(test === 'light' ? 'dark' : 'light')}>
        {test}
      </button>
    </div>
  )
}

export default App
