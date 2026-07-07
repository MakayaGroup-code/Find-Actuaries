import { checkBotId } from 'botid/server';
import { NextRequest, NextResponse } from 'next/server';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mbdvbbeg';

// Server-side only. The client never talks to Formspree directly — it POSTs
// here first, so this is the one place BotID's checkBotId() can actually
// run before anything gets forwarded. BotID protects server endpoints, not
// third-party form-processing services directly, which is why this route
// exists at all rather than the client hitting Formspree in one step.
export async function POST(request: NextRequest) {
  const verification = await checkBotId();

  if (verification.isBot) {
    return NextResponse.json({ error: 'Request blocked' }, { status: 403 });
  }

  const body = await request.json();

  try {
    const formspreeResponse = await fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(body),
    });

    if (!formspreeResponse.ok) {
      return NextResponse.json({ error: 'Notification failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Notification failed' }, { status: 502 });
  }
}
