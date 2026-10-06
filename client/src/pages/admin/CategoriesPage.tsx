import { useState } from 'react';
import { Search, Plus, Edit3, Trash2, Layers, Package } from 'lucide-react';

import serumImg from '../../assets/images/serums&oils.avif';
import moisturizerImg from '../../assets/images/moisturisers.avif';
import sunscreenImg from '../../assets/images/suncare.avif';
import cleanserImg from '../../assets/images/cleansers.avif';
import exfoliatorImg from '../../assets/images/rose.avif';
import tonerImg from '../../assets/images/barrier.avif';

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { 
      id: 'CAT-01', 
      name: 'Serums & Oils', 
      slug: 'serums-oils', 
      productCount: 14, 
      description: 'Potent active formulations targeted at brightening, hydration, and barrier repair.', 
      status: 'Active',
      img: serumImg 
    },
    { 
      id: 'CAT-02', 
      name: 'Moisturisers', 
      slug: 'moisturisers', 
      productCount: 10, 
      description: 'Deeply nourishing creams and gel emulsions to lock in essential moisture.', 
      status: 'Active',
      img: moisturizerImg 
    },
    { 
      id: 'CAT-03', 
      name: 'Sun Care', 
      slug: 'sun-care', 
      productCount: 6, 
      description: 'Broad-spectrum mineral and chemical UV protection for everyday skin defense.', 
      status: 'Active',
      img: sunscreenImg 
    },
    { 
      id: 'CAT-04', 
      name: 'Cleansers', 
      slug: 'cleansers', 
      productCount: 8, 
      description: 'Gentle foaming, gel, and cream cleansers that purify without stripping natural oils.', 
      status: 'Active',
      img: cleanserImg 
    },
    { 
      id: 'CAT-05', 
      name: 'Exfoliators', 
      slug: 'exfoliators', 
      productCount: 5, 
      description: 'Chemical and gentle physical polishes to slough away dead cells and refine texture.', 
      status: 'Active',
      img: exfoliatorImg 
    },
    { 
      id: 'CAT-06', 
      name: 'Toners', 
      slug: 'toners', 
      productCount: 7, 
      description: 'Balancing botanical mists and clarifying essences to prep skin for serums.', 
      status: 'Active',
      img: tonerImg 
    },
  ];

  const filteredCategories = categories.filter(category => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           category.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
           category.description.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Category Management</h2>
          <p className="text-xs text-gray-500 font-light">Organize product collections, edit collection paths, and manage catalog groups.</p>
        </div>
        <button className="bg-[#1C382D] hover:bg-[#152a22] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm self-start sm:self-auto">
          <Plus size={15} />
          <span>Add New Category</span>
        </button>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Total Active Collections</span>
            <Layers size={16} className="text-[#2D6A4F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">{categories.length}</div>
          <span className="text-[11px] text-emerald-700 font-medium">All categories currently displayed on shop frontend</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Total Catalog Products</span>
            <Package size={16} className="text-[#C58359]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">
            {categories.reduce((acc, curr) => acc + curr.productCount, 0)}
          </div>
          <span className="text-[11px] text-[#C58359] font-medium">Distributed across all active categories</span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex items-center justify-between gap-4">
        <div className="text-xs text-gray-500 font-medium px-2">
          <span>Catalog Structure</span>
        </div>
        <div className="relative flex-1 sm:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories..."
            className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
          />
        </div>
      </div>

      {/* Categories Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Category Name</th>
                <th className="py-4 px-6">URL Slug</th>
                <th className="py-4 px-6">Description</th>
                <th className="py-4 px-6">Products</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, idx) => (
                  <tr key={idx} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <img src={category.img} alt={category.name} className="w-10 h-10 rounded-xl object-cover bg-white p-0.5 border border-[#E5E0D8]" />
                        <span className="font-bold text-[#1C382D]">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-[11px]">/{category.slug}</td>
                    <td className="py-4 px-6 text-gray-600 max-w-xs truncate font-light" title={category.description}>
                      {category.description}
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F7F5F0] text-[#1C382D] border border-[#E5E0D8]">
                        {category.productCount} items
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
                        {category.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button title="Edit Category" className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors">
                          <Edit3 size={14} />
                        </button>
                        <button title="Delete Category" className="w-8 h-8 rounded-full border border-rose-100 bg-white flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-light">
                    No categories found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredCategories.length}</strong> of <strong className="text-[#1C382D] font-bold">{categories.length}</strong> categories</span>
          <div className="flex items-center space-x-2">
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
            <button className="px-3 py-1.5 rounded-lg border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-50">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}