import { fetchProducts } from '../api/productsApi'
import { useFetch } from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'

function ProductList() {
  const { loading, error, data: products } = useFetch(
    (signal) => fetchProducts(signal),
    []
  )

  let content

  if (loading) {
    content = <p>Loading products...</p>
  } else if (error) {
    content = <p>Error: {error}</p>
  } else if (products.length === 0) {
    content = <p>No products found.</p>
  } else {
    content = (
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1>Products</h1>
      {content}
    </div>
  )
}

export default ProductList
