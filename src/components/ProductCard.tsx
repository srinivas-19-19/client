import type { Product } from '../store/useStore';
import { Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onQuickBuy: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickBuy }) => {
  return (
    <div className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-brand-gold/20 shadow-sm hover:shadow-xl hover:shadow-brand-maroon/5 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        {/* Badges */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-brand-maroon/90 text-brand-gold text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm shadow-sm backdrop-blur-sm border border-brand-gold/30">
            {product.badge}
          </div>
        )}
        {/* Quick actions overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button 
            onClick={() => onQuickBuy(product)}
            className="bg-brand-ivory text-brand-maroon font-bold px-6 py-2.5 rounded-full shadow-lg hover:bg-brand-gold hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
          >
            Quick Buy
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center space-x-1 mb-2">
          <Star size={14} className="fill-brand-gold text-brand-gold" />
          <span className="text-xs font-semibold text-gray-600">{product.rating}</span>
        </div>
        
        <h3 className="font-serif text-lg font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-brand-maroon font-bold text-lg">₹{product.basePrice.toLocaleString()}</span>
            {product.msrp && (
              <span className="text-gray-400 text-sm line-through decoration-gray-300">₹{product.msrp.toLocaleString()}</span>
            )}
          </div>
          <button 
            onClick={() => onQuickBuy(product)}
            className="lg:hidden bg-brand-maroon text-brand-ivory px-4 py-1.5 text-sm font-semibold rounded-full"
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};
