import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = ({ isDark }) => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    // TOKEN BILAN SO'ROV YUBORISH
    fetch('http://localhost:5000/api/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        console.log('Profile from API:', data);
        if (data.id) {
          setProfile(data);
          setFormData({ 
            name: data.name || '', 
            email: data.email || '', 
            phone: data.phone || '', 
            address: data.address || '' 
          });
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Profile fetch error:', err);
        setLoading(false);
      });
  }, [token]);

  const handleSave = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setProfile({ ...profile, ...formData });
        setEditing(false);
        alert('Ma\'lumotlar saqlandi!');
      }
    } catch (err) {
      alert('Xatolik: ' + err.message);
    }
  };

  if (!token) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <div className="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center text-3xl mb-4">👤</div>
        <p className="text-gray-400 mb-4">Profilni ko'rish uchun tizimga kiring</p>
        <Link to="/login" className="bg-[#6C5DD3] text-white px-6 py-2 rounded-xl">Kirish</Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-3 border-[#6C5DD3] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-gray-400">Ma'lumotlar topilmadi</p>
        <button onClick={() => window.location.reload()} className="mt-4 text-[#6C5DD3]">Qayta urinish</button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-black italic mb-6 text-white">👤 Mening profiling</h1>
      
      <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} rounded-2xl p-6 space-y-5 border border-white/10`}>
        {/* Avatar va Ism */}
        <div className="flex items-center gap-4 pb-4 border-b border-white/10">
          <div className="w-20 h-20 bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            {profile.name?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{profile.name || 'Foydalanuvchi'}</h2>
            <p className="text-sm text-gray-400">{profile.email}</p>
            <p className="text-xs text-gray-500 mt-1">Ro'yxatdan o'tgan: {profile.created_at ? new Date(profile.created_at).toLocaleDateString() : '—'}</p>
          </div>
        </div>

        {editing ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-400">To'liq ism</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full p-3 rounded-xl outline-none mt-1 ${isDark ? 'bg-[#0A0A0F] border border-white/10 text-white' : 'bg-gray-100 border border-gray-200'}`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full p-3 rounded-xl outline-none mt-1 ${isDark ? 'bg-[#0A0A0F] border border-white/10 text-white' : 'bg-gray-100 border border-gray-200'}`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Telefon</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+998 xx xxx xx xx"
                className={`w-full p-3 rounded-xl outline-none mt-1 ${isDark ? 'bg-[#0A0A0F] border border-white/10 text-white' : 'bg-gray-100 border border-gray-200'}`}
              />
            </div>
            <div>
              <label className="text-sm text-gray-400">Manzil</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows="2"
                placeholder="To'liq manzilingiz"
                className={`w-full p-3 rounded-xl outline-none mt-1 ${isDark ? 'bg-[#0A0A0F] border border-white/10 text-white' : 'bg-gray-100 border border-gray-200'}`}
              />
            </div>
            <div className="flex gap-3 pt-3">
              <button onClick={handleSave} className="bg-[#6C5DD3] text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition">
                Saqlash
              </button>
              <button onClick={() => setEditing(false)} className="bg-gray-600 text-white px-6 py-2 rounded-xl hover:bg-gray-500 transition">
                Bekor qilish
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-400">📞 Telefon:</span>
              <span className="text-white">{profile.phone || '—'}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/10">
              <span className="text-gray-400">📍 Manzil:</span>
              <span className="text-white text-right">{profile.address || '—'}</span>
            </div>
            <button onClick={() => setEditing(true)} className="mt-4 bg-[#6C5DD3] text-white px-6 py-2 rounded-xl font-bold hover:opacity-90 transition">
              ✏️ Tahrirlash
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;