const express = require('express');
const multer = require('multer');
const { authenticateToken, authorizeRole } = require('../utils/auth');
const { generateHash, generateCertificateId, hashToBytes32 } = require('../utils/hash');
const { issueCertificate, verifyCertificate } = require('../utils/blockchain');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Mock database for certificates
const certificateDB = {};

router.post('/upload', authenticateToken, authorizeRole('admin'), upload.single('file'), async (req, res) => {
  try {
    const { studentName, course } = req.body;

    if (!req.file || !studentName || !course) {
      return res.status(400).json({ error: 'File, student name, and course required' });
    }

    const fileHash = generateHash(req.file.buffer);
    const certificateId = generateCertificateId();
    const bytes32Hash = hashToBytes32(fileHash);

    // Issue on blockchain
    const txResult = await issueCertificate(
      bytes32Hash,
      certificateId,
      studentName,
      course,
      '' // IPFS hash placeholder
    );

    const certData = {
      certificateId,
      studentName,
      course,
      fileHash,
      txHash: txResult.txHash,
      blockNumber: txResult.blockNumber,
      uploadedAt: new Date(),
      status: 'verified'
    };

    certificateDB[certificateId] = certData;

    res.status(201).json({
      success: true,
      certificate: certData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', authenticateToken, authorizeRole('admin'), (req, res) => {
  const certificates = Object.values(certificateDB);
  res.json({
    total: certificates.length,
    certificates
  });
});

router.get('/:certificateId', authenticateToken, async (req, res) => {
  try {
    const cert = certificateDB[req.params.certificateId];

    if (!cert) {
      return res.status(404).json({ error: 'Certificate not found' });
    }

    res.json(cert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
