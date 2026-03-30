'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { auth, googleProvider, signInWithPopup } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import BattlefieldBackground from '@/components/BattlefieldBackground';
import SudarshanChakra from '@/components/SudarshanChakra';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    try {
      await signInWithPopup(auth, googleProvider);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Google Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-20">
      <BattlefieldBackground />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/90 backdrop-blur-md p-10 rounded-[2.5rem] shadow-2xl border border-[#e5e1d8]"
      >
        <div className="flex flex-col items-center mb-10">
          <SudarshanChakra className="h-16 w-16 mb-4" />
          <h1 className="font-serif text-4xl font-bold text-[#5a5a40] text-center">
            Seeker&apos;s Entry
          </h1>
          <p className="text-[#8e8e8e] font-serif italic mt-2">Begin your journey of wisdom</p>
        </div>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-2xl mb-8 text-sm text-center font-medium border border-red-100">
            {error}
          </div>
        )}

        <button
          onClick={handleGoogleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-4 bg-[#f9f7f2] border border-[#e5e1d8] text-[#5a5a40] py-4 rounded-full font-bold hover:bg-[#5a5a40] hover:text-white transition-all mb-8 uppercase tracking-widest text-xs"
        >
          Continue with Divine Account
        </button>

        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#e5e1d8]"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase tracking-widest">
            <span className="px-4 bg-white text-[#8e8e8e]">Or with email</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-[#5a5a40] mb-2 uppercase tracking-widest">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-[#e5e1d8] focus:ring-2 focus:ring-[#5a5a40] outline-none transition-all bg-[#fdfcf8]"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#5a5a40] mb-2 uppercase tracking-widest">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-6 py-4 rounded-2xl border border-[#e5e1d8] focus:ring-2 focus:ring-[#5a5a40] outline-none transition-all bg-[#fdfcf8]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#5a5a40] text-white py-5 rounded-full font-bold hover:shadow-xl transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
          >
            {isLoading ? 'Entering Sanctuary...' : 'Enter Sanctuary'}
          </button>
        </form>

        <p className="mt-10 text-center text-[#8e8e8e] font-serif italic">
          New seeker?{' '}
          <Link href="/register" className="text-[#5a5a40] font-bold hover:underline not-italic">
            Join the Path
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
