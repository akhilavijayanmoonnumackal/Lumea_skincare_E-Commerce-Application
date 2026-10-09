import { CheckCircle2, ArrowLeft, MapPin } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';

// Local asset import
import serumsImg from '../../assets/images/serums&oils.avif';
import cleanserImg from '../../assets/images/cleansers.avif';

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>();
  const orderId = id ? `#${id.toUpperCase()}` : '#LUM-20486';

  // Tracking timeline steps
  const trackingSteps = [
    { title: 'Order Placed', date: '24 Sep 2026, 10:30 AM', completed: true, current: false, desc: 'We have received your payment and order confirmation.' },
    { title: 'Packed', date: '24 Sep 2026, 04:15 PM', completed: true, current: false, desc: 'Items safely sealed in sustainable Luméa packaging.' },
    { title: 'Shipped', date: '25 Sep 2026, 09:00 AM', completed: true, current: false, desc: 'Handed over to Blue Dart Express (AWB #BLR-984210).' },
    { title: 'Out for Delivery', date: '26 Sep 2026, 08:30 AM', completed: true, current: true, desc: 'Courier agent Ramesh Kumar is out for delivery today.' },
    { title: 'Delivered', date: 'Estimated today by 07:00 PM', completed: false, current: false, desc: 'Package handed over at your doorstep.' },
  ];

  return (
    <div className="w-full bg-[#FDFBF7] min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
            <Link to="/" className="hover:underline">Home</Link>
            <span>›</span>
            <Link to="/account/orders" className="hover:underline">Order History</Link>
            <span>›</span>
            <span className="text-[#1C382D] font-medium">Tracking {orderId}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1C382D]">Order {orderId}</h1>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full">
                  Out for delivery
                </span>
              </div>
              <p className="text-xs text-gray-500 font-light mt-1">
                Placed on 24 Sep 2026 · Carrier: Blue Dart Express (AWB: #BLR-984210)
              </p>
            </div>

            <Link 
              to="/account/orders"
              className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl border border-[#E5E0D8] text-xs font-bold text-[#1C382D] hover:bg-white transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back to orders</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left Column: Visual Timeline */}
          <div className="md:col-span-2 bg-white rounded-3xl border border-[#E5E0D8] p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="font-serif text-xl text-[#1C382D] pb-3 border-b border-[#E5E0D8]">
              Shipment Journey
            </h2>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E5E0D8]">
              {trackingSteps.map((step, idx) => (
                <div key={idx} className="relative flex items-start space-x-4">
                  {/* Timeline bullet */}
                  <div className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] ${step.completed ? 'bg-[#1C382D]' : step.current ? 'bg-amber-600 ring-4 ring-amber-100' : 'bg-gray-300'}`}>
                    {step.completed ? <CheckCircle2 size={12} /> : <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className={`text-xs font-bold ${step.completed || step.current ? 'text-[#1C382D]' : 'text-gray-400'}`}>{step.title}</h4>
                      <span className="text-[10px] text-gray-400 font-light">({step.date})</span>
                    </div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Delivery & Items Summary */}
          <div className="space-y-6">
            
            {/* Shipping Address */}
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 shadow-sm space-y-4">
              <div className="flex items-center space-x-2 text-[#1C382D]">
                <MapPin size={16} />
                <h3 className="font-serif text-lg">Delivery Address</h3>
              </div>
              <div className="text-xs text-gray-600 font-light space-y-1">
                <p className="font-bold text-[#1C382D]">Akhila Vijayan</p>
                <p>42 Marine Drive, Flat 7B</p>
                <p>Kochi, Kerala 682031</p>
                <p className="text-gray-400 pt-1">+971 50 123 4567</p>
              </div>
            </div>

            {/* Items in Box */}
            <div className="bg-white rounded-3xl border border-[#E5E0D8] p-6 shadow-sm space-y-4">
              <h3 className="font-serif text-lg text-[#1C382D]">Package Items (2)</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <img src={serumsImg} alt="Serum" className="w-10 h-10 rounded-xl object-cover border border-[#E5E0D8] bg-[#FDFBF7] p-1" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#1C382D]">Vitamin C Glow Serum</h4>
                    <span className="text-[10px] text-gray-400 font-light">30 ml · ₹2,950</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <img src={cleanserImg} alt="Cleanser" className="w-10 h-10 rounded-xl object-cover border border-[#E5E0D8] bg-[#FDFBF7] p-1" />
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#1C382D]">Gentle Milk Cleanser</h4>
                    <span className="text-[10px] text-gray-400 font-light">30 ml · ₹1,850</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}