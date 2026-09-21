import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import type { CartItem } from '../store/useStore';
import clsx from 'clsx';

export const ProductModal: React.FC = () => {
  const { isProductModalOpen, selectedProduct, setProductModalOpen, addToCart, setCartOpen, setCheckoutModalOpen } = useStore();
  
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [measurements, setMeasurements] = useState<Record<string, string>>({});

  // Reset selections when product changes
  useEffect(() => {
    if (selectedProduct) {
      const initialOptions: Record<string, string> = {};
      Object.keys(selectedProduct.options).forEach(key => {
        const optionArray = selectedProduct.options[key as keyof typeof selectedProduct.options];
        if (optionArray && optionArray.length > 0) {
          initialOptions[key] = optionArray[0].id;
        }
      });
      setSelectedOptions(initialOptions);
      setMeasurements({});
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  // Calculate Subtotal
  let currentPrice = selectedProduct.basePrice;
  Object.keys(selectedOptions).forEach(key => {
    const optionArray = selectedProduct.options[key as keyof typeof selectedProduct.options];
    const selectedOpt = optionArray?.find(opt => opt.id === selectedOptions[key]);
    if (selectedOpt?.priceModifier) {
      currentPrice += selectedOpt.priceModifier;
    }
  });

  const handleOptionSelect = (category: string, optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [category]: optionId }));
  };

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: currentPrice,
      image: selectedProduct.image,
      quantity: 1,
      selectedOptions,
      measurements
    };
    addToCart(cartItem);
    setProductModalOpen(false);
    setCartOpen(true);
  };

  const handleDirectCheckout = () => {
    const cartItem: CartItem = {
      id: `${selectedProduct.id}-${Date.now()}`,
      productId: selectedProduct.id,
      name: selectedProduct.name,
      price: currentPrice,
      image: selectedProduct.image,
      quantity: 1,
      selectedOptions,
      measurements
    };
    addToCart(cartItem);
    setProductModalOpen(false);
    setCheckoutModalOpen(true);
  };

  return (
    <AnimatePresence>
      {isProductModalOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setProductModalOpen(false)}
          />
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-50 bg-white w-full md:w-[800px] md:max-h-[90vh] md:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row border border-brand-gold/20"
          >
            {/* Close Button */}
            <button 
              onClick={() => setProductModalOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md p-2 rounded-full text-gray-800 hover:bg-gray-100 transition-colors shadow-sm"
            >
              <X size={20} />
            </button>

            {/* Product Image */}
            <div className="w-full md:w-1/2 h-64 md:h-auto bg-gray-100 relative">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
            </div>

            {/* Customizer Content */}
            <div className="w-full md:w-1/2 flex flex-col max-h-[60vh] md:max-h-none overflow-y-auto custom-scrollbar bg-brand-ivory">
              <div className="p-6 md:p-8 flex-1">
                
                {/* Header */}
                <div className="mb-6">
                  {selectedProduct.badge && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold mb-2 block">
                      {selectedProduct.badge}
                    </span>
                  )}
                  <h2 className="font-serif text-2xl font-bold text-gray-900 leading-tight mb-2">
                    {selectedProduct.name}
                  </h2>
                  <p className="text-xl font-bold text-brand-maroon">
                    ₹{currentPrice.toLocaleString()}
                  </p>
                </div>

                {/* Options Selection */}
                <div className="space-y-6">
                  
                  {/* Sizes */}
                  {selectedProduct.options.sizes && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Select Size</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.options.sizes.map(size => (
                          <button
                            key={size.id}
                            onClick={() => handleOptionSelect('sizes', size.id)}
                            className={clsx(
                              "w-12 h-12 rounded-full border-2 flex items-center justify-center font-bold text-sm transition-all",
                              selectedOptions.sizes === size.id 
                                ? "border-brand-maroon bg-brand-maroon text-brand-gold shadow-md" 
                                : "border-gray-200 text-gray-600 hover:border-brand-gold/50 hover:text-brand-maroon"
                            )}
                          >
                            {size.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Colors */}
                  {selectedProduct.options.colors && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Select Color</h4>
                      <div className="flex flex-wrap gap-3">
                        {selectedProduct.options.colors.map(color => (
                          <button
                            key={color.id}
                            onClick={() => handleOptionSelect('colors', color.id)}
                            className={clsx(
                              "px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all",
                              selectedOptions.colors === color.id 
                                ? "border-brand-maroon bg-brand-maroon/5 text-brand-maroon" 
                                : "border-gray-200 text-gray-600 hover:border-brand-gold/50"
                            )}
                          >
                            {color.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Types */}
                  {selectedProduct.options.workTypes && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Work Detail</h4>
                      <div className="flex flex-col gap-3">
                        {selectedProduct.options.workTypes.map(work => (
                          <button
                            key={work.id}
                            onClick={() => handleOptionSelect('workTypes', work.id)}
                            className={clsx(
                              "px-4 py-3 rounded-xl border-2 text-sm font-semibold transition-all flex justify-between items-center text-left",
                              selectedOptions.workTypes === work.id 
                                ? "border-brand-maroon bg-brand-maroon/5 text-brand-maroon" 
                                : "border-gray-200 text-gray-600 hover:border-brand-gold/50"
                            )}
                          >
                            <span>{work.name}</span>
                            {work.priceModifier ? (
                              <span className="text-xs opacity-70">+ ₹{work.priceModifier}</span>
                            ) : null}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Optional Measurements (if it's a blouse/custom item) */}
                  {selectedProduct.options.workTypes && (
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">Custom Measurements (Optional)</h4>
                      <input 
                        type="text"
                        placeholder="e.g. Chest 36, Waist 30, Sleeve 10"
                        className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-maroon focus:ring-1 focus:ring-brand-maroon transition-colors bg-white"
                        onChange={(e) => setMeasurements({ custom: e.target.value })}
                      />
                    </div>
                  )}

                </div>
              </div>

              {/* Sticky Action Footer */}
              <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex flex-col gap-3">
                <button 
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center space-x-2 bg-brand-ivory text-brand-maroon border-2 border-brand-maroon font-bold py-3.5 rounded-xl hover:bg-brand-maroon/5 transition-colors"
                >
                  <ShoppingBag size={20} />
                  <span>Add to Cart — ₹{currentPrice.toLocaleString()}</span>
                </button>
                <button 
                  onClick={handleDirectCheckout}
                  className="w-full flex items-center justify-center space-x-2 bg-brand-maroon text-brand-gold font-bold py-3.5 rounded-xl hover:bg-gray-900 shadow-lg shadow-brand-maroon/20 transition-all"
                >
                  <CreditCard size={20} />
                  <span>Buy It Now</span>
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
