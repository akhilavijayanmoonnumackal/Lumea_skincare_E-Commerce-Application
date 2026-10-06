// C:\PROJECTS_MERN\Lumea-skin care-E-commerce Website\client\src\pages\admin\ProductsPage.tsx
import { useState } from 'react';
import { Search, Plus, Filter, Edit3, Trash2, Eye, Star, MoreHorizontal, AlertTriangle } from 'lucide-react';

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products = [
    { 
      id: 'SKU-2001', 
      name: 'Vitamin C Glow Serum', 
      category: 'Serums & Oils', 
      price: '₹1,450', 
      stock: 42, 
      status: 'Active', 
      rating: 4.8, 
      img: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=100&auto=format&fit=crop&q=80' 
    },
    { 
      id: 'SKU-2002', 
      name: 'Barrier Repair Cream', 
      category: 'Moisturisers', 
      price: '₹1,850', 
      stock: 14, 
      status: 'Active', 
      rating: 4.9, 
      img: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=100&auto=format&fit=crop&q=80' 
    },
    { 
      id: 'SKU-2003', 
      name: 'Mineral Daily SPF 50', 
      category: 'Sun Care', 
      price: '₹1,200', 
      stock: 6, 
      status: 'Low Stock', 
      rating: 4.7, 
      img: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&auto=format&fit=crop&q=80' 
    },
    { 
      id: 'SKU-2004', 
      name: 'Hydrating Gel Cleanser', 
      category: 'Cleansers', 
      price: '₹950', 
      stock: 58, 
      status: 'Active', 
      rating: 4.6, 
      img: 'https://images.unsplash.com/photo-1556228726-952b655928d3?w=100&auto=format&fit=crop&q=80' 
    },
    { 
      id: 'SKU-2005', 
      name: 'Rose Exfoliating Polish', 
      category: 'Exfoliators', 
      price: '₹1,350', 
      stock: 9, 
      status: 'Low Stock', 
      rating: 4.5, 
      img: 'https://images.unsplash.com/photo-1608248597359-994b59367e23?w=100&auto=format&fit=crop&q=80' 
    },
    { 
      id: 'SKU-2006', 
      name: 'Niacinamide Pore Refining Toner', 
      category: 'Toners', 
      price: '₹1,100', 
      stock: 0, 
      status: 'Out of Stock', 
      rating: 4.4, 
      img: 'https://images.unsplash.com/photo-1608248597389-7389a69ef8b2?w=100&auto=format&fit=crop&q=80' 
    },
  ];

  const getStockBadge = (status: string, stock: number) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
            <span>In Stock ({stock})</span>
          </span>
        );
      case 'Low Stock':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
            <AlertTriangle size={12} />
            <span>Low Stock ({stock})</span>
          </span>
        );
      case 'Out of Stock':
        return (
          <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
            <span>Out of Stock</span>
          </span>
        );
      default:
        return null;
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Product Inventory Control</h2>
          <p className="text-xs text-gray-500 font-light">Manage catalog items, pricing, inventory counts, and skin care formulations.</p>
        </div>
        <button className="bg-[#1C382D] hover:bg-[#152a22] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm self-start sm:self-auto">
          <Plus size={15} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          {['All', 'Serums & Oils', 'Moisturisers', 'Sun Care', 'Cleansers', 'Exfoliators'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${selectedCategory === cat ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {cat}
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
              placeholder="Search products or SKU..."
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>
          <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-[#F7F5F0] flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors">
            <Filter size={15} />
          </button>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Product Item</th>
                <th className="py-4 px-6">SKU ID</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock Status</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={product.img} alt={product.name} className="w-10 h-10 rounded-xl object-cover bg-white p-0.5 border border-[#E5E0D8]" />
                        <span className="font-bold text-[#1C382D]">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-[11px]">{product.id}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">{product.category}</td>
                    <td className="py-4 px-6 font-bold text-[#1C382D]">{product.price}</td>
                    <td className="py-4 px-6">{getStockBadge(product.status, product.stock)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1 text-amber-700 font-bold">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        <span>{product.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="View Details" className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-[#1C382D] hover:text-white hover:border-[#1C382D] transition-all">
                          <Eye size={14} />
                        </button>
                        <button title="Edit Product" className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <Edit3 size={14} />
                        </button>
                        <button title="Delete" className="w-8 h-8 rounded-full border border-rose-100 bg-white flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400 font-light">
                    No products found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredProducts.length}</strong> of <strong className="text-[#1C382D] font-bold">{products.length}</strong> catalog items</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}