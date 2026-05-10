import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { StoreContext } from "../context/StoreContext";

const Products = ({ isDark }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const { addToCart } = useContext(StoreContext);

  useEffect(() => {
    setLoading(true);
    let url = 'http://localhost:5000/api/products';
    if (category) {
      url = `http://localhost:5000/api/products?category=${encodeURIComponent(category)}`;
    }
    
    console.log('Fetching products for category:', category);
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log('Received products:', data.length);
        setProducts(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setProducts([]);
        setLoading(false);
      });
  }, [category]); // category o'zgarganda qayta ishlaydi

  const handleAddToCart = (e, product) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const getCategoryTitle = () => {
    if (!category) return 'Barcha mahsulotlar';
    const titles = {
      'Klaviatura': '🎹 Klaviatura',
      'Mishka': '🖱️ Mishka',
      'Quloqchin': '🎧 Quloqchinlar',
      'Gaming stul': '🪑 Gaming stullar',
      'Monitor': '🖥️ Monitorlar',
      'Kompyuter': '⚡ Gaming kompyuterlar'
    };
    return titles[category] || category;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#6C5DD3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-black italic mb-2">{getCategoryTitle()}</h1>
      <p className="text-sm opacity-60 mb-6">{products.length} ta mahsulot topildi</p>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">Bu kategoriyada mahsulot topilmadi</p>
          <Link to="/products" className="text-[#6C5DD3] mt-4 inline-block">Barcha mahsulotlar</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {products.map((product) => (
            <div
              key={product.id}
              className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} p-4 rounded-2xl hover:-translate-y-2 transition-all duration-300 group`}
            >
              <Link to={`/product/${product.id}`}>
                <div className="overflow-hidden rounded-xl mb-3">
                  <img 
                    src={product.image || 'https://via.placeholder.com/300'} 
                    className="w-full h-40 object-cover group-hover:scale-110 transition duration-500" 
                    alt={product.name} 
                  />
                </div>
                <h3 className="font-bold text-base mb-1 line-clamp-1">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-yellow-500 text-xs">★★★★★</span>
                  <span className="text-xs opacity-50">(4.8)</span>
                </div>
                <p className="text-xl font-bold text-[#6C5DD3]">{product.price?.toLocaleString()} so'm</p>
              </Link>
              <button 
                onClick={(e) => handleAddToCart(e, product)}
                className="w-full mt-3 bg-[#6C5DD3] text-white py-2 rounded-xl font-bold text-sm hover:opacity-90 transition"
              >
                Savatga qo'shish
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;