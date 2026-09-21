import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, Trash2, ArrowRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export const CartDrawer: React.FC = () => {
  const { isCartOpen, setCartOpen, cart, updateQuantity, removeFromCart, setCheckoutModalOpen } = useStore();

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = subtotal > 1999 || subtotal === 0 ? 0 : 99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    setCartOpen(false);
    setCheckoutModalOpen(true);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setCartOpen(false)}
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full md:w-[400px] bg-brand-ivory shadow-2xl flex flex-col border-l border-brand-gold/20"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200 bg-white">
              <h2 className="font-serif text-xl font-bold text-brand-maroon">Your Shopping Cart</h2>
              <button 
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-brand-gold/10 rounded-full flex items-center justify-center text-brand-gold mb-4">
                    <ShoppingBagIcon />
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-gray-900">Your cart is empty</h3>
                  <p className="text-sm text-gray-500">Discover our handcrafted collections to fill it up.</p>
                  <button 
                    onClick={() => setCartOpen(false)}
                    className="mt-4 px-6 py-2 bg-brand-maroon text-brand-gold rounded-full text-sm font-semibold hover:bg-gray-900 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm relative group">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-lg bg-gray-100" />
                    <div className="flex-1 flex flex-col">
                      <h4 className="font-semibold text-sm text-gray-900 line-clamp-2 leading-tight">{item.name}</h4>
                      
                      {/* Options string */}
                      <div className="text-xs text-gray-500 mt-1 flex flex-wrap gap-1">
                        {Object.values(item.selectedOptions).map((opt, i) => (
                          <span key={i} className="bg-gray-100 px-1.5 py-0.5 rounded text-[10px] uppercase font-medium">{opt.replace(/^[a-z]/i, '')}</span>
                        ))}
                      </div>

                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="font-bold text-brand-maroon">₹{(item.price * item.quantity).toLocaleString()}</span>
                        
                        <div className="flex items-center space-x-3 bg-gray-50 rounded-full px-2 py-1 border border-gray-200">
                          <button 
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="text-gray-500 hover:text-brand-maroon"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs font-semibold w-4 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-brand-maroon"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="absolute top-2 right-2 p-1.5 bg-white text-gray-400 hover:text-red-500 rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm border border-gray-100"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-6 bg-white border-t border-brand-gold/20 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]">
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Estimated Tax (Included)</span>
                    <span className="font-semibold text-gray-900">₹0</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    {shipping === 0 ? (
                      <span className="font-semibold text-green-600">Free</span>
                    ) : (
                      <span className="font-semibold text-gray-900">₹{shipping}</span>
                    )}
                  </div>
                  <div className="h-px bg-gray-200 my-2" />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span className="text-gray-900">Total</span>
                    <span className="text-brand-maroon">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  className="w-full flex items-center justify-center space-x-2 bg-brand-maroon text-brand-gold font-bold py-4 rounded-xl hover:bg-gray-900 shadow-lg shadow-brand-maroon/20 transition-all"
                >
                  <span>Proceed to Secure Checkout</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const ShoppingBagIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);
