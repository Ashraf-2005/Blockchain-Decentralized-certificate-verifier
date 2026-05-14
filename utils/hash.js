const crypto = require('crypto');

function generateHash(data) {
  return crypto.createHash('sha256').update(data).digest('hex');
}

function generateCertificateId() {
  return 'CERT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function hashToBytes32(hash) {
  // Convert hex string to bytes32 format for Solidity
  if (hash.startsWith('0x')) {
    return hash;
  }
  return '0x' + hash;
}

module.exports = {
  generateHash,
  generateCertificateId,
  hashToBytes32
};
