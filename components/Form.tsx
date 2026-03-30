'use client';

import { useState } from 'react';
import { Send, Languages } from 'lucide-react';
import { motion } from 'motion/react';

interface FormProps {
  onSubmit: (problem: string, language: string) => void;
  isLoading: boolean;
}

export default function Form({ onSubmit, isLoading }: FormProps) {
  const [problem, setProblem] = useState('');
  const [language, setLanguage] = useState('English');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (problem.trim()) {
      onSubmit(problem, language);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full bg-white rounded-[2.5rem] shadow-2xl shadow-[#5a5a40]/5 p-10 border border-[#e5e1d8]"
    >
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label className="block font-serif text-2xl font-bold text-[#5a5a40] mb-4">
            What is troubling your mind?
          </label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="Speak your heart, Arjuna..."
            className="w-full h-40 px-6 py-5 rounded-3xl border border-[#e5e1d8] focus:ring-2 focus:ring-[#5a5a40] focus:border-transparent outline-none transition-all resize-none bg-[#fdfcf8] text-lg font-serif italic placeholder:text-[#8e8e8e]/50"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-3 bg-[#f9f7f2] px-6 py-3 rounded-full border border-[#e5e1d8] w-full sm:w-auto">
            <Languages className="h-5 w-5 text-[#5a5a40]" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-bold text-[#5a5a40] outline-none cursor-pointer uppercase tracking-widest"
              disabled={isLoading}
            >
              <option>English</option>
              <option>Hindi</option>
              <option>Sanskrit</option>
              <option>Gujarati</option>
              <option>Marathi</option>
            </select>
          </div>
          
          <button
            type="submit"
            disabled={isLoading || !problem.trim()}
            className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#5a5a40] text-white px-10 py-4 rounded-full font-bold hover:shadow-xl hover:shadow-[#5a5a40]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
          >
            {isLoading ? (
              <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Seek Guidance <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
