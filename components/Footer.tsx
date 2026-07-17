import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-y-10 text-sm">
        <div>
          <Link href="/" className="flex items-center gap-2 mb-3 hover:opacity-80 transition-opacity">
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
          </Link>
          <p className="text-xs">Africa opens every direction.<br />An idea born 2001 · rebuilt 2026.</p>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">Platform</div>
          <div className="space-y-1.5 text-xs">
            <Link href="/directory" className="block hover:text-white">Member Directory</Link>
            <Link href="/jobs" className="block hover:text-white">Jobs &amp; Gigs</Link>
            <Link href="/events" className="block hover:text-white">Events &amp; Networking</Link>
            <Link href="/mentoring" className="block hover:text-white">Mentoring</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">For Employers</div>
          <div className="space-y-1.5 text-xs">
            <Link href="/jobs" className="block hover:text-white">Post a Vacancy</Link>
            <Link href="/directory" className="block hover:text-white">Search Talent</Link>
            <Link href="/employers/membership" className="block hover:text-white">Corporate Membership</Link>
            <Link href="/employers/consultants" className="block hover:text-white">Find Consultants</Link>
          </div>
        </div>

        <div>
          <div className="font-semibold text-white mb-3">Company</div>
          <div className="space-y-1.5 text-xs">
            <Link href="/about" className="block hover:text-white">About Us</Link>
            <Link href="/our-story" className="block hover:text-white">Our Story</Link>
            <Link href="/contact" className="block hover:text-white">Contact</Link>
            <Link href="/privacy" className="block hover:text-white">Privacy &amp; Data</Link>
          </div>
          <div className="mt-6 text-[10px] text-slate-500">
            © {new Date().getFullYear()} Find Actuaries Limited.<br />
            In service of 3E Foundation&apos;s work across Africa
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-10 pt-6 border-t border-slate-800">
        {/* Makaya Group endorsement */}
        <a
          href="https://makayagroupng.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="A member of the Makaya Group — visit makayagroupng.com"
          className="flex items-center justify-center gap-3 text-slate-500 hover:text-white transition-colors mb-8"
        >
          <svg viewBox="0 0 240 240" className="w-10 h-10 flex-none" aria-hidden="true">
            <circle cx="120" cy="120" r="92" fill="none" stroke="currentColor" strokeWidth="2.4" />
            <circle cx="120" cy="120" r="80" fill="none" stroke="currentColor" strokeWidth="1" />
            <text x="120" y="152" textAnchor="middle" fontFamily="'Cormorant Garamond', Georgia, serif" fontWeight="600" fontSize="104" fill="currentColor">M</text>
            <line x1="96" y1="178" x2="144" y2="178" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity="0.5" />
            <path d="M120 160 L111 178 L129 178 Z" fill="currentColor" />
          </svg>
          <span className="flex flex-col gap-1 leading-none">
            <span className="text-[9.5px] uppercase tracking-[0.26em] font-medium opacity-90">A member of the</span>
            <span style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }} className="text-lg tracking-[0.14em] text-white">MAKAYA GROUP</span>
          </span>
        </a>
        <p className="text-[11px] text-slate-500">
          <strong className="text-slate-400">Test environment.</strong> This is a closed build for
          authorised testing only — not a live service, and not indexed or linked from
          findactuaries.com. Nothing entered here is stored; see{' '}
          <Link href="/privacy" className="underline hover:text-slate-300">Privacy &amp; Data</Link> for detail.
        </p>
      </div>
    </footer>
  );
}
