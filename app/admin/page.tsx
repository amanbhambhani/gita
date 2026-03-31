'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, db, storage, onAuthStateChanged, FirebaseUser, ref, uploadBytesResumable, getDownloadURL, setDoc, doc, serverTimestamp } from '@/firebase';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { motion } from 'motion/react';
import { Shield, Users, MessageSquare, Clock, Music, Upload, CheckCircle2, AlertCircle } from 'lucide-react';

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
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
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

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      alert('Please upload an audio file (MP3, WAV, etc.)');
      return;
    }

    setUploading(true);
    setUploadStatus('idle');
    setUploadProgress(0);

    const storageRef = ref(storage, `audio/divine_melody_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      }, 
      (error) => {
        console.error("Upload failed:", error);
        setUploadStatus('error');
        setUploading(false);
      }, 
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await setDoc(doc(db, 'settings', 'audio'), {
          url: downloadURL,
          updatedAt: serverTimestamp(),
          fileName: file.name
        });
        setUploadStatus('success');
        setUploading(false);
        setTimeout(() => setUploadStatus('idle'), 5000);
      }
    );
  };

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

      {/* Audio Management Section */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-[#e5e1d8] shadow-sm mb-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="p-2 bg-[#f9f7f2] rounded-xl">
            <Music className="h-6 w-6 text-[#5a5a40]" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-[#5a5a40]">Divine Melody Management</h2>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-[#8e8e8e] mb-4">Upload a new background melody for the entire sanctuary. This will update the music for all seekers.</p>
            <div className="flex items-center gap-4">
              <label className="relative cursor-pointer bg-[#5a5a40] text-white px-6 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#4a4a30] transition-colors shadow-md">
                <Upload size={18} />
                <span>{uploading ? 'Uploading...' : 'Upload New Audio'}</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  disabled={uploading}
                />
              </label>
              
              {uploadStatus === 'success' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-green-600 font-bold">
                  <CheckCircle2 size={18} />
                  <span>Divine Melody Updated!</span>
                </motion.div>
              )}
              
              {uploadStatus === 'error' && (
                <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-red-600 font-bold">
                  <AlertCircle size={18} />
                  <span>Upload Failed</span>
                </motion.div>
              )}
            </div>
          </div>

          {uploading && (
            <div className="w-full md:w-64">
              <div className="flex justify-between text-xs font-bold text-[#5a5a40] mb-2">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-[#f9f7f2] h-2 rounded-full overflow-hidden">
                <motion.div 
                  className="bg-[#5a5a40] h-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}
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
                    <p className="text-sm text-[#2c2c2c] line-clamp-2 max-w-md italic font-serif">&quot;{record.problem}&quot;</p>
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
