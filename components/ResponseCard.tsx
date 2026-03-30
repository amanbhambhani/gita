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
      className="w-full mt-16 bg-white rounded-[3rem] border border-[#e5e1d8] shadow-2xl p-12 relative overflow-hidden"
    >
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-[#5a5a40]/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-[#5a5a40]/5 rounded-full blur-3xl" />
      
      <div className="relative z-10">
        <div className="flex justify-center mb-10">
          <div className="bg-[#f9f7f2] p-5 rounded-full border border-[#e5e1d8]">
            <Quote className="h-8 w-8 text-[#5a5a40]" />
          </div>
        </div>
        
        <div className="whitespace-pre-wrap text-[#2c2c2c] leading-relaxed space-y-8 font-serif">
          {response.split('\n\n').map((section, index) => {
            if (section.toLowerCase().includes('sanskrit') || section.includes('Shlok')) {
              return (
                <div key={index} className="text-2xl text-center text-[#5a5a40] bg-[#f9f7f2] p-8 rounded-[2rem] border border-[#e5e1d8] shadow-inner font-bold italic">
                  {section}
                </div>
              );
            }
            return (
              <div key={index} className="text-lg opacity-90 first-letter:text-4xl first-letter:font-bold first-letter:text-[#5a5a40] first-letter:mr-1">
                {section}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
