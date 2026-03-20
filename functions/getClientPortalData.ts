import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { project_id, type } = await req.json();

    if (!project_id) {
      return Response.json({ error: 'project_id required' }, { status: 400 });
    }

    const sr = base44.asServiceRole;

    let data;
    switch (type) {
      case 'files':
        data = await sr.entities.ProjectFile.filter({ project_id }, "-created_date");
        break;
      case 'messages':
        data = await sr.entities.Message.filter({ project_id }, "created_date");
        break;
      case 'invoices':
        data = await sr.entities.Invoice.filter({ project_id }, "-created_date");
        break;
      case 'activities':
        data = await sr.entities.Activity.filter({ project_id }, "-created_date");
        break;
      case 'feedback':
        data = await sr.entities.Feedback.filter({ project_id }, "-created_date");
        break;
      case 'proposals':
        data = await sr.entities.Proposal.filter({ project_id, status: "sent" }, "-created_date");
        break;
      default:
        return Response.json({ error: 'Unknown type' }, { status: 400 });
    }

    return Response.json({ data: data || [] });
  } catch (error) {
    console.error('getClientPortalData error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});