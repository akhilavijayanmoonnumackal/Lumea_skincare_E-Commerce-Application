import { useState } from 'react';
import { Search, PackageCheck, AlertTriangle, AlertCircle, Plus, Minus, SlidersHorizontal, RefreshCw } from 'lucide-react';

import serumImg from '../../assets/images/serums&oils.avif';
import moisturizerImg from '../../assets/images/moisturisers.avif';
import sunscreenImg from '../../assets/images/suncare.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import exfoliatorImg from '../../assets/images/rose.avif';
import tonerImg from '../../assets/images/barrier.avif';

export default function AdminInventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const inventoryItems = [
    {
      id: 'INV-001',
      productName: 'Vitamin C Glow Serum (30ml)',
      sku: 'LUM-SER-001',
      category: 'Serums & Oils',
      stock: 142,
      minThreshold: 20,
      supplier: 'Aura Botanicals Lab',
      status: 'In Stock',
      lastRestocked: 'Sep 28, 2026',
      img: serumImg
    },
    {
      id: 'INV-002',
      productName: 'Barrier Repair Cream (50ml)',
      sku: 'LUM-MOI-002',
      category: 'Moisturisers',
      stock: 18,
      minThreshold: 25,
      supplier: 'DermaPure Formulations',
      status: 'Low Stock',
      lastRestocked: 'Sep 15, 2026',
      img: moisturizerImg
    },
    {
      id: 'INV-003',
      productName: 'Mineral Daily SPF 50 (50ml)',
      sku: 'LUM-SUN-003',
      category: 'Sun Care',
      stock: 94,
      minThreshold: 30,
      supplier: 'SolGuard Labs',
      status: 'In Stock',
      lastRestocked: 'Oct 01, 2026',
      img: sunscreenImg
    },
    {
      id: 'INV-004',
      productName: 'Hydrating Gel Cleanser (150ml)',
      sku: 'LUM-CLN-004',
      category: 'Cleansers',
      stock: 0,
      minThreshold: 15,
      supplier: 'PureFlora Organics',
      status: 'Out of Stock',
      lastRestocked: 'Aug 20, 2026',
      img: cleanserImg
    },
    {
      id: 'INV-005',
      productName: 'Rose Exfoliating Polish (100g)',
      sku: 'LUM-EXF-005',
      category: 'Exfoliators',
      stock: 65,
      minThreshold: 20,
      supplier: 'Botanical Essence Co.',
      status: 'In Stock',
      lastRestocked: 'Sep 10, 2026',
      img: exfoliatorImg
    },
    {
      id: 'INV-006',
      productName: 'Balancing Botanical Toner (200ml)',
      sku: 'LUM-TON-006',
      category: 'Toners',
      stock: 12,
      minThreshold: 20,
      supplier: 'Aura Botanicals Lab',
      status: 'Low Stock',
      lastRestocked: 'Sep 02, 2026',
      img: tonerImg
    }
  ];

  const getStockBadge = (status: string) => {
    switch (status) {
      case 'In Stock':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]"></span>
            <span>In Stock</span>
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
            <span>Low Stock</span>
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
            <span>Out of Stock</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredItems = inventoryItems.filter(item => {
    const matchesTab = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch = item.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Inventory & Stock Control</h2>
          <p className="text-xs text-gray-500 font-light">Monitor warehouse stock counts, track threshold alerts, and manage product replenishment.</p>
        </div>
        <button className="bg-[#1C382D] hover:bg-[#152a22] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm self-start sm:self-auto">
          <RefreshCw size={15} />
          <span>Restock Report</span>
        </button>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Total Catalog Stock</span>
            <PackageCheck size={16} className="text-[#2D6A4F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">331 Units</div>
          <span className="text-[11px] text-emerald-700 font-medium">Across all active items</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Low Stock Alerts</span>
            <AlertTriangle size={16} className="text-amber-600" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">2 Items</div>
          <span className="text-[11px] text-amber-700 font-medium">Below safety threshold</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Out of Stock</span>
            <AlertCircle size={16} className="text-rose-600" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">1 Item</div>
          <span className="text-[11px] text-rose-700 font-medium">Immediate restock required</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          {['All', 'In Stock', 'Low Stock', 'Out of Stock'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${filterStatus === tab ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:w-72">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search product, SKU, or supplier..."
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>
          <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-[#F7F5F0] flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <SlidersHorizontal size={15} />
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Product & SKU</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Supplier</th>
                <th className="py-4 px-6">Stock Level</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Quick Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {filteredItems.length > 0 ? (
                filteredItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={item.img} alt={item.productName} className="w-10 h-10 rounded-xl object-cover bg-white p-0.5 border border-[#E5E0D8]" />
                        <div>
                          <div className="font-bold text-[#1C382D]">{item.productName}</div>
                          <div className="text-[11px] text-gray-400 font-mono">{item.sku}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{item.category}</td>
                    <td className="py-4 px-6 text-gray-500 font-light">{item.supplier}</td>
                    <td className="py-4 px-6">
                      <div className="space-y-0.5">
                        <span className={`font-bold ${item.stock === 0 ? 'text-rose-600' : item.stock <= item.minThreshold ? 'text-amber-600' : 'text-[#1C382D]'}`}>
                          {item.stock} units
                        </span>
                        <div className="text-[10px] text-gray-400">Min threshold: {item.minThreshold}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {getStockBadge(item.status)}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="Decrease Stock" className="w-7 h-7 rounded-lg border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <Minus size={13} />
                        </button>
                        <button title="Increase Stock" className="w-7 h-7 rounded-lg border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <Plus size={13} />
                        </button>
                        <button className="px-3 py-1.5 rounded-full border border-[#1C382D] text-[#1C382D] hover:bg-[#1C382D] hover:text-white text-[11px] font-bold transition-colors ml-2">
                          Restock
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-light">
                    No inventory items found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredItems.length}</strong> of <strong className="text-[#1C382D] font-bold">{inventoryItems.length}</strong> items</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}