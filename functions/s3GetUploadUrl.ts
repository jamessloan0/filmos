import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';
import { S3Client, PutObjectCommand } from 'npm:@aws-sdk/client-s3@3';
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

const FREE_LIMIT_BYTES = 2 * 1024 * 1024 * 1024;   // 2 GB
const PRO_LIMIT_BYTES  = 20 * 1024 * 1024 * 1024;  // 20 GB
const FREE_EXPIRY_DAYS = 3;
const PRO_EXPIRY_DAYS  = 14;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const { fileName, fileType, fileSize, projectId } = await req.json();

    const isPro = user.plan === 'pro';
    const sizeLimit = isPro ? PRO_LIMIT_BYTES : FREE_LIMIT_BYTES;

    if (fileSize > sizeLimit) {
      const limitLabel = isPro ? '20 GB' : '2 GB';
      return Response.json({ error: `File exceeds the ${isPro ? 'Pro' : 'Free'} plan limit of ${limitLabel}.` }, { status: 400 });
    }

    const expiryDays = isPro ? PRO_EXPIRY_DAYS : FREE_EXPIRY_DAYS;
    const expiresAt = new Date(Date.now() + expiryDays * 24 * 60 * 60 * 1000).toISOString();

    const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
    const key = `filmos/projects/${projectId}/${Date.now()}-${safeFileName}`;
    const bucket = Deno.env.get("AWS_S3_BUCKET");
    const region = Deno.env.get("AWS_REGION");

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: fileType || 'application/octet-stream',
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    const fileUrl = `https://${bucket}.s3.${region}.amazonaws.com/${key}`;

    return Response.json({ uploadUrl, fileUrl, expiresAt, key });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});