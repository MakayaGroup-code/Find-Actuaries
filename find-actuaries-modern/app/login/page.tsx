'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Demo login successful for ${email}. In production this would authenticate via Clerk/Supabase and redirect to dashboard.`);
    // Simulate redirect
    window.location.href = '/directory';
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
            <svg viewBox="0 0 260 260" className="w-11 h-11" aria-hidden="true">
              <line x1="122" y1="120" x2="188" y2="65" stroke="#B8672A" strokeWidth="10" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="201" y2="124" stroke="#B8672A" strokeWidth="10" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="175" y2="182" stroke="#B8672A" strokeWidth="10" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="118" y2="195" stroke="#B8672A" strokeWidth="10" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="60" y2="151" stroke="#B8672A" strokeWidth="10" strokeLinecap="round"/>
              <circle cx="188" cy="65" r="16" fill="#B8672A"/>
              <circle cx="201" cy="124" r="16" fill="#B8672A"/>
              <circle cx="175" cy="182" r="16" fill="#B8672A"/>
              <circle cx="118" cy="195" r="16" fill="#B8672A"/>
              <circle cx="60" cy="151" r="16" fill="#B8672A"/>
              <circle cx="122" cy="120" r="22" fill="#2C3B63"/>
            </svg>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-slate-600 mt-1">Sign in to access the full directory, apply to roles, and connect with the community.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Email address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3" placeholder="you@actuary.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-slate-200 rounded-2xl px-4 py-3" />
          </div>

          <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-2xl font-semibold">Sign In</button>

          <div className="text-center text-sm text-slate-600">
            Forgot password? <a href="#" className="text-primary-600 hover:underline">Reset it here</a>
          </div>
        </form>

        <p className="text-center text-sm mt-6 text-slate-600">
          Don't have an account? <Link href="/register" className="text-primary-600 font-medium hover:underline">Join the network</Link>
        </p>
      </div>
    </div>
  );
}