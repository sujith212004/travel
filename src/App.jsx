import { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { ReactLenis, useLenis } from 'lenis/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Destinations, { destinations } from './components/Destinations';
import BookingModal from './components/BookingModal';

function ScrollController({ isModalOpen }) {
  const lenis = useLenis();
  const wasModalOpenRef = useRef(false);

  useEffect(() => {
    if (!lenis) return;
    if (isModalOpen) {
      lenis.stop();
      document.body.style.overflow = 'hidden';
      wasModalOpenRef.current = true;
    } else {
      document.body.style.overflow = '';
      lenis.start();
      if (wasModalOpenRef.current) {
        requestAnimationFrame(() => {
          lenis.resize();
          lenis.scrollTo('#destinations', { immediate: true });
        });
        wasModalOpenRef.current = false;
      }
    }
  }, [isModalOpen, lenis]);

  return null;
}

function BookingRouteWrapper({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const destination = destinations.find((d) => d.id === parseInt(id));

  if (!destination) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-zinc-50 text-zinc-900">
        <h2 className="text-xl font-bold">Destination Not Found</h2>
        <button 
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-amber-500 text-black font-bold rounded-full uppercase text-xs tracking-wider cursor-pointer border-none"
        >
          Go Back Home
        </button>
      </div>
    );
  }

  return (
    <BookingModal 
      destination={destination}
      onClose={() => navigate('/')}
      addToCart={addToCart}
    />
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  const isModalOpen = location.pathname.startsWith('/booking/');

  const addToCart = (booking) => {
    // Generate a unique ID for each cart item
    setCart((prev) => [...prev, { ...booking, cartId: `${booking.id}-${Date.now()}` }]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) => {
    setCart((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  return (
    <ReactLenis root>
      <ScrollController isModalOpen={isModalOpen} />
      <div className="relative w-full bg-zinc-50 min-h-screen text-zinc-900">
        <Navbar 
          cart={cart} 
          removeFromCart={removeFromCart} 
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isHidden={isModalOpen}
        />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <Destinations addToCart={addToCart} />
            </>
          } />
          <Route path="/booking/:id" element={
            <BookingRouteWrapper addToCart={addToCart} />
          } />
        </Routes>
      </div>
    </ReactLenis>
  );
}

export default App;