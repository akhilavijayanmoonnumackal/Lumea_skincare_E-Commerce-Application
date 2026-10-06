import { useState } from 'react';
import { Bell, ShoppingBag, AlertTriangle, Users, Server, CheckCheck, Trash2, ExternalLink, Filter } from 'lucide-react';

export default function AdminNotificationsPage() {
  const [filterTab, setFilterTab] = useState('All');

  const [notifications, setNotifications] = useState([
    {
      id: 'NOTIF-101',
      title: 'New High-Value Order Placed',
      message: 'Aarav Sharma placed an order (ORD-9821) worth ₹4,850 with Express Shipping.',
      category: 'Orders',
      time: '10 mins ago',
      read: false,
      icon: ShoppingBag,
      color: 'bg-emerald-50 text-[#2D6A4F] border-emerald-200'
    },
    {
      id: 'NOTIF-102',
      title: 'Low Stock Threshold Alert',
      message: 'Barrier Repair Cream (50ml) stock is down to 18 units (safety minimum: 25).',
      category: 'Inventory',
      time: '45 mins ago',
      read: false,
      icon: AlertTriangle,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      id: 'NOTIF-103',
      title: 'New Glow VIP Member Registered',
      message: 'Priya Nair has unlocked Glow VIP status following her 12th completed order.',
      category: 'Customers',
      time: '3 hours ago',
      read: true,
      icon: Users,
      color: 'bg-[#C58359]/10 text-[#C58359] border-[#C58359]/30'
    },
    {
      id: 'NOTIF-104',
      title: 'Database Backup Completed',
      message: 'Automated nightly MongoDB backup snapshot was successfully archived to cloud storage.',
      category: 'System',
      time: '7 hours ago',
      read: true,
      icon: Server,
      color: 'bg-blue-50 text-blue-700 border-blue-200'
    },
    {
      id: 'NOTIF-105',
      title: 'Subscription Renewal Processed',
      message: 'Automatic recurring payment for Vitamin C Glow Serum subscription (SUB-5012) went through successfully.',
      category: 'Orders',
      time: 'Yesterday',
      read: true,
      icon: ShoppingBag,
      color: 'bg-emerald-50 text-[#2D6A4F] border-emerald-200'
    },
    {
      id: 'NOTIF-106',
      title: 'Out of Stock Alert',
      message: 'Hydrating Gel Cleanser (150ml) inventory has hit 0 units. Reorder recommended.',
      category: 'Inventory',
      time: 'Yesterday',
      read: false,
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    }
  ]);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearRead = () => {
    setNotifications(notifications.filter(n => !n.read));
  };

  const toggleRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filterTab === 'All') return true;
    if (filterTab === 'Unread') return !notif.read;
    return notif.category === filterTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-[#1C382D]">Admin Notifications</h2>
          <p className="text-xs text-gray-500 font-light">Real-time alerts regarding customer orders, stock warnings, loyalty milestones, and system status.</p>
        </div>
        <div className="flex items-center space-x-3 self-start sm:self-auto">
          <button 
            onClick={markAllAsRead}
            className="bg-white hover:bg-gray-50 border border-[#E5E0D8] text-[#1C382D] px-4 py-2.5 rounded-full text-xs font-bold tracking-wider flex items-center space-x-2 transition-colors shadow-2xs"
          >
            <CheckCheck size={15} />
            <span>Mark All as Read</span>
          </button>
          <button 
            onClick={clearRead}
            className="bg-white hover:bg-rose-50 border border-[#E5E0D8] text-rose-600 px-4 py-2.5 rounded-full text-xs font-bold tracking-wider flex items-center space-x-2 transition-colors shadow-2xs"
          >
            <Trash2 size={15} />
            <span>Clear Read</span>
          </button>
        </div>
      </div>

      {/* Metric Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Unread Alerts</span>
            <Bell size={16} className="text-[#C58359]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">{unreadCount} Pending</div>
          <span className="text-[11px] text-[#C58359] font-medium">Requires your attention</span>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-[#E5E0D8] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-[11px] uppercase tracking-wider font-bold">Total Notifications</span>
            <Filter size={16} className="text-[#2D6A4F]" />
          </div>
          <div className="font-serif text-3xl font-bold text-[#1C382D]">{notifications.length} Logged</div>
          <span className="text-[11px] text-emerald-700 font-medium">Recorded in session history</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-4 rounded-3xl border border-[#E5E0D8] shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center space-x-1 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Unread', 'Orders', 'Inventory', 'Customers', 'System'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${filterTab === tab ? 'bg-[#1C382D] text-white shadow-2xs' : 'text-gray-600 hover:bg-gray-100'}`}
            >
              {tab} {tab === 'Unread' && unreadCount > 0 ? `(${unreadCount})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-3xl border border-[#E5E0D8] shadow-sm overflow-hidden">
        <div className="divide-y divide-[#E5E0D8]">
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notif) => {
              const IconComponent = notif.icon;
              return (
                <div 
                  key={notif.id} 
                  className={`p-5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${!notif.read ? 'bg-[#FDFCF9]' : 'hover:bg-[#FAFAFA]'}`}
                >
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${notif.color}`}>
                      <IconComponent size={18} />
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`font-bold text-xs ${!notif.read ? 'text-[#1C382D]' : 'text-gray-700'}`}>
                          {notif.title}
                        </span>
                        {!notif.read && (
                          <span className="inline-block w-2 h-2 rounded-full bg-[#C58359]"></span>
                        )}
                        <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#F7F5F0] text-gray-500 border border-[#E5E0D8]">
                          {notif.category}
                        </span>
                        <span className="text-[11px] text-gray-400 font-light ml-auto sm:ml-0">• {notif.time}</span>
                      </div>
                      <p className="text-xs text-gray-600 font-light leading-relaxed max-w-3xl">
                        {notif.message}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-end space-x-2 pt-3 sm:pt-0 border-t sm:border-t-0 border-[#E5E0D8]">
                    <button 
                      onClick={() => toggleRead(notif.id)}
                      className="px-3 py-1.5 rounded-full border border-[#E5E0D8] bg-white text-gray-600 hover:bg-gray-100 text-[11px] font-bold transition-colors"
                    >
                      {notif.read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                    <button 
                      title="View Details" 
                      className="w-8 h-8 rounded-full border border-[#E5E0D8] bg-white flex items-center justify-center text-gray-600 hover:bg-[#1C382D] hover:text-white hover:border-[#1C382D] transition-all"
                    >
                      <ExternalLink size={13} />
                    </button>
                    <button 
                      onClick={() => deleteNotification(notif.id)}
                      title="Delete Notification" 
                      className="w-8 h-8 rounded-full border border-rose-100 bg-white flex items-center justify-center text-rose-600 hover:bg-rose-50 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-12 text-center text-gray-400 font-light text-xs">
              No notifications found matching your filter.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#F7F5F0] border-t border-[#E5E0D8] flex items-center justify-between text-xs text-gray-500 font-light">
          <span>Showing <strong className="text-[#1C382D] font-bold">{filteredNotifications.length}</strong> of <strong className="text-[#1C382D] font-bold">{notifications.length}</strong> alerts</span>
          <span className="text-[11px]">Real-time stream active</span>
        </div>
      </div>
    </div>
  );
}