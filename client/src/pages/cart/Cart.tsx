import { useState } from 'react';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Bookmark, 
  Tag, 
  ArrowRight, 
  Lock, 
  Star,
  Heart
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Local asset imports
import serumsImg from '../../assets/images/serums&oils.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import suncareImg from '../../assets/images/suncare.avif';
import moisturiserImg from '../../assets/images/moisturisers.avif';
import tonerImg from '../../assets/images/hydrating.avif';
import polishImg from '../../assets/images/rose.avif';

interface CartItem {
  id: number;
  title: string;
  variant: string;
  price: number;
  unitPriceText: string;
  quantity: number;
  image: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "Vitamin C Glow Serum",
      variant: "30 ml - Subscribe & save",
      price: 2950,
      unitPriceText: "₹2,950 each",
      quantity: 1,
      image: serumsImg
    },
    {
      id: 2,
      title: "Gentle Milk Cleanser",
      variant: "150 ml - One-time",
      price: 1850,
      unitPriceText: "₹1,850 each",
      quantity: 2,
      image: cleanserImg
    },
    {
      id: 3,
      title: "Mineral Daily SPF 50",
      variant: "50 ml - One-time",
      price: 2200,
      unitPriceText: "₹2,200 each",
      quantity: 1,
      image: suncareImg
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  const updateQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const subscriptionDiscount = 500; // Simulated discount amount
  const tax = Math.round(subtotal * 0.08);
  const finalTotal = subtotal - subscriptionDiscount + tax - (discountApplied ? 300 : 0);
  
  const freeShippingThreshold = 4000;
  const amountAwayFromFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const recommendations = [
    {
      id: 1,
      title: "Barrier Repair Cream",
      category: "MOISTURISER",
      rating: 5,
      reviews: 168,
      price: 2600,
      image: moisturiserImg
    },
    {
      id: 2,
      title: "Hydrating Essence Toner",
      category: "TONER",
      rating: 5,
      reviews: 245,
      price: 1650,
      image: tonerImg
    },
    {
      id: 3,
      title: "Rose Exfoliating Polish",
      category: "EXFOLIANT",
      badge: "20% OFF",
      rating: 5,
      reviews: 89,
      price: 2400,
      oldPrice: 3000,
      image: polishImg
    }
  ];

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="text-xs text-[#1C382D]/60 flex items-center space-x-2 mb-6">
          <span>Home</span>
          <span>/</span>
          <span className="text-[#1C382D] font-medium">Shopping bag</span>
        </div>

        {/* Title Row */}
        <div className="flex items-end justify-between mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
            Your bag <span className="text-lg font-sans font-light text-gray-500">({totalItemsCount} items)</span>
          </h1>
          <Link to="/shop" className="text-xs font-bold text-[#1C382D] underline underline-offset-4 hover:text-[#B85D36] transition-colors">
            Continue shopping
          </Link>
        </div>

        {/* Free Shipping Progress Notification Banner */}
        <div className="bg-[#F4F1EA] border border-[#E5E0D8] rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between text-xs font-medium text-[#1C382D] mb-2">
            <span>
              {amountAwayFromFreeShipping === 0 ? (
                <strong className="text-[#1C382D]">🎉 You’ve unlocked free express shipping!</strong>
              ) : (
                <>You’re <strong className="text-[#1C382D]">₹{amountAwayFromFreeShipping.toLocaleString('en-IN')}</strong> away from free express shipping</>
              )}
            </span>
          </div>
          <div className="w-full h-2 bg-white rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#1C382D] transition-all duration-500 rounded-full" 
              style={{ width: `${shippingProgress}%` }}
            ></div>
          </div>
        </div>

        {/* Main Grid: Bag Items Left, Order Summary Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Items list */}
          <div className="lg:col-span-8 space-y-6">
            
            {cartItems.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#E5E0D8]">
                <p className="text-base text-[#1C382D] mb-4">Your bag is currently empty.</p>
                <Link to="/shop" className="inline-block bg-[#1C382D] text-white px-8 py-3 rounded-full text-xs font-bold uppercase tracking-wider">
                  Start shopping
                </Link>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-white rounded-3xl p-6 border border-[#E5E0D8]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-2xl bg-[#F4F1EA] overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#1C382D] mb-0.5">{item.title}</h3>
                      <p className="text-xs text-gray-500 font-light mb-4">{item.variant}</p>
                      
                      {/* Quantity Controls & Actions */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-[#E5E0D8] rounded-full px-3 py-1.5 bg-[#FDFBF7]">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)} 
                            className="text-gray-500 hover:text-[#1C382D]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="mx-3 text-xs font-bold text-[#1C382D]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)} 
                            className="text-gray-500 hover:text-[#1C382D]"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button className="text-xs text-gray-500 hover:text-[#1C382D] flex items-center space-x-1 font-light">
                          <Bookmark size={13} />
                          <span>Save for later</span>
                        </button>

                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs text-red-500/80 hover:text-red-600 flex items-center space-x-1 font-light"
                        >
                          <Trash2 size={13} />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right sm:self-center w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
                    <span className="text-base font-bold text-[#1C382D]">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    <span className="text-[11px] text-gray-400 font-light">{item.unitPriceText}</span>
                  </div>
                </div>
              ))
            )}

            {/* Free Deluxe Sample Banner */}
            <div className="bg-white border border-[#E5E0D8] rounded-3xl p-6 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-[#F4F1EA] flex items-center justify-center text-[#1C382D]">
                  <Tag size={20} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1C382D] uppercase tracking-wider mb-0.5">Add a free deluxe sample</h4>
                  <p className="text-xs text-gray-500 font-light">Choose any 5 ml travel size at checkout</p>
                </div>
              </div>
              <button className="bg-white border border-[#1C382D] text-[#1C382D] hover:bg-[#1C382D] hover:text-white px-5 py-2.5 rounded-full text-xs font-bold transition-colors">
                Choose sample
              </button>
            </div>

          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-[#E5E0D8] shadow-sm sticky top-6">
            <h3 className="font-serif text-xl text-[#1C382D] mb-6 pb-4 border-b border-[#E5E0D8]">Order summary</h3>

            <div className="space-y-3 text-xs text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#1C382D]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Subscription discount</span>
                <span className="font-bold">− ₹{subscriptionDiscount.toLocaleString('en-IN')}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-emerald-700">
                  <span>Promo code (GLOW10)</span>
                  <span className="font-bold">− ₹300</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-gray-500 font-light">Calculated at checkout</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated tax</span>
                <span className="font-bold text-[#1C382D]">₹{tax.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Promo Code Box */}
            <div className="flex items-center space-x-2 mb-6">
              <input 
                type="text" 
                placeholder="Promo code" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 bg-[#F4F1EA] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#1C382D] placeholder-gray-400 focus:outline-none"
              />
              <button 
                onClick={() => { if(promoCode) setDiscountApplied(true); }}
                className="bg-[#E5E0D8] hover:bg-[#1C382D] hover:text-white text-[#1C382D] px-4 py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                Apply
              </button>
            </div>

            {/* Total Row */}
            <div className="flex items-baseline justify-between pt-4 border-t border-[#E5E0D8] mb-6">
              <span className="font-serif text-lg text-[#1C382D]">Total</span>
              <span className="text-xl font-bold text-[#1C382D]">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Checkout Button */}
            <button className="w-full bg-[#1C382D] hover:bg-[#152a22] text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-md flex items-center justify-center space-x-2 mb-4">
              <span>Checkout</span>
              <ArrowRight size={15} />
            </button>

            {/* Secure badge */}
            <div className="flex items-center justify-center space-x-1.5 text-[11px] text-gray-400 mb-6">
              <Lock size={12} />
              <span>Secure 256-bit SSL checkout</span>
            </div>

            {/* Quick Payment Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
              <button className="bg-[#F4F1EA] hover:bg-[#E5E0D8] py-2 rounded-xl text-xs font-bold text-[#1C382D] transition-colors">Pay</button>
              <button className="bg-[#F4F1EA] hover:bg-[#E5E0D8] py-2 rounded-xl text-xs font-bold text-[#1C382D] transition-colors">PayPal</button>
              <button className="bg-[#F4F1EA] hover:bg-[#E5E0D8] py-2 rounded-xl text-xs font-bold text-[#1C382D] transition-colors">G Pay</button>
            </div>

          </div>

        </div>

        {/* You May Also Like Section */}
        <div className="mt-20 border-t border-[#E5E0D8] pt-12">
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1C382D] mb-8">You may also like</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {recommendations.map(prod => (
              <div key={prod.id} className="bg-white rounded-3xl overflow-hidden border border-[#E5E0D8] flex flex-col justify-between group">
                <div className="relative bg-[#F4F1EA] h-64 overflow-hidden flex items-center justify-center">
                  {prod.badge && (
                    <span className="absolute top-3 left-3 z-10 bg-[#B85D36] text-white text-[9px] font-bold px-2 py-1 rounded uppercase">
                      {prod.badge}
                    </span>
                  )}
                  <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-md flex items-center justify-center text-gray-700 hover:text-[#1C382D]">
                    <Heart size={14} />
                  </button>
                  <img src={prod.image} alt={prod.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>

                <div className="p-5 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#B85D36] uppercase mb-1 block">{prod.category}</span>
                    <h3 className="font-serif text-lg text-[#1C382D] mb-2">{prod.title}</h3>
                    <div className="flex items-center space-x-1 mb-3">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (<Star key={i} size={12} fill="currentColor" />))}
                      </div>
                      <span className="text-[11px] text-gray-400">({prod.reviews})</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 pt-3 border-t border-gray-100">
                    <span className="text-sm font-bold text-[#1C382D]">₹{prod.price.toLocaleString('en-IN')}</span>
                    {prod.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">₹{prod.oldPrice.toLocaleString('en-IN')}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}