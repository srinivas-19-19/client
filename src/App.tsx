import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCatalog } from './components/ProductCatalog';
import { SocialProof } from './components/SocialProof';
import { Footer } from './components/Footer';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { PaymentCheckoutModal } from './components/PaymentCheckoutModal';

function App() {
  return (
    <div className="min-h-screen bg-brand-ivory flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <SocialProof />
        <ProductCatalog />
      </main>
      
      <Footer />

      {/* Global Modals & Drawers */}
      <ProductModal />
      <CartDrawer />
      <PaymentCheckoutModal />
    </div>
  );
}

export default App;
