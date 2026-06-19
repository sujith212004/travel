import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const BookingModal = ({ destination, onClose, addToCart }) => {
  const [activeImg, setActiveImg] = useState(destination.image);
  const [boardingPoint, setBoardingPoint] = useState('London (LHR)');
  const [roomType, setRoomType] = useState('Standard Room');
  const [ageGroup, setAgeGroup] = useState('Adult (18-64)');

  const handleClose = () => {
    onClose();
  };

  // Date initialization (today & tour duration days from now)
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultReturn = new Date();
  defaultReturn.setDate(defaultReturn.getDate() + parseInt(destination.duration));
  const defaultReturnStr = defaultReturn.toISOString().split('T')[0];

  const [startDate, setStartDate] = useState(todayStr);
  const [endDate, setEndDate] = useState(defaultReturnStr);
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [isAdding, setIsAdding] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const allImages = [destination.image, ...destination.images];
  const activeIndex = allImages.indexOf(activeImg);

  // Autoplay active image slider (slides active image every 3 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % allImages.length;
      setActiveImg(allImages[nextIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeIndex, allImages]);

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const prevIndex = (activeIndex - 1 + allImages.length) % allImages.length;
    setActiveImg(allImages[prevIndex]);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const nextIndex = (activeIndex + 1) % allImages.length;
    setActiveImg(allImages[nextIndex]);
  };

  // Dynamic pricing calculation
  const roomPremium = 
    roomType === 'Deluxe Suite' ? 200 : 
    roomType === 'Executive Villa' ? 500 : 
    roomType === 'Royal Penthouse' ? 1000 : 0;
  
  const totalPrice = (destination.price + roomPremium) * rooms * adults;

  const handleAddToCart = () => {
    setIsAdding(true);
    
    const bookingDetails = {
      id: destination.id,
      name: destination.name,
      image: destination.image,
      duration: destination.duration,
      boardingPoint,
      roomType,
      ageGroup,
      dates: `${startDate} to ${endDate}`,
      rooms,
      guests: adults,
      totalPrice
    };

    addToCart(bookingDetails);

    // Show visual confirmation animation before closing
    setTimeout(() => {
      setIsAdding(false);
      handleClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <motion.div 
        data-lenis-prevent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-zinc-50 overflow-y-auto pointer-events-auto text-zinc-955"
      >
        <div className="min-h-full flex flex-col">
          {/* Header Navigation */}
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 py-6 flex justify-between items-center z-30 border-b border-zinc-200/50 bg-zinc-50/80 backdrop-blur-md sticky top-0">
            <button 
              onClick={handleClose}
              className="group flex items-center gap-2.5 text-zinc-600 hover:text-zinc-950 font-bold text-sm transition-colors cursor-pointer bg-transparent border-none"
            >
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1 text-zinc-500 group-hover:text-zinc-950" />
              <span>Back to Destinations</span>
            </button>
            
            <div className="text-[10px] font-black tracking-[0.25em] text-zinc-400 uppercase select-none hidden sm:block">
              Journey Details
            </div>
          </div>

          {/* Content Layout */}
          <div className="max-w-7xl w-full mx-auto px-6 md:px-12 py-10 pb-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start flex-1">
            
            {/* Left: Gallery & Descriptions (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Active Image Frame */}
              <div className="relative aspect-[16/10] rounded-3xl overflow-hidden border border-zinc-200 bg-zinc-100 shadow-lg group">
                <motion.img 
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  src={activeImg} 
                  alt={destination.name} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Prev Arrow */}
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white text-zinc-800 border border-zinc-200/80 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer z-20"
                  aria-label="Previous Image"
                >
                  <ChevronLeft className="w-6 h-6 text-zinc-800 stroke-[2.5]" />
                </button>

                {/* Next Arrow */}
                <button 
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 bg-white/90 hover:bg-white text-zinc-800 border border-zinc-200/80 rounded-full flex items-center justify-center shadow-lg hover:scale-110 active:scale-90 transition-all cursor-pointer z-20"
                  aria-label="Next Image"
                >
                  <ChevronRight className="w-6 h-6 text-zinc-800 stroke-[2.5]" />
                </button>
              </div>

              {/* Thumbnail Navigation (Total 6 images) */}
              <div className="grid grid-cols-6 gap-3">
                {allImages.map((img, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={`aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 transition-all duration-300 bg-zinc-100 shadow-sm ${
                      activeImg === img 
                        ? 'border-amber-500 scale-95 shadow-md shadow-amber-500/10' 
                        : 'border-zinc-200/80 hover:border-zinc-400 hover:scale-95'
                    }`}
                  >
                    <img src={img} alt={`${destination.name} detail ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>

              {/* Detailed Info Card */}
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-5 shadow-sm">
                <h3 className="text-xl font-bold text-zinc-900 tracking-wide">The Experience</h3>
                <p className="text-zinc-600 text-sm leading-relaxed font-light">
                  {isExpanded ? destination.description : `${destination.description.slice(0, 180)}...`}
                  {destination.description.length > 180 && (
                    <button 
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="text-amber-600 font-bold ml-1.5 hover:underline cursor-pointer focus:outline-none bg-transparent border-none text-xs inline-block"
                    >
                      {isExpanded ? 'See Less' : 'See More'}
                    </button>
                  )}
                </p>
                
                {/* Highlight Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-5 border-t border-zinc-200 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-zinc-400 lowercase font-medium">Trip duration</span>
                    <span className="text-zinc-900 font-bold text-sm">{destination.duration}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-zinc-400 lowercase font-medium">Hotels tier</span>
                    <span className="text-zinc-900 font-bold text-sm">Ultra Luxury 5★</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-zinc-400 lowercase font-medium">Tour support</span>
                    <span className="text-zinc-900 font-bold text-sm">24/7 Concierge Service</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Dynamic Selection Form (5 Cols) */}
            <div className="lg:col-span-5">
              <div className="bg-white border border-zinc-200 rounded-3xl p-8 space-y-6 shadow-lg">
                <div>
                  <span className="text-xs text-amber-600 font-bold tracking-[0.2em] uppercase">{destination.country}</span>
                  <h2 className="text-2xl font-black text-zinc-900 mt-1">{destination.name}</h2>
                </div>

                {/* Form Input fields */}
                <div className="space-y-5">
                  {/* Boarding Point Dropdown */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Boarding Point (Europe)</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                      <select 
                        value={boardingPoint}
                        onChange={(e) => setBoardingPoint(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-10 text-sm text-zinc-800 focus:outline-none focus:border-amber-600 focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="London (LHR)">London Heathrow (LHR), UK</option>
                        <option value="Paris (CDG)">Paris Charles de Gaulle (CDG), France</option>
                        <option value="Frankfurt (FRA)">Frankfurt Airport (FRA), Germany</option>
                        <option value="Rome (FCO)">Rome Fiumicino (FCO), Italy</option>
                        <option value="Amsterdam (AMS)">Amsterdam Schiphol (AMS), Netherlands</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 border-l border-zinc-200 pl-3 text-xs uppercase font-bold tracking-wider">Select</div>
                    </div>
                  </div>

                  {/* Age Group */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Age Group</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                      <select 
                        value={ageGroup}
                        onChange={(e) => setAgeGroup(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-10 text-sm text-zinc-800 focus:outline-none focus:border-amber-600 focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="Adult (18-64)">Adult (Ages 18-64)</option>
                        <option value="Senior (65+)">Senior (Ages 65+)</option>
                        <option value="Youth (12-17)">Youth (Ages 12-17)</option>
                        <option value="Child (2-11)">Child (Ages 2-11)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 border-l border-zinc-200 pl-3 text-xs uppercase font-bold tracking-wider">Select</div>
                    </div>
                  </div>

                  {/* Room Type */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Room Type</label>
                    <div className="relative">
                      <select 
                        value={roomType}
                        onChange={(e) => setRoomType(e.target.value)}
                        className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 px-5 pr-10 text-sm text-zinc-800 focus:outline-none focus:border-amber-600 focus:bg-white transition-all appearance-none cursor-pointer"
                      >
                        <option value="Standard Room">Standard Suite - Included</option>
                        <option value="Deluxe Suite">Deluxe Suite (+ $200 / night)</option>
                        <option value="Executive Villa">Executive Villa (+ $500 / night)</option>
                        <option value="Royal Penthouse">Royal Penthouse (+ $1,000 / night)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400 border-l border-zinc-200 pl-3 text-xs uppercase font-bold tracking-wider">Select</div>
                    </div>
                  </div>

                  {/* Dates Picker */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Departure</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <input 
                          type="date" 
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-zinc-800 focus:outline-none focus:border-amber-600 focus:bg-white transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Return</label>
                      <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400 pointer-events-none" />
                        <input 
                          type="date" 
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-zinc-800 focus:outline-none focus:border-amber-600 focus:bg-white transition-all cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Steppers: Rooms and Guests */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Rooms</label>
                      <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-2xl p-1.5 shadow-inner">
                        <button 
                          type="button"
                          onClick={() => rooms > 1 && setRooms(rooms - 1)}
                          className="w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer text-lg font-medium shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-bold text-zinc-900">{rooms}</span>
                        <button 
                          type="button"
                          onClick={() => setRooms(rooms + 1)}
                          className="w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer text-lg font-medium shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block">Adult Guests</label>
                      <div className="flex items-center justify-between bg-zinc-50 border border-zinc-200 rounded-2xl p-1.5 shadow-inner">
                        <button 
                          type="button"
                          onClick={() => adults > 1 && setAdults(adults - 1)}
                          className="w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer text-lg font-medium shadow-sm"
                        >
                          -
                        </button>
                        <span className="font-bold text-zinc-900">{adults}</span>
                        <button 
                          type="button"
                          onClick={() => setAdults(adults + 1)}
                          className="w-9 h-9 rounded-xl bg-white border border-zinc-200 text-zinc-800 hover:bg-zinc-100 flex items-center justify-center transition-colors cursor-pointer text-lg font-medium shadow-sm"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Pricing & Checkout Actions */}
                <div className="pt-6 border-t border-zinc-200 space-y-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-wider">Estimated Total</p>
                      <p className="text-3xl font-black text-amber-600">${totalPrice}</p>
                    </div>
                    <div className="text-right text-[10px] text-zinc-400 font-light">
                      * Base Rate: ${destination.price}
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleAddToCart}
                    disabled={isAdding}
                    className={`w-full py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all duration-300 shadow-[0_4px_15px_rgba(245,158,11,0.2)] flex justify-center items-center gap-2 cursor-pointer border-none ${
                      isAdding 
                        ? 'bg-emerald-500 text-white shadow-[0_4px_15px_rgba(16,185,129,0.2)] scale-[0.98]' 
                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    {isAdding ? 'Added to Cart ✓' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default BookingModal;