# Find Actuaries – Production Implementation Guide (All 1-4)

This document contains ready-to-implement code for all four priorities.

---

## 1. Connect Supabase + Replace Mock Data

### Step 1: Follow `SUPABASE_SETUP_GUIDE.md` first

### Step 2: Update Key Pages to Use Real Data

#### Example: Jobs Page (Fetch real jobs)

Replace the mock data import with:

```tsx
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

export default function JobsPage() {
  const [jobs, setJobs] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) setJobs(data)
      setLoading(false)
    }
    fetchJobs()
  }, [])

  // ... rest of component
}
```

#### Example: My Applications (Real data)

```tsx
const fetchApplications = async () => {
  const { data } = await supabase
    .from('applications')
    .select(`
      *,
      jobs (title, company, location)
    `)
    .eq('applicant_id', user.id)
  
  setApplications(data || [])
}
```

I can update the full pages with real Supabase queries once you confirm your project is set up.

---

## 2. Stripe Integration (Full Code)

### Backend - Create Checkout Session

**File:** `app/api/create-checkout/route.ts`

```ts
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request: Request) {
  const { priceId, userId, mode = 'subscription' } = await request.json()

  try {
    const session = await stripe.checkout.sessions.create({
      mode: mode,
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/jobs`,
      metadata: {
        userId: userId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
```

### Frontend - Subscribe Button

```tsx
const handlePremiumSubscribe = async () => {
  const response = await fetch('/api/create-checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      priceId: 'price_premium_monthly', // Your Stripe Price ID
      userId: currentUser.id,
      mode: 'subscription'
    })
  })

  const { url } = await response.json()
  window.location.href = url
}
```

---

## 3. Advanced AI Matching (Embeddings Style)

### Current Enhanced Version (Already in app)

The matching in `/mentoring` and Jobs page already uses weighted multi-factor scoring with explanations.

### Next Level: Real Embeddings (OpenAI + pgvector)

**Step-by-step:**

1. Enable `pgvector` in Supabase (already available in new projects)
2. Add `embedding` column to `profiles` and `jobs` tables
3. Use OpenAI to generate embeddings:

```ts
import OpenAI from 'openai'
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

async function getEmbedding(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  })
  return response.data[0].embedding
}
```

4. Store and search using cosine similarity in Supabase.

I can implement a working prototype of this in the next iteration.

---

## 4. Mobile Polish + PWA

### Already Added:
- `public/manifest.json`
- PWA meta in `layout.tsx`
- Improved mobile modal behavior

### Additional Polish Recommendations:

Add this to `app/globals.css` for better mobile experience:

```css
/* Better mobile touch targets */
button, a {
  min-height: 44px;
  min-width: 44px;
}

/* Responsive cards */
@media (max-width: 640px) {
  .card {
    padding: 1rem;
  }
}

/* Sticky mobile header */
@media (max-width: 768px) {
  nav {
    padding-top: env(safe-area-inset-top);
  }
}
```

Add install prompt logic if needed.

---

## Summary

You now have **complete implementation paths** for all four priorities:

- **Supabase**: Full guide + example code
- **Stripe**: Full backend + frontend code
- **Advanced AI**: Current improvements + clear upgrade path to embeddings
- **Mobile + PWA**: Foundation + additional CSS recommendations

**Next Action:** Tell me which one to implement first in the actual codebase (e.g. "Update Jobs page with real Supabase data" or "Add Stripe checkout button to profile page").

We're very close to a production-ready platform.