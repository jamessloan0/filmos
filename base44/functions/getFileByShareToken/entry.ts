import { createClientFromRequest } from 'npm:@base44/sdk@0.8.23';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { token } = await req.json();

    if (!token) {
      return Response.json({ error: 'Token required' }, { status: 400 });
    }

    const files = await base44.asServiceRole.entities.ProjectFile.filter({
      share_token: token,
      share_enabled: true,
    });

    if (!files || files.length === 0) {
      return Response.json({ file: null });
    }

    const file = files[0];

    // Enforce expiry
    if (file.share_expires_at && new Date(file.share_expires_at) < new Date()) {
      return Response.json({ file: null });
    }

    return Response.json({ file });
  } catch (error) {
    console.error('getFileByShareToken error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
});