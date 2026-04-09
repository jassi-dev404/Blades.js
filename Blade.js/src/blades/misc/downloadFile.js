/**
 * Creates and triggers file download
 * @param {string} content - File content
 * @param {string} filename - Filename
 * @param {string} mimeType - MIME type (default 'text/plain')
 */
export default function downloadFile(content, filename, mimeType = 'text/plain') {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
