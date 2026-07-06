import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for TypeScript
export type Profile = {
  id: string
  full_name: string
  title: string
  company: string
  location: string
  experience_years: number
  bio: string
  specialisms: string[]
  availability: string
  linkedin?: string
  created_at: string
}

export type Job = {
  id: number
  title: string
  company: string
  location: string
  type: string
  salary: string
  experience: string
  description: string
  posted_by: string
  created_at: string
}

export type Application = {
  id: number
  job_id: number
  applicant_id: string
  status: string
  created_at: string
}