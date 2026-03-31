'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function PeacockFeather() {
  return (
    <motion.div
      animate={{ 
        y: [0, -30, 0],
        rotate: [-8, 8, -8],
        scale: [1, 1.1, 1],
        filter: ["blur(0px) drop-shadow(0 0 0px rgba(242,125,38,0))", "blur(0.5px) drop-shadow(0 0 10px rgba(242,125,38,0.3))", "blur(0px) drop-shadow(0 0 0px rgba(242,125,38,0))"]
      }}
      transition={{ 
        duration: 8, 
        repeat: Infinity, 
        ease: "easeInOut" 
      }}
      className="fixed top-10 right-10 w-40 h-40 pointer-events-none z-50 opacity-90"
    >
      <div className="relative w-full h-full">
        <Image 
          src="https://picsum.photos/seed/peacock-feather-divine/400/400" 
          alt="Peacock Feather" 
          fill
          className="object-contain"
          referrerPolicy="no-referrer"
        />
      </div>
    </motion.div>
  );
}
