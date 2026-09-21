import { MapPin, Phone, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-brand-ivory pt-16 pb-8 border-t-8 border-brand-maroon">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <h4 className="font-serif text-2xl font-bold text-brand-gold mb-4">Ramya Sri</h4>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium computer maggam works, exquisite bridal blouse designs, and sacred devotional wear crafted with precision and devotion.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors font-bold text-sm">IG</a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors font-bold text-sm">FB</a>
              <a href="#" className="text-gray-400 hover:text-brand-gold transition-colors font-bold text-sm">TW</a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold text-brand-ivory mb-4 uppercase tracking-wider text-sm">Explore</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Bridal Collections</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Devotional Wear</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Custom Orders</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">About Us</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h5 className="font-bold text-brand-ivory mb-4 uppercase tracking-wider text-sm">Customer Care</h5>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Track Order</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Shipping Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">Returns & Exchanges</a></li>
              <li><a href="#" className="text-gray-400 hover:text-brand-gold transition-colors text-sm">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="font-bold text-brand-ivory mb-4 uppercase tracking-wider text-sm">Contact Us</h5>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-gray-400 text-sm">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Ramachandrapuram,<br />Andhra Pradesh, India</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-3 text-gray-400 text-sm">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>hello@ramyasriworks.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 text-center flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Ramya Sri Embroidery Works. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Rupay-Logo.png/800px-Rupay-Logo.png" alt="RuPay" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" alt="Visa" className="h-6 opacity-60 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};
