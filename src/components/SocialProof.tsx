import { motion } from 'framer-motion';

const dispatches = [
  "📍 Chennai, Tamil Nadu",
  "📍 Khammam, Telangana",
  "📍 Ravulapalem, Andhra Pradesh",
  "📍 Guntur, Andhra Pradesh",
  "📍 Chilakaluripet, Andhra Pradesh",
  "📍 Hyderabad, Telangana",
  "📍 Bengaluru, Karnataka",
];

export const SocialProof: React.FC = () => {
  return (
    <section className="bg-brand-maroon py-8 border-y-4 border-brand-gold/30 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <h3 className="text-center text-brand-gold font-serif text-xl sm:text-2xl font-semibold mb-6">
          Trusted by Thousands Across India
        </h3>
      </div>
      
      {/* Ticker Container */}
      <div className="relative flex overflow-x-hidden group">
        <motion.div 
          className="flex space-x-8 whitespace-nowrap px-4"
          animate={{ x: [0, -1000] }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear",
            },
          }}
        >
          {/* We duplicate the array a few times to ensure a seamless infinite scroll effect */}
          {[...dispatches, ...dispatches, ...dispatches].map((location, idx) => (
            <div 
              key={idx} 
              className="flex items-center space-x-2 bg-brand-ivory/10 backdrop-blur-sm px-6 py-3 rounded-full border border-brand-gold/20 shadow-sm"
            >
              <span className="text-brand-gold text-sm font-semibold tracking-wide">
                Recent Dispatch: {location}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
