const express = require('express');
const multer = require('multer');
const { generateHash, hashToBytes32 } = require('../utils/hash');
const { verifyCertificate } = require('../utils/blockchain');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/by-id', async (req, res) => {
  try {
    const { certificateId } = req.body;

    if (!certificateId) {
      return res.status(400).json({ error: 'Certificate ID required' });
    }

    console.log('🔍 Certificate ID verification request:', certificateId);

    // In production, fetch from database
    // For now, return a message that it requires database integration
    res.json({
      isValid: false,
      error: 'Certificate ID verification requires database integration',
      message: 'Please use file upload verification instead'
    });
  } catch (error) {
    console.error('❌ Verification error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/by-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File required' });
    }

    console.log('🔍 Verification request received');
    console.log('  - File size:', req.file.size, 'bytes');

    const fileHash = generateHash(req.file.buffer);
    const bytes32Hash = hashToBytes32(fileHash);

    console.log('🔐 Generated hashes:');
    console.log('  - SHA256:', fileHash);
    console.log('  - Bytes32:', bytes32Hash);

    console.log('⛓️ Querying blockchain...');
    const cert = await verifyCertificate(bytes32Hash);

    console.log('✅ Blockchain query completed');
    console.log('  - Found:', cert.isValid);
    console.log('  - Certificate ID:', cert.certificateId);

    res.json({
      isValid: cert.isValid,
      certificate: cert,
      fileHash: fileHash,
      bytes32Hash: bytes32Hash
    });
  } catch (error) {
    console.error('❌ Verification error:', error.message);
    console.error('   Full error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
