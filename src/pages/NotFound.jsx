import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = ({ isDark }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center p-6">
      <div className="text-9xl font-black italic text-[#6C5DD3] mb-4">404</div>
      <h1 className="text-3xl font-bold mb-3">Sahifa topilmadi</h1>
      <p className="text-gray-400 mb-6">Siz qidirgan sahifa mavjud emas yoki ko'chirilgan</p>
      <Link 
        to="/" 
        className="bg-[#6C5DD3] text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition"
      >
        Bosh sahifaga qaytish
      </Link>
    </div>
  );
};

export default NotFound;