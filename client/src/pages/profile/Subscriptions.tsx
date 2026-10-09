import { useState } from 'react';
import { RefreshCw, Calendar, Package, PauseCircle, PlayCircle, XCircle, Check, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local asset imports
import serumsImg from '../../assets/images/serums&oils.avif';
import suncareImg from '../../assets/images/suncare.avif';

interface SubscriptionItem {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
}

interface Subscription {
  id: string;
  status: 'Active' | 'Paused';
  nextDeliveryDate: string;
  frequencyDays: number;
  discountPercent: number;
  items: SubscriptionItem[];
}

export default function Subscriptions() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: 'SUB-9402',
      status: 'Active',
      nextDeliveryDate: 'Nov 12, 2026',
      frequencyDays: 45,
      discountPercent: 15,
      items: [
        { id: 'item-1', name: 'Vitamin C Glow Serum', type: '30ml bottle', price: 2950, image: serumsImg },
        { id: 'item-2', name: 'Mineral Daily SPF 50', type: '50ml tube', price: 2200, image: suncareImg }
      ]
    }
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  //const [editingSubId, setEditingSubId] = useState<string | null>(null);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };

  const handleFrequencyChange = (subId: string, newFreq: number) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === subId) {
        return { ...sub, frequencyDays: newFreq };
      }
      return sub;
    }));
    showToast(`Delivery frequency updated to every ${newFreq} days!`);
  };

  const togglePauseStatus = (subId: string) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === subId) {
        const newStatus = sub.status === 'Active' ? 'Paused' : 'Active';
        showToast(`Subscription ${subId} has been ${newStatus.toLowerCase()}.`);
        return { ...sub, status: newStatus };
      }
      return sub;
    }));
  };

  const handleCancel = (subId: string) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== subId));
    showToast(`Subscription ${subId} was successfully cancelled.`);
  };

  const handleRemoveItem = (subId: string, itemId: string) => {
    setSubscriptions(subscriptions.map(sub => {
      if (sub.id === subId) {
        const updatedItems = sub.items.filter(item => item.id !== itemId);
        return { ...sub, items: updatedItems };
      }
      return sub;
    }));
    showToast('Item removed from auto-delivery box.');
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link to="/account" className="hover:underline">My account</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">Auto-Delivery Subscriptions</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                My Subscriptions
              </h1>
              <p className="text-xs text-gray-500 font-light mt-1">
                Manage your recurring skincare shipments, customize delivery timelines, and save 15% on every box.
              </p>
            </div>
          </div>
        </div>

        {/* Notification Toast */}
        {notification && (
          <div className="mb-6 bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-2xl flex items-center space-x-3 animate-fadeIn shadow-sm">
            <Check size={18} className="text-emerald-600 flex-shrink-0" />
            <span className="text-xs font-bold">{notification}</span>
          </div>
        )}

        {/* Subscriptions List */}
        {subscriptions.length === 0 ? (
          <div className="bg-white rounded-3xl border border-[#E5E0D8] p-12 text-center space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#1C382D]/5 flex items-center justify-center mx-auto text-[#1C382D]">
              <Package size={24} />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-2xl text-[#1C382D]">No active auto-delivery boxes</h3>
              <p className="text-xs text-gray-500 font-light max-w-sm mx-auto">
                Subscribe to your favorite serums or cleansers during checkout to receive automatic shipments with a 15% discount.
              </p>
            </div>
            <Link 
              to="/shop" 
              className="inline-flex items-center space-x-2 bg-[#1C382D] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors hover:bg-[#152a22]"
            >
              <span>Explore shop</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((sub) => {
              const subTotal = sub.items.reduce((acc, item) => acc + item.price, 0);
              const discountedTotal = subTotal * (1 - sub.discountPercent / 100);

              return (
                <div key={sub.id} className="bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-6">
                  
                  {/* Top Status & ID Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[#E5E0D8] gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#1C382D]">{sub.id}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${sub.status === 'Active' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'}`}>
                          {sub.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 font-light flex items-center space-x-1.5">
                        <Calendar size={13} className="text-gray-400" />
                        <span>Next shipment scheduled for <strong className="text-[#1C382D]">{sub.nextDeliveryDate}</strong></span>
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => togglePauseStatus(sub.id)}
                        className="px-4 py-2 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#1C382D] hover:bg-gray-50 transition-colors flex items-center space-x-1.5"
                      >
                        {sub.status === 'Active' ? (
                          <>
                            <PauseCircle size={14} />
                            <span>Pause subscription</span>
                          </>
                        ) : (
                          <>
                            <PlayCircle size={14} />
                            <span>Resume subscription</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Items in Auto-Delivery Box */}
                  <div className="space-y-4">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Box Contents ({sub.items.length} items)</h4>
                    
                    <div className="space-y-3">
                      {sub.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3.5 rounded-2xl bg-[#FDFBF7] border border-[#E5E0D8]">
                          <div className="flex items-center space-x-3">
                            <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover border border-[#E5E0D8] bg-white p-1" />
                            <div>
                              <h5 className="text-xs font-bold text-[#1C382D]">{item.name}</h5>
                              <span className="text-[10px] text-gray-400 font-light">{item.type}</span>
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            <span className="text-xs font-bold text-[#1C382D]">₹{item.price.toLocaleString()}</span>
                            {sub.items.length > 1 && (
                              <button
                                onClick={() => handleRemoveItem(sub.id, item.id)}
                                className="text-xs text-rose-600 hover:underline font-light"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Delivery Frequency Customizer */}
                  <div className="p-5 rounded-2xl bg-[#F4F1EA] space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <RefreshCw size={14} className="text-[#1C382D]" />
                        <span className="text-xs font-bold text-[#1C382D]">Auto-Delivery Frequency</span>
                      </div>
                      <span className="text-[10px] bg-[#1C382D] text-white font-bold px-2.5 py-0.5 rounded-full">
                        {sub.discountPercent}% Sub & Save Discount Active
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      {[30, 45, 60].map((days) => (
                        <button
                          key={days}
                          onClick={() => handleFrequencyChange(sub.id, days)}
                          className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${sub.frequencyDays === days ? 'bg-[#1C382D] text-white border-[#1C382D] shadow-sm' : 'bg-white text-[#1C382D] border-[#E5E0D8] hover:border-gray-400'}`}
                        >
                          Every {days} Days
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Summary & Footer Actions */}
                  <div className="pt-4 border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block">Total per shipment</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-serif text-xl font-bold text-[#1C382D]">₹{Math.round(discountedTotal).toLocaleString()}</span>
                        <span className="text-xs text-gray-400 line-through">₹{subTotal.toLocaleString()}</span>
                        <span className="text-[10px] text-emerald-700 font-bold">Free shipping included</span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => handleCancel(sub.id)}
                        className="text-xs text-rose-600 hover:underline font-medium flex items-center space-x-1"
                      >
                        <XCircle size={14} />
                        <span>Cancel subscription</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}