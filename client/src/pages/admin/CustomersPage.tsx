import { useState } from 'react';
import { Search, Mail, Eye, Trash2, Award, UserCheck, ShoppingBag } from 'lucide-react';

export default function AdminCustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState('All');

  const customers = [
    { 
      id: 'CUST-101', 
      name: 'Ananya Sharma', 
      email: 'ananya.s@gmail.com', 
      phone: '+91 98765 43210', 
      orders: 8, 
      totalSpent: '₹28,400', 
      tier: 'Glow VIP', 
      joined: 'Jan 14, 2026',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'CUST-102', 
      name: 'Rahul Verma', 
      email: 'rahul.v@yahoo.com', 
      phone: '+91 91234 56789', 
      orders: 3, 
      totalSpent: '₹7,250', 
      tier: 'Regular', 
      joined: 'Feb 20, 2026',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'CUST-103', 
      name: 'Priya Nair', 
      email: 'priya.nair@outlook.com', 
      phone: '+91 99887 76655', 
      orders: 12, 
      totalSpent: '₹45,900', 
      tier: 'Glow VIP', 
      joined: 'Nov 05, 2025',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'CUST-104', 
      name: 'Kabir Mehta', 
      email: 'kabir.m@gmail.com', 
      phone: '+91 98111 22334', 
      orders: 2, 
      totalSpent: '₹3,800', 
      tier: 'Regular', 
      joined: 'Mar 12, 2026',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80'
    },
    { 
      id: 'CUST-105', 
      name: 'Sneha Rao', 
      email: 'sneha.rao@gmail.com', 
      phone: '+91 97444 55667', 
      orders: 6, 
      totalSpent: '₹19,200', 
      tier: 'Glow VIP', 
      joined: 'Dec 19, 2025',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80'
    },
  ];

  const getTierBadge = (tier: string) => {
    if (tier === 'Glow VIP') {
      return (
        <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#C58359]/10 text-[#C58359]">
          <Award size={12} />
          <span>Glow VIP</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-gray-100 text-gray-600">
        <span>Regular</span>
      </span>
    );
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesTier = tierFilter === 'All' || customer.tier === tierFilter;
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          customer.phone.includes(searchQuery);
    return matchesTier && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Customer Directory</h2>
          <p className="text-xs text-gray-500 font-light">View customer profiles, lifetime order history, loyalty tiers, and contact data.</p>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Total Registered Users</span>
            <UserCheck size={16} className="text-[#2D6A4F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">2,845</div>
          <span className="text-[11px] text-emerald-700 font-medium">+18% new signups this month</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Glow VIP Members</span>
            <Award size={16} className="text-[#C58359]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">642</div>
          <span className="text-[11px] text-[#C58359] font-medium">High lifetime customer value</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Avg. Customer Spend</span>
            <ShoppingBag size={16} className="text-[#8FA89B]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">₹12,450</div>
          <span className="text-[11px] text-emerald-700 font-medium">Based on completed purchases</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1">
          {['All', 'Glow VIP', 'Regular'].map((tier) => (
            <button
              key={tier}
              onClick={() => setTierFilter(tier)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${tierFilter === tier ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tier}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, email or phone..."
            className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
          />
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Customer Profile</th>
                <th className="py-4 px-6">Contact Phone</th>
                <th className="py-4 px-6">Total Orders</th>
                <th className="py-4 px-6">Lifetime Spend</th>
                <th className="py-4 px-6">Loyalty Tier</th>
                <th className="py-4 px-6">Joined Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={customer.avatar} alt={customer.name} className="w-10 h-10 rounded-full object-cover border border-[#E5E0D8]" />
                        <div>
                          <div className="font-bold text-[#1C382D]">{customer.name}</div>
                          <div className="text-[11px] text-gray-400 font-light">{customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{customer.phone}</td>
                    <td className="py-4 px-6 font-bold text-[#1C382D]">{customer.orders} orders</td>
                    <td className="py-4 px-6 font-bold text-[#1C382D]">{customer.totalSpent}</td>
                    <td className="py-4 px-6">{getTierBadge(customer.tier)}</td>
                    <td className="py-4 px-6 text-gray-500">{customer.joined}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="Send Email" className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <Mail size={14} />
                        </button>
                        <button title="View Profile" className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-[#1C382D] hover:text-white hover:border-[#1C382D] transition-all">
                          <Eye size={14} />
                        </button>
                        <button title="Delete Customer" className="w-8 h-8 rounded-full border border-rose-100 bg-white flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-light">
                    No customers found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredCustomers.length}</strong> of <strong className="text-[#1C382D] font-bold">{customers.length}</strong> registered users</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}