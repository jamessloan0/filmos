import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import { S3Client, DeleteObjectCommand } from 'npm:@aws-sdk/client-s3@3';

const s3 = new S3Client({
  region: Deno.env.get("AWS_REGION"),
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY"),
  },
});

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const now = new Date().toISOString();

    // Fetch all project files (service role — no user auth for scheduled task)
    const allFiles = await base44.asServiceRole.entities.ProjectFile.list('-created_date', 1000);

    const expired = allFiles.filter(
      (f) => f.expires_at && f.expires_at < now && f.file_url?.includes('amazonaws.com')
    );

    let deleted = 0;
    for (const file of expired) {
      try {
        const url = new URL(file.file_url);
        const key = url.pathname.slice(1); // strip leading "/"
        await s3.send(new DeleteObjectCommand({
          Bucket: Deno.env.get("AWS_S3_BUCKET"),
          Key: key,
        }));
      } catch (_) {
        // If S3 delete fails, still remove the DB record
      }
      await base44.asServiceRole.entities.ProjectFile.delete(file.id);
      deleted++;
    }

    return Response.json({ deleted, checked: allFiles.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});