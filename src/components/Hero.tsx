import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-28 pb-12 lg:pt-36 lg:pb-24 bg-brand-cream overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-maroon/5 rounded-bl-[100px] pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-brand-gold/20 text-brand-maroon text-xs font-bold tracking-widest uppercase mb-6 border border-brand-gold/30">
              Handcrafted Perfection
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-[1.1] mb-6">
              Machine Precision.<br className="hidden sm:block" />
              <span className="text-brand-maroon">Bridal Elegance.</span>
            </h1>
            <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Explore handcrafted computer maggam works, bridal blouse designs, and sacred devotional shirts made with premium zari and flawless detail.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8 text-xs sm:text-sm font-semibold text-gray-700">
              <span className="flex items-center gap-1.5"><span className="text-brand-gold">✦</span> 13K+ Followers</span>
              <span className="flex items-center gap-1.5"><span className="text-brand-gold">✦</span> Pan-India Shipping</span>
              <span className="flex items-center gap-1.5"><span className="text-brand-gold">✦</span> 100% Quality Assurance</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                className="px-8 py-3.5 bg-brand-maroon text-brand-gold font-bold rounded-full hover:bg-brand-maroon/90 hover:shadow-lg hover:shadow-brand-maroon/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Shop Best Sellers
              </button>
              <button className="px-8 py-3.5 bg-transparent text-brand-maroon font-bold rounded-full border-2 border-brand-maroon hover:bg-brand-maroon/5 transition-colors">
                Custom Bridal Consultation
              </button>
            </div>
          </motion.div>

          {/* Interactive Showcase Card */}
          <motion.div 
            className="flex-1 w-full max-w-md lg:max-w-full relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-brand-maroon/10 border border-brand-gold/30 group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
              <img 
                src="/blouse_maggam_1790012414191.jpg" 
                alt="Bridal Maggam Blouse Showcase" 
                className="w-full h-[400px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-0 left-0 p-6 z-20 w-full">
                <div className="bg-brand-ivory/95 backdrop-blur-sm p-4 rounded-xl shadow-lg border border-brand-gold/30">
                  <p className="text-xs text-brand-gold font-bold uppercase tracking-wider mb-1">Featured Design</p>
                  <h3 className="font-serif text-lg font-bold text-brand-maroon mb-2">Royal Peacock Bridal Work</h3>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-900 font-semibold">From ₹1,499</p>
                    <button className="text-xs bg-brand-maroon text-brand-ivory px-3 py-1.5 rounded-full font-semibold hover:bg-gray-900 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating element */}
            <div className="absolute -top-6 -right-6 bg-brand-gold text-brand-maroon w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-lg border-2 border-brand-ivory animate-bounce shadow-brand-gold/30">
              <span className="text-xs font-bold font-sans">New</span>
              <span className="font-serif font-bold leading-tight">Arrivals</span>
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};
