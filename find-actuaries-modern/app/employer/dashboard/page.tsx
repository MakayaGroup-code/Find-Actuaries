'use client';

import React, { useState } from 'react';
import { mockJobs, mockActuaries } from '@/lib/mockData';
import { Users, Briefcase, Eye, MessageCircle } from 'lucide-react';

export default function EmployerDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'talent' | 'applications'>('overview');
  const [postedJobs, setPostedJobs] = useState(mockJobs.slice(0, 3)); // Demo: show some of user's jobs
  const [talentSearchTerm, setTalentSearchTerm] = useState('');

  const filteredTalent = mockActuaries.filter(a => 
    a.name.toLowerCase().includes(talentSearchTerm.toLowerCase()) ||
    a.specialisms.some(s => s.toLowerCase().includes(talentSearchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="text-xs tracking-[2px] text-primary-600 font-semibold">EMPLOYER PORTAL</div>
          <h1 className="text-4xl font-semibold tracking-tighter">Employer Dashboard</h1>
        </div>
        <button 
          onClick={() => alert("In production this would open the job posting form.")}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm flex items-center gap-2"
        >
          <Briefcase className="w-4 h-4" /> Post New Vacancy
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b mb-8">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'jobs', label: 'My Job Postings', icon: Briefcase },
          { id: 'applications', label: 'Applications Received', icon: Users },
          { id: 'talent', label: 'Talent Search', icon: Users },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-all ${activeTab === tab.id ? 'border-primary-600 text-primary-700' : 'border-transparent text-slate-600 hover:text-slate-900'}`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <div className="text-sm text-slate-500">Active Job Postings</div>
            <div className="text-5xl font-semibold mt-2">{postedJobs.length}</div>
            <div className="text-emerald-600 text-sm mt-1">+2 this month</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <div className="text-sm text-slate-500">Profile Views (last 30 days)</div>
            <div className="text-5xl font-semibold mt-2">1,284</div>
            <div className="text-emerald-600 text-sm mt-1">↑ 34% vs last month</div>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-6">
            <div className="text-sm text-slate-500">Applications Received</div>
            <div className="text-5xl font-semibold mt-2">47</div>
            <div className="text-emerald-600 text-sm mt-1">12 new this week</div>
          </div>
        </div>
      )}

      {/* My Jobs */}
      {activeTab === 'jobs' && (
        <div className="space-y-4">
          {postedJobs.map(job => (
            <div key={job.id} className="bg-white border border-slate-200 rounded-3xl p-6 flex justify-between items-center">
              <div>
                <div className="font-semibold text-xl">{job.title}</div>
                <div className="text-slate-600">{job.company} • {job.location} • {job.type}</div>
              </div>
              <div className="text-right text-sm">
                <div className="text-emerald-600 font-medium">12 applications</div>
                <div className="text-slate-500">Posted {new Date(job.postedDate).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
          {postedJobs.length === 0 && <p className="text-slate-500">You haven't posted any jobs yet.</p>}
        </div>
      )}

      {/* Applications Received */}
      {activeTab === 'applications' && (
        <div>
          <div className="mb-6">
            <h3 className="font-semibold text-xl">Recent Applications</h3>
            <p className="text-sm text-slate-500">Applications received for your posted roles (demo data)</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Candidate</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Job</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Applied</th>
                  <th className="text-left px-6 py-4 text-sm font-medium text-slate-600">Status</th>
                  <th className="text-right px-6 py-4 text-sm font-medium text-slate-600">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[
                  { name: "James Okoro", job: "Pricing Actuary - Cyber", date: "2 days ago", status: "Under Review" },
                  { name: "Priya Sharma", job: "Senior Life Actuary", date: "4 days ago", status: "Interview" },
                  { name: "Michael Chen", job: "Actuarial Data Scientist", date: "1 week ago", status: "Applied" },
                ].map((app, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4 font-medium">{app.name}</td>
                    <td className="px-6 py-4 text-slate-600">{app.job}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{app.date}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">{app.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button onClick={() => alert("In production this would open candidate profile and allow status update.")} className="text-sm text-primary-600 hover:underline">View Profile</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Talent Search */}
      {activeTab === 'talent' && (
        <div>
          <div className="mb-6">
            <input 
              type="text" 
              placeholder="Search talent by name or specialism..." 
              value={talentSearchTerm}
              onChange={e => setTalentSearchTerm(e.target.value)}
              className="w-full max-w-md border border-slate-200 rounded-2xl px-5 py-3"
            />
            <p className="text-xs text-slate-500 mt-2">Showing verified actuaries. Full platform includes advanced filters + direct outreach credits.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTalent.slice(0, 9).map(person => (
              <div key={person.id} className="bg-white border border-slate-200 rounded-3xl p-6">
                <div className="font-semibold text-lg">{person.name}</div>
                <div className="text-sm text-slate-600 mb-3">{person.title} at {person.company}</div>
                
                <div className="flex flex-wrap gap-1 mb-4">
                  {person.specialisms.slice(0,3).map((s, i) => <span key={i} className="text-xs bg-slate-100 px-2 py-0.5 rounded-full">{s}</span>)}
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => alert(`In production this would open a message composer to ${person.name}.`)}
                    className="flex-1 flex items-center justify-center gap-2 text-sm border border-slate-300 hover:bg-slate-50 py-2 rounded-2xl"
                  >
                    <MessageCircle className="w-4 h-4" /> Message
                  </button>
                  <button className="flex-1 text-sm bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-2xl">
                    View Full Profile
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}