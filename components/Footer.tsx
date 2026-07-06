import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-y-10 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <svg viewBox="0 0 260 260" className="w-7 h-7" aria-hidden="true">
              <line x1="122" y1="120" x2="188" y2="65" stroke="#B8672A" strokeWidth="12" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="201" y2="124" stroke="#B8672A" strokeWidth="12" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="175" y2="182" stroke="#B8672A" strokeWidth="12" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="118" y2="195" stroke="#B8672A" strokeWidth="12" strokeLinecap="round"/>
              <line x1="122" y1="120" x2="60" y2="151" stroke="#B8672A" strokeWidth="12" strokeLinecap="round"/>
              <circle cx="188" cy="65" r="18" fill="#B8672A"/>
              <circle cx="201" cy="124" r="18" fill="#B8672A"/>
              <circle cx="175" cy="182" r="18" fill="#B8672A"/>
              <circle cx="118" cy="195" r="18" fill="#B8672A"/>
              <circle cx="60" cy="151" r="18" fill="#B8672A"/>
              <circle cx="122" cy="120" r="24" fill="#ffffff" stroke="#8FA0C4" strokeWidth="7"/>
            </svg>
            <span className="text-white font-semibold">Find Actuaries</span>
          </div>
          <p className="text-xs">Africa opens every direction.<br />An idea born 2001 · rebuilt 2026.</p>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">Platform</div>
          <div className="space-y-1.5 text-xs">
            <div>Member Directory</div>
            <div>Jobs &amp; Gigs</div>
            <div>Events &amp; Networking</div>
            <div>Mentoring</div>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">For Employers</div>
          <div className="space-y-1.5 text-xs">
            <div>Post a Vacancy</div>
            <div>Search Talent</div>
            <div>Corporate Membership</div>
            <div>Find Consultants</div>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">Company</div>
          <div className="space-y-1.5 text-xs">
            <div>About Us</div>
            <div>Our Story</div>
            <div>Contact</div>
            <div>Privacy &amp; Data</div>
          </div>
          <div className="mt-6 text-[10px] text-slate-500">
            © {new Date().getFullYear()} Find Actuaries Limited.<br />
            In service of 3E Foundation&apos;s work across Africa
          </div>
        </div>
      </div>
    </footer>
  );
}