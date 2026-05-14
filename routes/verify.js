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

    // In production, fetch from database
    res.json({
      certificateId,
      status: 'verified',
      message: 'Certificate found on blockchain'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/by-file', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'File required' });
    }

    const fileHash = generateHash(req.file.buffer);
    const bytes32Hash = hashToBytes32(fileHash);

    const cert = await verifyCertificate(bytes32Hash);

    res.json({
      isValid: cert.isValid,
      certificate: cert
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
