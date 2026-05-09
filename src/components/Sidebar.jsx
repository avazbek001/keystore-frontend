import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  FiHome, FiMonitor, FiMousePointer, FiHeadphones, FiTrendingUp, FiUser, FiPackage, FiSettings
} from 'react-icons/fi';
import { MdKeyboard, MdComputer } from 'react-icons/md';
import { GiOfficeChair } from 'react-icons/gi';

const Sidebar = ({ isDark }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const currentCategory = searchParams.get('category');

  const menuItems = [
    { name: 'Bosh sahifa', path: '/', icon: <FiHome className="w-5 h-5" />, category: null, exact: true },
    { name: 'Klaviatura', path: '/products', icon: <MdKeyboard className="w-5 h-5" />, category: 'Klaviatura' },
    { name: 'Mishka', path: '/products', icon: <FiMousePointer className="w-5 h-5" />, category: 'Mishka' },
    { name: 'Quloqchin', path: '/products', icon: <FiHeadphones className="w-5 h-5" />, category: 'Quloqchin' },
    { name: 'Gaming stul', path: '/products', icon: <GiOfficeChair className="w-5 h-5" />, category: 'Gaming stul' },
    { name: 'Monitor', path: '/products', icon: <FiMonitor className="w-5 h-5" />, category: 'Monitor' },
    { name: 'Kompyuter', path: '/products', icon: <MdComputer className="w-5 h-5" />, category: 'Kompyuter' },
    { name: 'Trendlar', path: '/products', icon: <FiTrendingUp className="w-5 h-5" />, category: null },
    { name: 'Profil', path: '/profile', icon: <FiUser className="w-5 h-5" />, category: null, exact: true },
    { name: 'Buyurtmalar', path: '/orders', icon: <FiPackage className="w-5 h-5" />, category: null, exact: true },
    { name: 'Sozlamalar', path: '/settings', icon: <FiSettings className="w-5 h-5" />, category: null, exact: true },
  ];

  const isActiveLink = (item) => {
    if (item.exact && item.path === '/') {
      return location.pathname === '/';
    }
    if (item.category) {
      return location.pathname === '/products' && currentCategory === item.category;
    }
    if (item.path === '/products' && !item.category) {
      return location.pathname === '/products' && !currentCategory;
    }
    return location.pathname === item.path;
  };

  return (
    <div className={`w-20 lg:w-72 h-screen sticky top-0 transition-all duration-500 overflow-y-auto ${
      isDark ? 'bg-[#0F0F1A] border-r border-white/5' : 'bg-white border-r border-gray-200 shadow-xl'
    }`}>
      
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <div className="flex items-center justify-center lg:justify-start gap-3 group">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] rounded-xl blur-lg opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
            <div className="relative w-10 h-10 bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] rounded-xl flex items-center justify-center text-white font-black text-xl">
              K
            </div>
          </div>
          <div className="hidden lg:block">
            <h1 className="font-black text-xl tracking-tight bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] bg-clip-text text-transparent">
              KEYSTORE
            </h1>
            <p className="text-[10px] opacity-50">Gaming aksessuarlari</p>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="p-3 space-y-1.5">
        {menuItems.map((item, idx) => {
          const isActive = isActiveLink(item);

          return (
            <NavLink
              key={idx}
              to={item.category ? `${item.path}?category=${encodeURIComponent(item.category)}` : item.path}
              end={item.exact}
              className={`group flex items-center justify-center lg:justify-start gap-3 px-3 py-3 rounded-xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] text-white shadow-lg shadow-purple-500/30'
                  : isDark
                  ? 'text-gray-400 hover:bg-white/5 hover:text-white'
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className={`transition-transform duration-300 group-hover:scale-110 ${isActive ? 'animate-pulse' : ''}`}>
                {item.icon}
              </div>
              <span className="hidden lg:block text-sm font-medium">{item.name}</span>
              {isActive && (
                <span className="hidden lg:block ml-auto w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
              )}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;