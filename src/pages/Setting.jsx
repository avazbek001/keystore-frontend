import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Settings = ({ isDark }) => {
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('uz');
  const [darkModePreference, setDarkModePreference] = useState(true);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <p className="text-gray-400 mb-4">Sozlamalarni ko'rish uchun tizimga kiring</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-black italic mb-6">⚙️ Sozlamalar</h1>
      
      <div className="space-y-4">
        {/* Notification */}
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} rounded-2xl p-5 flex justify-between items-center`}>
          <div>
            <h3 className="font-bold">Bildirishnomalar</h3>
            <p className="text-sm opacity-60">Yangi aksiyalar va chegirmalar haqida xabar olish</p>
          </div>
          <button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 rounded-full transition ${notifications ? 'bg-[#6C5DD3]' : 'bg-gray-600'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${notifications ? 'translate-x-6' : 'translate-x-1'}`}></div>
          </button>
        </div>

        {/* Language */}
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} rounded-2xl p-5 flex justify-between items-center`}>
          <div>
            <h3 className="font-bold">Til</h3>
            <p className="text-sm opacity-60">Interfeys tili</p>
          </div>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className={`px-4 py-2 rounded-xl outline-none ${isDark ? 'bg-[#0A0A0F] border border-white/10' : 'bg-gray-100 border border-gray-200'}`}
          >
            <option value="uz">O'zbekcha</option>
            <option value="ru">Русский</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Dark Mode Preference */}
        <div className={`${isDark ? 'bg-[#1B1B30]' : 'bg-white shadow-md'} rounded-2xl p-5 flex justify-between items-center`}>
          <div>
            <h3 className="font-bold">Qorong'u rejim</h3>
            <p className="text-sm opacity-60">Sayt ko'rinishini o'zgartirish</p>
          </div>
          <button
            onClick={() => setDarkModePreference(!darkModePreference)}
            className={`w-12 h-6 rounded-full transition ${darkModePreference ? 'bg-[#6C5DD3]' : 'bg-gray-600'}`}
          >
            <div className={`w-5 h-5 rounded-full bg-white transition-transform ${darkModePreference ? 'translate-x-6' : 'translate-x-1'}`}></div>
          </button>
        </div>

        {/* Danger Zone */}
        <div className={`${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'} rounded-2xl p-5`}>
          <h3 className="font-bold text-red-500 mb-2">⚠️ Xavfli zona</h3>
          <p className="text-sm opacity-60 mb-4">Hisobingizni o'chirish. Bu amalni qaytarib bo'lmaydi.</p>
          <button className="bg-red-500 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-red-600 transition">
            Hisobni o'chirish
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;