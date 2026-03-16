import Stripe from 'npm:stripe@14';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const { priceId, successUrl, cancelUrl, userEmail } = await req.json();

    if (!priceId || !successUrl || !cancelUrl) {
      return Response.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    // Try to get authenticated user email, fall back to passed userEmail
    const user = await base44.auth.me().catch(() => null);
    const customerEmail = user?.email || userEmail || undefined;

    const sessionParams = {
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      metadata: {
        base44_app_id: Deno.env.get('BASE44_APP_ID'),
        ...(customerEmail ? { user_email: customerEmail } : {}),
      },
    };

    const session = await stripe.checkout.sessions.create(sessionParams);

    return Response.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});