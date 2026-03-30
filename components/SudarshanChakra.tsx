'use client';

import { motion } from 'motion/react';

export default function SudarshanChakra({ className = "h-12 w-12", showFinger = true }: { className?: string, showFinger?: boolean }) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      className={`relative flex items-center justify-center ${className}`}
    >
      {/* Finger-like shape at the bottom */}
      {showFinger && (
        <div className="absolute bottom-0 w-2 h-6 bg-[#f9f7f2] border border-[#e5e1d8] rounded-full transform translate-y-2 z-0" />
      )}
      
      {/* Outer ring */}
      <div className="absolute inset-0 border-4 border-amber-400 rounded-full opacity-30 z-10" />
      
      {/* The Chakra SVG */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-amber-500 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)] z-20"
        fill="currentColor"
      >
        <circle cx="50" cy="50" r="8" className="text-amber-600" />
        {[...Array(12)].map((_, i) => (
          <path
            key={i}
            d="M50 10 L55 35 L45 35 Z"
            transform={`rotate(${i * 30} 50 50)`}
            className="text-amber-500"
          />
        ))}
        <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 2" />
      </svg>
      
      {/* Inner glow */}
      <div className="absolute w-4 h-4 bg-white rounded-full blur-sm opacity-80" />
    </motion.div>
  );
}
