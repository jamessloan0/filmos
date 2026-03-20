import { createClientFromRequest } from 'npm:@base44/sdk@0.8.21';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { token } = await req.json();

    if (!token) {
      return Response.json({ error: 'Token required' }, { status: 400 });
    }

    const projects = await base44.asServiceRole.entities.Project.filter({ access_token: token });

    if (!projects || projects.length === 0) {
      return Response.json({ project: null });
    }

    return Response.json({ project: projects[0] });
  } catch (error) {
    console.error('getProjectByToken error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});