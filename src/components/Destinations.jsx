import { Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const destinations = [
  { 
    id: 1, 
    name: 'Denmark & Sweden', 
    country: 'Scandinavia', 
    price: 1850, 
    rating: 4.8, 
    duration: '8 Days', 
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1508189860359-777d945909ef?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1544085311-11a028465b03?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1597200381847-30ec200eeb9a?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Explore the architectural gems and peaceful canals of Scandinavia. This journey takes you from the colorful Nyhavn waterfront in Copenhagen, Denmark, to the historical Royal Palaces and beautiful archipelago waterways of Stockholm, Sweden. Walk down historical cobbled streets, dine on contemporary Nordic cuisine, and discover the deep maritime culture of these historic northern nations. Experience the perfect blend of modern eco-design, ancient Viking heritage, and peaceful nature.'
  },
  { 
    id: 2, 
    name: 'Disneyland Paris Tickets', 
    country: 'France', 
    price: 350, 
    rating: 4.9, 
    duration: '2 Days', 
    image: 'https://images.unsplash.com/photo-1560942485-b2a11cc13456?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1499856871958-5b9647a64db0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513829096999-4978602294fc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505322022379-7c3353ee6291?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Experience magical moments at Disneyland Paris. Secure premium multi-day park tickets and bypass queues to meet iconic Disney characters, experience world-class thrill rides, and enjoy the breathtaking evening light and fireworks spectacular. Discover two magnificent parks filled with high-flying adventures, classic fairytale magic, and spectacular cinematic shows. Make your childhood dreams come alive with endless fun, stunning parades, and memories that last a lifetime.'
  },
  { 
    id: 3, 
    name: 'Mount Titlis Swiss Alps', 
    country: 'Switzerland', 
    price: 1950, 
    rating: 5.0, 
    duration: '4 Days', 
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Embark on an alpine adventure to Mount Titlis. Stand at 3,020 meters above sea level, walk the thrilling Cliff Walk suspension bridge, and explore the ancient glacier cave. Travel in style aboard the Rotair, the world’s first revolving cable car. Witness breathtaking panoramic views of snow-capped peaks, majestic ski slopes, and green valleys below. Cozy up in warm alpine chalets, enjoy delicious Swiss fondue, and experience the highest peak of Central Switzerland.'
  },
  { 
    id: 4, 
    name: 'Austria & Germany Mega Tour', 
    country: 'Europe', 
    price: 299, 
    rating: 4.6, 
    duration: '1 Day', 
    image: 'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520156557489-31742a3a71b8?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Immerse yourself in history with our Bavaria and Salzburg mega day-trip. Witness Germany’s legendary Neuschwanstein Castle (the inspiration for Disney) and explore the scenic streets of Salzburg, Austria, the historic birthplace of Mozart, all in one action-packed day. Stroll down the Swarovski crystal garden paths, view the magnificent green head waterfall, and capture memories that will last a lifetime.'
  },
  { 
    id: 5, 
    name: 'Giethoorn & Holland Tour', 
    country: 'Netherlands', 
    price: 950, 
    rating: 4.8, 
    duration: '3 Days', 
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1527004013197-933c4bb611b3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509782798616-11b559247eb6?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1549294413-26f195afcbdb?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Travel back in time to Giethoorn, the "Venice of the Netherlands." Glide along pristine canals, beneath historic wooden footbridges, and past centuries-old thatched farmhouses. Experience traditional Dutch countryside living at its finest. Cruise past blooming tulip fields, watch giant traditional windmills turn, and sample authentic local cheeses in windmill-speckled landscapes.'
  },
  { 
    id: 6, 
    name: 'Africa Safari Expedition', 
    country: 'Africa', 
    price: 2400, 
    rating: 4.9, 
    duration: '7 Days', 
    image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1546182990-dffeafbe841d?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1581888227599-779811939961?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511993807578-701168605ad3?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Embark on the ultimate wildlife safari across Africa’s Serengeti. Enjoy daily guided games drives, observe majestic lions, leopards, rhinos, giraffes, and elephants in their natural habitats, and retreat to luxury canvas tents under a canopy of wilderness stars. Experience absolute comfort while being fully surrounded by the sights and sounds of the savannah. Enjoy campfire dinners and stargazing with expert local guides.'
  },
  { 
    id: 7, 
    name: 'Rocking Rotterdam Tour', 
    country: 'Netherlands', 
    price: 850, 
    rating: 4.7, 
    duration: '3 Days', 
    image: 'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1582298538104-e22e5404104c?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1509782798616-11b559247eb6?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Experience the modern heartbeat of Holland. Discover Rotterdam, renowned for its cutting-edge architecture, the unique Overblaak Cube Houses, the vast historic ports, and a booming contemporary culinary and craft beer scene. Combine modern architecture tours with visits to historical harbors for a balanced, exciting Dutch experience. Walk over the Erasmus Bridge and dine in the futuristic Markthal.'
  },
  {
    id: 8,
    name: 'Paris & Swiss Alps Combo',
    country: 'France & Switzerland',
    price: 2200,
    rating: 4.9,
    duration: '6 Days',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1499856871958-5b9647a64db0?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1482862549707-f63cb32c5fd9?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1513829096999-4978602294fc?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Combine the romance of Paris with the majestic grandeur of the Swiss Alps. Stand beneath the sparkling lights of the Eiffel Tower, cruise the scenic Seine River, visit world-famous museums, and then journey via high-speed train to the snow-covered alpine valleys. Wake up to crisp mountain air, hike through majestic pine forests, and view towering peaks. Perfect for travelers seeking both cosmopolitan city lights and silent natural wonders.'
  },
  {
    id: 9,
    name: 'Venice & Rome Italian Escape',
    country: 'Italy',
    price: 1750,
    rating: 4.8,
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520156557489-31742a3a71b8?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Discover the ancient heritage and romantic waterways of Italy. Glide down Venice’s grand canals in a traditional gondola, witness the historic masterpieces of the Renaissance in Florence, and step back in time at Rome’s legendary Colosseum. Sample world-class pasta, pizza, and gelato along cobblestone streets. Admire the stunning architectures and the warm hospitality of historic Italian towns.'
  },
  {
    id: 10,
    name: 'Santorini & Athens Greek Odyssey',
    country: 'Greece',
    price: 1650,
    rating: 4.9,
    duration: '5 Days',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1520156557489-31742a3a71b8?auto=format&fit=crop&w=600&q=80'
    ],
    description: 'Immerse yourself in history and sunshine across Greece. Walk through the ancient ruins of the Athens Acropolis and learn about Greek mythology, and then fly to the postcard-perfect cliffs of Santorini. Watch the world’s most beautiful sunsets over white-washed buildings, blue domes, and active volcanic islands. Enjoy fresh Mediterranean seafood, sailing, and swimming in the crystal-clear Aegean Sea.'
  }
];

