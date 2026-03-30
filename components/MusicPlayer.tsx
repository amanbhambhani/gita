'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Placeholder URL - User should replace this with their shared music file path or URL
  const musicUrl = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3; // Set a comfortable background volume
    }
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Playback failed:", err);
          alert("Please interact with the page first to enable audio playback.");
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-md border border-[#e5e1d8] px-4 py-2 rounded-2xl shadow-xl text-xs font-serif italic text-[#5a5a40] mb-2"
          >
            {isPlaying ? "Divine Melodies Playing..." : "Listen to Divine Melodies"}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        onClick={toggleMusic}
        className={`p-4 rounded-full shadow-2xl transition-all border-2 ${
          isPlaying 
            ? 'bg-[#5a5a40] text-white border-[#5a5a40]' 
            : 'bg-white text-[#5a5a40] border-[#e5e1d8]'
        }`}
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          >
            <Volume2 className="h-6 w-6" />
          </motion.div>
        ) : (
          <VolumeX className="h-6 w-6" />
        )}
      </motion.button>

      <audio ref={audioRef} src={musicUrl} />
      
      {/* Visual Indicator for Playing State */}
      {isPlaying && (
        <div className="flex gap-1 h-4 items-end px-2">
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ height: [4, 12, 6, 16, 4] }}
              transition={{ 
                duration: 0.8 + i * 0.2, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
              className="w-1 bg-[#5a5a40] rounded-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
