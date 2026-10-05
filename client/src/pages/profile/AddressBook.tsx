import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Address {
  id: number;
  label: string;
  name: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressBook() {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      label: "Home",
      name: "Akhila Vijayan",
      street: "42 Marine Drive",
      apartment: "Flat 7B",
      city: "Kochi",
      state: "Kerala",
      zip: "682031",
      phone: "+971 50 123 4567",
      isDefault: true,
    },
    {
      id: 2,
      label: "Office",
      name: "Akhila Vijayan",
      street: "15 Financial Center Road",
      apartment: "Tower 2, Floor 14",
      city: "Dubai",
      state: "Dubai",
      zip: "00000",
      phone: "+971 50 123 4567",
      isDefault: false,
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  // Form State
  const [label, setLabel] = useState('Home');
  const [name, setName] = useState('');
  const [street, setStreet] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [phone, setPhone] = useState('');

  const openAddModal = () => {
    setEditingId(null);
    setLabel('Home');
    setName('');
    setStreet('');
    setApartment('');
    setCity('');
    setState('');
    setZip('');
    setPhone('');
    setIsModalOpen(true);
  };

  const openEditModal = (addr: Address) => {
    setEditingId(addr.id);
    setLabel(addr.label);
    setName(addr.name);
    setStreet(addr.street);
    setApartment(addr.apartment);
    setCity(addr.city);
    setState(addr.state);
    setZip(addr.zip);
    setPhone(addr.phone);
    setIsModalOpen(true);
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId !== null) {
      setAddresses(addresses.map(addr => addr.id === editingId ? {
        ...addr, label, name, street, apartment, city, state, zip, phone
      } : addr));
    } else {
      const newAddr: Address = {
        id: Date.now(),
        label,
        name,
        street,
        apartment,
        city,
        state,
        zip,
        phone,
        isDefault: addresses.length === 0
      };
      setAddresses([...addresses, newAddr]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
  };

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link to="/account" className="hover:underline">My account</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">Saved Addresses</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">
                Address Book
              </h1>
              <p className="text-xs text-gray-500 font-light mt-1">
                Manage your shipping locations for seamless checkout and faster deliveries.
              </p>
            </div>

            <button 
              onClick={openAddModal}
              className="bg-[#1C382D] hover:bg-[#152a22] text-white px-5 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-colors shadow-sm flex items-center space-x-2"
            >
              <Plus size={15} />
              <span>Add new address</span>
            </button>
          </div>
        </div>

        {/* Addresses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {addresses.map((addr) => (
            <div key={addr.id} className={`bg-white p-6 rounded-3xl border transition-all shadow-sm flex flex-col justify-between ${addr.isDefault ? 'border-[#1C382D] ring-1 ring-[#1C382D]' : 'border-[#E5E0D8]'}`}>
              
              <div className="space-y-4">
                {/* Top Badge Row */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1C382D] bg-[#F4F1EA] px-3 py-1 rounded-md uppercase tracking-wider">
                    {addr.label}
                  </span>
                  {addr.isDefault ? (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full flex items-center space-x-1">
                      <Check size={11} />
                      <span>Default address</span>
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleSetDefault(addr.id)}
                      className="text-[10px] font-bold text-gray-500 hover:text-[#1C382D] underline"
                    >
                      Set as default
                    </button>
                  )}
                </div>

                {/* Address Details */}
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-[#1C382D]">{addr.name}</h4>
                  <p className="text-xs text-gray-600 font-light leading-relaxed">
                    {addr.street}, {addr.apartment}<br />
                    {addr.city}, {addr.state} {addr.zip}<br />
                    <span className="text-gray-400 font-normal">{addr.phone}</span>
                  </p>
                </div>
              </div>

              {/* Card Actions */}
              <div className="flex items-center justify-end space-x-3 pt-6 mt-6 border-t border-[#E5E0D8]">
                <button 
                  onClick={() => openEditModal(addr)}
                  className="flex items-center space-x-1 text-xs font-bold text-[#1C382D] hover:underline px-3 py-1.5 rounded-xl border border-[#E5E0D8] bg-[#FDFBF7]"
                >
                  <Edit2 size={12} />
                  <span>Edit</span>
                </button>
                
                {!addr.isDefault && (
                  <button 
                    onClick={() => handleDelete(addr.id)}
                    className="flex items-center space-x-1 text-xs font-bold text-rose-600 hover:underline px-3 py-1.5 rounded-xl border border-rose-200 bg-rose-50"
                  >
                    <Trash2 size={12} />
                    <span>Delete</span>
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-6 shadow-2xl relative animate-fadeIn">
              
              <div className="flex items-center justify-between pb-3 border-b border-[#E5E0D8]">
                <h3 className="font-serif text-2xl text-[#1C382D]">
                  {editingId !== null ? 'Edit Address' : 'Add New Address'}
                </h3>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200"
                >
                  <X size={16} />
                </button>
              </div>

              <form onSubmit={handleSaveAddress} className="space-y-4">
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">Address Label</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Home, Office"
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">Full Name</label>
                    <input 
                      type="text" 
                      placeholder="Akhila Vijayan"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">Street Address</label>
                  <input 
                    type="text" 
                    placeholder="42 Marine Drive"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">Apartment, Suite, Unit (optional)</label>
                  <input 
                    type="text" 
                    placeholder="Flat 7B"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">City</label>
                    <input 
                      type="text" 
                      placeholder="Kochi"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">State</label>
                    <input 
                      type="text" 
                      placeholder="Kerala"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">Postal Code</label>
                    <input 
                      type="text" 
                      placeholder="682031"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-[#1C382D]">Phone Number</label>
                  <input 
                    type="text" 
                    placeholder="+971 50 123 4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-[#FDFBF7] border border-[#E5E0D8] rounded-xl px-3 py-2.5 text-xs text-[#1C382D] focus:outline-none focus:border-[#1C382D]"
                    required
                  />
                </div>

                <div className="flex items-center justify-end space-x-3 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-5 py-2.5 rounded-full border border-[#E5E0D8] text-xs font-bold text-[#1C382D] hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="bg-[#1C382D] hover:bg-[#152a22] text-white px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm"
                  >
                    Save Address
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}