const Destinations = ({ addToCart }) => {
  const navigate = useNavigate();
  return (
    <>
      <section id="destinations" className="w-full bg-white relative z-20">
        <div className="max-w-7xl mx-auto py-24 px-6 md:px-12">
          <div className="mb-20 text-center">
            <span className="text-xs font-black tracking-[0.25em] text-amber-600 uppercase block mb-3">Curated Collection</span>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-zinc-900 mb-4">Exclusive Journeys</h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-2xl mx-auto font-light leading-relaxed">
              Embark on extraordinary escapes custom-tailored for the discerning global traveler. Clear, premium, and unforgettable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {destinations.map((dest) => (
              <div 
                key={dest.id}
                onClick={() => navigate(`/booking/${dest.id}`)}
                className="group flex flex-col cursor-pointer transition-all duration-300"
              >
                {/* Image Wrapper */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden mb-5 bg-zinc-100 border border-zinc-200 shadow-md">
                  <img 
                    src={dest.image} 
                    alt={dest.name} 
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Rating Pill overlay */}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 border border-zinc-200 shadow-sm text-zinc-900">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                    <span className="text-xs font-bold leading-none mt-[1px]">{dest.rating}</span>
                  </div>
                </div>
                
                {/* Details Content row */}
                <div className="flex justify-between items-start px-2">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 group-hover:text-amber-600 transition-colors duration-300">
                      {dest.name}
                    </h3>
                    <p className="text-xs text-zinc-500 font-medium tracking-wide mt-1">
                      {dest.country} • {dest.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-zinc-400 block uppercase tracking-wider font-semibold">From</span>
                    <span className="text-base font-black text-amber-600 leading-tight">${dest.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple elegant footer */}
      <footer className="w-full bg-white border-t border-zinc-150 py-12 px-6 md:px-12 text-center text-zinc-400 text-xs mt-20 relative z-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="font-semibold text-zinc-800 text-sm flex items-center select-none">
            <span className="font-light lowercase tracking-tight">see</span>
            <span className="text-blue-600 font-black uppercase tracking-wider ml-0.5">EU</span>
          </div>
          <div className="flex gap-6 font-semibold uppercase tracking-wider text-[10px]">
            <a href="#destinations" className="hover:text-zinc-900 transition-colors">Destinations</a>
            <a href="#packages" className="hover:text-zinc-900 transition-colors">Packages</a>
            <a href="#experiences" className="hover:text-zinc-900 transition-colors">Experiences</a>
            <a href="#journal" className="hover:text-zinc-900 transition-colors">Journal</a>
          </div>
          <div className="font-medium text-[10px] tracking-wide">
            © {new Date().getFullYear()} seeEU. All Rights Reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Destinations;