import { Link } from 'react-router'
import { useCartStore } from '../store/cartStore'

function Cart() {
  // Each component selects only what it needs
  const items = useCartStore((state) => state.items)
  const setQuantity = useCartStore((state) => state.setQuantity)
  const removeItem = useCartStore((state) => state.removeItem)
  const clear = useCartStore((state) => state.clear)

  // Derived from items during render, never stored
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (items.length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/products">Browse products</Link>
      </div>
    )
  }

  return (
    <div>
      <h1>Cart</h1>

      {items.map((item) => (
        <div key={item.id} className="cart-item">
          <span className="cart-item-title">{item.title}</span>
          <span>${item.price}</span>

          <div className="cart-quantity">
            <button
              type="button"
              onClick={() => setQuantity(item.id, item.quantity - 1)}
            >
              -
            </button>
            <span>{item.quantity}</span>
            <button
              type="button"
              onClick={() => setQuantity(item.id, item.quantity + 1)}
            >
              +
            </button>
          </div>

          <button type="button" onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <p className="cart-total">Total: ${total.toFixed(2)}</p>

      <button type="button" onClick={clear}>
        Clear cart
      </button>
    </div>
  )
}

export default Cart
