import { useEffect, useState } from 'react';
import {
  Search,
  Eye,
  ShieldCheck,
  ShieldBan,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Calendar,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  UserCheck,
  UserX,
} from 'lucide-react';
import { 
  getAllCustomers, 
  getCustomerDetails, 
  updateCustomerStatus, 
  type Customer,
  type CustomerDetailsPayload,
} from '../../api/adminUserApi';
import type { Order } from '../../api/orderApi';

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Blocked'>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState<CustomerDetailsPayload | null>(null);

  const [statusTarget, setStatusTarget] = useState<Customer | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadCustomers = async () => {
      try {
        setIsLoading(true);
        const res = await getAllCustomers();
        if (isMounted && res.success && Array.isArray(res.data)) {
          setCustomers(res.data);
        }
      } catch (err) {
        console.error('Error loading customers:', err);
        if (isMounted) setError('Failed to load customer accounts from database.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadCustomers();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleViewCustomer = async (customer: Customer) => {
    setIsDetailsOpen(true);
    setIsLoadingDetails(true);
    setSelectedDetails({
      customer,
      orderCount: 0,
      orders: [],
    });

    try {
      const res = await getCustomerDetails(customer._id);
      if (res.success && res.data) {
        setSelectedDetails(res.data);
      }
    } catch (err) {
      console.error('Error fetching customer details:', err);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleConfirmStatusChange = async () => {
    if (!statusTarget) return;
    const nextStatus = !statusTarget.isActive;

    try {
      setIsUpdatingStatus(true);
      const res = await updateCustomerStatus(statusTarget._id, nextStatus);

      const updatedCustomer: Customer = res.data || {
        ...statusTarget,
        isActive: nextStatus,
      };

      setCustomers((prev) =>
        prev.map((c) => (c._id === statusTarget._id ? updatedCustomer : c))
      );

      if (selectedDetails && selectedDetails.customer._id === statusTarget._id) {
        setSelectedDetails({
          ...selectedDetails,
          customer: updatedCustomer,
        });
      }

      setStatusTarget(null);
    } catch (err) {
      console.error('Error updating customer status:', err);
      alert('Failed to update customer status.');
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const getPrimaryPhone = (customer: Customer): string => {
    if (!customer.addresses || customer.addresses.length === 0) return '—';
    const defaultAddr = customer.addresses.find((a) => a.isDefault);
    return (defaultAddr || customer.addresses[0]).phone || '—';
  };

  const getPrimaryCity = (customer: Customer): string => {
    if (!customer.addresses || customer.addresses.length === 0) return 'No address saved';
    const defaultAddr = customer.addresses.find((a) => a.isDefault);
    const chosen = defaultAddr || customer.addresses[0];
    return `${chosen.city}, ${chosen.country}`;
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getTotalOrderItems = (order: Order): number => {
    return order.orderItems.reduce((sum, item) => {
      const qty =
        typeof (item as unknown as { quantity?: number }).quantity === 'number'
          ? (item as unknown as { quantity: number }).quantity
          : item.product?.quantity ?? 1;
      return sum + qty;
    }, 0);
  };

  const getOrderStatusBadge = (status: Order['orderStatus']) => {
    const styles: Record<Order['orderStatus'], string> = {
      Pending: 'bg-amber-50 text-amber-700',
      Processing: 'bg-blue-50 text-blue-700',
      Shipped: 'bg-indigo-50 text-indigo-700',
      Delivered: 'bg-[#EAF3EA] text-[#2D6A4F]',
      Cancelled: 'bg-rose-50 text-rose-700',
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && customer.isActive) ||
      (statusFilter === 'Blocked' && !customer.isActive);

    const query = searchQuery.toLowerCase();
    const phone = getPrimaryPhone(customer).toLowerCase();
    const matchesSearch =
      customer.name.toLowerCase().includes(query) ||
      customer.email.toLowerCase().includes(query) ||
      phone.includes(query);

    return matchesStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCustomers = filteredCustomers.slice(startIndex, startIndex + itemsPerPage);

  const activeCount = customers.filter((c) => c.isActive).length;
  const blockedCount = customers.filter((c) => !c.isActive).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Customer Directory & Access</h2>
          <p className="text-xs text-gray-500 font-light">
            Inspect registered skincare clients, saved shipping addresses, order history, and account status.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs">
          <div className="px-3.5 py-2 rounded-full bg-white border border-[#E5E0D8] flex items-center space-x-1.5">
            <UserCheck size={14} className="text-[#2D6A4F]" />
            <span className="text-gray-500">Active:</span>
            <strong className="text-[#1C382D]">{activeCount}</strong>
          </div>
          <div className="px-3.5 py-2 rounded-full bg-white border border-[#E5E0D8] flex items-center space-x-1.5">
            <UserX size={14} className="text-rose-600" />
            <span className="text-gray-500">Blocked:</span>
            <strong className="text-rose-700">{blockedCount}</strong>
          </div>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 md:pb-0">
          {(['All', 'Active', 'Blocked'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setStatusFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#1C382D] text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="relative flex-1 sm:max-w-xs">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search name, email, or phone..."
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
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Contact</th>
                <th className="py-4 px-6">Location</th>
                <th className="py-4 px-6">Joined</th>
                <th className="py-4 px-6">Account Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1C382D]" />
                    Loading customers...
                  </td>
                </tr>
              ) : paginatedCustomers.length > 0 ? (
                paginatedCustomers.map((customer) => (
                  <tr key={customer._id} className="hover:bg-[#FAFAFA] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-full bg-[#EAF3EA] border border-[#E5E0D8] flex items-center justify-center font-serif font-bold text-[#1C382D] shrink-0">
                          {customer.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-bold text-[#1C382D] block">{customer.name}</span>
                          <span className="text-[11px] text-gray-400">{customer.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-600 font-mono text-[11px]">
                      {getPrimaryPhone(customer)}
                    </td>
                    <td className="py-4 px-6 text-gray-600">{getPrimaryCity(customer)}</td>
                    <td className="py-4 px-6 text-gray-500">{formatDate(customer.createdAt)}</td>
                    <td className="py-4 px-6">
                      {customer.isActive ? (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-[#EAF3EA] text-[#2D6A4F]">
                          <ShieldCheck size={12} />
                          <span>Active</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700">
                          <ShieldBan size={12} />
                          <span>Blocked</span>
                        </span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleViewCustomer(customer)}
                          title="View Profile & Orders"
                          className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-[#1C382D] hover:text-white hover:border-[#1C382D] transition-all cursor-pointer"
                        >
                          <Eye size={14} />
                        </button>
                        <button
                          onClick={() => setStatusTarget(customer)}
                          title={customer.isActive ? 'Block Customer' : 'Activate Customer'}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                            customer.isActive
                              ? 'border-rose-200 bg-rose-50/60 text-rose-700 hover:bg-rose-100'
                              : 'border-[#2D6A4F]/30 bg-[#EAF3EA] text-[#2D6A4F] hover:bg-[#dcebdd]'
                          }`}
                        >
                          {customer.isActive ? 'Block' : 'Activate'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-light">
                    {error || 'No customers found matching your filters.'}
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
              {filteredCustomers.length === 0 ? 0 : startIndex + 1}
            </strong>
            –
            <strong className="text-[#1C382D] font-bold">
              {Math.min(startIndex + itemsPerPage, filteredCustomers.length)}
            </strong>{' '}
            of <strong className="text-[#1C382D] font-bold">{filteredCustomers.length}</strong> customers
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

      {/* Block / Activate Confirmation Modal */}
      {statusTarget && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-md w-full p-6 space-y-5 animate-in fade-in zoom-in duration-200 text-center">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto border ${
                statusTarget.isActive
                  ? 'bg-rose-50 border-rose-100 text-rose-600'
                  : 'bg-[#EAF3EA] border-[#2D6A4F]/20 text-[#2D6A4F]'
              }`}
            >
              {statusTarget.isActive ? <ShieldBan size={22} /> : <ShieldCheck size={22} />}
            </div>

            <div className="space-y-1.5">
              <h3 className="font-serif text-xl text-[#1C382D]">
                {statusTarget.isActive ? 'Block Customer Account?' : 'Activate Customer Account?'}
              </h3>
              <p className="text-xs text-gray-500 font-light">
                {statusTarget.isActive ? (
                  <>
                    Are you sure you want to block{' '}
                    <strong className="text-[#1C382D] font-bold">{statusTarget.name}</strong>? They will be prevented from signing in or placing new orders.
                  </>
                ) : (
                  <>
                    Restore account access for{' '}
                    <strong className="text-[#1C382D] font-bold">{statusTarget.name}</strong>?
                  </>
                )}
              </p>
            </div>

            <div className="pt-2 flex items-center justify-center space-x-3">
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={() => setStatusTarget(null)}
                className="px-5 py-2.5 rounded-full border border-[#E5E0D8] bg-white text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isUpdatingStatus}
                onClick={handleConfirmStatusChange}
                className={`px-6 py-2.5 rounded-full text-xs font-bold text-white shadow-sm transition-colors cursor-pointer ${
                  statusTarget.isActive
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-[#1C382D] hover:bg-[#152a22]'
                }`}
              >
                {isUpdatingStatus
                  ? 'Updating...'
                  : statusTarget.isActive
                  ? 'Yes, Block'
                  : 'Yes, Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Customer Details & Order History Modal */}
      {isDetailsOpen && selectedDetails && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-[#E5E0D8] pb-4">
              <div className="flex items-center space-x-3">
                <div className="w-11 h-11 rounded-full bg-[#EAF3EA] border border-[#E5E0D8] flex items-center justify-center font-serif text-lg font-bold text-[#1C382D]">
                  {selectedDetails.customer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-serif text-xl text-[#1C382D]">
                      {selectedDetails.customer.name}
                    </h3>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        selectedDetails.customer.isActive
                          ? 'bg-[#EAF3EA] text-[#2D6A4F]'
                          : 'bg-rose-50 text-rose-700'
                      }`}
                    >
                      {selectedDetails.customer.isActive ? 'Active' : 'Blocked'}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 flex items-center space-x-3 mt-0.5">
                    <span className="inline-flex items-center space-x-1">
                      <Mail size={12} />
                      <span>{selectedDetails.customer.email}</span>
                    </span>
                    <span className="inline-flex items-center space-x-1">
                      <Calendar size={12} />
                      <span>Joined {formatDate(selectedDetails.customer.createdAt)}</span>
                    </span>
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsDetailsOpen(false);
                  setSelectedDetails(null);
                }}
                className="w-8 h-8 rounded-full bg-[#F7F5F0] flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {isLoadingDetails ? (
              <div className="py-12 text-center text-xs text-gray-400">
                <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1C382D]" />
                Fetching customer profile & order history...
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E5E0D8]">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                      Total Orders
                    </span>
                    <span className="font-bold text-base text-[#1C382D]">
                      {selectedDetails.orderCount}
                    </span>
                  </div>
                  <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E5E0D8]">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                      Lifetime Spend
                    </span>
                    <span className="font-bold text-base text-[#1C382D]">
                      ₹
                      {selectedDetails.orders
                        .filter((o) => o.orderStatus !== 'Cancelled')
                        .reduce((sum, o) => sum + o.totalPrice, 0)
                        .toLocaleString('en-IN')}
                    </span>
                  </div>
                  <div className="bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E5E0D8]">
                    <span className="text-[10px] uppercase tracking-wider text-gray-400 block">
                      Saved Addresses
                    </span>
                    <span className="font-bold text-base text-[#1C382D]">
                      {selectedDetails.customer.addresses?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Saved Addresses */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                    <MapPin size={13} />
                    <span>Saved Shipping Addresses</span>
                  </h4>
                  {selectedDetails.customer.addresses &&
                  selectedDetails.customer.addresses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedDetails.customer.addresses.map((addr, idx) => (
                        <div
                          key={addr._id || idx}
                          className="p-3 rounded-2xl bg-[#F7F5F0] border border-[#E5E0D8] text-xs space-y-1"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[#1C382D]">
                              {addr.city}, {addr.country}
                            </span>
                            {(addr.isDefault) && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EAF3EA] text-[#2D6A4F]">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-gray-600 font-light">
                            {addr.address} — {addr.postalCode}
                          </p>
                          <p className="text-gray-500 font-mono text-[11px] flex items-center space-x-1">
                            <Phone size={11} />
                            <span>{addr.phone}</span>
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 font-light bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E5E0D8]">
                      No saved shipping addresses on file.
                    </p>
                  )}
                </div>

                {/* Order History */}
                <div className="space-y-2">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1.5">
                    <ShoppingBag size={13} />
                    <span>Order History ({selectedDetails.orderCount})</span>
                  </h4>
                  {selectedDetails.orders.length > 0 ? (
                    <div className="border border-[#E5E0D8] rounded-2xl overflow-hidden">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[10px] font-bold text-gray-500 uppercase">
                            <th className="py-2.5 px-4">Order ID</th>
                            <th className="py-2.5 px-4">Date</th>
                            <th className="py-2.5 px-4">Items</th>
                            <th className="py-2.5 px-4">Payment</th>
                            <th className="py-2.5 px-4">Status</th>
                            <th className="py-2.5 px-4 text-right">Total</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#E5E0D8]">
                          {selectedDetails.orders.map((order) => (
                            <tr key={order._id} className="hover:bg-[#FAFAFA]">
                              <td className="py-2.5 px-4 font-mono text-[11px] text-[#1C382D]">
                                #{order._id.slice(-6).toUpperCase()}
                              </td>
                              <td className="py-2.5 px-4 text-gray-500">
                                {formatDate(order.createdAt)}
                              </td>
                              <td className="py-2.5 px-4 text-gray-600">
                                {getTotalOrderItems(order)} items
                              </td>
                              <td className="py-2.5 px-4 text-gray-600">
                                {order.paymentMethod} ({order.paymentStatus})
                              </td>
                              <td className="py-2.5 px-4">
                                {getOrderStatusBadge(order.orderStatus)}
                              </td>
                              <td className="py-2.5 px-4 text-right font-bold text-[#1C382D]">
                                ₹{order.totalPrice.toLocaleString('en-IN')}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 font-light bg-[#F7F5F0] p-3.5 rounded-2xl border border-[#E5E0D8]">
                      This customer has not placed any orders yet.
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Modal Footer */}
            <div className="pt-3 flex items-center justify-between border-t border-[#E5E0D8]">
              <button
                type="button"
                onClick={() => setStatusTarget(selectedDetails.customer)}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-colors cursor-pointer ${
                  selectedDetails.customer.isActive
                    ? 'border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100'
                    : 'border-[#2D6A4F]/30 bg-[#EAF3EA] text-[#2D6A4F] hover:bg-[#dcebdd]'
                }`}
              >
                {selectedDetails.customer.isActive ? 'Block Account' : 'Activate Account'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsDetailsOpen(false);
                  setSelectedDetails(null);
                }}
                className="px-6 py-2 rounded-full bg-[#1C382D] hover:bg-[#152a22] text-xs font-bold text-white shadow-sm transition-colors cursor-pointer"
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