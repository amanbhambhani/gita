'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PeacockFeather() {
  return (
    <motion.div
      animate={{ 
        y: [0, -20, 0],
        rotate: [-5, 5, -5],
        scale: [1, 1.05, 1]
      }}
      transition={{ 
        duration: 6, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="fixed top-10 right-10 w-32 h-32 pointer-events-none z-50 opacity-80"
    >
      <div className="relative w-full h-full">
        <Image 
          src="https://picsum.photos/seed/peacock-feather/300/300" 
          alt="Peacock Feather" 
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}
