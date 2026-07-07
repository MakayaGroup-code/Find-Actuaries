'use client';

import React, { useState } from 'react';
import { Users2, ShieldCheck, GraduationCap, Info } from 'lucide-react';
import {
  DegreeSubject, DegreeClass, APPROVED_DEGREE_SUBJECTS,
  calculateEligibility, calculateMentorPathway, calculateAge,
  seedStudents, StudentStage,
} from '@/lib/mentoringData';

const STAGE_LABELS: Record<StudentStage, string> = {
  applied: 'Applied',
  under_review: 'Under review',
  awaiting_assignment: 'Awaiting assignment',
  assigned: 'Assigned',
  active: 'Active',
  flagged: 'Flagged',
  reassignment_pending: 'Reassignment pending',
  completed: 'Completed',
  dropped: 'Removed from 1:1 track',
};

const STAGE_COLORS: Record<StudentStage, string> = {
  applied: 'bg-slate-100 text-slate-700',
  under_review: 'bg-amber-100 text-amber-700',
  awaiting_assignment: 'bg-amber-100 text-amber-700',
  assigned: 'bg-blue-100 text-blue-700',
  active: 'bg-emerald-100 text-emerald-700',
  flagged: 'bg-red-100 text-red-700',
  reassignment_pending: 'bg-amber-100 text-amber-700',
  completed: 'bg-emerald-100 text-emerald-700',
  dropped: 'bg-slate-200 text-slate-600',
};

