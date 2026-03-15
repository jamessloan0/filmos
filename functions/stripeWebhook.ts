import Stripe from 'npm:stripe@14';
import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY'));

Deno.serve(async (req) => {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');

  let event;
  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SECRET')
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return new Response('Webhook Error', { status: 400 });
  }

  const base44 = createClientFromRequest(req);

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      // Prefer metadata email (set at checkout creation), fallback to customer details
      const customerEmail = session.metadata?.user_email || session.customer_email || session.customer_details?.email;
      console.log(`checkout.session.completed — email: ${customerEmail}, session: ${session.id}`);

      if (customerEmail) {
        const users = await base44.asServiceRole.entities.User.filter({ email: customerEmail });
        console.log(`Found ${users?.length} user(s) for email ${customerEmail}`);
        if (users && users.length > 0) {
          await base44.asServiceRole.entities.User.update(users[0].id, { plan: 'pro' });
          console.log(`Upgraded user ${customerEmail} to pro`);
        } else {
          console.error(`No user found for email ${customerEmail}`);
        }
      } else {
        console.error('No email found in checkout session', JSON.stringify(session));
      }
    }

    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object;
      const customer = await stripe.customers.retrieve(subscription.customer);
      const customerEmail = customer.email;

      if (customerEmail) {
        const users = await base44.asServiceRole.entities.User.filter({ email: customerEmail });
        if (users && users.length > 0) {
          await base44.asServiceRole.entities.User.update(users[0].id, { plan: 'free' });
          console.log(`Downgraded user ${customerEmail} to free`);
        }
      }
    }
  } catch (err) {
    console.error('Webhook handler error:', err.message);
  }

  return Response.json({ received: true });
});