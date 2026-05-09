import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CardProvider } from './context/CardContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Settings from './pages/Setting'; 
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';  // Yangi 404 sahifasi

function App() {
  const [isDark, setIsDark] = useState(true);

  return (
    <AuthProvider>
      <CardProvider>
        <BrowserRouter>
          <div className={`flex min-h-screen transition-colors duration-300 ${isDark ? 'bg-[#0A0A0F] text-white' : 'bg-gray-100 text-black'}`}>
            <Sidebar isDark={isDark} />
            <div className="flex-1 flex flex-col overflow-hidden">
              <Header isDark={isDark} setIsDark={setIsDark} />
              <main className="flex-1 overflow-y-auto">
                <Routes>
                  <Route path="/" element={<Home isDark={isDark} />} />
                  <Route path="/products" element={<Products isDark={isDark} />} />
                  <Route path="/product/:id" element={<ProductDetail isDark={isDark} />} />
                  <Route path="/cart" element={<Cart isDark={isDark} />} />
                  <Route path="/checkout" element={<Checkout isDark={isDark} />} />
                  <Route path="/orders" element={<Orders isDark={isDark} />} />
                  <Route path="/profile" element={<Profile isDark={isDark} />} />
                  <Route path="/settings" element={<Settings isDark={isDark} />} />
                  <Route path="/login" element={<Login isDark={isDark} />} />
                  <Route path="/register" element={<Register isDark={isDark} />} />
                  <Route path="*" element={<NotFound isDark={isDark} />} />
                </Routes>
              </main>
            </div>
          </div>
        </BrowserRouter>
      </CardProvider>
    </AuthProvider>
  );
}

export default App;