'use client';

import React, { useState, useEffect } from 'react';
import { specialismOptions } from '@/lib/mockData';
import { Save, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProfileEditPage() {
  const [profile, setProfile] = useState({
    name: 'Elena Vasquez',
    title: 'Chief Actuary',
    company: 'Aviva UK',
    location: 'London',
    experience: 18,
    bio: 'Leading longevity and mortality risk frameworks. Passionate about using data science to improve retirement outcomes.',
    availability: 'Not looking' as const,
    specialisms: ['Life Insurance', 'Longevity', 'Capital Modelling'] as string[],
    linkedin: 'https://linkedin.com/in/elenavasquez',
  });

  const [saved, setSaved] = useState(false);

  // Load from localStorage if previously edited
  useEffect(() => {
    const savedProfile = localStorage.getItem('fa_profile');
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem('fa_profile', JSON.stringify(profile));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const toggleSpecialism = (spec: string) => {
    setProfile(prev => ({
      ...prev,
      specialisms: prev.specialisms.includes(spec)
        ? prev.specialisms.filter(s => s !== spec)
        : [...prev.specialisms, spec]
    }));
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Link href="/directory" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-semibold tracking-tighter">Edit Your Profile</h1>
          <p className="text-slate-600">Keep your information up to date so the right opportunities find you.</p>
        </div>
        <button 
          onClick={handleSave}
          className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm"
        >
          <Save className="w-4 h-4" /> {saved ? 'Saved!' : 'Save Changes'}
        </button>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Full Name</label>
            <input 
              value={profile.name} 
              onChange={e => setProfile({...profile, name: e.target.value})} 
              className="w-full border border-slate-200 rounded-2xl px-4 py-3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Current Title</label>
            <input 
              value={profile.title} 
              onChange={e => setProfile({...profile, title: e.target.value})} 
              className="w-full border border-slate-200 rounded-2xl px-4 py-3" 
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-1.5">Company / Organisation</label>
            <input 
              value={profile.company} 
              onChange={e => setProfile({...profile, company: e.target.value})} 
              className="w-full border border-slate-200 rounded-2xl px-4 py-3" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Location</label>
            <input 
              value={profile.location} 
              onChange={e => setProfile({...profile, location: e.target.value})} 
              className="w-full border border-slate-200 rounded-2xl px-4 py-3" 
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5">Years of Experience</label>
          <input 
            type="number" 
            value={profile.experience} 
            onChange={e => setProfile({...profile, experience: parseInt(e.target.value) || 0})} 
            className="w-40 border border-slate-200 rounded-2xl px-4 py-3" 
          />
        </div>

        {/* Specialisms */}
        <div>
          <label className="block text-sm font-medium mb-3">Specialisms (select all that apply)</label>
          <div className="flex flex-wrap gap-2">
            {specialismOptions.map(spec => (
              <button
                key={spec}
                type="button"
                onClick={() => toggleSpecialism(spec)}
                className={`px-4 py-1.5 text-sm rounded-full border transition-all ${profile.specialisms.includes(spec) 
                  ? 'bg-primary-600 text-white border-primary-600' 
                  : 'border-slate-200 hover:border-slate-300'}`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Current Availability</label>
          <select 
            value={profile.availability} 
            onChange={e => setProfile({...profile, availability: e.target.value as any})}
            className="w-full border border-slate-200 rounded-2xl px-4 py-3"
          >
            <option value="Open to opportunities">Open to opportunities</option>
            <option value="Contract/Freelance only">Contract / Freelance only</option>
            <option value="Not looking">Not currently looking</option>
          </select>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium mb-1.5">Professional Bio / Summary</label>
          <textarea 
            value={profile.bio} 
            onChange={e => setProfile({...profile, bio: e.target.value})}
            rows={5}
            className="w-full border border-slate-200 rounded-3xl px-4 py-4 resize-y"
            placeholder="Tell the community about your expertise and what you're passionate about..."
          />
        </div>

        {/* LinkedIn */}
        <div>
          <label className="block text-sm font-medium mb-1.5">LinkedIn Profile URL</label>
          <input 
            value={profile.linkedin} 
            onChange={e => setProfile({...profile, linkedin: e.target.value})} 
            className="w-full border border-slate-200 rounded-2xl px-4 py-3" 
          />
        </div>
      </div>

      <p className="text-xs text-center text-slate-500 mt-6">Changes are saved locally in this demo. In production they would sync to your secure profile.</p>
    </div>
  );
}