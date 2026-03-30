import { redirect } from 'next/navigation';

export default function Home() {
  // In a real app, we'd check auth server-side, but for simplicity we'll redirect to dashboard
  // and let the client-side handle auth checks.
  redirect('/dashboard');
}
