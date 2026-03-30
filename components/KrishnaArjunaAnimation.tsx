'use client';

import { motion } from 'motion/react';

export default function KrishnaArjunaAnimation() {
  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Chariot Base */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="relative"
      >
        {/* Chariot Body */}
        <svg width="240" height="160" viewBox="0 0 240 160">
          {/* Wheels */}
          <motion.circle 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            cx="60" cy="130" r="25" fill="none" stroke="#5a5a40" strokeWidth="4" strokeDasharray="10 5" 
          />
          <motion.circle 
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            cx="180" cy="130" r="25" fill="none" stroke="#5a5a40" strokeWidth="4" strokeDasharray="10 5" 
          />
          
          {/* Body */}
          <path d="M40 100 L200 100 L220 50 L20 50 Z" fill="#f9f7f2" stroke="#5a5a40" strokeWidth="3" />
          
          {/* Flag */}
          <motion.path 
            animate={{ skewX: [0, 5, 0] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            d="M120 50 L120 10 L160 20 L120 30" fill="#5a5a40" stroke="#5a5a40" strokeWidth="2" 
          />
          
          {/* Krishna (Charioteer) */}
          <g transform="translate(140, 35)">
            <circle cx="0" cy="0" r="12" fill="#5a5a40" /> {/* Head */}
            <path d="M-10 15 L10 15 L15 40 L-15 40 Z" fill="#5a5a40" /> {/* Body */}
            {/* Reins */}
            <path d="M10 25 L60 25" stroke="#5a5a40" strokeWidth="2" strokeDasharray="4 2" />
          </g>
          
          {/* Arjuna (Warrior) */}
          <g transform="translate(60, 35)">
            <circle cx="0" cy="0" r="12" fill="#5a5a40" /> {/* Head */}
            <path d="M-10 15 L10 15 L15 40 L-15 40 Z" fill="#5a5a40" /> {/* Body */}
            {/* Bow */}
            <path d="M-15 10 Q-30 25 -15 40" fill="none" stroke="#5a5a40" strokeWidth="2" />
          </g>
        </svg>
      </motion.div>
      
      {/* Dust particles */}
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: 100, y: 150, opacity: 0 }}
          animate={{ x: -200, y: 140, opacity: [0, 0.5, 0] }}
          transition={{ 
            duration: 2 + Math.random() * 2, 
            repeat: Infinity, 
            delay: Math.random() * 2,
            ease: "linear" 
          }}
          className="absolute w-2 h-2 bg-[#d1cdc2] rounded-full"
        />
      ))}
    </div>
  );
}
