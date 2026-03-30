import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Languages } from 'lucide-react';

interface InputBoxProps {
  onSubmit: (problem: string, language: string) => void;
  isLoading: boolean;
}

export default function InputBox({ onSubmit, isLoading }: InputBoxProps) {
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
      className="w-full max-w-2xl mx-auto bg-white rounded-3xl shadow-xl shadow-blue-100 p-6 border border-blue-50"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            What is troubling your mind?
          </label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            placeholder="E.g., I am feeling stressed about my career..."
            className="w-full h-32 px-4 py-3 rounded-2xl border border-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none bg-blue-50/30"
            disabled={isLoading}
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-full border border-blue-100 w-full sm:w-auto">
            <Languages className="h-4 w-4 text-blue-500" />
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-transparent text-sm font-medium text-blue-700 outline-none cursor-pointer"
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
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-blue-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
              />
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
