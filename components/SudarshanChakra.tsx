'use client';

import { motion } from 'framer-motion';

interface SudarshanChakraProps {
  size?: number;
  className?: string;
  showFinger?: boolean;
}

export default function SudarshanChakra({ size = 200, className = "", showFinger = false }: SudarshanChakraProps) {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl animate-pulse" />
      
      {/* Outer Ring */}
      <div className="absolute inset-0 rounded-full border-4 border-primary/40 shadow-[0_0_15px_rgba(242,125,38,0.3)]" />
      
      {/* Spokes */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 bg-gradient-to-t from-primary/60 to-transparent"
          style={{
            height: size * 0.9,
            transform: `rotate(${i * 30}deg)`,
          }}
        />
      ))}
      
      {/* Inner Circle */}
      <div className="absolute w-1/3 h-1/3 rounded-full bg-primary/30 blur-md animate-pulse" />
      <div className="absolute w-1/5 h-1/5 rounded-full bg-primary shadow-[0_0_30px_rgba(242,125,38,0.8)]" />
      
      {/* Decorative Dots */}
      {[...Array(24)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_rgba(242,125,38,1)]"
          style={{
            transform: `rotate(${i * 15}deg) translateY(-${size / 2.1}px)`,
          }}
        />
      ))}
    </motion.div>
  );
}
