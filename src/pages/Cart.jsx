import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { StoreContext } from "../context/StoreContext";

const Cart = ({ isDark }) => {
  const { cartItems, cartTotal, removeFromCart, updateCartQuantity, clearCart } = useContext(CardContext);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="p-8 max-w-4xl mx-auto text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-3xl font-bold italic mb-4">Savat bo'sh</h1>
        <Link to="/products" className="bg-[#6C5DD3] text-white px-8 py-3 rounded-2xl font-bold inline-block">
          Mahsulotlar
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold italic mb-8">Savat</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white'} p-5 rounded-2xl flex gap-4`}>
              <img src={item.image} className="w-24 h-24 object-cover rounded-xl" alt={item.name} />
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-bold">{item.name}</h3>
                  <button onClick={() => removeFromCart(item.id)} className="text-red-500">✕</button>
                </div>
                <p className="text-[#6C5DD3] font-bold">{item.price.toLocaleString()} so'm</p>
                <div className="flex items-center gap-3 mt-3">
                  <button onClick={() => updateCartQuantity(item.id, (item.quantity || 1) - 1)} className="w-8 h-8 rounded-lg bg-gray-600">-</button>
                  <span>{item.quantity || 1}</span>
                  <button onClick={() => updateCartQuantity(item.id, (item.quantity || 1) + 1)} className="w-8 h-8 rounded-lg bg-gray-600">+</button>
                </div>
              </div>
            </div>
          ))}
          <button onClick={clearCart} className="text-red-500 text-sm">Savatni tozalash</button>
        </div>
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white'} p-6 rounded-2xl`}>
          <h2 className="text-xl font-bold mb-4">Jami</h2>
          <div className="text-3xl font-bold text-[#6C5DD3]">{cartTotal.toLocaleString()} so'm</div>
          <Link to="/checkout" className="w-full mt-6 bg-[#6C5DD3] text-white py-3 rounded-xl font-bold text-center block">
            Buyurtma berish
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;