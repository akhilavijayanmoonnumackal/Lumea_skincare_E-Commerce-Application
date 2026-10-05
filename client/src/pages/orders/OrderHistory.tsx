import { useState } from 'react';
import { Package, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

// Local asset imports
import serumsImg from '../../assets/images/serums&oils.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import suncareImg from '../../assets/images/suncare.avif';
import exfoliantImg from '../../assets/images/rose.avif';
import maskImg from '../../assets/images/clayMask.avif';

export default function OrderHistory() {
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allOrders = [
    {
      id: "#LUM-20486",
      date: "Placed 24 Sep 2026",
      itemsCount: "2 items",
      status: "Out for delivery",
      statusKey: "transit",
      statusColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
      total: "₹10,500",
      items: [
        { name: "Vitamin C Glow Serum", variant: "30 ml", price: "₹2,950", image: serumsImg },
        { name: "Gentle Milk Cleanser", variant: "30 ml", price: "₹1,850", image: cleanserImg }
      ]
    },
    {
      id: "#LUM-20115",
      date: "Placed 02 Sep 2026",
      itemsCount: "3 items",
      status: "Delivered",
      statusKey: "delivered",
      statusColor: "bg-gray-100 text-gray-700 border-gray-200",
      total: "₹8,150",
      items: [
        { name: "Mineral Daily SPF 50", variant: "50 ml", price: "₹2,200", image: suncareImg },
        { name: "Gentle Milk Cleanser", variant: "30 ml", price: "₹1,850", image: cleanserImg },
        { name: "Vitamin C Glow Serum", variant: "30 ml", price: "₹2,950", image: serumsImg }
      ]
    },
    {
      id: "#LUM-19874",
      date: "Placed 11 Aug 2026",
      itemsCount: "1 item",
      status: "Processing refund",
      statusKey: "refund",
      statusColor: "bg-amber-50 text-amber-700 border-amber-200",
      total: "₹2,850",
      items: [
        { name: "Rose Exfoliating Polish", variant: "100 ml", price: "₹2,850", image: exfoliantImg }
      ]
    },
    {
      id: "#LUM-18520",
      date: "Placed 15 Jul 2026",
      itemsCount: "1 item",
      status: "Delivered",
      statusKey: "delivered",
      statusColor: "bg-gray-100 text-gray-700 border-gray-200",
      total: "₹2,150",
      items: [
        { name: "Clay Detox Mask", variant: "75 ml", price: "₹2,150", image: maskImg }
      ]
    }
  ];

  const filteredOrders = allOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.statusKey === filterStatus;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link to="/account" className="hover:underline">My account</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">Order history</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                Order History
              </h1>
              <p className="text-xs text-gray-500 font-light mt-1">
                Track, manage, and review all your past skincare purchases ({allOrders.length} total orders)
              </p>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E5E0D8] shadow-sm mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Status Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            <button 
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filterStatus === 'all' ? 'bg-[#1C382D] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              All orders
            </button>
            <button 
              onClick={() => setFilterStatus('transit')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filterStatus === 'transit' ? 'bg-[#1C382D] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              In transit
            </button>
            <button 
              onClick={() => setFilterStatus('delivered')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filterStatus === 'delivered' ? 'bg-[#1C382D] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Delivered
            </button>
            <button 
              onClick={() => setFilterStatus('refund')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${filterStatus === 'refund' ? 'bg-[#1C382D] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              Refunds
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none">
              <Search size={14} />
            </span>
            <input 
              type="text" 
              placeholder="Search order # or item..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl pl-9 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>

        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white p-6 rounded-3xl border border-[#E5E0D8] shadow-sm hover:shadow-md transition-shadow space-y-5">
                
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#E5E0D8]">
                  <div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-[#1C382D]">{order.id}</span>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${order.statusColor}`}>
                        {order.status}
                      </span>
                    </div>
                    <span className="text-xs text-gray-400 font-light mt-0.5 block">{order.date} · {order.itemsCount}</span>
                  </div>
                  <div className="text-left sm:text-right">
                    <span className="text-sm font-bold text-[#1C382D] block">{order.total}</span>
                    <span className="text-[10px] text-gray-400">Total paid (incl. taxes)</span>
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="space-y-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-[#F4F1EA] border border-[#E5E0D8] overflow-hidden flex items-center justify-center p-1 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover rounded-lg" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-[#1C382D]">{item.name}</h4>
                          <span className="text-[10px] text-gray-400 font-light">{item.variant}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#1C382D]">{item.price}</span>
                    </div>
                  ))}
                </div>

                {/* Actions Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E5E0D8]">
                  <Link to="#" className="text-xs font-bold text-[#1C382D] underline hover:text-gray-700">
                    View order details & invoice
                  </Link>

                  <div className="flex items-center space-x-2">
                    <button className="px-4 py-2 rounded-xl border border-[#1C382D] text-[#1C382D] text-xs font-bold hover:bg-[#1C382D] hover:text-white transition-colors">
                      Track order
                    </button>
                    <button className="px-4 py-2 rounded-xl bg-[#1C382D] text-white text-xs font-bold hover:bg-[#152a22] transition-colors">
                      Buy again
                    </button>
                  </div>
                </div>

              </div>
            ))
          ) : (
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-12 text-center space-y-4">
              <div className="w-16 h-16 bg-[#F4F1EA] rounded-full flex items-center justify-center mx-auto text-[#1C382D]">
                <Package size={24} />
              </div>
              <h3 className="font-serif text-2xl text-[#1C382D]">No orders found</h3>
              <p className="text-xs text-gray-500 font-light max-w-sm mx-auto">
                No orders match your current filter or search criteria. Try selecting "All orders".
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}