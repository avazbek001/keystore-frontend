import React from 'react';
import { Link } from 'react-router-dom';

const MarketHome = ({ isDark }) => {
  return (
    <div className="p-8">
      <div className="bg-gradient-to-r from-[#6C5DD3] to-[#BC78EC] rounded-[40px] p-12 text-center">
        <h1 className="text-4xl font-bold italic text-white mb-4">Marketplace</h1>
        <p className="text-white/80 mb-8">Coming soon! Products will appear here.</p>
        <Link to="/products" className="bg-white text-[#6C5DD3] px-8 py-3 rounded-2xl font-bold">
          Browse Products →
        </Link>
      </div>
    </div>
  );
};

export default MarketHome;