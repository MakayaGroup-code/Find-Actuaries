-- Find Actuaries — Mentoring Schema
-- Reflects the agreed protocol: eligibility-gated intake, assigned (not browsed/chosen)
-- matching, dynamic lifecycle tracking, mentor-dropout reassignment, and the
-- distinction between "disengaged" (removable) and "struggling" (protected) students.

-- ============================================================
-- STUDENTS
-- ============================================================
create table students (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  country text not null check (country in ('Nigeria', 'Ghana', 'Kenya', 'Tanzania', 'Other')),
  date_of_birth date not null,
  -- Enforced 18+ regardless of local university-entry-age variation.
  -- Computed, not trusted from a checkbox: verified_18_plus is derived at
  -- application time from date_of_birth and stored so eligibility logic
  -- never has to recompute it (and so it survives a schema/logic change later).
  verified_18_plus boolean not null,

  first_degree_subject text not null check (
    first_degree_subject in ('Mathematics', 'Actuarial Science', 'Econometrics', 'Statistics')
  ),
  degree_class text not null check (
    degree_class in ('First Class', 'Second Class Upper', 'Second Class Lower', 'Third Class', 'Pass')
  ),
  university text not null,

  -- Eligibility outcome, computed from the above at application time.
  -- 'eligible' = 2:1 or above in an approved subject, 18+.
  -- 'case_by_case' = 2:2 in an approved subject, 18+ — needs human review, not auto-accepted or auto-rejected.
  -- 'ineligible' = fails subject, class, or age gate outright.
  eligibility_status text not null check (
    eligibility_status in ('eligible', 'case_by_case', 'ineligible')
  ),
  eligibility_reviewed_by text,          -- who made the case_by_case call, if applicable
  eligibility_reviewed_at timestamptz,

  -- Data protection: consent must be explicit and timestamped, not implied by
  -- submitting the form. Required before any cross-border data transfer
  -- (student data captured in-country, processed on US-hosted infrastructure).
  consent_given boolean not null default false,
  consent_given_at timestamptz,
  data_processing_jurisdiction text not null,  -- e.g. 'Nigeria - NDPA 2023', 'Kenya - DPA 2019', 'Ghana - DPA 2012'

  -- Lifecycle stage — the "dynamic live system... from when we capture them
  -- to when they succeed."
  stage text not null default 'applied' check (
    stage in ('applied', 'under_review', 'awaiting_assignment', 'assigned',
              'active', 'flagged', 'reassignment_pending', 'completed', 'dropped')
  ),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- MENTORS
-- ============================================================
create table mentors (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  country text not null,

  -- Standing policy is US-first; South Africa is explicitly not excluded but
  -- routes through the founding-cohort exception rather than the standard
  -- pipeline. UK is deprioritised, not banned outright — flagged for review
  -- rather than auto-fast-tracked. This field records which path applied,
  -- so the policy is auditable rather than implicit in application code.
  pathway text not null check (
    pathway in ('standard_us', 'founding_cohort', 'standard_other', 'flagged_uk_review')
  ),
  is_founding_mentor boolean not null default false,

  credential_body text not null,   -- e.g. 'SOA (Fellow)', 'SOA (ASA)', 'ASSA (Fellow)', 'IFoA (Fellow)'
  can_mentor_toward_asa boolean not null default false,

  -- Background check gates active assignment. Founding cohort members are an
  -- explicit, deliberate policy exemption from this gate — not an oversight —
  -- per direct instruction; the exemption itself is recorded here, not hidden.
  background_check_status text not null default 'not_started' check (
    background_check_status in ('not_started', 'pending', 'cleared', 'exempt_founding_cohort')
  ),
  background_check_cleared_at timestamptz,

  -- Explicit acknowledgement of the boundaries: no personal financial
  -- involvement, no fund solicitation, no relationship outside the mentoring
  -- scope. Required before any assignment, no exceptions including founders.
  code_of_conduct_accepted boolean not null default false,
  code_of_conduct_accepted_at timestamptz,

  availability_status text not null default 'available' check (
    availability_status in ('available', 'at_capacity', 'paused', 'inactive')
  ),
  max_concurrent_students integer not null default 1,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ============================================================
-- MATCHES (the assignment itself — never student-chosen)
-- ============================================================
create table matches (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id),
  mentor_id uuid not null references mentors(id),

  assigned_at timestamptz not null default now(),
  assignment_method text not null default 'system_assigned' check (
    assignment_method in ('system_assigned')
    -- Deliberately a single allowed value. There is no 'student_selected'
    -- option — this table structurally enforces "no blind selection, all
    -- students assigned" rather than relying on application code to remember not to add one.
  ),

  status text not null default 'active' check (
    status in ('active', 'completed_asa', 'reassigned_mentor_dropout',
               'ended_student_flagged', 'ended_other')
  ),
  ended_at timestamptz,
  end_reason text
);

-- ============================================================
-- REASSIGNMENTS (audit trail when a mentor drops out mid-relationship)
-- ============================================================
create table reassignment_log (
  id uuid primary key default gen_random_uuid(),
  original_match_id uuid not null references matches(id),
  new_match_id uuid references matches(id),  -- null until a new mentor is actually assigned
  student_id uuid not null references students(id),
  former_mentor_id uuid not null references mentors(id),
  reason text not null,
  logged_at timestamptz not null default now()
);

-- ============================================================
-- PERFORMANCE FLAGS (distinguishes disengagement from honest struggle —
-- the distinction that actually matters per the agreed policy: dropped
-- from 1:1 mentoring is about protecting scarce mentor time from
-- disengagement, never a penalty for a student who is trying and failing.)
-- ============================================================
create table performance_flags (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id),
  flag_type text not null check (
    flag_type in ('disengagement', 'honest_struggle_support_needed')
  ),
  -- 'disengagement': missed check-ins, no response, no evidence of effort —
  --   this is the only flag_type that can lead to removal from 1:1 mentoring.
  -- 'honest_struggle_support_needed': failing exams despite genuine
  --   engagement — this should trigger additional support, never removal.
  details text,
  flagged_by text not null,
  flagged_at timestamptz not null default now(),
  resolution text,
  resolved_at timestamptz
);

-- ============================================================
-- Indexes for the lifecycle queries this system will actually run
-- ============================================================
create index idx_students_stage on students(stage);
create index idx_students_eligibility on students(eligibility_status);
create index idx_mentors_availability on mentors(availability_status);
create index idx_matches_status on matches(status);
create index idx_flags_type on performance_flags(flag_type);
