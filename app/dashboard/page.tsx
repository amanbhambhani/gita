'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import ResponseCard from '@/components/ResponseCard';
import { motion } from 'motion/react';
import { auth, db, onAuthStateChanged, FirebaseUser, collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, handleFirestoreError, OperationType, Timestamp } from '@/firebase';
import { History, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import gitaData from '@/lib/gitaData.json';
import BattlefieldBackground from '@/components/BattlefieldBackground';
import KrishnaArjunaAnimation from '@/components/KrishnaArjunaAnimation';

export default function DashboardPage() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push('/login');
      } else {
        setUser(currentUser);
        fetchHistory(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const fetchHistory = async (uid: string) => {
    try {
      const q = query(
        collection(db, 'guidance'),
        where('uid', '==', uid),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const historyData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHistory(historyData);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const handleGenerate = async (problem: string, language: string) => {
    if (!user) return;
    setIsLoading(true);
    setResponse('');

    try {
      // 1. Match relevant shlok using keyword matching
      const problemLower = problem.toLowerCase();
      let matchedShlok = gitaData[0]; // Default to first shlok
      let maxMatches = 0;

      for (const shlok of gitaData) {
        let currentMatches = 0;
        // Simple keyword matching based on tags or meaning
        const keywords = [...(shlok as any).tags || [], shlok.english.toLowerCase(), shlok.meaning.toLowerCase()];
        for (const keyword of keywords) {
          if (problemLower.includes(keyword)) {
            currentMatches++;
          }
        }
        if (currentMatches > maxMatches) {
          maxMatches = currentMatches;
          matchedShlok = shlok;
        }
      }

      // 2. Prepare prompt for Gemini
      const prompt = `You are Lord Krishna guiding a human like Arjuna.

Rules:
* Answer ONLY using Bhagavad Gita philosophy
* Do NOT give generic modern advice
* Always include:
  1. Sanskrit Shlok
  2. Translation in user's selected language
  3. Meaning
  4. Practical solution
  5. Real-life example

User Problem:
${problem}

Relevant Shlok:
Chapter ${matchedShlok.chapter}, Shlok ${matchedShlok.shlok}
Sanskrit: ${matchedShlok.sanskrit}
English Meaning: ${matchedShlok.english}

Language:
${language}`;

      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const genResponse = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });

      const text = genResponse.text;

      if (text) {
        setResponse(text);
        
        // Save to Firestore
        try {
          await addDoc(collection(db, 'guidance'), {
            uid: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            problem,
            language,
            response: text,
            createdAt: serverTimestamp(),
          });
          fetchHistory(user.uid);
        } catch (fsError) {
          handleFirestoreError(fsError, OperationType.CREATE, 'guidance');
        }
      } else {
        alert('Failed to generate response');
      }
    } catch (err: any) {
      console.error('Error generating response:', err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="relative min-h-screen">
      <BattlefieldBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="text-left">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-serif text-5xl font-bold text-[#5a5a40] mb-3"
            >
              Divine Guidance
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#8e8e8e] font-serif italic text-lg"
            >
              Radhe Radhe, {user.displayName || 'Gita Seeker'}
            </motion.p>
          </div>
          
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-[#e5e1d8] text-[#5a5a40] hover:bg-[#f9f7f2] transition-all shadow-sm font-medium"
          >
            {showHistory ? <Sparkles className="h-5 w-5" /> : <History className="h-5 w-5" />}
            {showHistory ? 'Seek Guidance' : 'View History'}
          </button>
        </div>

        {showHistory ? (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <div className="col-span-full">
              <h2 className="font-serif text-3xl font-bold text-[#5a5a40] mb-8">Your Past Guidance</h2>
            </div>
            {history.length === 0 ? (
              <div className="col-span-full text-center py-20 bg-white/80 backdrop-blur-sm rounded-[2rem] border border-[#e5e1d8] text-[#8e8e8e] font-serif italic text-xl">
                No guidance history found. Start by asking a question!
              </div>
            ) : (
              history.map((item) => (
                <motion.div 
                  key={item.id} 
                  whileHover={{ y: -5 }}
                  className="bg-white/80 backdrop-blur-sm p-8 rounded-[2rem] border border-[#e5e1d8] shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-bold text-[#5a5a40] bg-[#f9f7f2] px-4 py-1.5 rounded-full uppercase tracking-widest">
                      {item.language}
                    </div>
                    <div className="text-xs text-[#8e8e8e] font-serif italic">
                      {item.createdAt instanceof Timestamp ? item.createdAt.toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Just now'}
                    </div>
                  </div>
                  <p className="text-[#2c2c2c] font-serif text-xl font-semibold mb-4 leading-tight">&quot; {item.problem} &quot;</p>
                  <div className="text-[#5a5a40] text-base line-clamp-4 whitespace-pre-wrap italic opacity-80 mb-6 flex-grow">
                    {item.response}
                  </div>
                  <button 
                    onClick={() => {
                      setResponse(item.response);
                      setShowHistory(false);
                    }}
                    className="text-sm text-[#5a5a40] font-bold hover:underline flex items-center gap-2"
                  >
                    Read Full Guidance →
                  </button>
                </motion.div>
              ))
            )}
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <KrishnaArjunaAnimation />
            <Form onSubmit={handleGenerate} isLoading={isLoading} />
            {response && <ResponseCard response={response} />}
            {!response && !isLoading && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="mt-32 flex flex-col items-center opacity-40 grayscale pointer-events-none"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-[#5a5a40] rounded-full blur-3xl opacity-10"></div>
                  <Image 
                    src="https://picsum.photos/seed/spiritual/800/800?blur=5" 
                    alt="Spiritual Background" 
                    width={320}
                    height={320}
                    className="rounded-full object-cover border-8 border-white shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <p className="mt-8 font-serif italic text-[#5a5a40] text-xl">Seek and you shall find...</p>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
