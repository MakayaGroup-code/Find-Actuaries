'use client';

import React, { useState } from 'react';
import { mockActuaries } from '@/lib/mockData';
import { Users2, Award, Clock } from 'lucide-react';

export default function MentoringPage() {
  const [role, setRole] = useState<'mentor' | 'mentee'>('mentee');
  const [selectedSpecialism, setSelectedSpecialism] = useState('');
  const [experienceLevel, setExperienceLevel] = useState(5);
  const [matches, setMatches] = useState<any[]>([]);
  const [requested, setRequested] = useState<number[]>([]);

  const findMatches = () => {
    // Simple smart matching logic (can be replaced with real AI later)
    const filtered = mockActuaries
      .filter(a => a.id !== 1) // exclude demo user
      .map(a => {
        let score = 0;
        
        // Specialism overlap
        if (selectedSpecialism && a.specialisms.includes(selectedSpecialism)) score += 40;
        
        // Experience level matching
        const expDiff = Math.abs(a.experience - experienceLevel);
        if (expDiff <= 3) score += 30;
        else if (expDiff <= 6) score += 15;

        // Availability bonus for mentors
        if (role === 'mentee' && a.availability !== 'Not looking') score += 20;

        return { ...a, matchScore: Math.min(100, score) };
      })
      .filter(a => a.matchScore > 25)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 6);

    setMatches(filtered);
  };

  const requestMentoring = (id: number) => {
    setRequested(prev => [...prev, id]);
    alert("Mentoring request sent! In the full platform the mentor would receive a notification and you could schedule an intro call.");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Users2 className="w-8 h-8 text-primary-600" />
          <h1 className="text-5xl font-semibold tracking-tighter">Mentoring Matching</h1>
        </div>
        <p className="text-slate-600 max-w-lg">Connect with experienced actuaries or give back by mentoring the next generation. Our smart matching helps find the right fit.</p>
      </div>

      {/* Matching Form */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 mb-10">
        <h2 className="font-semibold text-xl mb-6">Find your mentoring match</h2>
        
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium mb-2">I want to be a</label>
            <div className="flex gap-2">
              <button 
                onClick={() => setRole('mentee')} 
                className={`flex-1 py-2.5 rounded-2xl border text-sm font-medium ${role === 'mentee' ? 'bg-primary-600 text-white border-primary-600' : 'border-slate-200'}`}
              >
                Mentee (looking for guidance)
              </button>
              <button 
                onClick={() => setRole('mentor')} 
                className={`flex-1 py-2.5 rounded-2xl border text-sm font-medium ${role === 'mentor' ? 'bg-primary-600 text-white border-primary-600' : 'border-slate-200'}`}
              >
                Mentor (giving back)
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Focus Area</label>
            <select 
              value={selectedSpecialism} 
              onChange={e => setSelectedSpecialism(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl px-4 py-2.5"
            >
              <option value="">Any specialism</option>
              {['Life Insurance', 'General Insurance', 'Pensions', 'Climate Risk & ESG', 'Data Science & Analytics', 'Capital Modelling'].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Your experience level (years)</label>
            <input 
              type="range" 
              min="0" 
              max="25" 
              value={experienceLevel} 
              onChange={e => setExperienceLevel(parseInt(e.target.value))}
              className="w-full accent-primary-600"
            />
            <div className="text-center text-sm mt-1 font-medium">{experienceLevel} years</div>
          </div>
        </div>

        <button 
          onClick={findMatches}
          className="w-full md:w-auto bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-2xl font-semibold"
        >
          Find Matches
        </button>
      </div>

      {/* Matches */}
      {matches.length > 0 && (
        <div>
          <h3 className="font-semibold text-xl mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-primary-600" /> 
            Recommended Matches ({matches.length})
          </h3>
          
          <div className="grid md:grid-cols-2 gap-5">
            {matches.map(match => (
              <div key={match.id} className="bg-white border border-slate-200 rounded-3xl p-6">
                <div className="flex justify-between mb-4">
                  <div>
                    <div className="font-semibold text-xl">{match.name}</div>
                    <div className="text-sm text-slate-600">{match.title} • {match.company}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-emerald-600 font-medium">Match Score</div>
                    <div className="text-2xl font-semibold text-emerald-600">{match.matchScore}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {match.specialisms.slice(0,4).map((s: string, i: number) => (
                    <span key={i} className="text-xs bg-slate-100 px-2.5 py-0.5 rounded-full">{s}</span>
                  ))}
                </div>

                <p className="text-sm text-slate-600 line-clamp-2 mb-4">{match.bio}</p>

                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <div>{match.experience} years experience</div>
                  <div className="flex items-center gap-1"><Clock className="w-3 h-3" /> {match.availability}</div>
                </div>

                <button 
                  onClick={() => requestMentoring(match.id)}
                  disabled={requested.includes(match.id)}
                  className={`w-full py-2.5 rounded-2xl text-sm font-semibold transition-all ${requested.includes(match.id) 
                    ? 'bg-emerald-100 text-emerald-700 cursor-default' 
                    : 'bg-slate-900 hover:bg-black text-white'}`}
                >
                  {requested.includes(match.id) ? 'Request Sent ✓' : `Request ${role === 'mentee' ? 'Mentorship' : 'to Mentor'}`}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {matches.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          Click "Find Matches" above to see smart recommendations based on your preferences.
        </div>
      )}
    </div>
  );
}