const CLOUDFRONT_BASE = 'https://d1uwhxuquz3bk7.cloudfront.net';

/**
 * Returns the delivery URL for a file.
 * If the file has an s3_key, constructs a CloudFront URL.
 * Falls back to file_url for older files (e.g. Cloudinary).
 */
export function getFileUrl(file) {
  if (!file) return null;
  if (file.s3_key) return `${CLOUDFRONT_BASE}/${file.s3_key}`;
  return file.file_url || null;
}

/**
 * Hook version of getFileUrl for components.
 */
export function useSignedUrl(file) {
  return getFileUrl(file);
}

/**
 * Opens the CloudFront (or fallback) URL for download.
 */
export async function downloadFile(file) {
  const url = getFileUrl(file);
  if (url) window.open(url, '_blank');
}