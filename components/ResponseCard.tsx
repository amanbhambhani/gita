'use client';

import { motion } from 'motion/react';
import { Quote } from 'lucide-react';

interface ResponseCardProps {
  response: string;
}

export default function ResponseCard({ response }: ResponseCardProps) {
  // Parsing the response to extract sections if possible, or just rendering as is
  // The prompt asks for specific sections. Gemini usually follows well.
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-3xl mx-auto mt-12 bg-white/40 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-2xl p-8 relative overflow-hidden"
    >
      <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex justify-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <Quote className="h-6 w-6 text-blue-600" />
          </div>
        </div>
        
        <div className="whitespace-pre-wrap text-gray-800 leading-relaxed space-y-4">
          {response.split('\n\n').map((section, index) => {
            if (section.includes('Sanskrit Shlok')) return <div key={index} className="text-xl font-serif text-blue-900 bg-blue-50/50 p-4 rounded-xl border-l-4 border-blue-400">{section}</div>;
            return <p key={index}>{section}</p>;
          })}
        </div>
      </div>
    </motion.div>
  );
}
