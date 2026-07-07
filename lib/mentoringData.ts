// Mentoring domain types and logic — mirrors MENTORING_SCHEMA.sql.
// This file is the single source of truth for eligibility and pathway rules,
// so the UI never has to re-derive them differently in two places.

export type DegreeSubject = 'Mathematics' | 'Actuarial Science' | 'Econometrics' | 'Statistics';
export type DegreeClass = 'First Class' | 'Second Class Upper' | 'Second Class Lower' | 'Third Class' | 'Pass';
export type EligibilityStatus = 'eligible' | 'case_by_case' | 'ineligible';
export type StudentStage =
  | 'applied' | 'under_review' | 'awaiting_assignment' | 'assigned'
  | 'active' | 'flagged' | 'reassignment_pending' | 'completed' | 'dropped';

export type MentorPathway = 'standard_us' | 'founding_cohort' | 'standard_other' | 'flagged_uk_review';
export type BackgroundCheckStatus = 'not_started' | 'pending' | 'cleared' | 'exempt_founding_cohort';

export const APPROVED_DEGREE_SUBJECTS: DegreeSubject[] = [
  'Mathematics', 'Actuarial Science', 'Econometrics', 'Statistics',
];

export interface MentoringStudent {
  id: string;
  fullName: string;
  email: string;
  country: 'Nigeria' | 'Ghana' | 'Kenya' | 'Tanzania' | 'Other';
  dateOfBirth: string; // ISO date
  firstDegreeSubject: DegreeSubject;
  degreeClass: DegreeClass;
  university: string;
  eligibilityStatus: EligibilityStatus;
  consentGiven: boolean;
  stage: StudentStage;
  assignedMentorId?: string;
}

export interface MentoringMentor {
  id: string;
  fullName: string;
  country: string;
  pathway: MentorPathway;
  isFoundingMentor: boolean;
  credentialBody: string;
  canMentorTowardAsa: boolean;
  backgroundCheckStatus: BackgroundCheckStatus;
  codeOfConductAccepted: boolean;
  availabilityStatus: 'available' | 'at_capacity' | 'paused' | 'inactive';
  currentStudentCount: number;
  maxConcurrentStudents: number;
}

/**
 * Computes age in whole years from a date of birth string.
 */
export function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  return age;
}

/**
 * The actual eligibility gate. 18+ is a hard floor regardless of local
 * university-entry-age variation — deliberately not softened for anyone.
 * Second Class Upper is the default bar; Second Class Lower goes to
 * case-by-case review rather than automatic accept or reject.
 */
export function calculateEligibility(
  dateOfBirth: string,
  degreeSubject: DegreeSubject,
  degreeClass: DegreeClass
): EligibilityStatus {
  const age = calculateAge(dateOfBirth);
  if (age < 18) return 'ineligible';
  if (!APPROVED_DEGREE_SUBJECTS.includes(degreeSubject)) return 'ineligible';

  if (degreeClass === 'First Class' || degreeClass === 'Second Class Upper') return 'eligible';
  if (degreeClass === 'Second Class Lower') return 'case_by_case';
  return 'ineligible'; // Third Class, Pass
}

/**
 * Mentor pathway routing. US is the standard pipeline. South Africa is
 * explicitly not excluded but routes through the founding-cohort exception,
 * not the standard pipeline, unless a South African mentor applies outside
 * that named cohort — in which case they fall to 'standard_other' rather
 * than being silently treated as founding. UK is deprioritised, flagged for
 * manual review rather than fast-tracked or outright refused.
 */
export function calculateMentorPathway(country: string, isFoundingCohortMember: boolean): MentorPathway {
  if (isFoundingCohortMember) return 'founding_cohort';
  if (country === 'United States') return 'standard_us';
  if (country === 'United Kingdom') return 'flagged_uk_review';
  return 'standard_other';
}

/**
 * The assignment engine. Deliberately the ONLY path from "eligible student"
 * to "has a mentor" — there is no student-facing browse/select flow.
 * Simple, deterministic, queue-based: first eligible student who doesn't
 * have a mentor yet, first available mentor under capacity. No scoring
 * theater, because scoring theater is what let students pick, which is
 * exactly what "no blind selection" rules out.
 */
