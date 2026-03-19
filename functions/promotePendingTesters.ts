import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const payload = await req.json();

    const userId = payload?.event?.entity_id;
    if (!userId) return Response.json({ error: 'No entity_id' }, { status: 400 });

    // Get the user record
    const users = await base44.asServiceRole.entities.User.filter({ id: userId });
    const user = users?.[0];
    if (!user) return Response.json({ skipped: 'user not found' });

    // Check if this email is in the pending testers list
    const pending = await base44.asServiceRole.entities.PendingTester.filter({ email: user.email });
    if (!pending || pending.length === 0) {
      console.log(`${user.email} is not a pending tester, skipping`);
      return Response.json({ skipped: true });
    }

    // Promote to tester
    await base44.asServiceRole.entities.User.update(userId, { role: 'tester' });
    console.log(`Promoted ${user.email} to tester`);

    return Response.json({ success: true, email: user.email });
  } catch (error) {
    console.error('Error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});