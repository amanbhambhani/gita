import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#fdfcf8] px-4">
      <h2 className="font-serif text-4xl font-bold text-[#5a5a40] mb-4">404 - Wisdom Not Found</h2>
      <p className="text-[#8e8e8e] font-serif italic mb-8">Even the greatest seekers sometimes lose their way.</p>
      <Link 
        href="/dashboard" 
        className="px-8 py-3 bg-[#5a5a40] text-white rounded-full font-bold hover:shadow-lg transition-all"
      >
        Return to the Path
      </Link>
    </div>
  );
}
