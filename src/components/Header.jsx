import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreProvider } from './context/StoreContext.jsx'
import { useAuth } from '../context/AuthContext';

const Header = ({ isDark, setIsDark }) => {
  const { searchTerm, setSearchTerm, clearSearch, cartCount } = useContext(StoreContext);
  const { user, logout } = useAuth();
  const [localSearch, setLocalSearch] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(localSearch), 300);
    return () => clearTimeout(timer);
  }, [localSearch, setSearchTerm]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-opacity-80 backdrop-blur-sm sticky top-0 z-40">
      
      {/* Logo (mobil uchun) */}
      <Link to="/" className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] rounded-xl flex items-center justify-center text-white font-bold">
          K
        </div>
      </Link>

      {/* Search Input */}
      <div className="relative flex-1 max-w-md mx-4">
        <input
          type="text"
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          placeholder="Mahsulotlarni qidirish..."
          className={`w-full pl-10 pr-10 py-2.5 rounded-xl outline-none transition-all duration-300 text-sm ${
            isDark 
              ? 'bg-[#1B1B30] border border-white/10 focus:border-[#6C5DD3] text-white placeholder:text-gray-500' 
              : 'bg-gray-100 border border-gray-200 focus:border-[#6C5DD3] text-gray-900 placeholder:text-gray-400'
          }`}
        />
        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        {localSearch && (
          <button onClick={() => { setLocalSearch(""); clearSearch(); }} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-red-500">
            ✕
          </button>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">
        
        {/* Cart Icon */}
        <Link to="/cart" className="relative p-2 rounded-xl hover:bg-[#1B1B30] transition">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-1.5 6.5M17 13l1.5 6.5M9 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM17 21a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </Link>

        {/* Theme Toggle (faqat quyosh/oy, qo'ng'iroqcha yo'q) */}
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2 rounded-xl transition-all duration-300 hover:scale-110 ${
            isDark ? 'bg-[#1B1B30] text-yellow-400' : 'bg-gray-200 text-indigo-600'
          }`}
        >
          {isDark ? '☀️' : '🌙'}
        </button>

        {/* Auth - Login/Register */}
        {user ? (
          <div className="flex items-center gap-2">
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=User"
                className="w-8 h-8 rounded-full border-2 border-[#6C5DD3] object-cover"
                alt="profile"
              />
            </Link>
            <button onClick={handleLogout} className="text-xs text-red-400 hover:text-red-500 hidden sm:block">
              Chiqish
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-4 py-1.5 rounded-xl border border-[#6C5DD3] text-[#6C5DD3] font-bold text-xs hover:bg-[#6C5DD3] hover:text-white transition">
              Kirish
            </Link>
            <Link to="/register" className="px-4 py-1.5 rounded-xl bg-[#6C5DD3] text-white font-bold text-xs hover:bg-[#5a4cb3] transition hidden sm:block">
              Ro'yxat
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;