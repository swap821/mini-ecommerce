import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
      
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 flex justify-between items-center shadow-xs">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 flex items-center gap-2">
          <span>DevStore</span>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono uppercase font-semibold">Pro</span>
        </h1>
        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={toggleCart}
          className="relative bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-xl font-medium transition-all cursor-pointer flex items-center gap-2 shadow-sm"
        >
          Cart
          <motion.span 
            key={getCartCount()}
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            className="bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full font-bold"
          >
            {getCartCount()}
          </motion.span>
        </motion.button>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Featured Catalog</h2>
            <p className="text-slate-500 mt-1 text-sm">Ultra-modern developer gear & accessories</p>
          </div>
        </div>
        
        {loading ? (
          <div className="text-center py-16 text-slate-500 text-lg flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin"></div>
            Loading catalog...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-slate-500 text-lg">No products available at the moment.</div>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div 
                key={product._id} 
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-xl transition-all flex flex-col group"
              >
                <div className="relative overflow-hidden bg-slate-100 h-48">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors">{product.name}</h3>
                    <span className="font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-lg text-sm">${product.price.toFixed(2)}</span>
                  </div>
                  <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-2">{product.description}</p>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    onClick={() => addToCart(product)}
                    className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-2.5 rounded-xl font-medium tracking-wide transition-colors cursor-pointer shadow-sm"
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleCart}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            />
            
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col p-6 border-l border-slate-200 z-10"
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <span>Your Cart</span>
                  <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-mono">
                    {cart.length} item{cart.length !== 1 ? 's' : ''}
                  </span>
                </h2>
                <button onClick={toggleCart} className="text-slate-400 hover:text-slate-600 text-2xl font-semibold cursor-pointer">×</button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                {cart.length === 0 ? (
                  <div className="text-center py-16 text-slate-400 flex flex-col items-center gap-2">
                    <span className="text-4xl">🛒</span>
                    <p>Your cart is feeling light! Add some gear.</p>
                  </div>
                ) : (
                  cart.map((item) => (
                    <motion.div 
                      layout
                      key={item._id} 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="flex gap-4 p-3 bg-slate-50 border border-slate-100 rounded-xl relative"
                    >
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
                        className="absolute top-2 right-3 text-slate-300 hover:text-rose-500 text-lg cursor-pointer transition-colors"
                      >
                        ×
                      </button>
                    </motion.div>
                  ))
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-600 font-medium">Total Price</span>
                  <span className="text-2xl font-bold text-slate-900">${getTotalPrice().toFixed(2)}</span>
                </div>
                <motion.button 
                  whileHover={{ scale: cart.length > 0 ? 1.02 : 1 }}
                  whileTap={{ scale: cart.length > 0 ? 0.98 : 1 }}
                  disabled={cart.length === 0}
                  onClick={handleCheckout}
                  className={`w-full py-3.5 rounded-xl font-bold tracking-wide transition-all ${
                    cart.length === 0 
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md hover:shadow-lg cursor-pointer'
                  }`}
                >
                  Proceed to Checkout
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;