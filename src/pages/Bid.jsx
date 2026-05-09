import React from 'react';

const Bids = ({ isDark }) => {
  return (
    <div className="p-8 space-y-10">
      {/* 4 ta Statistika kartochkalari */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Artworks', val: '24K', color: 'bg-[#6C5DD3]' },
          { label: 'Auction', val: '82K', color: 'bg-[#7FC008]' },
          { label: 'Creators', val: '200', color: 'bg-[#FFCE4D]' },
          { label: 'Canceled', val: '89', color: 'bg-[#FF5B5B]' }
        ].map((s, i) => (
          <div key={i} className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-lg'} p-6 rounded-[24px] flex items-center gap-5`}>
            <div className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center text-white text-xl`}>📊</div>
            <div><p className="text-xl font-black italic">{s.val}</p><p className="text-xs opacity-50 font-bold">{s.label}</p></div>
          </div>
        ))}
      </div>

      {/* ACTIVE BIDS JADVALI */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-black italic">Active Bids</h2>
          <button className="bg-[#6C5DD3] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-indigo-500/30">Place a Bid</button>
        </div>
        
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-xl'} rounded-[32px] overflow-hidden border border-white/5`}>
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-[10px] uppercase tracking-widest opacity-40">
                <th className="p-6">Item List</th>
                <th>Open Price</th>
                <th>Your Offer</th>
                <th>Recent Offer</th>
                <th>Time Left</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm font-bold italic">
              {[1, 2, 3, 4, 5].map(i => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition">
                  <td className="p-4 flex items-center gap-4">
                    <img src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=100" className="w-12 h-12 rounded-xl object-cover" />
                    <div><p>Cute Cube Cool</p><p className="text-[10px] opacity-40 not-italic">John Abraham</p></div>
                  </td>
                  <td>0.0025 ETH</td>
                  <td>0.0025 ETH</td>
                  <td className="flex items-center gap-2 mt-4"><div className="w-6 h-6 rounded-full bg-gray-400" /> 0.0025 ETH</td>
                  <td>2 Hours 1 min 30s</td>
                  <td className="text-center"><button className="text-xl opacity-30 hover:text-red-500 hover:opacity-100 transition">×</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Bids;