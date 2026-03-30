'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, onAuthStateChanged, FirebaseUser } from '@/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Shield, Users, MessageSquare, Clock } from 'lucide-react';

interface GuidanceRecord {
  id: string;
  problem: string;
  response: string;
  language: string;
  userId: string;
  userEmail?: string;
  userName?: string;
  createdAt: Timestamp;
}

export default function AdminPanel() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState<GuidanceRecord[]>([]);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser || currentUser.email !== 'aman@digitalrubix.com') {
        router.push('/dashboard');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'guidance'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as GuidanceRecord[];
      setRecords(data);
    });

    return () => unsubscribe();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fdfcf8]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#5a5a40]"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-[#5a5a40] rounded-2xl shadow-lg">
          <Shield className="h-8 w-8 text-white" />
        </div>
        <div>
          <h1 className="font-serif text-4xl font-bold text-[#5a5a40]">Admin Sanctuary</h1>
          <p className="text-[#8e8e8e] font-serif italic">Overseeing the seekers of wisdom</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="bg-white p-8 rounded-[2rem] border border-[#e5e1d8] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <Users className="h-6 w-6 text-[#5a5a40]" />
            <span className="font-serif text-lg font-bold text-[#5a5a40]">Total Seekers</span>
          </div>
          <div className="text-4xl font-bold text-[#2c2c2c]">
            {new Set(records.map(r => r.userId)).size}
          </div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-[#e5e1d8] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare className="h-6 w-6 text-[#5a5a40]" />
            <span className="font-serif text-lg font-bold text-[#5a5a40]">Total Guidance</span>
          </div>
          <div className="text-4xl font-bold text-[#2c2c2c]">{records.length}</div>
        </div>
        <div className="bg-white p-8 rounded-[2rem] border border-[#e5e1d8] shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <Clock className="h-6 w-6 text-[#5a5a40]" />
            <span className="font-serif text-lg font-bold text-[#5a5a40]">Last Insight</span>
          </div>
          <div className="text-sm font-bold text-[#2c2c2c]">
            {records[0]?.createdAt?.toDate().toLocaleString() || 'N/A'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-[#e5e1d8] overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f9f7f2] border-b border-[#e5e1d8]">
                <th className="px-8 py-5 font-serif text-[#5a5a40] font-bold uppercase tracking-widest text-xs">Seeker</th>
                <th className="px-8 py-5 font-serif text-[#5a5a40] font-bold uppercase tracking-widest text-xs">Problem</th>
                <th className="px-8 py-5 font-serif text-[#5a5a40] font-bold uppercase tracking-widest text-xs">Language</th>
                <th className="px-8 py-5 font-serif text-[#5a5a40] font-bold uppercase tracking-widest text-xs">Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e5e1d8]">
              {records.map((record) => (
                <tr key={record.id} className="hover:bg-[#fdfcf8] transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-[#2c2c2c]">{record.userName || 'Anonymous'}</span>
                      <span className="text-xs text-[#8e8e8e]">{record.userEmail || 'No Email'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-[#2c2c2c] line-clamp-2 max-w-md italic font-serif">"{record.problem}"</p>
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-xs font-bold text-[#5a5a40] bg-[#f9f7f2] px-3 py-1 rounded-full uppercase tracking-widest">
                      {record.language}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-xs text-[#8e8e8e] font-serif italic">
                    {record.createdAt?.toDate().toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
