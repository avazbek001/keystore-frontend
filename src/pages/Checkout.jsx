import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardContext } from '../context/CardContext';
import { useAuth } from '../context/AuthContext';

const Checkout = ({ isDark }) => {
  const { cartItems, cartTotal, clearCart } = useContext(CardContext);
  const { user, token } = useAuth();
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!address.trim()) {
      setError('Iltimos, manzilni kiriting');
      return;
    }
    if (!phone.trim()) {
      setError('Iltimos, telefon raqamni kiriting');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items: cartItems.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity
          })),
          total: cartTotal,
          address: address,
          phone: phone
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        clearCart();
        alert('Buyurtma muvaffaqiyatli yuborildi!');
        navigate('/orders');
      } else {
        setError(data.error || 'Xatolik yuz berdi');
      }
    } catch (err) {
      console.error('Buyurtma xatosi:', err);
      setError('Server bilan bog\'lanishda xatolik');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p>Iltimos, avval kiring</p>
        <a href="/login" className="text-[#6C5DD3]">Kirish</a>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="p-8 text-center">
        <p>Savat bo'sh</p>
        <a href="/products" className="text-[#6C5DD3]">Mahsulotlar</a>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-black italic mb-6">Buyurtma rasmiylashtirish</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Buyurtma summasi */}
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} p-6 rounded-2xl`}>
          <h2 className="text-lg font-bold mb-4">📦 Buyurtma summasi</h2>
          <div className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm border-b border-white/10 pb-2">
                <span>{item.name} x{item.quantity}</span>
                <span className="font-bold">{(item.price * item.quantity).toLocaleString()} so'm</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between pt-3 border-t border-white/20">
            <span className="font-bold">Jami</span>
            <span className="text-xl font-bold text-[#6C5DD3]">{cartTotal.toLocaleString()} so'm</span>
          </div>
        </div>

        {/* Yetkazib berish formasi */}
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} p-6 rounded-2xl`}>
          <h2 className="text-lg font-bold mb-4">🚚 Yetkazib berish</h2>
          
          {error && (
            <div className="bg-red-500/20 text-red-500 p-3 rounded-xl text-sm mb-4">
              ⚠️ {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">To'liq manzil</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Shahar, ko'cha, uy, kvartira ..."
                rows="3"
                className={`w-full p-3 rounded-xl outline-none focus:border-[#6C5DD3] ${
                  isDark ? 'bg-[#0E0E1E] border border-white/10' : 'bg-gray-100 border border-gray-200'
                }`}
                required
              />
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Telefon raqam</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+998 xx xxx xx xx"
                className={`w-full p-3 rounded-xl outline-none focus:border-[#6C5DD3] ${
                  isDark ? 'bg-[#0E0E1E] border border-white/10' : 'bg-gray-100 border border-gray-200'
                }`}
                required
              />
            </div>

            {/* Telegram to'lov ma'lumoti */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mt-4">
              <p className="text-yellow-500 text-sm font-bold mb-2">💰 To'lov ma'lumotlari:</p>
              <p className="text-sm">Buyurtmani tasdiqlaganingizdan so'ng, quyidagi Telegram orqali bog'lanib to'lovni amalga oshiring:</p>
              <a 
                href="https://t.me/Avazbey4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block mt-3 bg-[#0088cc] text-white px-5 py-2 rounded-xl text-sm font-bold hover:opacity-90 transition"
              >
                📩 @Avazbey4 ga yozing
              </a>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#6C5DD3] text-white py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50 mt-4"
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Yuborilmoqda...</span>
                </div>
              ) : (
                'Buyurtma berish'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;