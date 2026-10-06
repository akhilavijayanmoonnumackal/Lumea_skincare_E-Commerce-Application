// C:\PROJECTS_MERN\Lumea-skin care-E-commerce Website\client\src\pages\admin\OrdersPage.tsx
import { useState } from 'react';
import { Search, Filter, Download, Eye, MoreHorizontal, CheckCircle2, Clock, Truck, XCircle } from 'lucide-react';

export default function OrdersPage() {
  const [filterTab, setFilterTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const orders = [
    { id: 'ORD-9821', customer: 'Ananya Sharma', email: 'ananya.s@gmail.com', date: 'Oct 6, 2026', total: '₹3,450', items: 2, status: 'Processing', payment: 'Paid' },
    { id: 'ORD-9820', customer: 'Rahul Verma', email: 'rahul.v@yahoo.com', date: 'Oct 5, 2026', total: '₹1,890', items: 1, status: 'Shipped', payment: 'Paid' },
    { id: 'ORD-9819', customer: 'Priya Nair', email: 'priya.nair@outlook.com', date: 'Oct 5, 2026', total: '₹5,200', items: 4, status: 'Delivered', payment: 'Paid' },
    { id: 'ORD-9818', customer: 'Kabir Mehta', email: 'kabir.m@gmail.com', date: 'Oct 4, 2026', total: '₹2,100', items: 2, status: 'Processing', payment: 'Pending' },
    { id: 'ORD-9817', customer: 'Sneha Rao', email: 'sneha.rao@gmail.com', date: 'Oct 4, 2026', total: '₹4,300', items: 3, status: 'Delivered', payment: 'Paid' },
    { id: 'ORD-9816', customer: 'Vikram Malhotra', email: 'vikram.m@gmail.com', date: 'Oct 3, 2026', total: '₹1,250', items: 1, status: 'Cancelled', payment: 'Refunded' },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Delivered':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
            <CheckCircle2 size={13} />
            <span>Delivered</span>
          </span>
        );
      case 'Shipped':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-sky-50 text-sky-700">
            <Truck size={13} />
            <span>Shipped</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
            <Clock size={13} />
            <span>Processing</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
            <XCircle size={13} />
            <span>Cancelled</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesTab = filterTab === 'All' || order.status === filterTab;
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Orders Control Center</h2>
          <p className="text-xs text-gray-500 font-light">Monitor fulfillment, track payments, and review customer order history.</p>
        </div>
        <button className="bg-white hover:bg-gray-50 border border-[#E5E0D8] text-[#1C382D] px-4 py-2.5 rounded-full text-xs font-bold tracking-wider flex items-center space-x-2 transition-colors shadow-2xs self-start sm:self-auto">
          <Download size={15} />
          <span>Export Orders</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${filterTab === tab ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
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
              placeholder="Search order ID or name..."
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>
          <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-[#F7F5F0] flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Filter size={15} />
          </button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Order ID</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Items</th>
                <th className="py-4 px-6">Total Amount</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6 font-bold text-[#1C382D]">{order.id}</td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#1C382D]">{order.customer}</div>
                      <div className="text-[11px] text-gray-400 font-light">{order.email}</div>
                    </td>
                    <td className="py-4 px-6 text-gray-600">{order.date}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{order.items} item(s)</td>
                    <td className="py-4 px-6 font-bold text-[#1C382D]">{order.total}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${order.payment === 'Paid' ? 'bg-emerald-50 text-emerald-700' : order.payment === 'Pending' ? 'bg-amber-50 text-amber-700' : 'bg-gray-100 text-gray-600'}`}>
                        {order.payment}
                      </span>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(order.status)}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-[#1C382D] hover:text-white hover:border-[#1C382D] transition-all">
                          <Eye size={14} />
                        </button>
                        <button className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <MoreHorizontal size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400 font-light">
                    No orders found matching your filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredOrders.length}</strong> of <strong className="text-[#1C382D] font-bold">{orders.length}</strong> total orders</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}