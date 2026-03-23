import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const user = await base44.auth.me();
    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    // Get all pending tester emails
    const pending = await base44.asServiceRole.entities.PendingTester.list();
    if (!pending || pending.length === 0) {
      return Response.json({ promoted: [], message: 'No pending testers' });
    }

    const pendingEmails = pending.map(p => p.email.toLowerCase());

    // Get all users
    const allUsers = await base44.asServiceRole.entities.User.list();
    const toPromote = allUsers.filter(u =>
      pendingEmails.includes(u.email?.toLowerCase()) && u.role !== 'tester' && u.role !== 'admin'
    );

    const promoted = [];
    for (const u of toPromote) {
      await base44.asServiceRole.entities.User.update(u.id, { role: 'tester' });
      console.log(`Promoted ${u.email} to tester`);
      promoted.push(u.email);
    }

    return Response.json({ promoted, total: promoted.length });
  } catch (error) {
    console.error('Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});