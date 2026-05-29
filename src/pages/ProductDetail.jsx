import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const ProductDetail = ({ isDark }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(StoreContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    alert(`${product.name} savatga qo'shildi!`);
  };

  if (loading) {
    return <div className="p-20 text-center">Yuklanmoqda...</div>;
  }

  if (!product) {
    return <div className="p-20 text-center">Mahsulot topilmadi</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 text-[#6C5DD3] hover:underline">
        ← Back
      </button>
      
      <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-lg'} rounded-3xl p-8 flex flex-col md:flex-row gap-8`}>
        <img 
          src={product.image} 
          className="w-full md:w-1/2 rounded-2xl object-cover" 
          alt={product.name} 
        />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-6">{product.description || 'Gaming aksessuari'}</p>
          <div className="text-3xl font-bold text-[#6C5DD3] mb-4">{product.price?.toLocaleString()} so'm</div>
          
          <div className="flex items-center gap-4 mb-6">
            <span>Quantity:</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                -
              </button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="w-8 h-8 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart} 
            className="w-full bg-[#6C5DD3] text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
          >
            Savatga qo'shish
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
