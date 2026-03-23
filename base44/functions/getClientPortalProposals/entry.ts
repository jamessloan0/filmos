import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { project_id } = await req.json();

    if (!project_id) {
      return Response.json({ error: 'project_id required' }, { status: 400 });
    }

    const proposals = await base44.asServiceRole.entities.Proposal.filter(
      { project_id, status: "sent" },
      "-created_date"
    );

    return Response.json({ proposals: proposals || [] });
  } catch (error) {
    console.error('getClientPortalProposals error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});