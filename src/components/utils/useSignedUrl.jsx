import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';

const cache = {};

/**
 * Resolves a file's S3 URL to a presigned download URL.
 * Falls back to file_url if no s3_key is present (e.g. older Cloudinary files).
 */
export function useSignedUrl(file) {
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;

    if (!file.s3_key) {
      setUrl(file.file_url || null);
      return;
    }

    if (cache[file.s3_key]) {
      setUrl(cache[file.s3_key]);
      return;
    }

    base44.functions.invoke('s3GetDownloadUrl', { s3Key: file.s3_key })
      .then(res => {
        const u = res.data?.signedUrl || file.file_url;
        cache[file.s3_key] = u;
        setUrl(u);
      })
      .catch(() => setUrl(file.file_url));
  }, [file?.id, file?.s3_key]);

  return url;
}

/**
 * Fetches a presigned download URL for a file and opens it.
 */
export async function downloadFile(file) {
  if (file.s3_key) {
    try {
      const res = await base44.functions.invoke('s3GetDownloadUrl', { s3Key: file.s3_key });
      if (res.data?.signedUrl) {
        window.open(res.data.signedUrl, '_blank');
        return;
      }
    } catch {}
  }
  window.open(file.file_url, '_blank');
}