'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { auth, signOut, onAuthStateChanged, FirebaseUser } from '@/firebase';

export default function Navbar() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
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

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Gita AI
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600 hidden sm:block">Radhe Radhe, {user.displayName || 'Gita Seeker'}</span>
                <Link href="/dashboard" className="text-sm font-medium text-gray-600 hover:text-blue-600">Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-4">
                <Link href="/login" className="text-sm font-medium text-gray-600 hover:text-blue-600">Login</Link>
                <Link href="/register" className="text-sm font-medium text-blue-600 hover:text-blue-800">Register</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
