import { useEffect, useState } from 'react';
import { useCartStore, type Product } from './store/useCartStore';

const SAMPLE_PRODUCTS: Product[] = [
  {
    _id: 'sample-1',
    name: 'Wireless Noise-Canceling Headphones',
    price: 199.99,
    description: 'High-fidelity audio with active noise cancellation and 30-hour battery life.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    stock: 10
  },
  {
    _id: 'sample-2',
    name: 'Mechanical Gaming Keyboard',
    price: 129.95,
    description: 'RGB backlit mechanical keyboard with tactile switches and aluminum frame.',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80',
    stock: 15
  },
  {
    _id: 'sample-3',
    name: 'Ergonomic Wireless Mouse',
    price: 69.99,
    description: 'Precision optical sensor with customizable side buttons and multi-device pairing.',
    imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&q=80',
    stock: 20
  }
];

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { 
    cart, 
    isCartOpen, 
    toggleCart, 
    addToCart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice, 
    getCartCount 
  } = useCartStore();

  const apiBase = import.meta.env.VITE_API_URL || 'https://mini-ecommerce-api-ufss.onrender.com';

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    fetch(`${apiBase}/api/products`, { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => {
        clearTimeout(timeoutId);
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else {
          setProducts(SAMPLE_PRODUCTS);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.warn("API product fetch failed or timed out, using fallback catalog:", err);
        setProducts(SAMPLE_PRODUCTS);
        setLoading(false);
      });

    return () => clearTimeout(timeoutId);
  }, [apiBase]);

  async function handleCheckout() {
    try {
      const response = await fetch(`${apiBase}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout failed:", error);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      <nav className="sticky top-0 z-40 bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-xs">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">DevStore</h1>
        <button 
          onClick={toggleCart}
          className="relative bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer flex items-center gap-2"
        >
          Cart
          <span className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
            {getCartCount()}
          </span>
        </button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Our Inventory</h2>
        
        {loading ? (
          <div className="text-center py-12 text-slate-500 text-lg">Loading amazing gear...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-lg">No products available at the moment.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product._id} className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-full h-48 object-cover bg-slate-100"
                />
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900">{product.name}</h3>
                    <span className="font-semibold text-emerald-600">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 flex-1">{product.description}</p>
                  <button 
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white py-2.5 rounded-xl font-medium tracking-wide transition-colors cursor-pointer"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs transition-opacity">
          <div className="flex-1" onClick={toggleCart}></div>
          
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 border-l border-slate-200 animate-slide-in">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Your Cart</h2>
              <button onClick={toggleCart} className="text-slate-400 hover:text-slate-600 text-2xl font-semibold cursor-pointer">×</button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1">
              {cart.length === 0 ? (
                <div className="text-center py-12 text-slate-400">Your cart is feeling light! Add some gear.</div>
              ) : (
                cart.map((item) => (
                  <div key={item._id} className="flex gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl relative">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg bg-slate-200" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm text-slate-900 line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-emerald-600 font-medium mt-0.5">${item.price.toFixed(2)}</p>
                      
                      <div className="flex items-center gap-2 mt-2">
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-6 h-6 border border-slate-200 rounded-md flex items-center justify-center text-xs bg-white hover:bg-slate-100 cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 border border-slate-200 rounded-md flex items-center justify-center text-xs bg-white hover:bg-slate-100 cursor-pointer"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="absolute top-2 right-3 text-slate-300 hover:text-rose-500 text-lg cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center mb-4">
                <span className="text-slate-600 font-medium">Total Price</span>
                <span className="text-2xl font-bold text-slate-900">${getTotalPrice().toFixed(2)}</span>
              </div>
              <button 
                disabled={cart.length === 0}
                onClick={handleCheckout}
                className={`w-full py-3.5 rounded-xl font-bold tracking-wide transition-all ${
                  cart.length === 0 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg cursor-pointer'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;