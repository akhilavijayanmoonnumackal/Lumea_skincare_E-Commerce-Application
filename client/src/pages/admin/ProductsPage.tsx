import { useEffect, useState } from 'react';
import { Search, Plus, Filter, Edit3, Trash2, Eye, Star, AlertTriangle, X, Loader2, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import axiosClient from '../../api/axiosClient';
import { getCategories, type Category } from '../../api/categoryApi';

interface CategoryRef {
  _id: string;
  name: string;
  slug?: string;
}

interface Product {
  _id: string;
  slug: string;
  description: string;
  name: string;
  category: string | CategoryRef;
  price: number;
  stockCount: number;
  isFeatured?: boolean;
  rating?: number;
  status: 'Active' | 'Low Stock' | 'Out of Stock';
  imageUrl?: string;
}

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<'add' | 'edit'>('add');
  const [editingId, setEditingId] = useState<string | null>(null);

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    category: '',
    price: '',
    stockCount: 10,
    isFeatured: false
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setIsLoading(true);
        const [prodRes, catRes] = await Promise.all([
          axiosClient.get('/products'),
          getCategories()
        ]);

        if (isMounted) {
          if (prodRes.data.success && Array.isArray(prodRes.data.data)) {
            setProducts(prodRes.data.data);
          }
          if (catRes.success && Array.isArray(catRes.data)) {
            setCategories(catRes.data);
            if (catRes.data.length > 0) {
              setFormData(prev => ({
                ...prev,
                category: prev.category || catRes.data[0]._id
              }));
            }
          }
        }
      } catch (err) {
        console.error('Error loading inventory data:', err);
        if (isMounted) setError('Failed to load product inventory from database.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Open Add Modal
  const handleOpenAdd = () => {
    setModalMode('add');
    setFormData({
      name: '',
      slug: '',
      description: '',
      category: categories.length > 0 ? categories[0]._id : '',
      price: '',
      stockCount: 10,
      isFeatured: false
    });
    setSelectedFile(null);
    setImagePreview('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (product: Product) => {
    setModalMode('edit');
    setEditingId(product._id);

    const categoryId = typeof product.category === 'object' && product.category !== null
      ? product.category._id
      : product.category;

    setFormData({
      name: product.name,
      slug: product.slug || '',
      description: product.description || '',
      category: categoryId || (categories.length > 0 ? categories[0]._id : ''),
      price: product.price.toString(),
      stockCount: product.stockCount ?? 10,
      isFeatured: Boolean(product.isFeatured)
    });
    setSelectedFile(null);
    setImagePreview(product.imageUrl || '');
    setIsModalOpen(true);
  };

  // Open Delete Modal
  const handleOpenDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  // Open View Modal
  const handleOpenViewModal = (product: Product) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  // Confirm Delete
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await axiosClient.delete(`/products/${productToDelete._id}`);
      if (paginatedProducts.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      setProducts(products.filter(p => p._id !== productToDelete._id));
      setIsDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error('Error deleting product:', err);
      alert('Failed to delete product.');
    }
  };

  // Quick Toggle Featured Status
  const handleToggleFeatured = async (product: Product) => {
    try {
      const updatedStatus = !product.isFeatured;
      const response = await axiosClient.patch(`/products/${product._id}`, {
        isFeatured: updatedStatus,
      });
      const updatedProduct = response.data.data || response.data;
      setProducts(products.map(p => (p._id === product._id ? updatedProduct : p)));
    } catch (err) {
      console.error('Error updating featured status:', err);
      alert('Failed to update featured status.');
    }
  };

  // Submit Add/Edit Form
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const generatedSlug = formData.slug.trim() || formData.name.toLowerCase().trim().replace(/\s+/g, '-');

      if (modalMode === 'add') {
        const data = new FormData();
        data.append('name', formData.name);
        data.append('slug', generatedSlug);
        data.append('description', formData.description || 'High-performance skincare formulation.');
        data.append('category', formData.category);
        data.append('price', formData.price);
        data.append('stockCount', formData.stockCount.toString());
        data.append('isFeatured', String(formData.isFeatured));

        if (selectedFile) {
          data.append('imageUrl', selectedFile);
        }

        const response = await axiosClient.post('/products', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        const newProduct = response.data.data || response.data;
        setProducts([newProduct, ...products]);
      } else if (editingId) {
        let response;
        if (selectedFile) {
          const data = new FormData();
          data.append('name', formData.name);
          data.append('slug', generatedSlug);
          data.append('description', formData.description);
          data.append('category', formData.category);
          data.append('price', formData.price);
          data.append('stockCount', formData.stockCount.toString());
          data.append('isFeatured', String(formData.isFeatured));
          data.append('imageUrl', selectedFile);

          response = await axiosClient.patch(`/products/${editingId}`, data, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
        } else {
          const payload = {
            name: formData.name,
            slug: generatedSlug,
            description: formData.description,
            category: formData.category,
            price: Number(formData.price),
            stockCount: Number(formData.stockCount),
            isFeatured: formData.isFeatured,
          };

          response = await axiosClient.patch(`/products/${editingId}`, payload);
        }

        const updatedProduct = response.data.data || response.data;
        setProducts(products.map(p => p._id === editingId ? updatedProduct : p));
      }

      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving product:', err);
      alert('Failed to save product.');
    }
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
          <span>Out of Stock</span>
        </span>
      );
    }
    if (stock < 10) {
      return (
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700">
          <AlertTriangle size={12} />
          <span>Low Stock ({stock})</span>
        </span>
      );
    }
    return (
      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
        <span>In Stock ({stock})</span>
      </span>
    );
  };

  const filteredProducts = products.filter(product => {
    const categoryName = typeof product.category === 'object' && product.category !== null
      ? product.category.name
      : product.category;

    const matchesCategory = selectedCategory === 'All' || categoryName === selectedCategory;

    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (product.slug && product.slug.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          categoryName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Product Inventory Control</h2>
          <p className="text-xs text-gray-500 font-light">Manage catalog items, pricing, inventory counts, and skin care formulations.</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="bg-[#1C382D] hover:bg-[#152a22] text-white px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center space-x-2 transition-colors shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <Plus size={15} />
          <span>Add New Product</span>
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${selectedCategory === 'All' ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => {
                setSelectedCategory(cat.name);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${selectedCategory === cat.name ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search products or slug..."
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>
          <button className="w-9 h-9 rounded-full border border-[#E5E0D8] bg-[#F7F5F0] flex items-center justify-center text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer">
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
                <th className="py-4 px-6">Slug</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Price</th>
                <th className="py-4 px-6">Stock Status</th>
                <th className="py-4 px-6">Rating</th>
                <th className="py-4 px-6">Featured</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1C382D]" />
                    Loading products...
                  </td>
                </tr>
              ) : paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        {product.imageUrl ? (
                          <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded-xl object-cover bg-white p-0.5 border border-[#E5E0D8]" />
                        ) : (
                          <div className="w-10 h-10 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center justify-center text-gray-400">
                            <ImageIcon size={18} />
                          </div>
                        )}
                        <span className="font-bold text-[#1C382D]">{product.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-400 font-mono text-[11px]">{product.slug || '-'}</td>
                    <td className="py-4 px-6 text-gray-600 font-medium">
                      {typeof product.category === 'object' && product.category !== null
                        ? product.category.name
                        : product.category}
                    </td>
                    <td className="py-4 px-6 font-bold text-[#1C382D]">₹{product.price.toLocaleString('en-IN')}</td>
                    <td className="py-4 px-6">{getStockBadge(product.stockCount)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-1 text-amber-700 font-bold">
                        <Star size={13} className="fill-amber-400 text-amber-400" />
                        <span>{product.rating || '5.0'}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(product)}
                        title={product.isFeatured ? 'Remove from Featured' : 'Mark as Featured'}
                        className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold transition-colors cursor-pointer ${
                          product.isFeatured
                            ? 'bg-[#1C382D] text-white'
                            : 'bg-[#F7F5F0] text-gray-500 border border-[#E5E0D8] hover:bg-gray-200'
                        }`}
                      >
                        <Star size={11} className={product.isFeatured ? 'fill-amber-400 text-amber-400' : 'text-gray-400'} />
                        <span>{product.isFeatured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleOpenViewModal(product)}
                          title="View Details"
                          className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-[#1C382D] hover:text-white hover:border-[#1C382D] transition-all cursor-pointer"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(product)}
                          title="Edit Product"
                          className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(product)}
                          title="Delete"
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
                  <td colSpan={8} className="py-12 text-center text-gray-400 font-light">
                    {error || 'No products found matching your search.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer with Pagination */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-light">
          <span>
            Showing{' '}
            <strong className="text-[#1C382D] font-bold">
              {filteredProducts.length === 0 ? 0 : startIndex + 1}
            </strong>
            –
            <strong className="text-[#1C382D] font-bold">
              {Math.min(startIndex + itemsPerPage, filteredProducts.length)}
            </strong>{' '}
            of <strong className="text-[#1C382D] font-bold">{filteredProducts.length}</strong> catalog items
          </span>

          {totalPages > 1 && (
            <div className="flex items-center space-x-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-[#1C382D] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'bg-[#1C382D] text-white shadow-2xs'
                      : 'bg-white border border-[#E5E0D8] text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-[#1C382D] hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-lg w-full p-6 space-y-6 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
              <h3 className="font-serif text-xl text-[#1C382D]">
                {modalMode === 'add' ? 'Add New Formulation' : 'Edit Product Details'}
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
                <label className="text-xs font-bold text-[#1C382D]">Product Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Hyaluronic Hydration Complex"
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C382D]">Description</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter formulation details..."
                  className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="1450"
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.stockCount}
                    onChange={(e) => setFormData({ ...formData, stockCount: Number(e.target.value) })}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#1C382D]">Slug (optional)</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="hyaluronic-hydration-complex"
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  id="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                  className="w-4 h-4 accent-[#1C382D] rounded cursor-pointer"
                />
                <label htmlFor="isFeatured" className="text-xs font-bold text-[#1C382D] cursor-pointer">
                  Feature this product on storefront
                </label>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#1C382D]">Product Image</label>
                <div className="flex items-center space-x-4">
                  {imagePreview && (
                    <img src={imagePreview} alt="Preview" className="w-12 h-12 rounded-xl object-cover border border-[#E5E0D8]" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        setSelectedFile(file);
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                    className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-2xl px-4 py-2 text-xs text-[#1C382D] file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#1C382D] file:text-white hover:file:bg-[#152a22]"
                  />
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
                  {modalMode === 'add' ? 'Save Product' : 'Update Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && productToDelete && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in duration-200 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mx-auto text-rose-600">
              <AlertTriangle size={22} />
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-xl text-[#1C382D]">Delete Product?</h3>
              <p className="text-xs text-gray-500 font-light">
                Are you sure you want to delete <strong className="text-[#1C382D] font-bold">"{productToDelete.name}"</strong>? This action cannot be undone.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setProductToDelete(null);
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

      {/* View Product Details Modal */}
      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-lg w-full p-6 space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
              <div>
                <h3 className="font-serif text-xl text-[#1C382D]">{selectedProduct.name}</h3>
                <p className="text-[11px] font-mono text-gray-400 mt-0.5">/{selectedProduct.slug}</p>
              </div>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="w-8 h-8 rounded-full bg-[#F7F5F0] flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex items-start space-x-4">
              {selectedProduct.imageUrl ? (
                <img
                  src={selectedProduct.imageUrl}
                  alt={selectedProduct.name}
                  className="w-24 h-24 rounded-2xl object-cover border border-[#E5E0D8] shrink-0"
                />
              ) : (
                <div className="w-24 h-24 rounded-2xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center justify-center text-gray-400 shrink-0">
                  <ImageIcon size={24} />
                </div>
              )}

              <div className="space-y-2 text-xs flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-[#F7F5F0] border border-[#E5E0D8] font-bold text-[#1C382D]">
                    {typeof selectedProduct.category === 'object' && selectedProduct.category !== null
                      ? selectedProduct.category.name
                      : selectedProduct.category}
                  </span>
                  {selectedProduct.isFeatured && (
                    <span className="inline-flex items-center space-x-1 px-3 py-1 rounded-full bg-[#1C382D] text-white font-bold">
                      <Star size={11} className="fill-amber-400 text-amber-400" />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="bg-[#F7F5F0] p-2.5 rounded-2xl border border-[#E5E0D8]">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Price</span>
                    <span className="font-bold text-sm text-[#1C382D]">
                      ₹{selectedProduct.price.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="bg-[#F7F5F0] p-2.5 rounded-2xl border border-[#E5E0D8]">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">Stock Count</span>
                    <span className="font-bold text-sm text-[#1C382D]">{selectedProduct.stockCount} units</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Formulation Description</span>
              <p className="text-xs text-gray-600 leading-relaxed bg-[#F7F5F0] p-4 rounded-2xl border border-[#E5E0D8]">
                {selectedProduct.description || 'No description provided.'}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3 border-t border-[#E5E0D8]">
              <button
                type="button"
                onClick={() => {
                  const product = selectedProduct;
                  setIsViewModalOpen(false);
                  setSelectedProduct(null);
                  handleOpenEdit(product);
                }}
                className="px-5 py-2.5 rounded-full border border-[#E5E0D8] bg-white text-xs font-bold text-[#1C382D] hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Edit Product
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedProduct(null);
                }}
                className="px-6 py-2.5 rounded-full bg-[#1C382D] hover:bg-[#152a22] text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}