'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Send, User as UserIcon, Sparkles, MessageCircle, RefreshCw, LogIn, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getKrishnaGuidance } from '@/lib/gemini';
import ReactMarkdown from 'react-markdown';

interface Message {
  role: 'user' | 'krishna';
  content: string;
  timestamp: number;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'krishna',
      content: "Welcome, Dear Seeker. I am Krishna. What troubles your mind today? Ask me anything, and I shall guide you with the wisdom of the Bhagavad Gita.",
      timestamp: Date.now(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState('English');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const languages = [
    'English', 'Hindi', 'Hinglish', 'Bengali', 'Tamil', 'Telugu', 
    'Marathi', 'Gujarati', 'Kannada', 'Malayalam', 'Punjabi'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const guidance = await getKrishnaGuidance(input, language);
      const krishnaMessage: Message = {
        role: 'krishna',
        content: guidance,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, krishnaMessage]);
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full max-w-2xl mx-auto gita-card shadow-2xl overflow-hidden">
      <div className="bg-primary p-4 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden relative">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="font-display text-lg font-bold">Divine Guidance</h2>
            <div className="flex items-center gap-2">
              <p className="text-[10px] uppercase tracking-widest opacity-80">Wisdom of Bhagavad Gita</p>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-white/10 text-[10px] border-none rounded px-1 py-0.5 focus:ring-0 cursor-pointer hover:bg-white/20 transition-all"
              >
                {languages.map(lang => (
                  <option key={lang} value={lang} className="text-black">{lang}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setMessages([messages[0]])}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
            title="Reset Conversation"
          >
            <RefreshCw size={18} />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-[#fdfcf0]/50">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                  ? 'bg-secondary text-white rounded-tr-none' 
                  : 'bg-white border border-primary/10 text-foreground rounded-tl-none'
              }`}>
                <div className="flex items-center gap-2 mb-2 opacity-60 text-[10px] uppercase tracking-widest font-bold">
                  {msg.role === 'user' ? <UserIcon size={10} /> : <Sparkles size={10} />}
                  {msg.role === 'user' ? 'You' : 'Krishna'}
                </div>
                <div className="prose prose-sm max-w-none prose-headings:text-primary prose-strong:text-primary">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-white border border-primary/10 p-4 rounded-2xl rounded-tl-none shadow-sm flex items-center gap-2">
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                    className="w-2 h-2 bg-primary rounded-full"
                  />
                ))}
              </div>
              <span className="text-xs text-primary/60 font-medium italic">Krishna is reflecting...</span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-primary/10 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Lord Krishna for guidance..."
          className="flex-1 bg-background border border-primary/20 rounded-full px-6 py-3 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all text-sm"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg"
        >
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}
