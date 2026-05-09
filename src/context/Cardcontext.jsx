import React, { createContext, useState, useEffect } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
  // ========== NFT/SAVED/COLLECTION (ESKI) ==========
  const [savedItems, setSavedItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  // ========== MARKET/CART (YANGI) ==========
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  // ========== CART FUNKSIYALARI ==========
  const updateCartTotals = (items) => {
    const count = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    const total = items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
    setCartCount(count);
    setCartTotal(total);
  };

  // Load cart from localStorage
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

  // ========== NFT FUNKSIYALARI ==========
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const addToSaved = (item) => {
    if (savedItems.some(saved => saved.id === item.id)) {
      showToast(`⚠️ "${item.title}" allaqachon saqlangan!`, 'warning');
      return;
    }
    const updated = [...savedItems, item];
    setSavedItems(updated);
    localStorage.setItem('savedItems', JSON.stringify(updated));
    showToast(`✅ "${item.title}" saqlandi!`, 'success');
  };

  const addToCard = (item) => {
    if (collections.some(col => col.id === item.id)) {
      showToast(`⚠️ "${item.title}" allaqachon koleksiyada!`, 'warning');
      return;
    }
    const updated = [...collections, item];
    setCollections(updated);
    localStorage.setItem('collections', JSON.stringify(updated));
    showToast(`🚀 "${item.title}" koleksiyaga qo'shildi!`, 'success');
  };

  const removeFromSaved = (id) => {
    const updated = savedItems.filter(item => item.id !== id);
    setSavedItems(updated);
    localStorage.setItem('savedItems', JSON.stringify(updated));
    showToast(`🗑️ Saqlanganlardan o'chirildi`, 'info');
  };

  const removeFromCard = (id) => {
    const updated = collections.filter(item => item.id !== id);
    setCollections(updated);
    localStorage.setItem('collections', JSON.stringify(updated));
    showToast(`🗑️ Koleksiyadan o'chirildi`, 'info');
  };

  const clearSearch = () => setSearchTerm("");

  return (
    <CardContext.Provider value={{
      // NFT
      savedItems, collections, addToSaved, addToCard,
      removeFromSaved, removeFromCard,
      searchTerm, setSearchTerm, clearSearch, toast, loading,
      // CART
      cartItems, cartCount, cartTotal,
      addToCart, removeFromCart, updateCartQuantity, clearCart
    }}>
      {children}
      {toast && (
        <div className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-2xl shadow-2xl z-50 animate-bounce text-sm font-bold flex items-center gap-2 ${
          toast.type === 'success' ? 'bg-green-600' : 
          toast.type === 'warning' ? 'bg-orange-500' : 'bg-[#6C5DD3]'
        } text-white`}>
          <span>{toast.type === 'success' ? '🎉' : toast.type === 'warning' ? '⚠️' : 'ℹ️'}</span>
          {toast.message}
        </div>
      )}
    </CardContext.Provider>
  );
};