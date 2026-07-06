'use client';

import React, { useState, useMemo } from 'react';
import { mockJobs, Job } from '@/lib/mockData';
import { Search, MapPin, Calendar, Plus } from 'lucide-react';

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [showPostModal, setShowPostModal] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '', company: '', location: '', type: 'Permanent' as const, salary: '', experience: '', description: '', contactEmail: ''
  });

  // Simple AI Job Recommendations based on mock user profile
  const recommendedJobs = useMemo(() => {
    // Simulate current user profile (in real app this would come from logged-in user)
    const userSpecialisms = ['General Insurance', 'Pricing', 'Data Science & Analytics'];
    const userExperience = 9;

    return jobs
      .map(job => {
        let score = 0;
        let reasons: string[] = [];

        // Specialism match
        if (userSpecialisms.some(s => job.title.toLowerCase().includes(s.toLowerCase().split(' ')[0]) || 
            job.description.toLowerCase().includes(s.toLowerCase()))) {
          score += 40;
          reasons.push("Matches your specialisms");
        }

        // Experience level alignment
        if (job.experience.toLowerCase().includes('qualified') || job.experience.toLowerCase().includes('senior')) {
          if (userExperience >= 7) {
            score += 25;
            reasons.push("Good seniority fit");
          }
        } else {
          score += 15;
        }

        // Contract preference bonus (demo)
        if (job.type === 'Contract') score += 20;

        return { ...job, matchScore: Math.min(95, score), matchReasons: reasons };
      })
      .filter(j => j.matchScore > 30)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        job.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !typeFilter || job.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [jobs, searchTerm, typeFilter]);

  const handlePostJob = (e: React.FormEvent) => {
    e.preventDefault();
    
    const jobToAdd: Job = {
      id: Date.now(),
      ...newJob,
      postedDate: new Date().toISOString().split('T')[0],
      postedBy: "You (Demo)",
    };
    
    setJobs([jobToAdd, ...jobs]);
    setShowPostModal(false);
    setNewJob({ title: '', company: '', location: '', type: 'Permanent', salary: '', experience: '', description: '', contactEmail: '' });
    
    alert("Job posted successfully! (In production this would be saved to the database and visible to all users)");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="text-primary-600 font-semibold tracking-[1.5px] text-xs">OPPORTUNITIES</div>
          <h1 className="text-5xl font-semibold tracking-tighter">Jobs &amp; Gigs</h1>
        </div>
        <button 
          onClick={() => setShowPostModal(true)}
          className="inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-2xl font-semibold text-sm transition-all"
        >
          <Plus className="w-4 h-4" /> Post a Vacancy
        </button>
      </div>

      {/* AI Job Recommendations */}
      {recommendedJobs.length > 0 && (
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="text-primary-600 font-semibold tracking-[1.5px] text-xs">AI POWERED</div>
            <h2 className="font-semibold text-2xl tracking-tight">Recommended for You</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {recommendedJobs.map(job => (
              <div key={job.id} className="bg-white border border-primary-200 rounded-3xl p-5">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">{job.title}</div>
                  <div className="text-emerald-600 text-sm font-medium">{job.matchScore}% match</div>
                </div>
                <div className="text-sm text-slate-600 mb-3">{job.company} • {job.location}</div>
                <div className="text-xs text-slate-500 mb-3">
                  {job.matchReasons.join(" • ")}
                </div>
                <button 
                  onClick={() => alert(`Thank you! Application submitted for ${job.title}.`)}
                  className="w-full text-sm bg-primary-600 hover:bg-primary-700 text-white py-2 rounded-2xl"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Search + Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search job titles, companies, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input w-full pl-12 py-3 border border-slate-200 bg-white rounded-2xl focus:outline-none focus:border-primary-300"
          />
        </div>
        <select 
          value={typeFilter} 
          onChange={(e) => setTypeFilter(e.target.value)}
          className="border border-slate-200 rounded-2xl px-5 py-3 text-sm bg-white min-w-[160px]"
        >
          <option value="">All types</option>
          <option value="Permanent">Permanent</option>
          <option value="Contract">Contract</option>
          <option value="Temporary">Temporary</option>
        </select>
      </div>

      {/* Jobs List */}
      <div className="space-y-4">
        {filteredJobs.length > 0 ? filteredJobs.map(job => (
          <div key={job.id} className="card bg-white border border-slate-200 rounded-3xl p-7 hover:border-primary-200 transition-all">
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-semibold text-2xl tracking-tight">{job.title}</h3>
                  <span className={`badge badge-${job.type.toLowerCase()}`}>{job.type}</span>
                </div>
                <div className="text-slate-600 mb-3">{job.company} • {job.location}</div>
                
                <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm mb-4 text-slate-600">
                  <div className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {job.location}</div>
                  <div>{job.salary}</div>
                  <div>{job.experience}</div>
                </div>

                <p className="text-slate-600 leading-relaxed line-clamp-3 mb-4">{job.description}</p>
              </div>

              <div className="lg:text-right lg:min-w-[180px] flex flex-col lg:items-end gap-2">
                <div className="text-xs text-slate-500">Posted {new Date(job.postedDate).toLocaleDateString('en-GB', {month:'short', day:'numeric'})}</div>
                {job.closingDate && <div className="text-xs text-amber-600">Closes {new Date(job.closingDate).toLocaleDateString('en-GB')}</div>}
                
                <button 
                  onClick={() => alert(`Thank you! In the full platform you would be taken to an application form or email for ${job.company}.`)}
                  className="mt-2 bg-slate-900 hover:bg-black text-white text-sm px-6 py-2.5 rounded-2xl font-medium w-full lg:w-auto"
                >
                  Apply Now
                </button>
                <div className="text-[10px] text-slate-400">via Find Actuaries</div>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-center py-12 text-slate-500">No jobs match your search.</div>
        )}
      </div>

      {/* Post Job Modal */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4" onClick={() => setShowPostModal(false)}>
          <div className="modal bg-white rounded-3xl w-full max-w-2xl" onClick={e => e.stopPropagation()}>
            <div className="p-8">
              <h2 className="text-2xl font-semibold mb-1">Post a New Vacancy</h2>
              <p className="text-sm text-slate-500 mb-6">This will be visible immediately to our network (demo mode).</p>

              <form onSubmit={handlePostJob} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input required placeholder="Job Title" value={newJob.title} onChange={e => setNewJob({...newJob, title: e.target.value})} className="border p-3 rounded-2xl" />
                  <input required placeholder="Company" value={newJob.company} onChange={e => setNewJob({...newJob, company: e.target.value})} className="border p-3 rounded-2xl" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <input required placeholder="Location" value={newJob.location} onChange={e => setNewJob({...newJob, location: e.target.value})} className="border p-3 rounded-2xl" />
                  <select value={newJob.type} onChange={e => setNewJob({...newJob, type: e.target.value as any})} className="border p-3 rounded-2xl">
                    <option>Permanent</option><option>Contract</option><option>Temporary</option>
                  </select>
                  <input placeholder="Salary / Day Rate" value={newJob.salary} onChange={e => setNewJob({...newJob, salary: e.target.value})} className="border p-3 rounded-2xl" />
                </div>

                <textarea required placeholder="Job description..." value={newJob.description} onChange={e => setNewJob({...newJob, description: e.target.value})} rows={5} className="w-full border p-4 rounded-3xl resize-y" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <input placeholder="Experience required" value={newJob.experience} onChange={e => setNewJob({...newJob, experience: e.target.value})} className="border p-3 rounded-2xl" />
                  <input required type="email" placeholder="Contact email for applications" value={newJob.contactEmail} onChange={e => setNewJob({...newJob, contactEmail: e.target.value})} className="border p-3 rounded-2xl" />
                </div>

                <div className="flex gap-3 pt-3">
                  <button type="button" onClick={() => setShowPostModal(false)} className="flex-1 py-3 border rounded-2xl">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-primary-600 text-white rounded-2xl font-semibold">Post Vacancy</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}