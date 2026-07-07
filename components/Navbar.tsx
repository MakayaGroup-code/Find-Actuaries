'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Users, Briefcase, Calendar, LogIn, UserPlus, Menu, X, User, Users2, Building2 } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState<'actuary' | 'employer'>('actuary');

  // Persist login state using localStorage for better demo experience
  useEffect(() => {
    const savedLogin = localStorage.getItem('fa_logged_in');
    const savedType = localStorage.getItem('fa_user_type') as 'actuary' | 'employer' | null;
    if (savedLogin === 'true') {
      setIsLoggedIn(true);
      if (savedType) setUserType(savedType);
    }
  }, []);

  const toggleLogin = () => {
    const newState = !isLoggedIn;
    setIsLoggedIn(newState);
    localStorage.setItem('fa_logged_in', newState.toString());
    if (!newState) {
      localStorage.removeItem('fa_user_type');
    }
  };

  const loginAs = (type: 'actuary' | 'employer') => {
    setIsLoggedIn(true);
    setUserType(type);
    localStorage.setItem('fa_logged_in', 'true');
    localStorage.setItem('fa_user_type', type);
  };

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <svg viewBox="0 0 260 260" className="w-9 h-9" aria-hidden="true">
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
            <div>
              <div className="font-semibold text-xl tracking-tight">Find Actuaries</div>
              <div className="text-[10px] text-slate-500 -mt-1">Africa opens every direction</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/directory" className="nav-link flex items-center gap-1.5 text-slate-700 hover:text-slate-900">
              <Users className="w-4 h-4" /> Directory
            </Link>
            <Link href="/jobs" className="nav-link flex items-center gap-1.5 text-slate-700 hover:text-slate-900">
              <Briefcase className="w-4 h-4" /> Jobs
            </Link>
            <Link href="/events" className="nav-link flex items-center gap-1.5 text-slate-700 hover:text-slate-900">
              <Calendar className="w-4 h-4" /> Events
            </Link>
            <Link href="/mentoring" className="nav-link flex items-center gap-1.5 text-slate-700 hover:text-slate-900">
              <Users2 className="w-4 h-4" /> Mentoring
            </Link>
            {isLoggedIn && userType === 'actuary' && (
              <Link href="/profile/edit" className="nav-link flex items-center gap-1.5 text-slate-700 hover:text-slate-900">
                <User className="w-4 h-4" /> My Profile
              </Link>
            )}
            {isLoggedIn && userType === 'employer' && (
              <Link href="/employer/dashboard" className="nav-link flex items-center gap-1.5 text-slate-700 hover:text-slate-900">
                <Building2 className="w-4 h-4" /> Employer Dashboard
              </Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {!isLoggedIn ? (
              <>
                <Link 
                  href="/login" 
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
                >
                  <LogIn className="w-4 h-4" /> Log in
                </Link>
                <div className="relative group">
                  <Link 
                    href="/register" 
                    className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all active:scale-[0.985]"
                  >
                    <UserPlus className="w-4 h-4" /> Join
                  </Link>
                  {/* Quick demo login options */}
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 hidden group-hover:block z-50">
                    <button onClick={() => loginAs('actuary')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2">
                      <User className="w-4 h-4" /> Demo as Actuary
                    </button>
                    <button onClick={() => loginAs('employer')} className="w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center gap-2">
                      <Building2 className="w-4 h-4" /> Demo as Employer
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-sm text-slate-600">Welcome, <span className="font-semibold text-slate-900">{userType === 'actuary' ? 'Elena' : 'Hiring Team'}</span></div>
                <button 
                  onClick={toggleLogin}
                  className="text-sm px-4 py-1.5 border border-slate-300 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  Log out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="md:hidden p-2 text-slate-600"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white px-6 py-4 space-y-3 text-sm">
          <Link href="/directory" className="block py-2 text-slate-700">Directory</Link>
          <Link href="/jobs" className="block py-2 text-slate-700">Jobs & Opportunities</Link>
          <Link href="/events" className="block py-2 text-slate-700">Events</Link>
          <Link href="/mentoring" className="block py-2 text-slate-700">Mentoring</Link>
          <div className="pt-3 border-t flex flex-col gap-2">
            {!isLoggedIn ? (
              <>
                <Link href="/login" className="py-2 text-slate-700">Log in</Link>
                <Link href="/register" className="bg-primary-600 text-white text-center py-2.5 rounded-xl font-semibold">Join the Network</Link>
                <button onClick={() => loginAs('actuary')} className="text-left py-1.5 text-sm text-primary-600">Quick demo: Actuary</button>
                <button onClick={() => loginAs('employer')} className="text-left py-1.5 text-sm text-primary-600">Quick demo: Employer</button>
              </>
            ) : (
              <>
                {userType === 'actuary' && (
                  <Link href="/profile/edit" className="py-1.5">My Profile</Link>
                )}
                {userType === 'employer' && (
                  <Link href="/employer/dashboard" className="py-1.5">Employer Dashboard</Link>
                )}
                <button onClick={toggleLogin} className="text-left py-2 text-red-600">Log out</button>
              </>            )}
          </div>
        </div>
      )}
    </nav>
  );
}