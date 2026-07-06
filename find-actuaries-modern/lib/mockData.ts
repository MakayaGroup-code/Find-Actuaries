export interface ActuaryProfile {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  experience: number; // years
  specialisms: string[];
  qualifications: string[];
  availability: 'Open to opportunities' | 'Not looking' | 'Contract/Freelance only';
  bio: string;
  linkedin?: string;
  email?: string;
}

export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: 'Permanent' | 'Contract' | 'Temporary';
  salary: string;
  experience: string;
  description: string;
  postedDate: string;
  closingDate?: string;
  postedBy: string;
  contactEmail: string;
}

export const specialismOptions = [
  'Life Insurance', 'General Insurance', 'Pensions', 'Health & Care',
  'Data Science & Analytics', 'Climate Risk & ESG', 'Capital Modelling',
  'Pricing', 'Reserving', 'Longevity', 'Cyber Risk', 'Actuarial AI/ML'
];

export const locationOptions = [
  'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Bristol', 
  'Leeds', 'Remote/Hybrid', 'Other UK'
];

export const mockActuaries: ActuaryProfile[] = [
  {
    id: 1,
    name: "Dr. Elena Vasquez",
    title: "Chief Actuary",
    company: "Aviva UK",
    location: "London",
    experience: 18,
    specialisms: ["Life Insurance", "Longevity", "Capital Modelling"],
    qualifications: ["Fellow of the IFoA", "PhD Actuarial Science"],
    availability: "Not looking",
    bio: "Leading longevity and mortality risk frameworks. Passionate about using data science to improve retirement outcomes. Previously Head of Actuarial at Prudential.",
    linkedin: "https://linkedin.com/in/elenavasquez",
  },
  {
    id: 2,
    name: "James Okoro",
    title: "Senior Pricing Actuary",
    company: "Beazley",
    location: "London",
    experience: 9,
    specialisms: ["General Insurance", "Pricing", "Cyber Risk"],
    qualifications: ["Fellow of the IFoA"],
    availability: "Open to opportunities",
    bio: "Specialist in specialty lines pricing and emerging cyber risks. Strong track record in London Market. Open to new challenges in insurtech or consulting.",
    linkedin: "https://linkedin.com/in/jamesokoro",
  },
  {
    id: 3,
    name: "Priya Sharma",
    title: "Actuarial Director - Climate",
    company: "WTW",
    location: "Remote/Hybrid",
    experience: 12,
    specialisms: ["Climate Risk & ESG", "General Insurance", "Capital Modelling"],
    qualifications: ["Fellow of the IFoA", "Certified Climate Risk Actuary"],
    availability: "Contract/Freelance only",
    bio: "Helping insurers and corporates navigate physical and transition climate risks. Passionate about building resilient financial systems. Available for project work.",
    linkedin: "https://linkedin.com/in/priyasharma",
  },
  {
    id: 4,
    name: "Michael Chen",
    title: "Head of Data & Analytics",
    company: "Direct Line Group",
    location: "Manchester",
    experience: 7,
    specialisms: ["Data Science & Analytics", "Pricing", "Actuarial AI/ML"],
    qualifications: ["Fellow of the IFoA", "MSc Data Science"],
    availability: "Open to opportunities",
    bio: "Bridging traditional actuarial work with modern machine learning and big data. Building real-time pricing engines and customer lifetime value models.",
    linkedin: "https://linkedin.com/in/michaelchen",
  },
  {
    id: 5,
    name: "Sophie Laurent",
    title: "Pensions Actuary",
    company: "Hymans Robertson",
    location: "Edinburgh",
    experience: 14,
    specialisms: ["Pensions", "Longevity", "Health & Care"],
    qualifications: ["Fellow of the IFoA"],
    availability: "Not looking",
    bio: "Expert in defined benefit pension scheme funding and de-risking strategies. Strong advocate for better retirement outcomes across the UK.",
  },
  {
    id: 6,
    name: "David Patel",
    title: "Actuarial Consultant",
    company: "Independent",
    location: "Bristol",
    experience: 11,
    specialisms: ["General Insurance", "Reserving", "Capital Modelling"],
    qualifications: ["Fellow of the IFoA"],
    availability: "Contract/Freelance only",
    bio: "Experienced independent consultant supporting mid-sized insurers with reserving, capital, and regulatory projects. Available for short and medium-term engagements.",
    linkedin: "https://linkedin.com/in/davidpatel",
  },
];

