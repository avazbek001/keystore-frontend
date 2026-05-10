import React, { createContext, useState, useEffect } from 'react';

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const updateCartTotals = (items) => {
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setCartCount(count);
    setCartTotal(total);
  };

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      updateCartTotals(items);
    }
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      let newItems;
      if (existing) {
        newItems = prev.map(item =>
          item.id === product.id ? { ...item, quantity: (item.quantity || 1) + quantity } : item
        );
      } else {
        newItems = [...prev, { ...product, quantity }];
      }
      localStorage.setItem('cart', JSON.stringify(newItems));
      updateCartTotals(newItems);
      showToast(`🛒 "${product.name}" savatga qo'shildi!`, 'success');
      return newItems;
    });
  };

  const removeFromCart = (id) => {
    const newItems = cartItems.filter(item => item.id !== id);
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    updateCartTotals(newItems);
    showToast(`🗑️ Savatdan o'chirildi`, 'info');
  };

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    const newItems = cartItems.map(item =>
      item.id === id ? { ...item, quantity } : item
    );
    setCartItems(newItems);
    localStorage.setItem('cart', JSON.stringify(newItems));
    updateCartTotals(newItems);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cart');
    updateCartTotals([]);
    showToast(`🗑️ Savat tozalandi`, 'info');
  };

  return (
    <StoreContext.Provider value={{
      cartItems, cartCount, cartTotal,
      addToCart, removeFromCart, updateCartQuantity, clearCart
    }}>
      {children}
      {toast && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50 animate-bounce text-sm font-bold flex items-center gap-2 bg-[#6C5DD3] text-white">
          {toast.message}
        </div>
      )}
    </StoreContext.Provider>
  );
};