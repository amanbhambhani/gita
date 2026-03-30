import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

export default function App() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      if (userData) setUser(JSON.parse(userData));
      else setUser(null);
    };

    checkAuth();
    window.addEventListener('auth-change', checkAuth);
    return () => window.removeEventListener('auth-change', checkAuth);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main>
          <Routes>
            <Route path="/" element={<Navigate to={user ? "/dashboard" : "/login"} />} />
            <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
            <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
          </Routes>
        </main>

        <footer className="py-8 border-t border-blue-50 bg-white text-center">
          <p className="text-gray-500 text-sm">
            Created and Designed by <span className="font-semibold text-blue-600">Aman Bhambhani</span>
          </p>
          <p className="text-gray-400 text-[10px] mt-2 uppercase tracking-widest">
            Bhagavad Gita Wisdom • AI Powered
          </p>
        </footer>
      </div>
    </Router>
  );
}
