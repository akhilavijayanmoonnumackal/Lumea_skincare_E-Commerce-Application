import { useEffect, useState } from 'react';
import { Search, Plus, Edit3, Trash2, Layers, Package, X, AlertTriangle, Loader2 } from 'lucide-react';
import type { Category } from '../../api/categoryApi';
import { getCategories } from '../../api/categoryApi';
import axiosClient from '../../api/axiosClient';

export default function AdminCategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getCategories();
      if (res.success && Array.isArray(res.data)) {
        setCategories(res.data);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories from database');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const res = await getCategories();
        if (isMounted && res.success && Array.isArray(res.data)) {
          setCategories(res.data);
        }
      } catch (err) {
        console.error('Error fetching categories:', err);
        if (isMounted) setError('Failed to load categories from database');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode('add');
    setFormData({ name: '', slug: '', status: 'Active' });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (category: Category) => {
    setModalMode('edit');
    setEditingId(category._id);
    setFormData({
      name: category.name,
      slug: category.slug,
      status: category.status,
    });
    setIsModalOpen(true);
  };

  const handleOpenDeleteModal = (category: Category) => {
    setCategoryToDelete(category);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await axiosClient.delete(`/categories/${categoryToDelete._id}`);
      setCategories(categories.filter(c => c._id !== categoryToDelete._id));
      setIsModalOpen(false);
      setCategoryToDelete(null);
    } catch (err) {
      console.error('Error deleting category:', err);
      alert('Failed to delete category');
    }
  };

  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const generatedSlug = formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
      const payload = { ...formData, slug: generatedSlug };

      if (modalMode === 'add') {
        const response = await axiosClient.post('/categories', payload);
        const newCat = response.data.data || response.data;
        setCategories([newCat, ...categories]);
      } else if (editingId) {
        const response = await axiosClient.patch(`/categories/${editingId}`, payload);
        const updatedCat = response.data.data || response.data;
        setCategories(categories.map(c => c._id === editingId ? updatedCat : c));
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (err) {
      console.error('Error saving category:', err);
      alert('Failed to save category.');
    }
  };

  const filteredCategories = categories.filter(category => {
    return category.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
           category.slug.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Category Management</h2>
          <p className="text-xs text-gray-500 font-light">Organize product collections, edit collection paths, and manage catalog groups.</p>
        </div>
        <button 
          onClick={handleOpenAdd}
          className="bg-[#1C382D] hover:bg-[#152a22] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
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
          <span className="text-[11px] text-emerald-700 font-medium">Active catalog categories</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Total Catalog Products</span>
            <Package size={16} className="text-[#C58359]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">
            {categories.reduce((acc, curr) => acc + curr.productCount, 0)}
          </div>
          <span className="text-[11px] text-[#C58359] font-medium">Distributed across created categories</span>
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
                <th className="py-4 px-6">Products</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1C382D]" />
                    Loading categories...
                  </td>
                </tr>
              ) : filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <tr key={category._id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-[#1C382D]">{category.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-[11px]">/{category.slug}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#F7F5F0] text-[#1C382D] border border-[#E5E0D8]">
                        {category.productCount} items
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold ${category.status === 'Active' ? 'bg-[#EAF3EA] text-[#2D6A4F]' : 'bg-gray-100 text-gray-600'}`}>
                        {category.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button 
                          onClick={() => handleOpenEdit(category)}
                          title="Edit Category" 
                          className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button 
                          onClick={() => handleOpenDeleteModal(category)}
                          title="Delete Category" 
                          className="w-8 h-8 rounded-full border border-rose-100 bg-white flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="py-12 text-center text-gray-400 font-light">
                   {error || 'No categories found in the database.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredCategories.length}</strong> of <strong className="text-[#1C382D] font-bold">{categories.length}</strong> categories</span>
        </div>
      </div>

      {/* Add / Edit Category Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-lg w-full p-6 space-y-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
              <h3 className="font-serif text-xl text-[#1C382D]">
                {modalMode === 'add' ? 'Add New Category' : 'Edit Category Details'}
              </h3>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#F7F5F0] flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmitForm} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C382D]">Category Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Eye Creams & Treatments"
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">URL Slug (optional)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="eye-creams"
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end space-x-3 border-t border-[#E5E0D8]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-[#E5E0D8] bg-white text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full bg-[#1C382D] hover:bg-[#152a22] text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
                >
                  {modalMode === 'add' ? 'Save Category' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && categoryToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600">
              <AlertTriangle size={22} />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-xl text-[#1C382D]">Delete Category?</h3>
              <p className="text-xs text-gray-500 font-light">
                Are you sure you want to delete <strong className="text-[#1C382D] font-bold">"{categoryToDelete.name}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setCategoryToDelete(null);
                }}
                className="px-5 py-2.5 rounded-full border border-[#E5E0D8] bg-white text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}