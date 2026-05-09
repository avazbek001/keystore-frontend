import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ isDark }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      login(data.user, data.token);
      
      // Agar admin bo'lsa, admin panelga yuboramiz
      if (data.user.role === 'admin') {
        window.location.href = 'http://localhost:5174'; // Admin panel manzili
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-8">
      <div className={`max-w-md w-full ${isDark ? 'bg-[#1B1B30]' : 'bg-white'} p-8 rounded-3xl shadow-xl`}>
        <h2 className="text-3xl font-bold italic mb-6 text-center">Kirish</h2>
        
        {error && (
          <div className="bg-red-500/20 text-red-500 p-3 rounded-xl text-sm mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-2 opacity-70">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-5 py-3 rounded-xl outline-none transition ${
                isDark ? 'bg-[#0E0E1E] border border-white/10' : 'bg-gray-100 border border-gray-200'
              } focus:border-[#6C5DD3]`}
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
                isDark ? 'bg-[#0E0E1E] border border-white/10' : 'bg-gray-100 border border-gray-200'
              } focus:border-[#6C5DD3]`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#6C5DD3] text-white rounded-xl font-bold hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? 'Kutilmoqda...' : 'Kirish'}
          </button>
        </form>

        <p className="text-center mt-6 text-sm opacity-60">
          Hisobingiz yo'qmi?{' '}
          <Link to="/register" className="text-[#6C5DD3] hover:underline">
            Ro'yxatdan o'tish
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;