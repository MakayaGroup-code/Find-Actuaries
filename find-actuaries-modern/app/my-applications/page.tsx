'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Clock, Building2 } from 'lucide-react';

interface Application {
  jobId: number;
  jobTitle: string;
  company: string;
  appliedDate: string;
  status: string;
}

export default function MyApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('fa_applications');
    if (saved) {
      setApplications(JSON.parse(saved));
    }
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-700';
      case 'Under Review': return 'bg-yellow-100 text-yellow-700';
      case 'Interview': return 'bg-purple-100 text-purple-700';
      case 'Offer': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <Link href="/jobs" className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Jobs
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-semibold tracking-tighter">My Applications</h1>
        <p className="text-slate-600 mt-2">Track the status of all jobs you've applied to through Find Actuaries.</p>
      </div>

      {applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app, index) => (
            <div key={index} className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="font-semibold text-xl tracking-tight">{app.jobTitle}</div>
                <div className="flex items-center gap-2 text-slate-600 mt-1">
                  <Building2 className="w-4 h-4" /> {app.company}
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Clock className="w-4 h-4" /> 
                  Applied {new Date(app.appliedDate).toLocaleDateString('en-GB')}
                </div>
                
                <div className={`px-4 py-1.5 rounded-full text-sm font-medium text-center ${getStatusColor(app.status)}`}>
                  {app.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
          <p className="text-slate-600 mb-6">Start applying to jobs from the Jobs page. Your applications will appear here.</p>
          <Link href="/jobs" className="inline-block bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-semibold">
            Browse Jobs
          </Link>
        </div>
      )}

      <p className="text-xs text-center text-slate-500 mt-8">
        In production, this data would be stored securely in the database and include real-time status updates from employers.
      </p>
    </div>
  );
}