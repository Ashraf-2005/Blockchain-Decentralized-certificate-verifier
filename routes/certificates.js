const express = require('express');
const multer = require('multer');
const { authenticateToken, authorizeRole } = require('../utils/auth');
const { generateHash, generateCertificateId, hashToBytes32 } = require('../utils/hash');
const { issueCertificate, verifyCertificate } = require('../utils/blockchain');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// Mock database for certificates
const certificateDB = {};

router.post('/upload', authenticateToken, authorizeRole('superadmin', 'college'), upload.single('file'), async (req, res) => {
  try {
    const { studentName, course } = req.body;

    if (!req.file || !studentName || !course) {
      return res.status(400).json({ error: 'File, student name, and course required' });
    }

    console.log('📥 Certificate upload request received');
    console.log('  - Student:', studentName);
    console.log('  - Course:', course);
    console.log('  - File size:', req.file.size, 'bytes');

    const fileHash = generateHash(req.file.buffer);
    const certificateId = generateCertificateId();
    const bytes32Hash = hashToBytes32(fileHash);

    console.log('🔐 Generated hashes:');
    console.log('  - SHA256:', fileHash);
    console.log('  - Bytes32:', bytes32Hash);
    console.log('  - Certificate ID:', certificateId);

    // Issue on blockchain
    console.log('⛓️ Storing on blockchain...');
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

    console.log('✅ Certificate uploaded successfully');
    console.log('  - TX Hash:', txResult.txHash);
    console.log('  - Block:', txResult.blockNumber);

    res.status(201).json({
      success: true,
      certificate: certData
    });
  } catch (error) {
    console.error('❌ Upload error:', error.message);
    console.error('   Full error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/all', authenticateToken, authorizeRole('superadmin', 'college'), (req, res) => {
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
