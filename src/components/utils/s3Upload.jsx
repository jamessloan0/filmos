import { base44 } from "@/api/base44Client";

/**
 * Upload a file to S3 via a presigned URL.
 * @param {File} file
 * @param {object} options
 * @param {string} options.projectId
 * @param {function} [options.onProgress] - called with 0-100 percent
 * @returns {Promise<{file_url: string, expires_at: string}>}
 */
export async function uploadToS3(file, { projectId, onProgress } = {}) {
  // Ask backend for a presigned PUT URL
  const response = await base44.functions.invoke('s3GetUploadUrl', {
    fileName: file.name,
    fileType: file.type || 'application/octet-stream',
    fileSize: file.size,
    projectId,
  });

  const { uploadUrl, fileUrl, expiresAt, error } = response.data;
  if (error) throw new Error(error);

  // Upload directly to S3 with progress tracking
  await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener('progress', (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });
    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 300) resolve();
      else reject(new Error(`S3 upload failed: ${xhr.status}`));
    });
    xhr.addEventListener('error', () => reject(new Error('Upload failed')));
    xhr.addEventListener('abort', () => reject(new Error('Upload aborted')));
    xhr.open('PUT', uploadUrl);
    xhr.setRequestHeader('Content-Type', file.type || 'application/octet-stream');
    xhr.send(file);
  });

  return { file_url: fileUrl, expires_at: expiresAt };
}