export function assignNextAvailableMentor(
  students: MentoringStudent[],
  mentors: MentoringMentor[]
): { studentId: string; mentorId: string } | null {
  const waitingStudent = students.find(
    s => (s.eligibilityStatus === 'eligible') && s.stage === 'awaiting_assignment'
  );
  if (!waitingStudent) return null;

  const availableMentor = mentors.find(
    m => m.availabilityStatus === 'available'
      && m.codeOfConductAccepted
      && (m.backgroundCheckStatus === 'cleared' || m.backgroundCheckStatus === 'exempt_founding_cohort')
      && m.currentStudentCount < m.maxConcurrentStudents
  );
  if (!availableMentor) return null;

  return { studentId: waitingStudent.id, mentorId: availableMentor.id };
}

// ============================================================
// Seed data — realistic shape, not live yet. Matches the schema exactly so
// swapping to a real Supabase-backed fetch later is a data-source change,
// not a rewrite.
// ============================================================

export const seedStudents: MentoringStudent[] = [
  {
    id: 's1', fullName: 'Adaeze Okonkwo', email: 'adaeze.o@example.com', country: 'Nigeria',
    dateOfBirth: '2003-04-12', firstDegreeSubject: 'Actuarial Science', degreeClass: 'Second Class Upper',
    university: 'University of Lagos', eligibilityStatus: 'eligible', consentGiven: true, stage: 'active',
    assignedMentorId: 'm1',
  },
  {
    id: 's2', fullName: 'Kwabena Mensah', email: 'kwabena.m@example.com', country: 'Ghana',
    dateOfBirth: '2002-11-03', firstDegreeSubject: 'Statistics', degreeClass: 'Second Class Lower',
    university: 'University of Ghana', eligibilityStatus: 'case_by_case', consentGiven: true, stage: 'under_review',
  },
  {
    id: 's3', fullName: 'Wanjiru Kamau', email: 'wanjiru.k@example.com', country: 'Kenya',
    dateOfBirth: '2004-01-22', firstDegreeSubject: 'Mathematics', degreeClass: 'First Class',
    university: 'University of Nairobi', eligibilityStatus: 'eligible', consentGiven: true, stage: 'awaiting_assignment',
  },
  {
    id: 's4', fullName: 'Baraka Mushi', email: 'baraka.m@example.com', country: 'Tanzania',
    dateOfBirth: '2008-06-01', firstDegreeSubject: 'Econometrics', degreeClass: 'Second Class Upper',
    university: 'University of Dar es Salaam', eligibilityStatus: 'ineligible', consentGiven: true, stage: 'dropped',
    // Seeded deliberately under 18 to exercise the age-floor gate in the UI, not a real applicant.
  },
];

export const seedMentors: MentoringMentor[] = [
  {
    id: 'm1', fullName: 'Robert Chen', country: 'United States', pathway: 'standard_us', isFoundingMentor: false,
    credentialBody: 'SOA (Fellow)', canMentorTowardAsa: true, backgroundCheckStatus: 'cleared',
    codeOfConductAccepted: true, availabilityStatus: 'at_capacity', currentStudentCount: 1, maxConcurrentStudents: 1,
  },
  {
    id: 'm2', fullName: 'Deborah van der Merwe', country: 'South Africa', pathway: 'founding_cohort', isFoundingMentor: true,
    credentialBody: 'ASSA (Fellow, retired)', canMentorTowardAsa: false, backgroundCheckStatus: 'exempt_founding_cohort',
    codeOfConductAccepted: true, availabilityStatus: 'available', currentStudentCount: 0, maxConcurrentStudents: 1,
  },
  {
    id: 'm3', fullName: 'Priya Sharma', country: 'United States', pathway: 'standard_us', isFoundingMentor: false,
    credentialBody: 'SOA (ASA)', canMentorTowardAsa: true, backgroundCheckStatus: 'pending',
    codeOfConductAccepted: true, availabilityStatus: 'available', currentStudentCount: 0, maxConcurrentStudents: 2,
  },
];
