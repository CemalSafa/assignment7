import { create } from 'zustand'

const STORAGE_KEY = 'cart-items'

// A stored item is only accepted if it has exactly the shape we expect
function isValidItem(item) {
  return (
    item !== null &&
    typeof item === 'object' &&
    typeof item.id === 'number' &&
    typeof item.title === 'string' &&
    typeof item.price === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1
  )
}

// Missing, corrupted or unexpected data must never crash the app
function loadItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === null) return []

    const parsed = JSON.parse(stored)
    if (!Array.isArray(parsed)) return []

    return parsed.filter(isValidItem)
  } catch {
    return []
  }
}

export const useCartStore = create((set) => ({
  items: loadItems(),

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id)

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }

      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.title,
            price: product.price,
            quantity: 1,
          },
        ],
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  setQuantity: (id, quantity) =>
    set((state) => {
      if (quantity < 1) {
        return { items: state.items.filter((item) => item.id !== id) }
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      }
    }),

  clear: () => set({ items: [] }),
}))

// Persistence lives OUTSIDE React: the store tells us whenever it changes
useCartStore.subscribe((state, previousState) => {
  if (state.items === previousState.items) return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
  } catch {
    // storage can be unavailable or full, the cart still works in memory
  }
})
