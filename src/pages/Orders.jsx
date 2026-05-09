import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Orders = ({ isDark }) => {
  const { token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    fetch('http://localhost:5000/api/orders', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setOrders(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Orders fetch error:', err);
        setLoading(false);
      });
  }, [token]);

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-gray-400 mb-4">Buyurtmalarni ko'rish uchun tizimga kiring</p>
        <Link to="/login" className="bg-[#6C5DD3] text-white px-6 py-2 rounded-xl">Kirish</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#6C5DD3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const getStatusText = (status) => {
    const statuses = {
      pending: '⏳ Kutilmoqda',
      paid: '✅ To\'langan',
      shipped: '🚚 Yuborilgan',
      delivered: '📦 Yetkazilgan',
      cancelled: '❌ Bekor qilingan'
    };
    return statuses[status] || status;
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      paid: 'bg-green-500/20 text-green-400',
      shipped: 'bg-blue-500/20 text-blue-400',
      delivered: 'bg-purple-500/20 text-purple-400',
      cancelled: 'bg-red-500/20 text-red-400'
    };
    return colors[status] || 'bg-gray-500/20 text-gray-400';
  };

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="text-6xl mb-4">📦</div>
        <h2 className="text-2xl font-bold mb-2">Buyurtmalar yo'q</h2>
        <p className="text-gray-400 mb-6">Hali hech qanday buyurtma bermagansiz</p>
        <Link to="/products" className="bg-[#6C5DD3] text-white px-6 py-3 rounded-xl font-bold">
          Mahsulotlar
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-black italic mb-6">📋 Mening buyurtmalarim</h1>
      
      <div className="space-y-5">
        {orders.map((order) => (
          <div key={order.id} className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} rounded-2xl p-5 border border-white/5`}>
            {/* Header */}
            <div className="flex flex-wrap justify-between items-center mb-4 pb-3 border-b border-white/10">
              <div>
                <span className="text-sm text-gray-400">Buyurtma #</span>
                <span className="font-bold ml-1 text-white">{order.id}</span>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                  {getStatusText(order.status)}
                </span>
              </div>
              <div className="text-sm text-gray-400">
                📅 {new Date(order.created_at).toLocaleString()}
              </div>
            </div>
            
            {/* Mahsulotlar */}
            <div className="space-y-2 mb-4">
              {order.items?.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-sm">
                  <span className="text-gray-300">{item.name} x{item.quantity}</span>
                  <span className="font-bold text-white">{(item.price * item.quantity).toLocaleString()} so'm</span>
                </div>
              ))}
            </div>
            
            {/* Footer */}
            <div className="flex justify-between items-center pt-3 border-t border-white/10">
              <div>
                <span className="text-sm text-gray-400">📍 {order.address || 'Manzil kiritilmagan'}</span>
                <span className="text-sm text-gray-400 ml-4">📞 {order.phone || '-'}</span>
              </div>
              <div>
                <span className="text-sm text-gray-400">Jami:</span>
                <span className="text-xl font-bold text-[#6C5DD3] ml-2">{order.total?.toLocaleString()} so'm</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;