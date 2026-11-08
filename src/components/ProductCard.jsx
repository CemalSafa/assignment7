import { Link } from 'react-router'

function ProductCard({ product }) {
  return (
    <article className="product-card">
      <img src={product.thumbnail} alt={product.title} />
      <h3>
        <Link to={`/products/${product.id}`}>{product.title}</Link>
      </h3>
      <p className="product-category">{product.category}</p>
      <p className="product-price">${product.price}</p>
    </article>
  )
}

export default ProductCard
