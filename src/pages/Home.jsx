import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ isDark }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('API xatosi:', err);
        setLoading(false);
      });
  }, []);

  const categories = [
    { name: 'Klaviatura', icon: '🎹', count: 12 },
    { name: 'Mishka', icon: '🖱️', count: 8 },
    { name: 'Quloqchin', icon: '🎧', count: 10 },
    { name: 'Gaming stul', icon: '🪑', count: 6 },
    { name: 'Monitor', icon: '🖥️', count: 15 },
    { name: 'Kompyuter', icon: '⚡', count: 5 },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-[#6C5DD3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-10">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#6C5DD3] to-[#BC78EC] p-8 md:p-12 min-h-[280px] flex items-center">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs mb-4">
            🔥 Chegirmalar haftasi
          </div>
          <h1 className="text-3xl md:text-5xl font-black italic leading-tight text-white">
            Gaming aksessuarlari<br />bir joyda!
          </h1>
          <p className="mt-3 text-white/80 text-sm md:text-base max-w-md">
            KEYSTORE — O'zbekistonning eng katta gaming aksessuarlari do'koni
          </p>
          <Link
            to="/products"
            className="inline-block mt-6 bg-white text-[#6C5DD3] px-6 md:px-8 py-2 md:py-3 rounded-xl font-bold hover:scale-105 transition"
          >
            Xarid qilish
          </Link>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 md:w-64 md:h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 md:w-64 md:h-64 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Kategoriyalar */}
      <div>
        <h2 className="text-2xl font-black italic mb-6">Kategoriyalar</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat, idx) => (
            <Link
              key={idx}
             to={"/products?category=" + encodeURIComponent(cat.name)}  
            className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white'} p-6 rounded-2xl text-center hover:-translate-y-2 transition-all duration-300`}
              <div className="text-4xl mb-3">{cat.icon}</div>
              <h3 className="font-bold text-sm">{cat.name}</h3>
              <p className="text-xs opacity-50 mt-1">{cat.count} ta mahsulot</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Eng ko'p sotilganlar */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-black italic">🔥 Eng ko'p sotilganlar</h2>
          <Link to="/products" className="text-[#6C5DD3] text-sm hover:underline">
            Hammasini ko'rish →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} p-4 rounded-2xl hover:-translate-y-2 transition-all duration-300 group`}
            >
              <div className="overflow-hidden rounded-xl mb-3">
                <img
                  src={product.image || 'https://via.placeholder.com/300'}
                  className="w-full h-36 object-cover group-hover:scale-110 transition duration-500"
                  alt={product.name}
                />
              </div>
              <h3 className="font-bold text-sm mb-1 line-clamp-1">{product.name}</h3>
              <div className="flex items-center gap-1 mb-2">
                <span className="text-yellow-500 text-xs">★★★★★</span>
                <span className="text-xs opacity-50">(4.8)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-[#6C5DD3]">{product.price?.toLocaleString()} so'm</span>
                <button
                  onClick={(e) => { e.preventDefault(); alert('Savatga qo\'shildi!'); }}
                  className="w-7 h-7 rounded-full bg-[#6C5DD3]/20 text-[#6C5DD3] flex items-center justify-center hover:bg-[#6C5DD3] hover:text-white transition text-sm"
                >
                  🛒
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} rounded-2xl p-6 text-center`}>
        <h2 className="text-xl md:text-2xl font-black italic mb-2">O'zbekistonda bepul yetkazib berish!</h2>
        <p className="opacity-70 text-sm mb-4">100 000 so'mdan yuqori bo'lgan barcha buyurtmalar bepul</p>
        <Link to="/products" className="inline-block bg-[#6C5DD3] text-white px-6 py-2 rounded-xl font-bold text-sm hover:scale-105 transition">
          Barcha mahsulotlar
        </Link>
      </div>
    </div>
  );
};

export default Home;


