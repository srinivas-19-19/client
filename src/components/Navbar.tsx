import React from 'react';
import { ShoppingBag, Search, Heart, Menu } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Navbar: React.FC = () => {
  const { cart, setCartOpen } = useStore();
  
  const cartItemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <header className="fixed w-full z-40 top-0 left-0 bg-brand-ivory/90 backdrop-blur-md border-b border-brand-gold/20 shadow-sm">
      {/* Announcement Bar */}
      <div className="bg-brand-maroon text-brand-gold text-xs py-2 text-center font-medium tracking-wide">
        ✨ Delivering Across Pan-India | Free Shipping on Orders Above ₹1,999 ✨
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Mobile Menu & Search */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button className="text-gray-900 hover:text-brand-gold transition-colors">
              <Menu size={24} />
            </button>
            <button className="text-gray-900 hover:text-brand-gold transition-colors">
              <Search size={22} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <a href="#" className="flex flex-col items-center lg:items-start">
              <span className="font-serif text-2xl lg:text-3xl font-bold text-brand-maroon leading-none">
                Ramya Sri
              </span>
              <span className="text-[10px] lg:text-xs uppercase tracking-[0.2em] text-brand-gold font-medium mt-1">
                Embroidery Works
              </span>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-8 items-center flex-1 justify-center">
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-brand-gold transition-colors">Collections</a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-brand-gold transition-colors">Bridal Maggam</a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-brand-gold transition-colors">Devotional Wear</a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-brand-gold transition-colors">About Us</a>
            <a href="#" className="text-sm font-medium text-gray-900 hover:text-brand-gold transition-colors">Track Order</a>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            <button className="hidden lg:block text-gray-900 hover:text-brand-gold transition-colors">
              <Search size={22} />
            </button>
            <button className="text-gray-900 hover:text-brand-gold transition-colors hidden sm:block">
              <Heart size={22} />
            </button>
            
            {/* Cart Button */}
            <button 
              className="flex items-center space-x-2 bg-brand-cream hover:bg-brand-gold/10 px-3 py-2 rounded-full transition-colors border border-brand-gold/20"
              onClick={() => setCartOpen(true)}
            >
              <div className="relative">
                <ShoppingBag size={20} className="text-brand-maroon" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold text-brand-maroon hidden sm:block">
                ₹{cartTotal.toLocaleString()}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
