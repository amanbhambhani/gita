'use client';

import Chat from '@/components/Chat';
import SudarshanChakra from '@/components/SudarshanChakra';
import ShlokaBanner from '@/components/ShlokaBanner';
import PeacockFeather from '@/components/PeacockFeather';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ChatPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf0] flex flex-col items-center py-12 px-6 relative overflow-hidden">
      <PeacockFeather />
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10 opacity-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]" />
      </div>

      <div className="max-w-4xl w-full space-y-8 z-10">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-primary font-bold hover:underline">
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center gap-4">
            <SudarshanChakra size={60} />
            <h1 className="font-display text-3xl font-bold text-primary">Divine Dialogue</h1>
          </div>
        </div>

        <ShlokaBanner />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Chat />
        </motion.div>

        <footer className="pt-12 pb-6 text-center space-y-4">
          <p className="text-muted-foreground text-sm italic">
            &quot;Whenever you feel lost, remember that I am within you, guiding your every step.&quot;
          </p>
          <div className="pt-4 border-t border-primary/10">
            <p className="text-primary font-bold uppercase tracking-widest text-xs">
              Designed and created by Aman Bhmabhani
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
