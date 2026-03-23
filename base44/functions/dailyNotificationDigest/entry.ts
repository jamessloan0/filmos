import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  console.log('dailyNotificationDigest: starting');
  try {
    const base44 = createClientFromRequest(req);

    // Only allow admin users or internal scheduled calls
    const user = await base44.auth.me().catch(() => null);
    if (!user || user.role !== 'admin') {
      return Response.json({ error: 'Forbidden: Admin access required' }, { status: 403 });
    }

    // Get all unread notifications
    const unread = await base44.asServiceRole.entities.Notification.filter({ read: false });
    console.log(`Found ${unread?.length || 0} unread notifications`);

    if (!unread || unread.length === 0) {
      return Response.json({ sent: 0 });
    }

    // Group by recipient
    const byRecipient = {};
    for (const n of unread) {
      if (!n.recipient_email) continue;
      if (!byRecipient[n.recipient_email]) byRecipient[n.recipient_email] = [];
      byRecipient[n.recipient_email].push(n);
    }

    const RESEND_KEY = Deno.env.get('RESEND_API_KEY');

    const results = await Promise.all(
      Object.entries(byRecipient).map(async ([email, notifs]) => {
        const count = notifs.length;
        const rows = notifs.map(n =>
          `<tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;">
            <strong style="color:#18181b;font-size:13px;">${n.title}</strong>
            ${n.body ? `<br/><span style="color:#71717a;font-size:12px;">${n.body.substring(0, 100)}${n.body.length > 100 ? '…' : ''}</span>` : ''}
            ${n.project_name ? `<br/><span style="color:#a1a1aa;font-size:11px;">📁 ${n.project_name}</span>` : ''}
          </td></tr>`
        ).join('');

        const html = `<div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;color:#18181b;">
          <div style="padding:32px 0 16px;"><img src="https://media.base44.com/images/public/69b490115c68bd1fe6d609a8/19ed2b1d5_filmOSlogomain-removebg-preview.png" alt="FilmOS" style="height:32px;" /></div>
          <h2 style="font-size:20px;font-weight:700;margin:0 0 6px;">You have ${count} unread notification${count !== 1 ? 's' : ''}</h2>
          <p style="color:#71717a;font-size:14px;margin:0 0 24px;">Here's a summary of what you missed today.</p>
          <table style="width:100%;border-collapse:collapse;">${rows}</table>
          <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e4e4e7;">
            <a href="https://filmos.co" style="display:inline-block;background:#18181b;color:white;text-decoration:none;padding:10px 22px;border-radius:8px;font-size:13px;font-weight:600;">Open FilmOS</a>
          </div>
          <p style="color:#a1a1aa;font-size:11px;margin-top:24px;">You're receiving this because you have unread notifications in FilmOS.</p>
        </div>`;

        console.log(`Sending to ${email}...`);
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'FilmOS <notifications@filmos.co>',
            to: email,
            subject: `FilmOS: ${count} unread notification${count !== 1 ? 's' : ''} today`,
            html,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          console.error(`Resend error for ${email}:`, JSON.stringify(data));
          return { email, error: data };
        }
        console.log(`Sent to ${email}:`, JSON.stringify(data));
        return { email, id: data.id };
      })
    );

    return Response.json({ sent: results.filter(r => !r.error).length, results });
  } catch (error) {
    console.error('Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});