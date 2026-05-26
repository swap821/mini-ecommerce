import { create } from 'zustand';

// Define what a Product looks like from our database
export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  stock: number;
}

// A CartItem is just a Product with a tracking quantity
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  isCartOpen: boolean;
  toggleCart: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getCartCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  isCartOpen: false,

  toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
  
  addToCart: (product) => set((state) => {
    const existingItem = state.cart.find(item => item._id === product._id);
    if (existingItem) {
      return {
        cart: state.cart.map(item => 
          item._id === product._id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        )
      };
    }
    return { cart: [...state.cart, { ...product, quantity: 1 }] };
  }),

  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter(item => item._id !== productId)
  })),

  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item => 
      item._id === productId 
        ? { ...item, quantity: Math.max(1, quantity) } 
        : item
    )
  })),

  clearCart: () => set({ cart: [] }),

  getTotalPrice: () => {
    return get().cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  },

  getCartCount: () => {
    return get().cart.reduce((count, item) => count + item.quantity, 0);
  }
}));