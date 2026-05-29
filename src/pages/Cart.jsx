import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

const Cart = ({ isDark }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    cartItems, 
    cartTotal, 
    removeFromCart, 
    updateCartQuantity, 
    clearCart 
  } = useContext(StoreContext);
  
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    if (!user) {
      alert('Iltimos, avval kiring');
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-6">
        <div className="text-6xl mb-4">🛒</div>
        <h2 className="text-2xl font-bold mb-2">Savat bo'sh</h2>
        <p className="text-gray-400 mb-6">Hali hech narsa qo'shilmagan</p>
        <Link to="/products" className="bg-[#6C5DD3] text-white px-6 py-3 rounded-xl font-bold hover:opacity-90 transition">
          Mahsulotlar
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold italic mb-6">🛒 Savat</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} p-4 rounded-2xl flex gap-4 transition hover:shadow-lg`}>
              <img 
                src={item.image} 
                className="w-24 h-24 object-cover rounded-xl" 
                alt={item.name} 
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-[#6C5DD3] font-bold mt-1">{item.price?.toLocaleString()} so'm</p>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-400 transition p-2"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <button 
                    onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)}
                    className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                  >
                    -
                  </button>
                  <span className="font-bold w-8 text-center">{item.quantity || 1}</span>
                  <button 
                    onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)}
                    className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          <button 
            onClick={clearCart}
            className="text-red-500 text-sm hover:underline mt-2"
          >
            Savatni tozalash
          </button>
        </div>

        {/* Order Summary */}
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} p-6 rounded-2xl h-fit sticky top-24`}>
          <h2 className="text-xl font-bold mb-4 border-b border-white/10 pb-3">Buyurtma summasi</h2>
          
          <div className="space-y-3 mb-6 max-h-64 overflow-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity || 1}</span>
                <span className="font-bold">{((item.price || 0) * (item.quantity || 1)).toLocaleString()} so'm</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 pt-4 mt-2">
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">Jami</span>
              <span className="text-2xl font-bold text-[#6C5DD3]">{cartTotal?.toLocaleString()} so'm</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Yetkazib berish: Bepul</p>
          </div>
          
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="w-full mt-6 bg-[#6C5DD3] text-white py-3 rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Kutilmoqda...' : 'Buyurtma berish'}
          </button>
          
          <Link to="/products" className="block text-center text-sm text-[#6C5DD3] mt-4 hover:underline">
            ← Mahsulotlar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;
