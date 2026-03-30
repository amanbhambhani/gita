'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Form from '@/components/Form';
import ResponseCard from '@/components/ResponseCard';
import { motion } from 'motion/react';
import { auth, db, onAuthStateChanged, FirebaseUser, collection, addDoc, query, where, getDocs, orderBy, serverTimestamp, handleFirestoreError, OperationType, Timestamp } from '@/firebase';
import { History, Sparkles } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import gitaData from '@/lib/gitaData.json';

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
  }, []);

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <div className="text-left">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-gray-900 mb-2"
          >
            Divine Guidance
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 italic"
          >
            Radhe Radhe, {user.displayName || 'Gita Seeker'}
          </motion.p>
        </div>
        
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-blue-100 text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
        >
          {showHistory ? <Sparkles className="h-4 w-4" /> : <History className="h-4 w-4" />}
          {showHistory ? 'Seek Guidance' : 'View History'}
        </button>
      </div>

      {showHistory ? (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Past Guidance</h2>
          {history.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-blue-50 text-gray-500">
              No guidance history found. Start by asking a question!
            </div>
          ) : (
            history.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-3xl border border-blue-50 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start mb-4">
                  <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    {item.language}
                  </div>
                  <div className="text-xs text-gray-400">
                    {item.createdAt instanceof Timestamp ? item.createdAt.toDate().toLocaleDateString() : 'Just now'}
                  </div>
                </div>
                <p className="text-gray-700 font-medium mb-4">Q: {item.problem}</p>
                <div className="text-gray-600 text-sm line-clamp-3 whitespace-pre-wrap">
                  {item.response}
                </div>
                <button 
                  onClick={() => {
                    setResponse(item.response);
                    setShowHistory(false);
                  }}
                  className="mt-4 text-sm text-blue-600 font-semibold hover:underline"
                >
                  View Full Guidance
                </button>
              </div>
            ))
          )}
        </motion.div>
      ) : (
        <>
          <Form onSubmit={handleGenerate} isLoading={isLoading} />
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
              />
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
