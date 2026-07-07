'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { calculatePasswordStrength } from '@/lib/passwordStrength';

const TIER_COLORS: Record<string, string> = {
  very_weak: 'bg-red-500',
  weak: 'bg-orange-500',
  fair: 'bg-amber-500',
  strong: 'bg-emerald-500',
  very_strong: 'bg-emerald-600',
};

const TIER_WIDTH: Record<string, string> = {
  very_weak: 'w-1/5',
  weak: 'w-2/5',
  fair: 'w-3/5',
  strong: 'w-4/5',
  very_strong: 'w-full',
};

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', type: 'actuary', company: ''
  });

  const strength = useMemo(
    () => calculatePasswordStrength(formData.password, formData.email, formData.name),
    [formData.password, formData.email, formData.name]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Thank you, ${formData.name}! Your registration has been received (demo). In the full platform you would complete your profile and verification.`);
    window.location.href = '/directory';
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-semibold tracking-tighter">Join Find Actuaries</h1>
          <p className="text-slate-600 mt-2">Africa opens every direction.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white border border-slate-200 rounded-3xl p-8 space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name</label>
            <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-3 rounded-2xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-3 rounded-2xl" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full border p-3 rounded-2xl" />
            {formData.password && (
              <div className="mt-2">
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${TIER_COLORS[strength.tier]} ${TIER_WIDTH[strength.tier]}`} />
                </div>
                <div className="text-xs mt-1 font-medium" style={{ color: strength.tier === 'very_weak' || strength.tier === 'weak' ? '#dc2626' : strength.tier === 'fair' ? '#d97706' : '#059669' }}>
                  {strength.label}
                </div>
                {strength.reasons.map((r, i) => (
                  <div key={i} className="text-xs text-slate-500 mt-0.5">• {r}</div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">I am a...</label>
            <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border p-3 rounded-2xl">
              <option value="actuary">Qualified or Student Actuary</option>
              <option value="employer">Employer / HR / Recruiter</option>
            </select>
          </div>

          {formData.type === 'employer' && (
            <div>
              <label className="block text-sm font-medium mb-1.5">Company / Organisation</label>
              <input value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full border p-3 rounded-2xl" />
            </div>
          )}

          <button type="submit" className="w-full mt-2 bg-primary-600 hover:bg-primary-700 transition-colors text-white py-3.5 rounded-2xl font-semibold">Create Account</button>
        </form>

        <p className="text-center text-xs text-slate-500 mt-6">By joining you agree to our Terms and <Link href="/privacy" className="underline">Privacy &amp; Data</Link> policy.</p>
      </div>
    </div>
  );
}
