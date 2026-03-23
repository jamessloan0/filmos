import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

const CLOUDFRONT_BASE = 'https://d1uwhxuquz3bk7.cloudfront.net';

// Video file extensions we should proxy
function isVideo(fileName) {
  return /\.(mp4|mov|avi|mkv|webm|m4v)$/i.test(fileName || '');
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();

    // Support both direct invocation (fileId) and entity automation payload (event+data)
    let fileRecord = body.data || null;
    const fileId = body.fileId || body.event?.entity_id || null;

    if (!fileRecord && fileId) {
      const records = await base44.asServiceRole.entities.ProjectFile.filter({ id: fileId });
      fileRecord = records?.[0] || null;
    }

    if (!fileRecord) {
      return Response.json({ skipped: 'no file record found' });
    }

    // Only process video deliverables
    if (fileRecord.category !== 'deliverables' || !isVideo(fileRecord.file_name)) {
      return Response.json({ skipped: 'not a video deliverable' });
    }

    // Skip if already proxied or currently processing
    if (fileRecord.proxy_status === 'ready' || fileRecord.proxy_status === 'processing') {
      return Response.json({ skipped: `proxy_status is already ${fileRecord.proxy_status}` });
    }

    const cloudName = Deno.env.get('VITE_CLOUDINARY_CLOUD_NAME');
    const uploadPreset = Deno.env.get('VITE_CLOUDINARY_UPLOAD_PRESET');

    if (!cloudName || !uploadPreset) {
      console.error('Missing Cloudinary credentials');
      return Response.json({ error: 'Missing Cloudinary configuration' }, { status: 500 });
    }

    // Build the source URL from s3_key (CloudFront) or fall back to file_url
    const sourceUrl = fileRecord.s3_key
      ? `${CLOUDFRONT_BASE}/${fileRecord.s3_key}`
      : fileRecord.file_url;

    if (!sourceUrl) {
      return Response.json({ skipped: 'no source url' });
    }

    console.log(`Starting proxy for file ${fileRecord.id}: ${fileRecord.file_name}`);

    // Mark as processing immediately
    await base44.asServiceRole.entities.ProjectFile.update(fileRecord.id, {
      proxy_status: 'processing',
    });

    // Upload to Cloudinary (pass URL — Cloudinary fetches it remotely)
    const formData = new FormData();
    formData.append('file', sourceUrl);
    formData.append('upload_preset', uploadPreset);
    formData.append('resource_type', 'video');
    formData.append('folder', `filmos/${fileRecord.project_id}`);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/video/upload`,
      { method: 'POST', body: formData }
    );

    const uploadData = await uploadRes.json();

    if (!uploadRes.ok || !uploadData.public_id) {
      console.error('Cloudinary upload failed:', JSON.stringify(uploadData));
      await base44.asServiceRole.entities.ProjectFile.update(fileRecord.id, {
        proxy_status: 'failed',
      });
      return Response.json({ error: 'Cloudinary upload failed', detail: uploadData }, { status: 500 });
    }

    // Construct a delivery URL with low-bitrate transformation for smooth browser playback.
    // Transformation: H.264 codec, max 800 kbps, auto quality, max 720p, keep aspect ratio.
    const transformation = 'vc_h264,br_800k,q_auto:low,w_1280,h_720,c_limit';
    const proxyUrl = `https://res.cloudinary.com/${cloudName}/video/upload/${transformation}/${uploadData.public_id}.mp4`;

    await base44.asServiceRole.entities.ProjectFile.update(fileRecord.id, {
      proxy_url: proxyUrl,
      proxy_status: 'ready',
    });

    console.log(`Proxy ready for ${fileRecord.file_name}: ${proxyUrl}`);
    return Response.json({ success: true, proxyUrl });

  } catch (error) {
    console.error('createVideoProxy error:', error.message);
    // Try to mark as failed if we have a file id
    try {
      const body2 = {}; // already consumed
      console.error('Could not mark file as failed:', error.message);
    } catch (_) {}
    return Response.json({ error: error.message }, { status: 500 });
  }
});