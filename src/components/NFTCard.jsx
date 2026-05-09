import React from 'react';

const NFTCard = ({ item, isDark }) => {
  return (
    <div
      className={`${
        isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'
      } p-5 rounded-[28px] border border-white/5 hover:scale-[1.02] transition`}
    >
      {/* Image */}
      <div className="relative mb-4">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-52 object-cover rounded-[20px]"
        />
      </div>

      {/* Info */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-bold text-lg">{item.title}</h3>
        <span className="text-[#6C5DD3] font-bold">{item.price}</span>
      </div>

      {/* Button */}
      <button className="w-full bg-[#6C5DD3] py-3 rounded-xl font-bold hover:opacity-90">
        View NFT
      </button>
    </div>
  );
};

export default NFTCard;