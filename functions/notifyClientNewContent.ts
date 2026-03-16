import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { event, data } = body;

    if (!data || !data.project_id) return Response.json({ skipped: 'no project_id' });

    // Only trigger for deliverables uploaded by the filmmaker
    if (data.category !== 'deliverables') {
      return Response.json({ skipped: 'not a deliverable' });
    }

    const projects = await base44.asServiceRole.entities.Project.filter({ id: data.project_id });
    const project = projects[0];
    if (!project) return Response.json({ skipped: 'project not found' });

    // Only email if the filmmaker (owner) uploaded it, not the client
    if (data.created_by && data.created_by !== project.owner_email) {
      return Response.json({ skipped: 'uploaded by client, not filmmaker' });
    }

    const clientEmail = project.client_email;
    if (!clientEmail) return Response.json({ skipped: 'no client email' });

    const clientPortalUrl = `https://filmos.co/ClientPortal?token=${project.access_token}`;
    const versionNote = data.version_note ? `<p style="color:#52525b;font-size:14px;margin:0 0 20px;padding:12px 16px;background:#f4f4f5;border-radius:8px;border-left:3px solid #18181b;"><em>${data.version_note}</em></p>` : '';

    const html = `<div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;color:#18181b;">
      <div style="padding:32px 0 20px;">
        <img src="https://media.base44.com/images/public/69b490115c68bd1fe6d609a8/19ed2b1d5_filmOSlogomain-removebg-preview.png" alt="FilmOS" style="height:32px;" />
      </div>
      <h2 style="font-size:20px;font-weight:700;margin:0 0 8px;">New deliverable ready for you</h2>
      <p style="color:#71717a;font-size:14px;margin:0 0 6px;">A new file has been uploaded to <strong style="color:#18181b;">${project.name}</strong> for your review.</p>
      <p style="color:#71717a;font-size:14px;margin:0 0 20px;">📎 <strong style="color:#18181b;">${data.file_name}</strong></p>
      ${versionNote}
      <a href="${clientPortalUrl}" style="display:inline-block;background:#18181b;color:white;text-decoration:none;padding:12px 28px;border-radius:10px;font-size:14px;font-weight:600;">View &amp; Download</a>
      <p style="color:#a1a1aa;font-size:11px;margin-top:32px;border-top:1px solid #f4f4f5;padding-top:16px;">You're receiving this because you have an active project in FilmOS. Reply to this email if you have questions.</p>
    </div>`;

    const RESEND_KEY = Deno.env.get('RESEND_API_KEY');
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'FilmOS <notifications@filmos.co>',
        to: clientEmail,
        subject: `New deliverable ready: ${project.name}`,
        html,
      }),
    });

    const result = await res.json();
    if (!res.ok) {
      console.error('Resend error:', JSON.stringify(result));
      return Response.json({ error: result }, { status: 500 });
    }

    console.log(`Notified client ${clientEmail} for project ${project.name}: ${data.file_name}`);
    return Response.json({ sent: true });
  } catch (error) {
    console.error('notifyClientNewContent error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});