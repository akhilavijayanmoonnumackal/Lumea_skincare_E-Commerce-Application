import { useEffect, useState } from 'react';
import { 
  Minus, 
  Plus, 
  Trash2, 
  Bookmark, 
  Tag, 
  ArrowRight, 
  Lock,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCart, updateCartItemApi, removeFromCartApi, type CartItemBackend } from '../../api/cartApi';

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItemBackend[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        if (res.success && res.data && Array.isArray(res.data.items)) {
          setCartItems(res.data.items);
        }
      } catch (err) {
        console.error('Failed to fetch cart:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId: string, currentQty: number, delta: number) => {
    const newQty = currentQty + delta;
    if(newQty <= 0) return;

    try {
      const res = await updateCartItemApi(productId, newQty);
      if (res.success && res.data && Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const res = await removeFromCartApi(productId);
      if (res.success && res.data && Array.isArray(res.data.items)) {
        setCartItems(res.data.items);
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const subtotal = cartItems.reduce((acc, item) => acc + ((item.product?.price || 0) * item.quantity), 0);
  const subscriptionDiscount = 500;
  const tax = Math.round(subtotal * 0.08);
  const finalTotal = Math.max(0, subtotal - subscriptionDiscount + tax - (discountApplied ? 300 : 0));
  
  const freeShippingThreshold = 4000;
  const amountAwayFromFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  if (loading) {
    return (
      <div className="w-full bg-[#FDFBF7] min-h-[70vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#1C382D]" size={36} />
      </div>
    );
  }

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
                  key={item._id}
                  className="bg-white rounded-3xl p-6 border border-[#E5E0D8]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-24 h-24 rounded-2xl bg-[#F4F1EA] overflow-hidden flex-shrink-0 flex items-center justify-center">
                      <img src={item.product?.imageUrl} alt={item.product?.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="font-serif text-lg text-[#1C382D] mb-0.5">{item.product?.name}</h3>
                      <p className="text-xs text-gray-500 font-light mb-4">{item.variant || 'Standard'}</p>
                      
                      {/* Quantity Controls & Actions */}
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-[#E5E0D8] rounded-full px-3 py-1.5 bg-[#FDFBF7]">
                          <button 
                            onClick={() => updateQuantity(item.product._id, item.quantity, -1)} 
                            className="text-gray-500 hover:text-[#1C382D]"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="mx-3 text-xs font-bold text-[#1C382D]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product._id, item.quantity, 1)} 
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
                          onClick={() => removeItem(item.product._id)}
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
                    <span className="text-base font-bold text-[#1C382D]">₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}</span>
                    <span className="text-[11px] text-gray-400 font-light">₹{(item.product?.price || 0).toLocaleString('en-IN')}</span>
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

      </div>
    </div>
  );
}