import { useEffect, useState } from 'react';
import {
  Search,
  Eye,
  Package,
  MapPin,
  CreditCard,
  Phone,
  X,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Image as ImageIcon,
  CheckCircle2,
} from 'lucide-react';
import {
  getAllAdminOrders,
  updateAdminOrderStatus,
  type AdminOrder,
  type AdminOrderItem,
  type OrderStatus,
  type PaymentStatus,
  type PopulatedUserRef,
  type PopulatedProductRef,
} from '../../api/adminOrderApi';

const ORDER_STATUS_TABS: Array<'All' | OrderStatus> = [
  'All',
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

const ORDER_STATUSES: OrderStatus[] = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
];

const PAYMENT_STATUSES: PaymentStatus[] = ['Pending', 'Paid', 'Failed'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');
  const [paymentFilter, setPaymentFilter] = useState<'All' | PaymentStatus>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [draftOrderStatus, setDraftOrderStatus] = useState<OrderStatus>('Pending');
  const [draftPaymentStatus, setDraftPaymentStatus] = useState<PaymentStatus>('Pending');
  const [isSavingStatus, setIsSavingStatus] = useState(false);
  const [updatingRowId, setUpdatingRowId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadOrders = async () => {
      try {
        setIsLoading(true);
        const res = await getAllAdminOrders();
        if (isMounted && res.success && Array.isArray(res.data)) {
          setOrders(res.data);
        }
      } catch (err) {
        console.error('Error loading admin orders:', err);
        if (isMounted) setError('Failed to load orders from database.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadOrders();

    return () => {
      isMounted = false;
    };
  }, []);

  const openOrderModal = (order: AdminOrder) => {
    setSelectedOrder(order);
    setDraftOrderStatus(order.orderStatus);
    setDraftPaymentStatus(order.paymentStatus);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
  };

  const getCustomerInfo = (user: AdminOrder['user']) => {
    if (typeof user === 'object' && user !== null) {
      const u = user as PopulatedUserRef;
      return {
        name: u.name || 'Customer',
        email: u.email || '—',
      };
    }
    return {
      name: 'Customer',
      email: String(user || '—'),
    };
  };

  const getItemProductInfo = (item: AdminOrderItem) => {
    if (typeof item.product === 'object' && item.product !== null) {
      const p = item.product as PopulatedProductRef;
      return {
        name: p.name || 'Skincare Product',
        imageUrl: p.imageUrl,
      };
    }
    return {
      name: `Product #${String(item.product).slice(-6).toUpperCase()}`,
      imageUrl: undefined,
    };
  };

  const getTotalUnits = (order: AdminOrder) =>
    order.orderItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const getOrderStatusBadge = (status: OrderStatus) => {
    const styles: Record<OrderStatus, string> = {
      Pending: 'bg-amber-50 text-amber-700 border-amber-200/70',
      Processing: 'bg-sky-50 text-sky-700 border-sky-200/70',
      Shipped: 'bg-indigo-50 text-indigo-700 border-indigo-200/70',
      Delivered: 'bg-[#EAF3EA] text-[#2D6A4F] border-[#2D6A4F]/25',
      Cancelled: 'bg-rose-50 text-rose-700 border-rose-200/70',
    };
    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold border ${styles[status]}`}
      >
        {status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status: PaymentStatus) => {
    const styles: Record<PaymentStatus, string> = {
      Pending: 'bg-amber-50 text-amber-700',
      Paid: 'bg-[#EAF3EA] text-[#2D6A4F]',
      Failed: 'bg-rose-50 text-rose-700',
    };
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${styles[status]}`}>
        {status}
      </span>
    );
  };

  const handleQuickOrderStatusChange = async (order: AdminOrder, nextStatus: OrderStatus) => {
    if (nextStatus === order.orderStatus) return;

    if (nextStatus === 'Cancelled') {
      const confirmed = window.confirm(
        `Cancel order #${order._id.slice(-6).toUpperCase()}? Product stock for its items will be automatically restored.`
      );
      if (!confirmed) return;
    }

    try {
      setUpdatingRowId(order._id);
      const res = await updateAdminOrderStatus(order._id, { orderStatus: nextStatus });
      const updated = res.data;
      if (updated) {
        setOrders((prev) => prev.map((o) => (o._id === order._id ? updated : o)));
        if (selectedOrder?._id === order._id) {
          setSelectedOrder(updated);
          setDraftOrderStatus(updated.orderStatus);
          setDraftPaymentStatus(updated.paymentStatus);
        }
      }
    } catch (err) {
      console.error('Error updating order status:', err);
      alert('Failed to update order status.');
    } finally {
      setUpdatingRowId(null);
    }
  };

  // Save changes from inside Order Details modal
  const handleSaveModalStatuses = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder) return;

    try {
      setIsSavingStatus(true);
      const res = await updateAdminOrderStatus(selectedOrder._id, {
        orderStatus: draftOrderStatus,
        paymentStatus: draftPaymentStatus,
      });
      const updated = res.data;
      if (updated) {
        setOrders((prev) => prev.map((o) => (o._id === selectedOrder._id ? updated : o)));
        setSelectedOrder(updated);
      }
    } catch (err) {
      console.error('Error saving order statuses:', err);
      alert('Failed to update order.');
    } finally {
      setIsSavingStatus(false);
    }
  };

  // Filtered & Paginated Data
  const filteredOrders = orders.filter((order) => {
    const matchesOrderStatus = statusFilter === 'All' || order.orderStatus === statusFilter;
    const matchesPaymentStatus = paymentFilter === 'All' || order.paymentStatus === paymentFilter;

    const q = searchQuery.toLowerCase().trim();
    const customer = getCustomerInfo(order.user);
    const matchesSearch =
      !q ||
      order._id.toLowerCase().includes(q) ||
      customer.name.toLowerCase().includes(q) ||
      customer.email.toLowerCase().includes(q) ||
      order.shippingAddress.city.toLowerCase().includes(q);

    return matchesOrderStatus && matchesPaymentStatus && matchesSearch;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  // Revenue & Fulfillment Summary
  const grossRevenue = orders
    .filter((o) => o.orderStatus !== 'Cancelled')
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);
  const pendingFulfillmentCount = orders.filter(
    (o) => o.orderStatus === 'Pending' || o.orderStatus === 'Processing'
  ).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Order Fulfillment & Dispatch</h2>
          <p className="text-xs text-gray-500 font-light">
            Track customer orders, verify payment status, update fulfillment stages, and manage cancellations.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="px-3.5 py-2 rounded-full bg-white border border-[#E5E0D8] flex items-center space-x-1.5">
            <Package size={14} className="text-amber-600" />
            <span className="text-gray-500">To Fulfill:</span>
            <strong className="text-[#1C382D]">{pendingFulfillmentCount}</strong>
          </div>
          <div className="px-3.5 py-2 rounded-full bg-white border border-[#E5E0D8] flex items-center space-x-1.5">
            <span className="text-gray-500">Active Revenue:</span>
            <strong className="text-[#1C382D]">₹{grossRevenue.toLocaleString('en-IN')}</strong>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-2 lg:pb-0">
          {ORDER_STATUS_TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => {
                setStatusFilter(tab);
                setCurrentPage(1);
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
                statusFilter === tab
                  ? 'bg-[#1C382D] text-white shadow-2xs'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <select
            value={paymentFilter}
            onChange={(e) => {
              setPaymentFilter(e.target.value as 'All' | PaymentStatus);
              setCurrentPage(1);
            }}
            aria-label="Filter by payment status"
            className="bg-[#F7F5F0] border border-[#E5E0D8] rounded-full px-4 py-2 text-xs font-bold text-[#1C382D] focus:outline-none focus:border-[#1C382D] cursor-pointer"
          >
            <option value="All">Payment: All</option>
            {PAYMENT_STATUSES.map((pStatus) => (
              <option key={pStatus} value={pStatus}>
                Payment: {pStatus}
              </option>
            ))}
          </select>

          <div className="relative flex-1 sm:w-64">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Order ID, customer, or city..."
              className="w-full bg-[#F7F5F0] border border-[#E5E0D8] rounded-full pl-10 pr-4 py-2 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
            />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F7F5F0] border-b border-[#E5E0D8] text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="py-4 px-6">Order</th>
                <th className="py-4 px-6">Customer</th>
                <th className="py-4 px-6">Items & Total</th>
                <th className="py-4 px-6">Payment</th>
                <th className="py-4 px-6">Fulfillment</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E0D8] text-xs">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2 text-[#1C382D]" />
                    Loading orders...
                  </td>
                </tr>
              ) : paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => {
                  const customer = getCustomerInfo(order.user);
                  const isRowBusy = updatingRowId === order._id;

                  return (
                    <tr key={order._id} className="hover:bg-[#FAFAFA] transition-colors">
                      <td className="py-4 px-6">
                        <span className="font-mono font-bold text-[#1C382D] block">
                          #{order._id.slice(-6).toUpperCase()}
                        </span>
                        <span className="text-[11px] text-gray-400">{formatDateTime(order.createdAt)}</span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-[#1C382D] block">{customer.name}</span>
                        <span className="text-[11px] text-gray-400 block">{customer.email}</span>
                        <span className="text-[11px] text-gray-500">{order.shippingAddress.city}</span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="font-bold text-[#1C382D] block">
                          ₹{order.totalPrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[11px] text-gray-500">
                          {getTotalUnits(order)} {getTotalUnits(order) === 1 ? 'unit' : 'units'} ({order.orderItems.length}{' '}
                          {order.orderItems.length === 1 ? 'line' : 'lines'})
                        </span>
                      </td>

                      <td className="py-4 px-6 space-y-1">
                        <div>{getPaymentStatusBadge(order.paymentStatus)}</div>
                        <span className="text-[11px] text-gray-500 block">{order.paymentMethod}</span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <select
                            value={order.orderStatus}
                            disabled={isRowBusy}
                            onChange={(e) =>
                              handleQuickOrderStatusChange(order, e.target.value as OrderStatus)
                            }
                            aria-label={`Order status for #${order._id.slice(-6)}`}
                            className="bg-[#F7F5F0] border border-[#E5E0D8] rounded-full px-3 py-1 text-[11px] font-bold text-[#1C382D] focus:outline-none focus:border-[#1C382D] disabled:opacity-50 cursor-pointer"
                          >
                            {ORDER_STATUSES.map((st) => (
                              <option key={st} value={st}>
                                {st}
                              </option>
                            ))}
                          </select>
                          {isRowBusy && <Loader2 size={14} className="animate-spin text-[#1C382D]" />}
                        </div>
                      </td>

                      <td className="py-4 px-6 text-right">
                        <button
                          type="button"
                          onClick={() => openOrderModal(order)}
                          title="View & Manage Order"
                          className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white inline-flex items-center justify-center text-gray-600 hover:bg-[#1C382D] hover:text-white hover:border-[#1C382D] transition-all cursor-pointer"
                        >
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400 font-light">
                    {error || 'No orders match your current filters.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500 font-light">
          <span>
            Showing{' '}
            <strong className="text-[#1C382D] font-bold">
              {filteredOrders.length === 0 ? 0 : startIndex + 1}
            </strong>
            –
            <strong className="text-[#1C382D] font-bold">
              {Math.min(startIndex + itemsPerPage, filteredOrders.length)}
            </strong>{' '}
            of <strong className="text-[#1C382D] font-bold">{filteredOrders.length}</strong> orders
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

      {/* Order Details & Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-xl max-w-2xl w-full p-6 space-y-5 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-[#E5E0D8] pb-4 gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl text-[#1C382D]">
                    Order #{selectedOrder._id.slice(-6).toUpperCase()}
                  </h3>
                  {getOrderStatusBadge(selectedOrder.orderStatus)}
                  {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                </div>
                <p className="text-[11px] font-mono text-gray-400 mt-1">
                  Full ID: {selectedOrder._id} · Placed {formatDateTime(selectedOrder.createdAt)}
                </p>
              </div>

              <button
                type="button"
                onClick={closeOrderModal}
                className="w-8 h-8 rounded-full bg-[#F7F5F0] flex items-center justify-center text-gray-500 hover:bg-gray-200 cursor-pointer shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Customer & Shipping Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#E5E0D8] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1">
                  <MapPin size={12} />
                  <span>Shipping Destination</span>
                </span>
                <p className="font-bold text-[#1C382D]">
                  {getCustomerInfo(selectedOrder.user).name}
                </p>
                <p className="text-gray-600 font-light leading-relaxed">
                  {selectedOrder.shippingAddress.address}, {selectedOrder.shippingAddress.city} —{' '}
                  {selectedOrder.shippingAddress.postalCode}, {selectedOrder.shippingAddress.country}
                </p>
                <p className="text-gray-600 font-mono text-[11px] flex items-center space-x-1 pt-0.5">
                  <Phone size={11} />
                  <span>{selectedOrder.shippingAddress.phone}</span>
                </p>
              </div>

              <div className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#E5E0D8] space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 flex items-center space-x-1">
                  <CreditCard size={12} />
                  <span>Payment & Summary</span>
                </span>
                <div className="flex items-center justify-between pt-0.5">
                  <span className="text-gray-500">Method:</span>
                  <span className="font-bold text-[#1C382D]">{selectedOrder.paymentMethod}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Payment Status:</span>
                  {getPaymentStatusBadge(selectedOrder.paymentStatus)}
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-[#E5E0D8]">
                  <span className="font-bold text-[#1C382D]">Order Total:</span>
                  <span className="font-bold text-sm text-[#1C382D]">
                    ₹{selectedOrder.totalPrice.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                Formulations Ordered ({selectedOrder.orderItems.length})
              </h4>
              <div className="border border-[#E5E0D8] rounded-2xl divide-y divide-[#E5E0D8] overflow-hidden">
                {selectedOrder.orderItems.map((item, idx) => {
                  const prodInfo = getItemProductInfo(item);
                  const lineTotal = (item.price || 0) * (item.quantity || 0);

                  return (
                    <div
                      key={item._id || idx}
                      className="p-3 bg-white flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="flex items-center space-x-3">
                        {prodInfo.imageUrl ? (
                          <img
                            src={prodInfo.imageUrl}
                            alt={prodInfo.name}
                            className="w-11 h-11 rounded-xl object-cover border border-[#E5E0D8] shrink-0"
                          />
                        ) : (
                          <div className="w-11 h-11 rounded-xl bg-[#F7F5F0] border border-[#E5E0D8] flex items-center justify-center text-gray-400 shrink-0">
                            <ImageIcon size={16} />
                          </div>
                        )}
                        <div>
                          <span className="font-bold text-[#1C382D] block">{prodInfo.name}</span>
                          <span className="text-[11px] text-gray-500">
                            ₹{(item.price || 0).toLocaleString('en-IN')} × {item.quantity}
                          </span>
                        </div>
                      </div>
                      <span className="font-bold text-[#1C382D]">
                        ₹{lineTotal.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Update Fulfillment & Payment Status Form */}
            <form
              onSubmit={handleSaveModalStatuses}
              className="bg-[#F7F5F0] p-4 rounded-2xl border border-[#E5E0D8] space-y-3"
            >
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1C382D] block">
                Update Order & Payment Status
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 block">
                    Fulfillment Status
                  </label>
                  <select
                    value={draftOrderStatus}
                    onChange={(e) => setDraftOrderStatus(e.target.value as OrderStatus)}
                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-bold text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  >
                    {ORDER_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-gray-600 block">
                    Payment Status
                  </label>
                  <select
                    value={draftPaymentStatus}
                    onChange={(e) => setDraftPaymentStatus(e.target.value as PaymentStatus)}
                    className="w-full bg-white border border-[#E5E0D8] rounded-xl px-3 py-2 text-xs font-bold text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  >
                    {PAYMENT_STATUSES.map((pSt) => (
                      <option key={pSt} value={pSt}>
                        {pSt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {draftOrderStatus === 'Cancelled' && selectedOrder.orderStatus !== 'Cancelled' && (
                <p className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/70 rounded-xl px-3 py-2">
                  Cancelling this order will automatically restore product stock on the backend.
                </p>
              )}

              <div className="pt-2 flex items-center justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeOrderModal}
                  className="px-5 py-2 rounded-full border border-[#E5E0D8] bg-white text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  type="submit"
                  disabled={
                    isSavingStatus ||
                    (draftOrderStatus === selectedOrder.orderStatus &&
                      draftPaymentStatus === selectedOrder.paymentStatus)
                  }
                  className="px-5 py-2 rounded-full bg-[#1C382D] hover:bg-[#152a22] text-xs font-bold text-white shadow-sm inline-flex items-center space-x-1.5 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                >
                  {isSavingStatus ? (
                    <>
                      <Loader2 size={13} className="animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={13} />
                      <span>Save Changes</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}