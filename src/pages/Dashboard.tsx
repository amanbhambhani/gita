import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import InputBox from '../components/InputBox';
import ResponseCard from '../components/ResponseCard';

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  const handleGuidance = async (problem: string, language: string) => {
    setIsLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/gita/guidance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ problem, language })
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResponse(data.response);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] py-12 px-4 bg-gradient-to-b from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
        >
          Divine Guidance for Your Soul
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 italic"
        >
          "Whenever there is a decline in righteousness, I manifest Myself..."
        </motion.p>
      </div>

      <InputBox onSubmit={handleGuidance} isLoading={isLoading} />

      {response && <ResponseCard response={response} />}
      
      {!response && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-24 flex flex-col items-center opacity-20 pointer-events-none"
        >
          <img 
            src="https://picsum.photos/seed/spiritual/800/400?blur=10" 
            alt="Spiritual Background" 
            className="rounded-full w-64 h-64 object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      )}
    </div>
  );
}
