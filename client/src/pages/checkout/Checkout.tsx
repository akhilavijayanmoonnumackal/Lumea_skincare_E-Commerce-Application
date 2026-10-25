import { useState, useEffect } from 'react';
import { 
  Check, 
  Lock,
  ShieldCheck,
  Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/useAuth';
import { getCart } from '../../api/cartApi';
import { createOrder, verifyPayment } from '../../api/orderApi';

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayConstructor {
  new (options: Record<string, unknown>): RazorpayInstance;
}

declare global {
  interface Window {
    Razorpay: RazorpayConstructor;
  }
}

export interface CartItem {
  _id?: string;
  product: {
    _id: string;
    name: string;
    price: number;
    imageUrl?: string;
  };
  quantity: number;
}

export default function Checkout() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState<'express' | 'standard'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'upi' | 'paypal' | 'cod'>('card');
  const [saveAddress, setSaveAddress] = useState(true);
  const [emailOffers, setEmailOffers] = useState(true);

  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?. name ? user.name.split(' ')[0] : '',
    lastName: user?.name ? user.name.split(' ').slice(1).join(' ') : '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    phone: ''
  });

  // useEffect(() => {
  //   if(user) {
  //     setFormData(prev => ({
  //       ...prev,
  //       email: user.email || prev.email,
  //       firstName: user.name ? user.name.split(' ')[0] : prev.firstName,
  //       lastName: user.name ? user.name.split(' ').slice(1).join(' ') : prev.lastName,
  //     }));
  //   }
  // }, [user]);

  useEffect(() => {
    const fetchCheckoutCart = async () => {
      try {
        const res = await getCart();
        if(res.success && res.data && Array.isArray(res.data.items)) {
          setCartItems(res.data.items);
        }
      } catch (err) {
        console.error('Failed to load cart for checkout:', err);
        setError('Failed to load your shopping bag.');
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutCart();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const price = item.product?.price || 0;
    return acc + (price * item.quantity);
  }, 0);

  const discount = subtotal > 5000 ? 600 : 0;
  const deliveryCost = deliveryMethod === 'standard' ? 350 : 0;
  const gst = Math.round((subtotal - discount) * 0.18);
  const codFee = paymentMethod === 'cod' ? 150 : 0;
  const finalTotal = subtotal - discount + deliveryCost + gst + codFee;

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      setError('Your bag is empty.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const payload = {
        orderItems: cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        })),
        shippingAddress: {
          address: `${formData.address}, ${formData.apartment}`.trim(),
          city: formData.city,
          postalCode: formData.postalCode,
          country: formData.country,
          phone: formData.phone
        },
        paymentMethod: paymentMethod === 'cod' ? 'COD' : 'RAZORPAY'
      };

      const res = await createOrder(payload);

      if (!res.success) {
        setError(res.message || 'Failed to place order');
        setSubmitting(false);
        return;
      }

      const responseData = (res.data as unknown) as {
        order: { _id: string };
        razorpayOrderId?: string;
        amount?: number;
        currency?: string;
        keyId?: string;
      };

      // If COD, finish immediately
      if (paymentMethod === 'cod') {
        window.dispatchEvent(new Event('cartUpdated'));
        navigate(`/account/orders/${responseData.order._id}`);
        return;
      }

      // If Online Payment (Razorpay), open modal
      const { razorpayOrderId, amount, currency, keyId, order } = responseData;

      const options = {
        key: keyId,
        amount: amount,
        currency: currency,
        name: 'Luméa Skincare',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verificationRes = await verifyPayment({
              orderId: order._id,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature
            });

            if (verificationRes.success) {
              window.dispatchEvent(new Event('cartUpdated'));
              navigate(`/account/orders/${order._id}`);
            } else {
              setError('Payment verification failed.');
            }
          } catch (verifyErr: unknown) {
            console.error('Verification error:', verifyErr);
            setError('Payment verification failed on server.');
          }
        },
        prefill: {
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: '#1C382D'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err: unknown) {
      console.error('Checkout error:', err);
      const errorObj = err as { response?: { data?: { message?: string } } };
      setError(errorObj.response?.data?.message || 'Something went wrong during checkout.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FDFBF7]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1C382D]" />
      </div>
    );
  }

  return (
    <div key={user?.email || 'guest'} className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Progress Bar */}
        <div className="flex items-center justify-center space-x-4 sm:space-x-8 mb-12 text-xs">
          {/* Step 1: Bag */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-[#1C382D] text-white flex items-center justify-center font-bold">
              <Check size={12} />
            </span>
            <span className="hidden sm:inline font-medium">Bag</span>
          </div>
          <div className="w-8 sm:w-16 h-[1px] bg-gray-300"></div>

          {/* Step 2: Delivery */}
          <div className="flex items-center space-x-2 text-[#1C382D]">
            <span className="w-6 h-6 rounded-full border-2 border-[#1C382D] text-[#1C382D] flex items-center justify-center font-bold text-xs">
              2
            </span>
            <span className="font-bold">Delivery</span>
          </div>
          <div className="w-8 sm:w-16 h-[1px] bg-gray-300"></div>

          {/* Step 3: Payment */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs">
              3
            </span>
            <span className="hidden sm:inline font-medium">Payment</span>
          </div>
          <div className="w-8 sm:w-16 h-[1px] bg-gray-300"></div>

          {/* Step 4: Confirmation */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold text-xs">
              4
            </span>
            <span className="hidden sm:inline font-medium">Confirmation</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium text-center">
            {error}
          </div>
        )}

        {/* Main Grid: Left Form, Right Order Summary */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Form Area */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Contact Information */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl text-[#1C382D]">Contact</h2>
                <span className="text-xs text-gray-500">
                  Already have an account? <Link to="/login" className="text-[#1C382D] font-bold underline">Log in</Link>
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">Email address</label>
                  <input 
                    type="email"
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>

                <label className="flex items-center space-x-2.5 cursor-pointer pt-1">
                  <input 
                    type="checkbox" 
                    checked={emailOffers}
                    onChange={() => setEmailOffers(!emailOffers)}
                    className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]"
                  />
                  <span className="text-xs text-gray-600 font-light">Email me skin tips and exclusive offers</span>
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm">
              <h2 className="font-serif text-2xl text-[#1C382D] mb-6">Shipping address</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">First name</label>
                    <input 
                      type="text" 
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#cbcdcc] focus:outline-none focus:border-[#1C382D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">Last name</label>
                    <input 
                      type="text" 
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#cbcdcc] focus:outline-none focus:border-[#1C382D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">Address</label>
                  <input 
                    type="text" 
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="Street Address"
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#cbcdcc] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">Apartment, suite (optional)</label>
                  <input 
                    type="text" 
                    name='apartment'
                    value={formData.apartment}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#cbcdcc] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">City</label>
                    <input 
                      type="text" 
                      name='city'
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#cbcdcc] focus:outline-none focus:border-[#1C382D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">State</label>
                    <input 
                      type="text" 
                      name='state'
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#cbcdcc] focus:outline-none focus:border-[#1C382D]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">PIN code</label>
                    <input 
                      type="text" 
                      name='postalCode'
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      required
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#cbcdcc] focus:outline-none focus:border-[#1C382D]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="+91 98765 43210"
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1C382D] mb-2">Country / region</label>
                  <select 
                    name='country'
                    value={formData.country}
                    onChange={handleInputChange}
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-4 py-3 text-xs text-[#1C382D] focus:outline-none"
                  >
                    <option>India</option>
                    <option>United Arab Emirates</option>
                  </select>
                </div>

                <label className="flex items-center space-x-2.5 cursor-pointer pt-2">
                  <input 
                    type="checkbox" 
                    checked={saveAddress}
                    onChange={() => setSaveAddress(!saveAddress)}
                    className="w-4 h-4 rounded border-gray-300 text-[#1C382D] focus:ring-[#1C382D]"
                  />
                  <span className="text-xs text-gray-600 font-light">Save this address for next time</span>
                </label>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm">
              <h2 className="font-serif text-2xl text-[#1C382D] mb-6">Delivery method</h2>

              <div className="space-y-3">
                <div 
                  onClick={() => setDeliveryMethod('express')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'express' ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${deliveryMethod === 'express' ? 'border-[#1C382D]' : 'border-gray-300'}`}>
                      {deliveryMethod === 'express' && <div className="w-2 h-2 rounded-full bg-[#1C382D]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1C382D] block">Express · 2–3 business days</span>
                      <span className="text-[11px] text-gray-500 font-light">Carbon-neutral · arrives by Thu, Oct 8</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700">Free</span>
                </div>

                <div 
                  onClick={() => setDeliveryMethod('standard')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    deliveryMethod === 'standard' ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${deliveryMethod === 'standard' ? 'border-[#1C382D]' : 'border-gray-300'}`}>
                      {deliveryMethod === 'standard' && <div className="w-2 h-2 rounded-full bg-[#1C382D]" />}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-[#1C382D] block">Standard · 4–6 business days</span>
                      <span className="text-[11px] text-gray-500 font-light">Regular postal delivery</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#1C382D]">₹350</span>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm">
              <h2 className="font-serif text-2xl text-[#1C382D] mb-6">Payment</h2>

              <div className="space-y-4">
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    paymentMethod === 'card' ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-[#1C382D]' : 'border-gray-300'}`}>
                        {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-[#1C382D]" />}
                      </div>
                      <span className="text-xs font-bold text-[#1C382D]">Credit / debit card (Razorpay)</span>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'upi' ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'upi' ? 'border-[#1C382D]' : 'border-gray-300'}`}>
                      {paymentMethod === 'upi' && <div className="w-2 h-2 rounded-full bg-[#1C382D]" />}
                    </div>
                    <span className="text-xs font-bold text-[#1C382D]">UPI / Netbanking (Razorpay)</span>
                  </div>
                </div>

                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'cod' ? 'border-[#1C382D] bg-[#1C382D]/5 ring-1 ring-[#1C382D]' : 'border-[#E5E0D8]'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-[#1C382D]' : 'border-gray-300'}`}>
                      {paymentMethod === 'cod' && <div className="w-2 h-2 rounded-full bg-[#1C382D]" />}
                    </div>
                    <span className="text-xs font-bold text-[#1C382D]">Cash on delivery</span>
                  </div>
                  <span className="text-xs text-gray-400">+ ₹150 handling</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div>
              <button
                type='submit'
                disabled={submitting || cartItems.length === 0}
                className="w-full bg-[#1C382D] hover:bg-[#152a22] text-white py-4 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-lg flex items-center justify-center space-x-2 mb-4"
              >
                {submitting ? (
                  <>
                    <Loader2 className='w-4 h-4 animate-spin' />
                    <span>Processing...</span>
                  </>
                  ) : (
                    <span>Place order — ₹{finalTotal.toLocaleString('en-IN')}</span>
                  )}
              </button>

              <div className="flex items-center justify-between px-2">
                <div className="flex items-center space-x-1.5 text-[11px] text-gray-400">
                  <Lock size={12} />
                  <span>Your payment details are encrypted and never stored on our servers.</span>
                </div>
                <Link to="/cart" className="text-xs font-bold text-[#1C382D] underline">
                  Return to bag
                </Link>
              </div>
            </div>

          </div>

          {/* Right Summary Column */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-[#E5E0D8] shadow-sm sticky top-6">
            <h3 className="font-serif text-2xl text-[#1C382D] mb-6 pb-4 border-b border-[#E5E0D8]">Order summary</h3>

            {/* Items list preview */}
            <div className="space-y-4 mb-6 pb-6 border-b border-[#E5E0D8] max-h-72 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-xs text-gray-400">Your bag is empty</p>
                ) : (
                  cartItems.map((item, idx) => (
                    <div key={item._id || idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-12 h-12 rounded-xl bg-[#F4F1EA] overflow-hidden flex items-center justify-center flex-shrink-0">
                          <span className="absolute -top-1 -right-1 bg-[#1C382D] text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                            {item.quantity}
                          </span>
                          <img src={item.product?.imageUrl} alt={item.product?.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#1C382D]">{item.product?.name}</h4>
                          <span className="text-[10px] text-gray-400">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#1C382D]">₹{((item.product?.price || 0) * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  ))
                )}
            </div>

            {/* Promo Code Input */}
            <div className="flex items-center space-x-2 mb-6">
              <input 
                type="text" 
                defaultValue="GLOW15"
                className="flex-1 bg-[#F4F1EA] border border-[#E5E0D8] rounded-xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none"
              />
              <button className="bg-[#E5E0D8] text-[#1C382D] px-4 py-2.5 rounded-xl text-xs font-bold">
                Apply
              </button>
            </div>

            {/* Cost breakdown */}
            <div className="space-y-2.5 text-xs text-gray-600 mb-6 pb-6 border-b border-[#E5E0D8]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#1C382D]">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Discount (GLOW15)</span>
                <span className="font-bold">− ₹{discount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Express shipping</span>
                <span className="font-bold text-emerald-700">{deliveryMethod === 'express' ? 'Free' : `₹350`}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span className="font-bold text-[#1C382D]">₹{gst.toLocaleString('en-IN')}</span>
              </div>
              {paymentMethod === 'cod' && (
                <div className="flex justify-between text-amber-700">
                  <span>COD handling fee</span>
                  <span className="font-bold">₹150</span>
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-serif text-xl text-[#1C382D]">Total</span>
              <span className="text-2xl font-bold text-[#1C382D]">₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Happiness Guarantee Badge */}
            <div className="bg-[#F4F1EA] p-4 rounded-2xl flex items-center space-x-3 text-xs text-[#1C382D]">
              <ShieldCheck size={20} className="flex-shrink-0" />
              <span className="font-medium">30-day happiness guarantee included</span>
            </div>

          </div>
        </form>

        </div>

      </div>
  );
}