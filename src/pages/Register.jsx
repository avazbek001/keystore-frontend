import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = ({ isDark }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Parollar mos kelmadi');
      return;
    }
    
    if (password.length < 4) {
      setError('Parol kamida 4 belgidan iborat bo\'lishi kerak');
      return;
    }
    
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      login(data.user, data.token);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className={`max-w-md w-full ${isDark ? 'bg-[#1B1B30]' : 'bg-white'} p-8 rounded-3xl shadow-2xl animate-fadeIn`}>
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] rounded-2xl flex items-center justify-center text-white font-black text-2xl mx-auto mb-4 shadow-lg">
            K
          </div>
          <h2 className="text-2xl font-bold italic">Hisob yaratish</h2>
          <p className="text-sm text-gray-400 mt-1">KEYSTORE ga xush kelibsiz</p>
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-500 p-3 rounded-xl text-sm mb-5 text-center">
            ⚠️ {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 opacity-70">To'liq ism</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-5 py-3 rounded-xl outline-none transition ${
                isDark ? 'bg-[#0E0E1E] border border-white/10 focus:border-[#6C5DD3]' : 'bg-gray-100 border border-gray-200 focus:border-[#6C5DD3]'
              }`}
              placeholder="Ismingiz"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-5 py-3 rounded-xl outline-none transition ${
                isDark ? 'bg-[#0E0E1E] border border-white/10 focus:border-[#6C5DD3]' : 'bg-gray-100 border border-gray-200 focus:border-[#6C5DD3]'
              }`}
              placeholder="example@mail.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-5 py-3 rounded-xl outline-none transition ${
                isDark ? 'bg-[#0E0E1E] border border-white/10 focus:border-[#6C5DD3]' : 'bg-gray-100 border border-gray-200 focus:border-[#6C5DD3]'
              }`}
              placeholder="••••••••"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2 opacity-70">Parolni tasdiqlang</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full px-5 py-3 rounded-xl outline-none transition ${
                isDark ? 'bg-[#0E0E1E] border border-white/10 focus:border-[#6C5DD3]' : 'bg-gray-100 border border-gray-200 focus:border-[#6C5DD3]'
              }`}
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#6C5DD3] to-[#A093F1] text-white rounded-xl font-bold hover:scale-105 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-purple-500/30"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Kutilmoqda...</span>
              </div>
            ) : (
              'Ro\'yxatdan o\'tish'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center mt-6 text-sm opacity-60">
          Hisobingiz bormi?{' '}
          <Link to="/login" className="text-[#6C5DD3] hover:underline font-medium">
            Kirish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;