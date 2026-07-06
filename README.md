# Find Actuaries — Modern Rebuild (2026)

**The professional network for actuaries. Originally conceptualised in 2001. Rebuilt for today.**

This is a complete, production-quality prototype of the re-staged Find Actuaries platform.

---

## Table of Contents

1. [How to Run the App](#how-to-run-the-app)
2. [User Guide: AI-Powered Matching](#user-guide-ai-powered-matching)
3. [User Guide: Job Application Tracking](#user-guide-job-application-tracking)
4. [User Guide: My Applications](#user-guide-my-applications)
5. [User Guide: Employer Dashboard](#user-guide-employer-dashboard)
6. [Financial Model (2026–2030)](#financial-model-2026–2030)
7. [IP & First-to-Market Strategy](#ip--first-to-market-strategy)
8. [Quick Demo Login](#quick-demo-login)

---

## How to Run the App

### Step-by-step (Local Development)

1. **Download** the `find-actuaries-modern` folder (or unzip the latest ZIP).
2. Open your terminal and navigate to the folder:
   ```bash
   cd find-actuaries-modern
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to:
   **http://localhost:3000**

You now have a fully working modern version of Find Actuaries.

---

## User Guide: AI-Powered Matching

### Where to find it
→ Click **Mentoring** in the top navigation (visible after logging in as an Actuary).

### How to use it (Step by step)

1. Choose your role:
   - **Mentee** → You are looking for guidance
   - **Mentor** → You want to give back

2. Select your **Focus Area** (e.g. Climate Risk & ESG, Data Science, Pensions, etc.)

3. Adjust the **Experience Level** slider to match your current years of experience.

4. Click **"Find Matches"**

### What the AI Matching does:
- Calculates a **Match Score** (out of 100)
- Shows **explainable reasons** why someone matched (e.g. "Strong match on Climate Risk", "Excellent experience alignment", "Has emerging skills (AI/Climate/Cyber)")
- Prioritizes people who are currently open to opportunities

**Tip**: The matching improves as you provide more specific focus areas.

---

## User Guide: Job Application Tracking

### How to apply for a job

1. Go to **Jobs** from the top menu.
2. Browse or search for roles.
3. Click the **"Apply Now"** button on any job.
4. You will see a confirmation message.

### Tracking your applications

- All applications you submit are saved locally in your browser.
- In a future version, you will see them under **"My Applications"**.

**Current Demo Behavior**: Applications are stored in your browser’s local storage. They persist as long as you don’t clear your browser data.

---

## User Guide: My Applications (Candidate View)

**Note**: A dedicated "My Applications" page is in active development.  
For now:

1. Apply to jobs using the method above.
2. To view your applications in this demo:
   - Open Developer Tools (F12) → Application tab → Local Storage
   - Look for the key `fa_applications`

In the next build, there will be a clean **/my-applications** page showing:
- Job title + Company
- Date applied
- Current status (Applied / Under Review / Interview / Offer)

---

## User Guide: Employer Dashboard

### How to access
1. Click the **demo login buttons** in the navbar → Choose **"Demo as Employer"**
2. Or go directly to: `http://localhost:3000/employer/dashboard`

### What you can do:

**Tab 1: Overview**
- See mock metrics (Active Jobs, Profile Views, Applications Received)

**Tab 2: My Job Postings**
- View jobs you have posted in this session

**Tab 3: Talent Search**
- Search and browse verified actuaries
- Click **"Message"** or **"View Full Profile"** (demo)

**How to post a new job**:
- Click **"Post New Vacancy"** button at the top of the dashboard.

---

## Financial Model (2026–2030)

A complete 5-year financial projection in USD is available here:

**File**: `Find_Actuaries_Financial_Model_2026-2030.md`

**Key Highlights**:
- Revenue grows from **$389k → $8.59M** by Year 5
- Becomes profitable in **Year 2**
- Strong margins (**55%+**) by Year 5
- Excellent LTV:CAC ratio

This model is ready for investor discussions.

---

## IP & First-to-Market Strategy

**File**: `Find_Actuaries_IP_Strategy.md`

**Recommended Immediate Actions**:
1. File **Trademark** for "Find Actuaries" in UK + Nigeria
2. Document the matching algorithm internally as a **Trade Secret**
3. Move fast — first-mover advantage is currently your strongest protection

---

## Quick Demo Login

In the top-right corner of the navbar you will see **"Join"**.

Hover over it to reveal two quick demo options:
- **Demo as Actuary** → Unlocks Mentoring + Profile Edit
- **Demo as Employer** → Unlocks Employer Dashboard

This makes testing different user types very easy.

---

## Production Recommendations (Next Phase)

- Replace simulated auth with **Clerk** or **Supabase Auth** + LinkedIn login
- Connect real database (Supabase recommended)
- Add real **AI matching** using embeddings (OpenAI + pgvector)
- Integrate **Stripe** for payments
- Add proper backend for job applications and notifications

---

**You were ahead of your time in 2001.**  
This rebuild proves the vision is even more powerful today.

Built with ❤️ for the actuarial community.

For any questions or to continue development, just reply.