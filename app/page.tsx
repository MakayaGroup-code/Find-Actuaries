'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Briefcase, Calendar, Award, Zap } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-primary-950 text-white pt-16 pb-20">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 text-xs font-medium tracking-[1.5px] px-4 py-1 rounded-full mb-6">
            AN IDEA FROM 2001 • REBUILT FOR 2027
          </div>
          
          <h1 className="text-6xl md:text-7xl font-semibold tracking-tighter leading-none mb-6">
            Africa opens<br />every direction.<br />
            <span className="text-accent">See where you can go.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xl text-slate-300 mb-10">
            A platform for African actuarial talent — built to show every field your qualification
            actually opens, not just the traditional ones. In service of 3E Foundation&apos;s work
            growing the profession across Nigeria, Ghana, Kenya and Tanzania.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/directory" 
              className="inline-flex items-center justify-center gap-3 bg-white text-slate-950 hover:bg-slate-100 px-8 py-4 rounded-2xl font-semibold text-lg transition-all active:scale-[0.985]"
            >
              Explore the Directory <Users className="w-5 h-5" />
            </Link>
            <Link 
              href="/jobs" 
              className="inline-flex items-center justify-center gap-3 border border-white/30 hover:bg-white/10 px-8 py-4 rounded-2xl font-semibold text-lg transition-all"
            >
              Browse Opportunities <Briefcase className="w-5 h-5" />
            </Link>
          </div>

          <div className="mt-8 text-xs text-white/50 tracking-widest">BUILDING TOWARD LAUNCH, ALONGSIDE 3E FOUNDATION</div>
        </div>
      </div>

      {/* Trust / Story Bar */}
      <div className="border-b bg-white py-5">
        <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-slate-600">
          <div className="flex items-center gap-2"><Award className="w-4 h-4 text-primary-600" /> An idea from 2001, rebuilt for 2027</div>
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary-600" /> Mentoring from qualified actuaries across Africa</div>
          <div className="flex items-center gap-2"><Users className="w-4 h-4 text-primary-600" /> In service of 3E Foundation&apos;s mission</div>
        </div>
      </div>

      {/* Features / Why Now */}
      <div className="max-w-6xl mx-auto px-6 pt-16 pb-12">
        <div className="text-center mb-12">
          <div className="text-primary-600 font-semibold tracking-[2px] text-xs mb-2">WHY FIND ACTUARIES IN 2026</div>
          <h2 className="text-4xl font-semibold tracking-tight">Built for how actuaries actually work today</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: <Users className="w-6 h-6" />,
              title: "Verified Professional Directory",
              desc: "Rich profiles with specialisms (including Climate, AI/ML, Cyber), availability status, and privacy controls. Search by experience, location, or contract preference."
            },
            {
              icon: <Briefcase className="w-6 h-6" />,
              title: "Direct Job & Gig Marketplace",
              desc: "Employers post directly. Actuaries apply or signal openness. Strong focus on contract, freelance, and project work alongside permanent roles."
            },
            {
              icon: <Calendar className="w-6 h-6" />,
              title: "Community & Modern Networking",
              desc: "Hybrid events, practice-area groups, and mentoring matched from a pool of qualified actuaries who've volunteered their time to the next generation."
            }
          ].map((feature, index) => (
            <div key={index} className="card bg-white border border-slate-200 p-8 rounded-3xl">
              <div className="w-12 h-12 bg-primary-100 text-primary-700 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-2xl tracking-tight mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-900 py-16 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-semibold tracking-tight mb-4">See where your discipline can take you.</h2>
          <p className="text-slate-400 max-w-md mx-auto mb-8">Whether you&apos;re an actuary looking for your next role or an employer seeking verified talent, Find Actuaries is built for you.</p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="bg-primary-600 hover:bg-primary-700 transition-colors px-8 py-3.5 rounded-2xl font-semibold inline-flex items-center justify-center gap-2">
              Create your profile <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/jobs" className="border border-white/30 hover:bg-white/5 px-8 py-3.5 rounded-2xl font-semibold inline-flex items-center justify-center gap-2">
              Post a vacancy as an employer
            </Link>
          </div>
        </div>
      </div>

      {/* Final note */}
      <div className="max-w-4xl mx-auto px-6 py-12 text-center text-sm text-slate-500">
        Find Actuaries is an independent platform, wholly in service of 3E Foundation&apos;s work growing a self-sustaining actuarial profession across Africa.
      </div>
    </div>
  );
}