import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CardContext } from '../context/CardContext';

const ProductDetail = ({ isDark }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CardContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch xatosi:", err);
        // Test ma'lumot (backend bo'lmasa)
        setProduct({ 
          id: parseInt(id), 
          name: 'Test Product', 
          price: 99.99, 
          description: 'This is a test product', 
          image: 'https://via.placeholder.com/400', 
          stock: 10 
        });
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    console.log("Add to Cart clicked!", product, quantity);
    if (product) {
      addToCart(product, quantity);
      // Ixtiyoriy: sahifada qolish yoki cartga o'tish
      // navigate('/cart');
    } else {
      console.error("Product is null!");
    }
  };

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!product) return <div className="p-20 text-center">Product not found</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-6 text-[#6C5DD3] hover:underline">
        ← Back
      </button>
      
      <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white'} rounded-3xl p-8 flex flex-col md:flex-row gap-8`}>
        <img 
          src={product.image} 
          className="w-full md:w-1/2 rounded-2xl object-cover" 
          alt={product.name} 
        />
        
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-400 mb-6">{product.description}</p>
          <div className="text-3xl font-bold text-[#6C5DD3] mb-4">${product.price}</div>
          
          <div className="flex items-center gap-4 mb-6">
            <span>Quantity:</span>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                className="w-8 h-8 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                -
              </button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="w-8 h-8 rounded-lg bg-gray-600 hover:bg-gray-500"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart} 
            className="w-full bg-[#6C5DD3] text-white py-3 rounded-xl font-bold hover:opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;