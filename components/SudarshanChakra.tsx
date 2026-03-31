'use client';

import { motion } from 'framer-motion';

interface SudarshanChakraProps {
  size?: number;
  className?: string;
}

export default function SudarshanChakra({ size = 200, className = "" }: SudarshanChakraProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
      
      {/* Spokes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 bg-primary/40"
          style={{
            height: size * 0.8,
            transform: `rotate(${i * 45}deg)`,
          }}
        />
      ))}
      
      {/* Inner Circle */}
      <div className="absolute w-1/4 h-1/4 rounded-full bg-primary/20 blur-sm" />
      <div className="absolute w-1/6 h-1/6 rounded-full bg-primary shadow-[0_0_20px_rgba(242,125,38,0.5)]" />
      
      {/* Decorative Dots */}
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary rounded-full"
          style={{
            transform: `rotate(${i * 22.5}deg) translateY(-${size / 2.2}px)`,
          }}
        />
      ))}
    </motion.div>
  );
}
