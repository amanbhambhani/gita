import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    region: 'Delhi',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const regions = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Delhi", "USA", "UK", "Canada", "Australia", "Other"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      window.dispatchEvent(new Event('auth-change'));
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-4 bg-gradient-to-b from-blue-50 to-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Join Gita AI
        </h2>
        
        {error && <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
          <input
            type="tel"
            placeholder="Mobile Number"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
            value={formData.mobile}
            onChange={(e) => setFormData({...formData, mobile: e.target.value})}
            required
          />
          <select
            className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
            required
          >
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
          <input
            type="password"
            placeholder="Create Password"
            className="w-full px-4 py-3 rounded-xl border border-blue-100 focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50/30"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            required
          />
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Register
          </button>
        </form>
        
        <p className="text-center mt-6 text-sm text-gray-600">
          Already have an account? <a href="/login" className="text-blue-600 font-semibold">Login</a>
        </p>
      </motion.div>
    </div>
  );
}
