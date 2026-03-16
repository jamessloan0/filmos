import { base44 } from "@/api/base44Client";

const CLOUDFRONT_BASE = 'https://d1uwhxuquz3bk7.cloudfront.net';

/**
 * Returns the delivery URL for a file.
 * If the file has an s3_key, constructs a CloudFront URL (for streaming/preview).
 * Falls back to file_url for older files (e.g. Cloudinary).
 */
export function getFileUrl(file) {
  if (!file) return null;
  if (file.s3_key) return `${CLOUDFRONT_BASE}/${file.s3_key}`;
  return file.file_url || null;
}

/**
 * Hook version of getFileUrl for components (used for video playback preview).
 */
export function useSignedUrl(file) {
  return getFileUrl(file);
}

/**
 * Forces browser to download the original, uncompressed file.
 * For S3 files: calls backend to get a presigned URL with Content-Disposition: attachment,
 * which instructs the browser to save the file rather than open it.
 * The file is served directly from S3 — no transcoding or compression is applied.
 * For legacy (non-S3) files: falls back to opening the URL in a new tab.
 */
export async function downloadFile(file) {
  if (!file) return;

  if (file.s3_key) {
    try {
      const res = await base44.functions.invoke('s3GetDownloadUrl', {
        s3Key: file.s3_key,
        fileName: file.file_name,
      });
      const signedUrl = res.data?.signedUrl;
      if (signedUrl) {
        const a = document.createElement('a');
        a.href = signedUrl;
        a.download = file.file_name || 'download';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
    } catch (e) {
      console.error('Download error:', e);
    }
  }

  // Fallback for non-S3 files (Cloudinary etc.)
  const url = getFileUrl(file);
  if (url) window.open(url, '_blank');
}