'use client';

import React, { useState, useMemo } from 'react';
import { mockActuaries, specialismOptions, locationOptions, ActuaryProfile } from '@/lib/mockData';
import { Search, MapPin, Clock, Award, ExternalLink } from 'lucide-react';

export default function DirectoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialisms, setSelectedSpecialisms] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedAvailability, setSelectedAvailability] = useState<string>('');
  const [selectedProfile, setSelectedProfile] = useState<ActuaryProfile | null>(null);

  const filteredActuaries = useMemo(() => {
    return mockActuaries.filter((actuary) => {
      const matchesSearch = 
        actuary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actuary.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actuary.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        actuary.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesSpecialism = selectedSpecialisms.length === 0 || 
        selectedSpecialisms.some(s => actuary.specialisms.includes(s));

      const matchesLocation = selectedLocations.length === 0 || 
        selectedLocations.includes(actuary.location);

      const matchesAvailability = !selectedAvailability || actuary.availability === selectedAvailability;

      return matchesSearch && matchesSpecialism && matchesLocation && matchesAvailability;
    });
  }, [searchTerm, selectedSpecialisms, selectedLocations, selectedAvailability]);

  const toggleSpecialism = (spec: string) => {
    setSelectedSpecialisms(prev => 
      prev.includes(spec) ? prev.filter(s => s !== spec) : [...prev, spec]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev => 
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialisms([]);
    setSelectedLocations([]);
    setSelectedAvailability('');
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="text-primary-600 font-semibold tracking-[1.5px] text-xs">VERIFIED PROFESSIONALS</div>
          <h1 className="text-5xl font-semibold tracking-tighter">Find an Actuary</h1>
          <p className="text-slate-600 mt-2">Search our network of qualified actuaries. Privacy-first profiles with rich detail on specialisms and availability.</p>
        </div>
        <div className="text-sm text-slate-500">
          {filteredActuaries.length} actuaries found
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 mb-8">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by name, title, company, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input w-full pl-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl text-lg focus:outline-none focus:border-primary-300"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Specialisms */}
          <div>
            <div className="font-medium text-sm mb-2 flex items-center gap-2"><Award className="w-4 h-4" /> Specialisms</div>
            <div className="flex flex-wrap gap-2">
              {specialismOptions.slice(0, 8).map(spec => (
                <button
                  key={spec}
                  onClick={() => toggleSpecialism(spec)}
                  className={`filter-chip text-xs px-3 py-1 rounded-full border transition-all ${selectedSpecialisms.includes(spec) ? 'active border-primary-600' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div>
            <div className="font-medium text-sm mb-2 flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</div>
            <div className="flex flex-wrap gap-2">
              {locationOptions.map(loc => (
                <button
                  key={loc}
                  onClick={() => toggleLocation(loc)}
                  className={`filter-chip text-xs px-3 py-1 rounded-full border transition-all ${selectedLocations.includes(loc) ? 'active border-primary-600' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  {loc}
                </button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <div className="font-medium text-sm mb-2 flex items-center gap-2"><Clock className="w-4 h-4" /> Availability</div>
            <select 
              value={selectedAvailability} 
              onChange={(e) => setSelectedAvailability(e.target.value)}
              className="w-full border border-slate-200 rounded-2xl px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-primary-300"
            >
              <option value="">Any availability</option>
              <option value="Open to opportunities">Open to opportunities</option>
              <option value="Contract/Freelance only">Contract / Freelance only</option>
              <option value="Not looking">Not currently looking</option>
            </select>
          </div>
        </div>

        {(searchTerm || selectedSpecialisms.length > 0 || selectedLocations.length > 0 || selectedAvailability) && (
          <button onClick={clearFilters} className="mt-4 text-xs text-primary-600 hover:underline">Clear all filters</button>
        )}
      </div>

      {/* Results Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActuaries.length > 0 ? (
          filteredActuaries.map((actuary) => (
            <div 
              key={actuary.id} 
              onClick={() => setSelectedProfile(actuary)}
              className="card bg-white border border-slate-200 rounded-3xl p-6 cursor-pointer hover:border-primary-200 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="font-semibold text-xl tracking-tight group-hover:text-primary-700 transition-colors">{actuary.name}</div>
                  <div className="text-slate-600">{actuary.title}</div>
                  <div className="text-sm text-slate-500">{actuary.company} • {actuary.location}</div>
                </div>
                <div className={`text-xs px-2.5 py-0.5 rounded-full font-medium whitespace-nowrap ${actuary.availability.includes('Open') ? 'bg-emerald-100 text-emerald-700' : actuary.availability.includes('Contract') ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                  {actuary.availability}
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {actuary.specialisms.slice(0, 3).map((s, i) => (
                  <span key={i} className="text-xs bg-slate-100 px-2.5 py-px rounded-full text-slate-600">{s}</span>
                ))}
                {actuary.specialisms.length > 3 && <span className="text-xs text-slate-400">+{actuary.specialisms.length - 3}</span>}
              </div>

              <p className="text-sm text-slate-600 line-clamp-3 mb-4">{actuary.bio}</p>

              <div className="flex items-center justify-between text-xs text-slate-500">
                <div>{actuary.experience} years experience</div>
                {actuary.linkedin && <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-12 text-center text-slate-500">No actuaries match your current filters.</div>
        )}
      </div>

      {/* Profile Modal */}
      {selectedProfile && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100] p-4" onClick={() => setSelectedProfile(null)}>
          <div className="modal bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={e => e.stopPropagation()}>
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-semibold tracking-tight">{selectedProfile.name}</h2>
                  <p className="text-xl text-slate-600">{selectedProfile.title} at {selectedProfile.company}</p>
                </div>
                <button onClick={() => setSelectedProfile(null)} className="text-2xl leading-none text-slate-400 hover:text-slate-600">×</button>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <div className="badge bg-primary-100 text-primary-700">{selectedProfile.location}</div>
                <div className="badge bg-slate-100">{selectedProfile.experience} years</div>
                <div className={`badge ${selectedProfile.availability.includes('Open') ? 'bg-emerald-100 text-emerald-700' : ''}`}>{selectedProfile.availability}</div>
              </div>

              <div className="prose prose-slate max-w-none mb-8">
                <p>{selectedProfile.bio}</p>
              </div>

              <div className="mb-8">
                <div className="font-semibold mb-2 text-sm tracking-wider text-slate-500">SPECIALISMS</div>
                <div className="flex flex-wrap gap-2">
                  {selectedProfile.specialisms.map((s, i) => (
                    <span key={i} className="px-4 py-1 bg-slate-100 rounded-full text-sm">{s}</span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {selectedProfile.linkedin && (
                  <a href={selectedProfile.linkedin} target="_blank" className="flex-1 text-center border border-slate-300 hover:bg-slate-50 py-3 rounded-2xl font-medium">View LinkedIn Profile</a>
                )}
                <button 
                  onClick={() => alert(`In a full version, this would open a secure message form to ${selectedProfile.name}.`)}
                  className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-2xl font-semibold transition-colors"
                >
                  Contact {selectedProfile.name.split(' ')[0]}
                </button>
              </div>

              <p className="text-[10px] text-center text-slate-400 mt-6">This is a demo profile. Full platform includes verified IFoA status, document uploads, and private messaging.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}