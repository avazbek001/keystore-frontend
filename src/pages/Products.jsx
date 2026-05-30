import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const Products = ({ isDark }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  useEffect(() => {
   let url = `${import.meta.env.VITE_API_URL}/api/products`;
    if (category) url += "?category=" + encodeURIComponent(category);
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [category]);

  if (loading) return <div className="p-20 text-center">Yuklanmoqda...</div>;

  return (
    <div className="p-6">
      {category ? category + "lar" : 'Barcha mahsulotlar'}
      <p className="text-sm opacity-60 mb-6">{products.length} ta mahsulot topildi</p>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {products.map(product => (
         <Link key={product.id} to={"/product/" + product.id} className={(isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md') + ' p-4 rounded-2xl hover:-translate-y-2 transition'}>
            <img src={product.image} className="w-full h-40 object-cover rounded-xl mb-3" />
            <h3 className="font-bold text-base">{product.name}</h3>
            <p className="text-xl font-bold text-[#6C5DD3] mt-2">{product.price?.toLocaleString()} so'm</p>
            <button className="w-full mt-3 bg-[#6C5DD3] text-white py-2 rounded-xl text-sm">Savatga qo'shish</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
