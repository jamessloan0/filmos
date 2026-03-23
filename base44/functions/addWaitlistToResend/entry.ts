import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const RESEND_AUDIENCE_ID = Deno.env.get('RESEND_AUDIENCE_ID');

async function resendFetch(path, body) {
  const res = await fetch(`https://api.resend.com${path}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

Deno.serve(async (req) => {
  try {
    const payload = await req.json();
    const email = payload?.data?.email;

    if (!email) {
      return Response.json({ error: 'No email in payload' }, { status: 400 });
    }

    // Add to Resend audience
    const contactData = await resendFetch(`/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
      email,
      unsubscribed: false,
    });

    if (contactData.error) {
      console.error('Resend audience error:', JSON.stringify(contactData));
    } else {
      console.log('Contact added to Resend:', email);
    }

    // Send thank-you email
    const emailData = await resendFetch('/emails', {
      from: 'FilmOS <no-reply@filmos.co>',
      to: [email],
      subject: "You're on the FilmOS waitlist 🎬",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; padding: 40px 20px; color: #18181b;">
          <img src="https://media.base44.com/images/public/69b490115c68bd1fe6d609a8/19ed2b1d5_filmOSlogomain-removebg-preview.png" alt="FilmOS" style="height: 32px; margin-bottom: 32px;" />
          
          <h1 style="font-size: 24px; font-weight: 700; margin: 0 0 12px;">You're on the list.</h1>
          <p style="font-size: 16px; color: #52525b; line-height: 1.6; margin: 0 0 24px;">
            Thanks for joining the FilmOS waitlist! We're building the platform we always wished existed — proposals, video feedback, invoicing, and file delivery, all in one place for filmmakers.
          </p>
          <p style="font-size: 16px; color: #52525b; line-height: 1.6; margin: 0 0 32px;">
            We'll reach out as soon as early access is ready. In the meantime, stay tuned.
          </p>

          <div style="border-top: 1px solid #e4e4e7; padding-top: 24px; margin-top: 8px;">
            <p style="font-size: 13px; color: #a1a1aa; margin: 0;">
              You're receiving this because you signed up at <a href="https://filmos.co" style="color: #0ea5e9; text-decoration: none;">filmos.co</a>.<br/>
              <a href="mailto:support@filmos.co" style="color: #a1a1aa;">Unsubscribe</a>
            </p>
          </div>
        </div>
      `,
    });

    if (emailData.error) {
      console.error('Resend email error:', JSON.stringify(emailData));
    } else {
      console.log('Thank-you email sent to:', email);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});