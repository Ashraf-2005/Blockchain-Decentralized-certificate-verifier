/**
 * Generate SHA-256 hash of a file using Web Crypto API
 * @param {File} file - The file to hash
 * @returns {Promise<string>} - Hex string of the hash
 */
export async function hashFile(file) {
  if (!file) {
    throw new Error('No file provided');
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        resolve('0x' + hashHex);
      } catch (error) {
        reject(new Error('Failed to hash file: ' + error.message));
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsArrayBuffer(file);
  });
}

/**
 * Validate file type and size
 * @param {File} file - The file to validate
 * @param {number} maxSizeMB - Maximum file size in MB
 * @returns {Object} - {valid: boolean, error: string}
 */
export function validateFile(file, maxSizeMB = 10) {
  if (!file) {
    return { valid: false, error: 'No file selected' };
  }

  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: 'Only PDF, JPG, and PNG files are allowed' };
  }

  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
  }

  return { valid: true, error: null };
}
