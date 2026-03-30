'use client';

import { motion } from 'motion/react';

export default function BattlefieldBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdfcf8] via-[#f9f7f2] to-[#e5e1d8]" />
      
      {/* Distant Mountains */}
      <svg className="absolute bottom-0 w-full h-1/3 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path fill="#5a5a40" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,250.7C960,235,1056,181,1152,165.3C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
      </svg>

      {/* Dust/Atmosphere */}
      <motion.div 
        animate={{ 
          x: [0, 100, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,#d1cdc2_0%,transparent_50%)]"
      />

      {/* Distant Chariots (Silhouettes) */}
      <div className="absolute bottom-10 left-10 opacity-5">
        <svg width="100" height="60" viewBox="0 0 100 60">
          <rect x="20" y="30" width="40" height="20" fill="#5a5a40" />
          <circle cx="30" cy="50" r="8" fill="#5a5a40" />
          <circle cx="50" cy="50" r="8" fill="#5a5a40" />
          <path d="M60 30 L80 10" stroke="#5a5a40" strokeWidth="2" />
        </svg>
      </div>
      
      <div className="absolute bottom-20 right-20 opacity-5 scale-x-[-1]">
        <svg width="120" height="70" viewBox="0 0 120 70">
          <rect x="20" y="35" width="50" height="25" fill="#5a5a40" />
          <circle cx="35" cy="60" r="10" fill="#5a5a40" />
          <circle cx="55" cy="60" r="10" fill="#5a5a40" />
          <path d="M70 35 L100 10" stroke="#5a5a40" strokeWidth="2" />
        </svg>
      </div>
    </div>
  );
}
