import { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Menu, X, ShoppingBag, Trash2 } from 'lucide-react';

const Navbar = ({ cart = [], removeFromCart, isCartOpen, setIsCartOpen, isHidden }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  
  // Starting with a subtle light frosted glass, becoming more opaque on scroll
  const navBackground = useTransform(scrollY, [0, 100], ['rgba(255, 255, 255, 0.45)', 'rgba(255, 255, 255, 0.9)']);
  const navBorder = useTransform(scrollY, [0, 100], ['rgba(0, 0, 0, 0.05)', 'rgba(0, 0, 0, 0.12)']);
  const navBackdrop = useTransform(scrollY, [0, 100], ['blur(12px)', 'blur(24px)']);

  const handlePlanTrip = () => {
    setIsOpen(false);
    const element = document.getElementById('destinations');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartPrice = cart.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <>
      <div className={`fixed top-0 left-0 right-0 z-50 flex justify-center mt-6 px-4 pointer-events-none transition-all duration-500 ease-out ${
        isHidden ? 'opacity-0 -translate-y-24 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'
      }`}>
        <motion.nav 
          layout
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            backgroundColor: navBackground,
            borderColor: navBorder,
            backdropFilter: navBackdrop,
            WebkitBackdropFilter: navBackdrop
          }}
          className={`pointer-events-auto border flex flex-col justify-between items-center w-full max-w-5xl transition-all duration-300 shadow-lg ${
            isOpen ? 'rounded-3xl p-6' : 'rounded-full px-6 py-3.5'
          }`}
        >
          <div className="flex justify-between items-center w-full">
            {/* Brand Logo */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-xl cursor-pointer flex items-center select-none"
            >
              <span className="text-zinc-900 font-light lowercase tracking-tight text-lg">see</span>
              <span className="text-blue-600 font-black uppercase tracking-wider text-xl ml-0.5">EU</span>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {['Destinations', 'Packages', 'Experiences', 'Journal'].map((item) => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  className="group relative text-xs font-semibold tracking-widest uppercase text-zinc-600 hover:text-zinc-900 transition-colors duration-300 py-1"
                >
                  {item}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* Action / Toggle Buttons */}
            <div className="flex items-center gap-3">
              {/* Shopping Cart Trigger */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 text-zinc-600 hover:text-zinc-900 bg-zinc-100 hover:bg-zinc-200 rounded-full border border-zinc-200/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer pointer-events-auto"
                aria-label="View Cart"
              >
                <ShoppingBag className="w-4.5 h-4.5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-black text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                    {cart.length}
                  </span>
                )}
              </button>

              <button 
                onClick={handlePlanTrip}
                className="hidden sm:block bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.2)] border-none cursor-pointer"
              >
                Plan Trip
              </button>
              
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-zinc-600 hover:text-zinc-900 transition-colors p-1 cursor-pointer pointer-events-auto"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Dropdown Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full overflow-hidden flex flex-col items-center gap-6 mt-6 md:hidden border-t border-zinc-200 pt-6 pointer-events-auto"
              >
                {['Destinations', 'Packages', 'Experiences', 'Journal'].map((item) => (
                  <a 
                    key={item} 
                    href={`#${item.toLowerCase()}`} 
                    onClick={() => setIsOpen(false)}
                    className="text-sm font-semibold tracking-widest uppercase text-zinc-600 hover:text-amber-600 transition-colors duration-300"
                  >
                    {item}
                  </a>
                ))}
                
                <button 
                  onClick={handlePlanTrip}
                  className="w-full sm:hidden bg-gradient-to-r from-amber-500 to-amber-600 text-black px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.15)]"
                >
                  Plan Trip
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Cart Drawer Panel */}
      <AnimatePresence>
        {isCartOpen && !isHidden && (
          <motion.div 
            key="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] pointer-events-auto"
          />
        )}
        {isCartOpen && !isHidden && (
          <motion.div 
            key="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 220 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-zinc-200 z-[101] shadow-2xl p-6 flex flex-col pointer-events-auto text-zinc-900"
          >
            {/* Drawer Header */}
            <div className="flex justify-between items-center pb-6 border-b border-zinc-200">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-amber-600" />
                <h3 className="text-lg font-bold text-zinc-900 uppercase tracking-wider">Your Journey Cart</h3>
                <span className="bg-zinc-100 px-2 py-0.5 rounded-full text-xs font-semibold text-zinc-700">
                  {cart.length}
                </span>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="text-zinc-400 hover:text-zinc-700 p-1 cursor-pointer transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Contents */}
            <div className="flex-1 overflow-y-auto py-6 space-y-4 pr-1 scrollbar-thin">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col justify-center items-center text-center gap-4">
                  <ShoppingBag className="w-12 h-12 text-zinc-300 stroke-[1.5]" />
                  <div>
                    <h4 className="text-zinc-800 font-bold mb-1">Your cart is empty</h4>
                    <p className="text-zinc-400 text-xs max-w-[240px]">Explore our custom travel packages to start planning your next trip.</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.cartId} className="flex gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-200 relative">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-xl border border-zinc-200 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-zinc-900 text-sm tracking-wide truncate">{item.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">{item.duration} | {item.roomType}</p>
                      <div className="grid grid-cols-2 gap-x-2 gap-y-0.5 mt-2 text-[9px] text-zinc-500 font-medium">
                        <div className="truncate"><span className="text-zinc-400">Boarding:</span> {item.boardingPoint}</div>
                        <div className="truncate"><span className="text-zinc-400">Age:</span> {item.ageGroup}</div>
                        <div><span className="text-zinc-400">Rooms:</span> {item.rooms}</div>
                        <div><span className="text-zinc-400">Guests:</span> {item.guests}</div>
                      </div>
                      <div className="text-xs font-extrabold text-amber-600 mt-2">${item.totalPrice}</div>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.cartId)}
                      className="absolute top-4 right-4 text-zinc-400 hover:text-red-500 transition-colors p-1 cursor-pointer"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="pt-6 border-t border-zinc-200 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-zinc-500 text-sm font-medium">Total Cost</span>
                  <span className="text-2xl font-black text-zinc-900">${totalCartPrice}</span>
                </div>
                <button 
                  onClick={() => {
                    alert(`Checkout Simulation: Booking confirmation sent for ${cart.length} destinations.`);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-black py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.2)] cursor-pointer"
                >
                  Checkout Now
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;