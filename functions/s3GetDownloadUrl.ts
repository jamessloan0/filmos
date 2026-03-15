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
    const { s3Key } = await req.json();
    if (!s3Key) return Response.json({ error: 'Missing s3Key' }, { status: 400 });

    const command = new GetObjectCommand({
      Bucket: Deno.env.get("AWS_S3_BUCKET"),
      Key: s3Key,
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return Response.json({ signedUrl });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});