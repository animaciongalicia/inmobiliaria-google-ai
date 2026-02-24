import { NextResponse } from 'next/server';
import { calculateScore } from '@/lib/scoring';
import { validateWizardState } from '@/lib/validators';
import { zones, defaultZoneInfo } from '@/lib/zones';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate inputs
    const { isValid, errors } = validateWizardState(body);
    if (!isValid) {
      return NextResponse.json({ ok: false, error: errors.join(', ') }, { status: 400 });
    }

    // Calculate score and category
    const { score, category } = calculateScore(body);

    // Get zone copy
    const resultCopy = zones[body.zone] || defaultZoneInfo;

    // Determine webhook URL based on agency_id
    const agencyId = body.agency_id || 'default';
    const envVarName = `MAKE_WEBHOOK_${agencyId.toUpperCase()}`;
    const webhookUrl = process.env[envVarName] || process.env.MAKE_WEBHOOK_DEFAULT;

    let delivered = false;

    // Build payload for Make
    const payload = {
      ...body,
      score,
      category,
      submittedAt: new Date().toISOString(),
    };

    if (webhookUrl) {
      try {
        const makeResponse = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        
        if (makeResponse.ok) {
          delivered = true;
        } else {
          console.error(`Make webhook failed with status: ${makeResponse.status}`);
        }
      } catch (err) {
        console.error('Error sending to Make webhook:', err);
      }
    } else {
      console.warn(`No webhook URL configured for agency ${agencyId} or default.`);
    }

    return NextResponse.json({
      ok: true,
      score,
      category,
      resultCopy,
      delivered,
    });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ ok: false, error: 'Error interno del servidor' }, { status: 500 });
  }
}
