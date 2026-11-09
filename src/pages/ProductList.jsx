import { useSearchParams } from 'react-router'
import { fetchProducts } from '../api/productsApi'
import { useFetch } from '../hooks/useFetch'
import ProductCard from '../components/ProductCard'

function ProductList() {
  const [searchParams, setSearchParams] = useSearchParams()
  const q = searchParams.get('q') ?? ''
  const category = searchParams.get('category') ?? ''

  const { loading, error, data: products } = useFetch(
    (signal) => fetchProducts(signal),
    []
  )

  // Update ONE query parameter and keep all the others untouched
  function updateParam(key, value) {
    const next = new URLSearchParams(searchParams)
    if (value === '') {
      next.delete(key)
    } else {
      next.set(key, value)
    }
    setSearchParams(next, { replace: true })
  }

  let content

  if (loading) {
    content = <p>Loading products...</p>
  } else if (error) {
    content = <p>Error: {error}</p>
  } else {
    // Derived values: computed during render, never stored in state
    const categories = [...new Set(products.map((p) => p.category))].sort()

    const visibleProducts = products.filter((p) => {
      const matchesTitle = p.title.toLowerCase().includes(q.toLowerCase())
      const matchesCategory = category === '' || p.category === category
      return matchesTitle && matchesCategory
    })

    content = (
      <>
        <div className="filters">
          <input
            type="text"
            placeholder="Search by title..."
            value={q}
            onChange={(event) => updateParam('q', event.target.value)}
          />
          <select
            value={category}
            onChange={(event) => updateParam('category', event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {visibleProducts.length === 0 ? (
          <p>No products match your filters.</p>
        ) : (
          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </>
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
