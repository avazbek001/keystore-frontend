import React, { useContext } from 'react';
import { StoreProvider } from './context/StoreContext.jsx'

const Saved = ({ isDark }) => {
  const context = useContext(StoreContext);
  
  if (!context) return <div className="p-10 text-center">Loading...</div>;
  
  const { savedItems = [], removeFromSaved } = context;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-black italic mb-8">Saved NFTs</h2>
      {savedItems.length === 0 ? (
        <p className="opacity-50 text-center py-20">
          Hali hech narsa saqlanmadi!❤️ 
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {savedItems.map((item) => (
            <div 
              key={item.id} 
              className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} p-4 rounded-2xl border border-white/5 relative group`}
            >
              <button 
                onClick={() => removeFromSaved(item.id)}
                className="absolute top-2 right-2 p-2 bg-red-500/80 rounded-full text-white opacity-0 group-hover:opacity-100 transition text-xs"
              >
                ✕
              </button>
              <img 
                src={item.image} 
                className="w-full h-40 object-cover rounded-xl mb-3" 
                alt={item.title} 
              />
              <h3 className="font-bold italic">{item.title}</h3>
              <p className="text-[#6C5DD3] font-bold mt-1">{item.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Saved;