export const mockJobs: Job[] = [
  {
    id: 101,
    title: "Senior Life Actuary - Longevity & Mortality",
    company: "Legal & General",
    location: "London (Hybrid)",
    type: "Permanent",
    salary: "£95,000 - £120,000 + bonus + benefits",
    experience: "Qualified with 8+ years",
    description: "Join our market-leading longevity team. You will lead the development of new mortality assumptions and support major bulk annuity transactions. Excellent opportunity to work at the forefront of the UK retirement market.",
    postedDate: "2026-06-28",
    closingDate: "2026-08-15",
    postedBy: "Sarah Thompson",
    contactEmail: "careers@legalandgeneral.com",
  },
  {
    id: 102,
    title: "Pricing Actuary - Cyber & Specialty",
    company: "Beazley",
    location: "London",
    type: "Permanent",
    salary: "£85,000 - £105,000",
    experience: "Newly or recently qualified",
    description: "Exciting role pricing cyber and specialty lines in the London Market. You will work closely with underwriters and data scientists on innovative products. Strong analytical and communication skills required.",
    postedDate: "2026-07-01",
    closingDate: "2026-08-01",
    postedBy: "Recruitment Team",
    contactEmail: "actuarialjobs@beazley.com",
  },
  {
    id: 103,
    title: "Contract Climate Risk Actuary (6-12 months)",
    company: "WTW",
    location: "Remote/Hybrid",
    type: "Contract",
    salary: "£650 - £850 per day (inside IR35)",
    experience: "Qualified or near-qualified",
    description: "Support our growing climate risk advisory practice. Projects include physical risk modelling for insurers and transition risk analysis for corporate clients. Flexible remote working.",
    postedDate: "2026-06-25",
    postedBy: "Priya Sharma",
    contactEmail: "priya.sharma@wtwco.com",
  },
  {
    id: 104,
    title: "Actuarial Data Scientist",
    company: "Aviva",
    location: "York / Hybrid",
    type: "Permanent",
    salary: "£70,000 - £90,000",
    experience: "2-5 years actuarial experience + data skills",
    description: "Combine your actuarial training with advanced analytics and machine learning. Build next-generation pricing and risk models. Ideal for someone passionate about the intersection of actuarial science and data science.",
    postedDate: "2026-07-02",
    closingDate: "2026-07-31",
    postedBy: "Talent Acquisition",
    contactEmail: "actuarial.careers@aviva.com",
  },
  {
    id: 105,
    title: "Head of Capital Modelling",
    company: "Phoenix Group",
    location: "Birmingham (Hybrid)",
    type: "Permanent",
    salary: "£130,000 - £160,000 + significant bonus",
    experience: "Qualified with 12+ years, leadership experience",
    description: "Lead a high-performing capital modelling team. Own the internal model and support major M&A and de-risking activity. Strategic leadership role reporting to the Chief Actuary.",
    postedDate: "2026-06-20",
    closingDate: "2026-08-10",
    postedBy: "Executive Search",
    contactEmail: "executive@phoenixgroup.co.uk",
  },
];

export const eventOptions = [
  {
    id: 1,
    title: "Change Happens Workshop: AI & The Future of Actuarial Work",
    date: "2026-09-18",
    location: "London + Virtual",
    type: "Workshop",
    description: "Interactive half-day workshop exploring how AI and machine learning are transforming actuarial roles. Featuring leading practitioners and interactive sessions.",
  },
  {
    id: 2,
    title: "Northern Actuaries Networking Evening",
    date: "2026-07-23",
    location: "Manchester",
    type: "Networking",
    description: "Relaxed evening for actuaries across the North. Great opportunity to connect with peers from insurers, consultancies, and beyond.",
  },
  {
    id: 3,
    title: "Climate Risk Masterclass for Actuaries",
    date: "2026-10-07",
    location: "Virtual",
    type: "Masterclass",
    description: "Deep-dive into physical and transition risks with practical case studies from leading insurers and WTW specialists.",
  },
];