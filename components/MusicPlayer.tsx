'use client';

import { useState, useEffect, useRef } from 'react';
import { Music, Music2, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { db, doc, onSnapshot } from '@/firebase';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [musicUrl, setMusicUrl] = useState("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Listen for audio updates from the admin panel
    const unsubscribe = onSnapshot(doc(db, 'settings', 'audio'), (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if (data.url) {
          setMusicUrl(data.url);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback failed:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      <audio ref={audioRef} src={musicUrl} />
      
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-primary/20 shadow-lg flex items-center gap-2"
          >
            <div className="flex gap-1 items-end h-3">
              {[1, 2, 3, 4].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 12, 4] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                  className="w-1 bg-primary rounded-full"
                />
              ))}
            </div>
            <span className="text-xs font-medium text-primary uppercase tracking-widest">Divine Melody</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex gap-2">
        <button
          onClick={toggleMute}
          className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md border border-primary/20 shadow-lg flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        
        <button
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-primary shadow-lg flex items-center justify-center text-white hover:scale-110 transition-all"
        >
          {isPlaying ? <Music2 size={20} /> : <Music size={20} />}
        </button>
      </div>
    </div>
  );
}
