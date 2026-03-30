import React from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface NavbarProps {
  user: any;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity }}
            >
              <Sparkles className="h-8 w-8 text-blue-500" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Gita AI
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">Radhe Radhe, {user.name}</span>
                <button
                  onClick={onLogout}
                  className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <a href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</a>
                <a href="/register" className="text-sm font-medium text-blue-600 hover:text-blue-800">Register</a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