export default function MentoringPage() {
  const [tab, setTab] = useState<'student' | 'mentor' | 'status'>('student');

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState<'Nigeria' | 'Ghana' | 'Kenya' | 'Tanzania' | 'Other'>('Nigeria');
  const [dob, setDob] = useState('');
  const [subject, setSubject] = useState<DegreeSubject>('Actuarial Science');
  const [degreeClass, setDegreeClass] = useState<DegreeClass>('Second Class Upper');
  const [university, setUniversity] = useState('');
  const [consent, setConsent] = useState(false);
  const [studentResult, setStudentResult] = useState<null | ReturnType<typeof calculateEligibility>>(null);

  const [mentorCountry, setMentorCountry] = useState('United States');
  const [credentialBody, setCredentialBody] = useState('');
  const [codeAccepted, setCodeAccepted] = useState(false);
  const [mentorResult, setMentorResult] = useState<null | ReturnType<typeof calculateMentorPathway>>(null);

  const submitStudent = () => {
    if (!dob || !consent) return;
    setStudentResult(calculateEligibility(dob, subject, degreeClass));
  };

  const submitMentor = () => {
    if (!codeAccepted) return;
    setMentorResult(calculateMentorPathway(mentorCountry, false));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Users2 className="w-8 h-8 text-primary-600" />
          <h1 className="text-4xl font-semibold tracking-tighter">Mentoring</h1>
        </div>
        <p className="text-slate-600 max-w-2xl">
          Actuaries anywhere in the world are matched 1:1 with an African actuarial student
          and walk with them toward the ASA. <strong>Matches are assigned by the system, not chosen</strong> —
          there is no profile to browse here, for students or mentors. Real activation is targeted
          for July/August 2027; this page reflects the actual eligibility and assignment logic that
          will run then.
        </p>
      </div>

      <div className="flex gap-2 mb-8 border-b border-slate-200">
        {(['student', 'mentor', 'status'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-semibold border-b-2 -mb-px transition-colors ${
              tab === t ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-500'
            }`}
          >
            {t === 'student' ? 'Apply as a student' : t === 'mentor' ? 'Apply as a mentor' : 'How assignment works'}
          </button>
        ))}
      </div>

      {tab === 'student' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8">
          <h2 className="font-semibold text-xl mb-1 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary-600" /> Student application
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            Second Class Upper or above in an approved subject is the standard bar. Second Class Lower
            goes to case-by-case review — it is not an automatic accept or reject. 18+ is a hard floor,
            with no exceptions, regardless of local university-entry-age norms.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Full name</label>
              <input value={fullName} onChange={e => setFullName(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Country</label>
              <select value={country} onChange={e => setCountry(e.target.value as any)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5">
                {['Nigeria', 'Ghana', 'Kenya', 'Tanzania', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Date of birth</label>
              <input type="date" value={dob} onChange={e => setDob(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5" />
              {dob && <div className="text-xs text-slate-500 mt-1">Age: {calculateAge(dob)}</div>}
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">First degree subject</label>
              <select value={subject} onChange={e => setSubject(e.target.value as DegreeSubject)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5">
                {APPROVED_DEGREE_SUBJECTS.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Degree class</label>
              <select value={degreeClass} onChange={e => setDegreeClass(e.target.value as DegreeClass)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5">
                {['First Class', 'Second Class Upper', 'Second Class Lower', 'Third Class', 'Pass'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5">University</label>
              <input value={university} onChange={e => setUniversity(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5" />
            </div>
          </div>

          <label className="flex items-start gap-3 mb-6 text-sm text-slate-600">
            <input type="checkbox" checked={consent} onChange={e => setConsent(e.target.checked)} className="mt-1" />
            <span>
              I consent to my data being processed under the applicable data protection law for my
              country (Nigeria: NDPA 2023 · Kenya: DPA 2019 · Ghana: DPA 2012), including transfer to
              and processing on infrastructure hosted outside my country.
            </span>
          </label>

          <button onClick={submitStudent} disabled={!fullName || !email || !dob || !university || !consent}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3 rounded-2xl font-semibold">
            Submit application
          </button>

          {studentResult && (
            <div className={`mt-6 p-5 rounded-2xl border ${
              studentResult === 'eligible' ? 'bg-emerald-50 border-emerald-200' :
              studentResult === 'case_by_case' ? 'bg-amber-50 border-amber-200' :
              'bg-red-50 border-red-200'
            }`}>
              {studentResult === 'eligible' && (
                <p className="text-emerald-800 text-sm">
                  <strong>Eligible.</strong> You're placed in the assignment queue. A mentor will be
                  assigned to you — there's no list to browse and no one to pick; the next available
                  mentor meeting the programme's criteria is assigned automatically.
                </p>
              )}
              {studentResult === 'case_by_case' && (
                <p className="text-amber-800 text-sm">
                  <strong>Case-by-case review.</strong> Second Class Lower isn't an automatic accept or
                  reject — your application goes to manual review rather than either outcome.
                </p>
              )}
              {studentResult === 'ineligible' && (
                <p className="text-red-800 text-sm">
                  <strong>Not eligible.</strong> {calculateAge(dob) < 18
                    ? 'Applicants must be 18 or older, regardless of local university entry-age norms.'
                    : 'The degree class or subject entered does not meet the programme criteria.'}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {tab === 'mentor' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8">
          <h2 className="font-semibold text-xl mb-1 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary-600" /> Mentor application
          </h2>
          <p className="text-sm text-slate-500 mb-6">
            You will be assigned a student — there is no student list to browse or choose from.
            All mentors, including any founding cohort, must accept the code of conduct below;
            background checks are required before assignment for every mentor who is not part of
            the named founding cohort.
          </p>

          <div className="grid md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-medium mb-1.5">Country</label>
              <select value={mentorCountry} onChange={e => setMentorCountry(e.target.value)}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5">
                {['United States', 'United Kingdom', 'South Africa', 'Canada', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Credential body / status</label>
              <input value={credentialBody} onChange={e => setCredentialBody(e.target.value)}
                placeholder="e.g. SOA Fellow, ASA, ASSA Fellow"
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5" />
            </div>
          </div>

          <label className="flex items-start gap-3 mb-6 text-sm text-slate-600">
            <input type="checkbox" checked={codeAccepted} onChange={e => setCodeAccepted(e.target.checked)} className="mt-1" />
            <span>
              I agree not to solicit or accept funds from my assigned student, to maintain the
              relationship strictly within its mentoring scope, and to complete a background check
              prior to assignment.
            </span>
          </label>

          <button onClick={submitMentor} disabled={!mentorCountry || !codeAccepted}
            className="bg-primary-600 hover:bg-primary-700 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3 rounded-2xl font-semibold">
            Submit application
          </button>

          {mentorResult && (
            <div className="mt-6 p-5 rounded-2xl border bg-slate-50 border-slate-200">
              <p className="text-slate-700 text-sm">
                {mentorResult === 'standard_us' && (
                  <><strong>Standard track.</strong> Your application proceeds through the standard US mentor pipeline, including background check, before any assignment.</>
                )}
                {mentorResult === 'flagged_uk_review' && (
                  <><strong>Additional review.</strong> UK-based applications currently go through additional review given the programme's present priorities. You'll be contacted directly.</>
                )}
                {mentorResult === 'standard_other' && (
                  <><strong>Standard track.</strong> Your application proceeds through standard review, including background check, before any assignment.</>
                )}
              </p>
            </div>
          )}
        </div>
      )}

      {tab === 'status' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8">
          <div className="flex items-start gap-3 mb-6 p-4 bg-slate-50 rounded-2xl">
            <Info className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-600">
              Illustrative seed data, not live applicants — showing the lifecycle stages the real
              system tracks from intake through to outcome, including reassignment if a mentor drops
              out mid-relationship.
            </p>
          </div>
          <div className="space-y-3">
            {seedStudents.map(s => (
              <div key={s.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
                <div>
                  <div className="font-medium">{s.fullName}</div>
                  <div className="text-xs text-slate-500">{s.country} · {s.firstDegreeSubject} · {s.degreeClass}</div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STAGE_COLORS[s.stage]}`}>
                  {STAGE_LABELS[s.stage]}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
