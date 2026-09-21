import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { useStore } from '../store/useStore';
import type { Product } from '../store/useStore';

export const ProductCatalog: React.FC = () => {
  const { setProductModalOpen } = useStore();

  const handleQuickBuy = (product: Product) => {
    setProductModalOpen(true, product);
  };

  return (
    <section id="catalog" className="py-20 bg-brand-ivory relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-brand-maroon mb-4">
            Curated Collections
          </h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6 rounded-full opacity-70" />
          <p className="text-gray-600 max-w-2xl mx-auto font-medium">
            Discover our hand-picked selection of devotional wear and bridal maggam works, crafted with uncompromising quality.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onQuickBuy={handleQuickBuy} 
            />
          ))}
        </div>
        
        {/* View All CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full border-2 border-brand-maroon text-brand-maroon font-bold hover:bg-brand-maroon hover:text-brand-gold transition-colors">
            Explore Full Catalog
          </button>
        </div>

      </div>
    </section>
  );
};
