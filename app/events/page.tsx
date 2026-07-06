'use client';

import React from 'react';
import { eventOptions } from '@/lib/mockData';
import { Calendar, MapPin } from 'lucide-react';

export default function EventsPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <div className="text-primary-600 font-semibold tracking-[1.5px] text-xs">COMMUNITY</div>
        <h1 className="text-5xl font-semibold tracking-tighter">Events &amp; Networking</h1>
        <p className="mt-3 max-w-md text-slate-600">Hybrid events, workshops, and the return of our signature "Change Happens" series on the future of the actuarial profession.</p>
      </div>

      <div className="space-y-6">
        {eventOptions.map(event => (
          <div key={event.id} className="card bg-white border border-slate-200 rounded-3xl p-8 flex flex-col md:flex-row gap-8">
            <div className="md:w-48 flex-shrink-0">
              <div className="text-sm text-primary-600 font-medium flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4" /> {new Date(event.date).toLocaleDateString('en-GB', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </div>
              <div className="font-semibold text-2xl tracking-tight">{event.title}</div>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                <MapPin className="w-4 h-4" /> {event.location} • {event.type}
              </div>
              <p className="text-slate-600 mb-6">{event.description}</p>
              
              <button 
                onClick={() => alert("In the full platform this would open registration or add to calendar.")}
                className="px-6 py-2.5 bg-slate-900 hover:bg-black text-white rounded-2xl text-sm font-medium"
              >
                Register Interest
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center text-sm text-slate-500">
        More events coming soon. Want to host or sponsor? <a href="#" className="text-primary-600 hover:underline">Get in touch</a>.
      </div>
    </div>
  );
}