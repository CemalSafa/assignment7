import { Link } from 'react-router'

function Home() {
  return (
    <div>
      <h1>Welcome to the Online Shop</h1>
      <p>
        Browse the catalogue, filter products by title or category, and add
        what you like to your cart.
      </p>
      <p>
        <Link to="/products">Browse all products</Link>
      </p>
      <p>
        Or jump straight to a filtered view:{' '}
        <Link to="/products?category=beauty">Beauty products</Link>
      </p>
    </div>
  )
}

export default Home
