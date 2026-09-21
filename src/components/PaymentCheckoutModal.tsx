import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, CreditCard, Wallet, Smartphone, Building, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import clsx from 'clsx';

export const PaymentCheckoutModal: React.FC = () => {
  const { isCheckoutModalOpen, setCheckoutModalOpen, cart, clearCart } = useStore();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Details, 2: Payment Method, 3: Processing, 4: Success
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const total = subtotal + (subtotal > 1999 || subtotal === 0 ? 0 : 99);

  const handleClose = () => {
    if (step === 3) return; // Prevent close during processing
    setCheckoutModalOpen(false);
    if (step === 4) {
      setTimeout(() => {
        setStep(1);
        clearCart();
      }, 300);
    }
  };

  const processPayment = () => {
    setStep(3);
    setTimeout(() => {
      setStep(4);
    }, 2500); // Simulate network request
  };

  if (!isCheckoutModalOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-brand-ivory w-full max-w-3xl max-h-[90vh] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-brand-gold/20 relative"
        >
          {/* Header/Close */}
          {step !== 3 && step !== 4 && (
            <button 
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 text-gray-400 hover:text-gray-900 bg-white/50 p-2 rounded-full backdrop-blur-md"
            >
              <X size={20} />
            </button>
          )}

          {/* Left Side - Order Summary (Hidden on mobile for step 1 & 2 to save space, visible otherwise) */}
          <div className={clsx(
            "bg-gray-50 border-r border-gray-200 p-6 md:p-8 w-full md:w-2/5 flex flex-col",
            (step === 1 || step === 2) ? "hidden md:flex" : (step === 4 ? "hidden" : "flex")
          )}>
            <div className="flex items-center space-x-2 text-brand-maroon mb-6">
              <ShieldCheck size={20} />
              <span className="font-bold text-sm">Secure Checkout</span>
            </div>
            
            <div className="flex-1 overflow-y-auto custom-scrollbar -mx-2 px-2">
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Order Summary</h4>
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.id} className="flex space-x-3">
                    <div className="relative">
                      <img src={item.image} alt={item.name} className="w-12 h-16 object-cover rounded shadow-sm border border-gray-200" />
                      <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-gray-900 line-clamp-2">{item.name}</p>
                      <p className="text-xs text-gray-500 mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4 text-sm">
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-600 mb-2">
                <span>Shipping</span>
                <span className="font-semibold text-gray-900">
                  {total - subtotal === 0 ? 'Free' : `₹${total - subtotal}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-brand-maroon mt-4 pt-4 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Right Side - Dynamic Content */}
          <div className="w-full md:w-3/5 bg-white flex flex-col relative">
            
            {/* Step 1: Details Form */}
            {step === 1 && (
              <div className="p-6 md:p-8 flex-1 overflow-y-auto custom-scrollbar">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-bold text-gray-900">Delivery Details</h2>
                  <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full">Step 1 of 2</span>
                </div>
                
                <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name</label>
                    <input required type="text" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon focus:ring-0 transition-colors" placeholder="e.g. Priya Sharma" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Phone Number</label>
                      <input required type="tel" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon transition-colors" placeholder="+91" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                      <input required type="email" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon transition-colors" placeholder="email@example.com" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">Full Address</label>
                    <textarea required rows={2} className="w-full border-2 border-gray-200 rounded-lg px-3 py-2text-sm focus:border-brand-maroon transition-colors" placeholder="House/Flat No, Street, Landmark" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                      <input required type="text" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon transition-colors" placeholder="City" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">PIN Code</label>
                      <input required type="text" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon transition-colors" placeholder="500001" />
                    </div>
                  </div>

                  <div className="pt-4 mt-6 border-t border-gray-100">
                    <button type="submit" className="w-full bg-brand-maroon text-brand-gold font-bold py-3.5 rounded-xl hover:bg-gray-900 transition-colors shadow-lg shadow-brand-maroon/20">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Step 2: Payment Gateway */}
            {step === 2 && (
              <div className="flex flex-col h-full">
                <div className="p-4 md:p-6 border-b border-gray-100 flex items-center space-x-3">
                  <button onClick={() => setStep(1)} className="p-1.5 text-gray-400 hover:text-gray-900 bg-gray-50 rounded-full">
                    <ArrowLeft size={18} />
                  </button>
                  <div>
                    <h2 className="font-serif text-xl font-bold text-gray-900">Select Payment</h2>
                    <p className="text-xs text-gray-500">Pay securely to complete your order</p>
                  </div>
                </div>

                <div className="flex-1 flex overflow-hidden">
                  {/* Payment Tabs */}
                  <div className="w-1/3 bg-gray-50 border-r border-gray-200 flex flex-col">
                    <button onClick={() => setPaymentMethod('upi')} className={clsx("p-4 text-left text-sm font-semibold flex flex-col gap-1 border-l-4 transition-colors", paymentMethod === 'upi' ? "bg-white border-brand-maroon text-brand-maroon" : "border-transparent text-gray-600 hover:bg-gray-100")}>
                      <Smartphone size={18} className="mb-1" /> UPI / QR
                    </button>
                    <button onClick={() => setPaymentMethod('card')} className={clsx("p-4 text-left text-sm font-semibold flex flex-col gap-1 border-l-4 transition-colors", paymentMethod === 'card' ? "bg-white border-brand-maroon text-brand-maroon" : "border-transparent text-gray-600 hover:bg-gray-100")}>
                      <CreditCard size={18} className="mb-1" /> Cards
                    </button>
                    <button onClick={() => setPaymentMethod('netbanking')} className={clsx("p-4 text-left text-sm font-semibold flex flex-col gap-1 border-l-4 transition-colors", paymentMethod === 'netbanking' ? "bg-white border-brand-maroon text-brand-maroon" : "border-transparent text-gray-600 hover:bg-gray-100")}>
                      <Building size={18} className="mb-1" /> Net Banking
                    </button>
                    <button onClick={() => setPaymentMethod('cod')} className={clsx("p-4 text-left text-sm font-semibold flex flex-col gap-1 border-l-4 transition-colors", paymentMethod === 'cod' ? "bg-white border-brand-maroon text-brand-maroon" : "border-transparent text-gray-600 hover:bg-gray-100")}>
                      <Wallet size={18} className="mb-1" /> Cash/Advance
                    </button>
                  </div>

                  {/* Payment Details Panel */}
                  <div className="w-2/3 p-6 overflow-y-auto custom-scrollbar">
                    {paymentMethod === 'upi' && (
                      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 inline-block">
                          {/* Placeholder QR */}
                          <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=ramyasri@upi&pn=RamyaSriEmbroidery&am=10" alt="UPI QR" className="w-32 h-32" />
                        </div>
                        <p className="text-sm font-semibold text-gray-600">Scan with any UPI App</p>
                        <div className="flex space-x-2 justify-center opacity-70">
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/UPI-Logo-vector.svg/1200px-UPI-Logo-vector.svg.png" alt="UPI" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Google_Pay_Logo_%282020%29.svg/1200px-Google_Pay_Logo_%282020%29.svg.png" alt="GPay" className="h-4" />
                          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/PhonePe_Logo.svg/1200px-PhonePe_Logo.svg.png" alt="PhonePe" className="h-4" />
                        </div>
                        <div className="w-full relative mt-4">
                          <div className="absolute inset-0 flex items-center" aria-hidden="true">
                            <div className="w-full border-t border-gray-200"></div>
                          </div>
                          <div className="relative flex justify-center">
                            <span className="px-2 bg-white text-xs text-gray-500 font-medium uppercase">or enter VPA</span>
                          </div>
                        </div>
                        <input type="text" placeholder="e.g. 9876543210@ybl" className="w-full text-center border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon focus:outline-none" />
                      </div>
                    )}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Card Number</label>
                          <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">Expiry</label>
                            <input type="text" placeholder="MM/YY" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon" />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 mb-1">CVV</label>
                            <input type="password" placeholder="•••" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-gray-700 mb-1">Name on Card</label>
                          <input type="text" placeholder="Cardholder Name" className="w-full border-2 border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:border-brand-maroon" />
                        </div>
                      </div>
                    )}
                    {paymentMethod === 'netbanking' && (
                      <div className="space-y-3">
                        {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map(bank => (
                          <label key={bank} className="flex items-center space-x-3 p-3 border-2 border-gray-100 rounded-lg cursor-pointer hover:border-brand-maroon/50 transition-colors">
                            <input type="radio" name="bank" className="text-brand-maroon focus:ring-brand-maroon" />
                            <span className="text-sm font-semibold text-gray-700">{bank}</span>
                          </label>
                        ))}
                      </div>
                    )}
                    {paymentMethod === 'cod' && (
                      <div className="bg-brand-gold/10 p-4 rounded-xl border border-brand-gold/30 text-brand-maroon">
                        <p className="text-sm font-semibold mb-2">Advance Token Booking</p>
                        <p className="text-xs leading-relaxed">
                          For custom maggam works, a nominal advance of ₹200 is required to confirm the booking. The remaining balance can be paid on delivery.
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t border-gray-100">
                  <button onClick={processPayment} className="w-full bg-brand-maroon text-brand-gold font-bold py-3.5 rounded-xl hover:bg-gray-900 transition-colors shadow-lg shadow-brand-maroon/20 flex justify-center items-center space-x-2">
                    <span>Pay ₹{total.toLocaleString()}</span>
                    <ShieldCheck size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Processing */}
            {step === 3 && (
              <div className="p-12 flex flex-col items-center justify-center h-full text-center">
                <Loader2 size={48} className="text-brand-maroon animate-spin mb-6" />
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">Processing Payment...</h3>
                <p className="text-sm text-gray-500 font-medium">Securing connection with 256-bit encryption. Please do not close or refresh this window.</p>
              </div>
            )}

          </div>

          {/* Step 4: Success View (Overlays everything) */}
          {step === 4 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="absolute inset-0 bg-brand-ivory z-50 flex flex-col items-center justify-center p-8 text-center"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6 mx-auto">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
              <p className="text-gray-500 mb-8 max-w-sm">
                Thank you for choosing Ramya Sri Embroidery Works. Your order has been successfully placed.
              </p>
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 w-full max-w-sm text-left mb-8">
                <div className="flex justify-between items-center mb-3 text-sm">
                  <span className="text-gray-500">Order ID:</span>
                  <span className="font-bold text-gray-900">#RS-{Math.floor(Math.random() * 90000) + 10000}</span>
                </div>
                <div className="flex justify-between items-center mb-3 text-sm">
                  <span className="text-gray-500">Amount Paid:</span>
                  <span className="font-bold text-brand-maroon">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">Est. Delivery:</span>
                  <span className="font-semibold text-gray-900">3 - 5 Business Days</span>
                </div>
              </div>

              <button onClick={handleClose} className="px-8 py-3.5 bg-brand-maroon text-brand-gold font-bold rounded-full hover:bg-gray-900 transition-colors shadow-lg">
                Continue Shopping
              </button>
            </motion.div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
