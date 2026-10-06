// C:\PROJECTS_MERN\Lumea-skin care-E-commerce Website\client\src\pages\admin\SubscriptionsPage.tsx
import { useState } from 'react';
import { Search, RefreshCw, PauseCircle, PlayCircle, XCircle, Calendar, Package, ArrowUpRight, Filter } from 'lucide-react';

export default function AdminSubscriptionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusTab, setStatusTab] = useState('All');

  const subscriptions = [
    { 
      id: 'SUB-5012', 
      customer: 'Aarav Sharma', 
      email: 'aarav.s@gmail.com', 
      product: 'Vitamin C Glow Serum (Subscription)', 
      frequency: 'Every 30 Days', 
      price: '₹1,305', 
      nextBilling: 'Nov 12, 2026', 
      status: 'Active',
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'SUB-5011', 
      customer: 'Neha Gupta', 
      email: 'neha.g@yahoo.com', 
      product: 'Barrier Repair Cream (Duo)', 
      frequency: 'Every 60 Days', 
      price: '₹3,325', 
      nextBilling: 'Nov 28, 2026', 
      status: 'Active',
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'SUB-5010', 
      customer: 'Rohan Iyer', 
      email: 'rohan.iyer@outlook.com', 
      product: 'Mineral Daily SPF 50', 
      frequency: 'Every 30 Days', 
      price: '₹1,080', 
      nextBilling: 'Paused', 
      status: 'Paused',
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'SUB-5009', 
      customer: 'Meera Pillai', 
      email: 'meera.p@gmail.com', 
      product: 'Hydrating Gel Cleanser', 
      frequency: 'Every 45 Days', 
      price: '₹855', 
      nextBilling: 'Dec 04, 2026', 
      status: 'Active',
      img: 'https://images.unsplash.com/photo-1556228726-952b655928d3?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'SUB-5008', 
      customer: 'Karan Kapoor', 
      email: 'karan.k@gmail.com', 
      product: 'Rose Exfoliating Polish', 
      frequency: 'Every 30 Days', 
      price: '₹1,215', 
      nextBilling: '-', 
      status: 'Cancelled',
      img: 'https://images.unsplash.com/photo-1608248597359-994b59367e23?w=100&auto=format&fit=crop&q=80'
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
            <RefreshCw size={12} className="animate-spin-slow" />
            <span>Active</span>
          </span>
        );
      case 'Paused':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
            <PauseCircle size={12} />
            <span>Paused</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
            <XCircle size={12} />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesTab = statusTab === 'All' || sub.status === statusTab;
    const matchesSearch = sub.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          sub.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          sub.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Subscriptions Management</h2>
          <p className="text-xs text-gray-500 font-light">Monitor recurring skincare shipments, automatic renewals, and subscriber retention.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-white hover:bg-gray-50 border border-[#E5E0D8] text-[#1C382D] px-4 py-2.5 rounded-full text-xs font-bold tracking-wider flex items-center space-x-2 transition-colors shadow-2xs">
            <Calendar size={15} />
            <span>Billing Schedule</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Active Subscriptions</span>
            <RefreshCw size={16} className="text-[#2D6A4F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">342</div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium">
            <ArrowUpRight size={13} />
            <span>+14.2% new subscribers this month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Monthly Recurring Rev (MRR)</span>
            <Package size={16} className="text-[#C58359]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">₹4,45,200</div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium">
            <ArrowUpRight size={13} />
            <span>+9.8% vs last month</span>
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Retention Rate</span>
            <Calendar size={16} className="text-[#8FA89B]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">92.4%</div>
          <div className="flex items-center space-x-1 text-[11px] text-emerald-700 font-medium">
            <ArrowUpRight size={13} />
            <span>+1.5% churn reduction</span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Active', 'Paused', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${statusTab === tab ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search subscriber name or ID..."
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>
          <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-[#F7F5F0] flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Filter size={15} />
          </button>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Sub ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Subscribed Product</th>
                <th className="py-4 px-6">Frequency</th>
                <th className="py-4 px-6">Discounted Price</th>
                <th className="py-4 px-6">Next Billing</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {filteredSubscriptions.length > 0 ? (
                filteredSubscriptions.map((sub, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6 font-bold text-[#1C382D]">{sub.id}</td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#1C382D]">{sub.customer}</div>
                      <div className="text-[11px] text-gray-400 font-light">{sub.email}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={sub.img} alt={sub.product} className="w-9 h-9 rounded-xl object-cover bg-white p-0.5 border border-[#E5E0D8]" />
                        <span className="font-medium text-[#1C382D]">{sub.product}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{sub.frequency}</td>
                    <td className="py-4 px-6 font-bold text-[#1C382D]">{sub.price}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{sub.nextBilling}</td>
                    <td className="py-4 px-6">{getStatusBadge(sub.status)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        {sub.status === 'Active' ? (
                          <button title="Pause Subscription" className="w-8 h-8 rounded-full border border-amber-200 bg-white flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors">
                            <PauseCircle size={14} />
                          </button>
                        ) : sub.status === 'Paused' ? (
                          <button title="Resume Subscription" className="w-8 h-8 rounded-full border border-emerald-200 bg-white flex items-center justify-center text-emerald-600 hover:bg-emerald-50 transition-colors">
                            <PlayCircle size={14} />
                          </button>
                        ) : null}
                        <button title="Cancel Subscription" className="w-8 h-8 rounded-full border border-rose-100 bg-white flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors">
                          <XCircle size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 font-light">
                    No subscriptions found matching your query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredSubscriptions.length}</strong> of <strong className="text-[#1C382D] font-bold">{subscriptions.length}</strong> total active subscriptions</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}