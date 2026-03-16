import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

async function sendEmail({ to, subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'FilmOS <notifications@filmos.co>',
      to,
      subject,
      html,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Resend error: ${err}`);
  }
  return res.json();
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Get all unread notifications
    const unread = await base44.asServiceRole.entities.Notification.filter({ read: false });

    if (!unread || unread.length === 0) {
      console.log('No unread notifications to send.');
      return Response.json({ sent: 0 });
    }

    // Group by recipient
    const byRecipient = {};
    for (const n of unread) {
      if (!n.recipient_email) continue;
      if (!byRecipient[n.recipient_email]) byRecipient[n.recipient_email] = [];
      byRecipient[n.recipient_email].push(n);
    }

    const buildHtml = (notifs) => {
      const count = notifs.length;
      const rows = notifs.map(n => `
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">
            <strong style="color: #18181b; font-size: 13px;">${n.title}</strong>
            ${n.body ? `<br/><span style="color: #71717a; font-size: 12px;">${n.body.substring(0, 100)}${n.body.length > 100 ? '…' : ''}</span>` : ''}
            ${n.project_name ? `<br/><span style="color: #a1a1aa; font-size: 11px;">📁 ${n.project_name}</span>` : ''}
          </td>
        </tr>
      `).join('');
      return `
        <div style="font-family: Inter, Arial, sans-serif; max-width: 520px; margin: 0 auto; color: #18181b;">
          <div style="padding: 32px 0 16px;">
            <img src="https://media.base44.com/images/public/69b490115c68bd1fe6d609a8/19ed2b1d5_filmOSlogomain-removebg-preview.png" alt="FilmOS" style="height: 32px;" />
          </div>
          <h2 style="font-size: 20px; font-weight: 700; margin: 0 0 6px;">You have ${count} unread notification${count !== 1 ? 's' : ''}</h2>
          <p style="color: #71717a; font-size: 14px; margin: 0 0 24px;">Here's a summary of what you missed today.</p>
          <table style="width: 100%; border-collapse: collapse;">${rows}</table>
          <div style="margin-top: 28px; padding-top: 16px; border-top: 1px solid #e4e4e7;">
            <a href="https://filmos.co" style="display: inline-block; background: #18181b; color: white; text-decoration: none; padding: 10px 22px; border-radius: 8px; font-size: 13px; font-weight: 600;">Open FilmOS</a>
          </div>
          <p style="color: #a1a1aa; font-size: 11px; margin-top: 24px;">You're receiving this because you have unread notifications in FilmOS.</p>
        </div>
      `;
    };

    const results = await Promise.all(
      Object.entries(byRecipient).map(async ([email, notifs]) => {
        await sendEmail({
          to: email,
          subject: `FilmOS: ${notifs.length} unread notification${notifs.length !== 1 ? 's' : ''} today`,
          html: buildHtml(notifs),
        });
        console.log(`Sent digest to ${email} with ${notifs.length} notifications`);
        return email;
      })
    );

    return Response.json({ sent: results.length, recipients: results.length });
  } catch (error) {
    console.error('dailyNotificationDigest error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});