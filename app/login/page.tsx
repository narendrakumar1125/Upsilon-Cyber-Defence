'use client';

import { useState, Suspense } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff, ShieldCheck } from 'lucide-react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const error = searchParams.get('error');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setLoginError(null);

    try {
      const result = await signIn(email, password);

      if (!result.success) {
        setLoginError(result.error || 'Invalid email or password');
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
    } catch (error) {
      setLoginError('An error occurred during login');
      setLoading(false);
    }
  };
  
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#05070d] px-4 py-16 text-light">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(16,185,129,0.14),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.36),rgba(2,6,23,0.96))]" />
      <div className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-[0.06]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-300/10" />

      <div className="relative z-10 w-full max-w-md rounded-xl border border-slate-800/90 bg-slate-950/78 p-8 shadow-2xl shadow-sky-950/25 backdrop-blur-xl">
        <div className="text-center mb-8">
          <Link href="/" className="inline-block">
            <div className="flex items-center justify-center mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-sky-300/25 bg-slate-950 text-sky-200 shadow-lg shadow-sky-950/30">
                <ShieldCheck className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <h1 className="font-display text-2xl font-bold tracking-tight text-white">Upsilon Cyber Defence</h1>
          </Link>
        </div>
        
        <h2 className="mb-6 text-center font-display text-2xl font-bold text-white">Log In to Your Account</h2>
        
        {(error || loginError) && (
          <div className="mb-6 rounded-md border border-red-400/40 bg-red-500/15 p-4 text-light">
            {error === 'CredentialsSignin' 
              ? 'Invalid email or password' 
              : loginError || 'An error occurred'}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-950/80 p-3 text-light transition-colors placeholder:text-slate-600 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
              placeholder="your@email.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-slate-700 bg-slate-950/80 p-3 pr-11 text-light transition-colors placeholder:text-slate-600 focus:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-300/15"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-light"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md border border-sky-300/30 bg-sky-300 px-4 py-3 font-bold text-slate-950 shadow-lg shadow-sky-950/30 transition-all hover:-translate-y-0.5 hover:bg-sky-200 disabled:translate-y-0 disabled:opacity-70"
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-light text-xl">Loading...</div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}
