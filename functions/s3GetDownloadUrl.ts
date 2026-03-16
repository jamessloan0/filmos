import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import { S3Client, GetObjectCommand } from 'npm:@aws-sdk/client-s3@3';
import { getSignedUrl } from 'npm:@aws-sdk/s3-request-presigner@3';

const s3 = new S3Client({
  region: Deno.env.get("AWS_REGION"),
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY"),
  },
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { s3Key } = await req.json();

    if (!s3Key) return Response.json({ error: 'Missing s3Key' }, { status: 400 });

    // Verify this s3Key belongs to a known ProjectFile record
    const matchingFiles = await base44.asServiceRole.entities.ProjectFile.filter({ s3_key: s3Key });
    if (!matchingFiles || matchingFiles.length === 0) {
      return Response.json({ error: 'File not found or access denied' }, { status: 403 });
    }

    const command = new GetObjectCommand({
      Bucket: Deno.env.get("AWS_S3_BUCKET"),
      Key: s3Key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return Response.json({ signedUrl });
  } catch (error) {
    console.error('s3GetDownloadUrl error:', error.message);
    return Response.json({ error: error.message }, { status: 500 });
  }
});