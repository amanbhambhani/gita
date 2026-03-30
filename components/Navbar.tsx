'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, signOut, onAuthStateChanged, FirebaseUser } from '@/firebase';
import SudarshanChakra from './SudarshanChakra';

export default function Navbar() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const isAdmin = user?.email === 'aman@digitalrubix.com';

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-[#e5e1d8] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 flex items-center justify-center">
                <SudarshanChakra className="h-10 w-10" showFinger={false} />
              </div>
              <span className="font-serif text-2xl font-bold text-[#5a5a40] tracking-tight">Gita AI</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {loading ? (
              <div className="h-4 w-20 bg-[#f9f7f2] animate-pulse rounded" />
            ) : user ? (
              <div className="flex items-center gap-6">
                {isAdmin && (
                  <Link href="/admin" className="text-sm font-bold text-[#5a5a40] hover:underline">
                    Admin Panel
                  </Link>
                )}
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-sm font-bold text-[#5a5a40]">{user.displayName || 'Gita Seeker'}</span>
                  <span className="text-[10px] uppercase tracking-widest text-[#8e8e8e]">{isAdmin ? 'Admin' : 'Seeker'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 text-sm font-bold text-[#5a5a40] border-2 border-[#5a5a40] rounded-full hover:bg-[#5a5a40] hover:text-white transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link href="/login" className="text-sm font-bold text-[#5a5a40] hover:opacity-70 transition-all">
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-6 py-2.5 text-sm font-bold bg-[#5a5a40] text-white rounded-full hover:shadow-lg hover:scale-105 transition-all"
                >
                  Join
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
