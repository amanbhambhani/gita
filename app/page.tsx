'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Book, Heart, Compass, ArrowRight } from 'lucide-react';
import SudarshanChakra from '@/components/SudarshanChakra';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 md:p-12 bg-[#fdfcf0] relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-20 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, -10, 0] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center z-10">
        {/* Hero Section */}
        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
              <Sparkles size={14} />
              <span>Divine Wisdom Awaits</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-black text-foreground leading-tight">
              Gita Guidance: <br />
              <span className="text-primary italic">Lord Krishna</span>
            </h1>
            <p className="text-lg text-foreground/70 max-w-md leading-relaxed">
              Find solutions to life&apos;s most challenging problems through the eternal wisdom of the Bhagavad Gita, interpreted for the modern world.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { icon: Book, title: "Eternal Wisdom", desc: "Based on 700 verses" },
              { icon: Compass, title: "Life Direction", desc: "Clear path forward" },
              { icon: Heart, title: "Inner Peace", desc: "Calm your restless mind" },
              { icon: Sparkles, title: "Divine Dialogue", desc: "Talk to Lord Krishna" },
            ].map((feature, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/50 border border-primary/10 hover:border-primary/30 transition-all group">
                <feature.icon className="text-primary mb-2 group-hover:scale-110 transition-all" size={24} />
                <h3 className="font-bold text-sm text-foreground">{feature.title}</h3>
                <p className="text-[10px] text-foreground/50 uppercase tracking-wider">{feature.desc}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <Link href="/chat" className="gita-button flex items-center gap-2 group w-full sm:w-auto justify-center">
              <span>Start Journey</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-all" />
            </Link>
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 overflow-hidden relative">
                  <Image 
                    src={`https://picsum.photos/seed/user${i}/100/100`} 
                    alt="User" 
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                +10k
              </div>
            </div>
            <p className="text-[10px] text-foreground/50 font-medium uppercase tracking-widest">Seekers Guided</p>
          </motion.div>
        </div>

        {/* Visual Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full aspect-square max-w-md">
            {/* Sudarshan Chakra in background */}
            <SudarshanChakra size={400} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40" />
            
            {/* Krishna Visual */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-primary shadow-2xl">
                <Image 
                  src="https://picsum.photos/seed/krishna-divine/800/800" 
                  alt="Lord Krishna" 
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-10 right-10 bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-primary/20"
            >
              <p className="text-xs font-bold text-primary italic">&quot;Do your duty without attachment.&quot;</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-primary/10 w-full text-center space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/40 font-medium">
          © 2026 Gita Guidance • Wisdom of the Ages
        </p>
        <p className="text-primary font-bold uppercase tracking-widest text-xs">
          Designed and created by Aman Bhmabhani
        </p>
      </footer>
    </main>
  );
}
