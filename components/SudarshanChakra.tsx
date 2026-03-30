'use client';

import { motion } from 'framer-motion';

export default function SudarshanChakra({ size = 100, className = "" }: { size?: number, className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      {/* Outer Glow */}
      <div 
        className="absolute inset-0 rounded-full bg-primary/20 blur-xl animate-pulse"
      />
      
      {/* The Chakra */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="relative w-full h-full"
      >
        {/* Main Ring */}
        <div className="absolute inset-0 border-4 border-primary rounded-full shadow-[0_0_15px_rgba(212,175,55,0.8)]" />
        
        {/* Spokes */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-full h-[2px] bg-primary/60"
            style={{
              transform: `translate(-50%, -50%) rotate(${i * 45}deg)`,
            }}
          />
        ))}
        
        {/* Inner Ring */}
        <div className="absolute inset-[25%] border-2 border-primary/80 rounded-full" />
        
        {/* Center Point */}
        <div className="absolute inset-[45%] bg-primary rounded-full shadow-[0_0_10px_rgba(212,175,55,1)]" />
        
        {/* Sharp Edges (Blades) */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[12px] border-b-primary"
            style={{
              transform: `rotate(${i * 22.5}deg) translateY(-4px)`,
              transformOrigin: `center ${size / 2}px`
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
