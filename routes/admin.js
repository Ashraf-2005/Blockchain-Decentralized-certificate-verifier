const express = require('express');
const { authenticateToken, authorizeRole } = require('../utils/auth');
const { getCertificateCount } = require('../utils/blockchain');

const router = express.Router();

router.get('/stats', authenticateToken, authorizeRole('admin'), async (req, res) => {
  try {
    const totalCertificates = await getCertificateCount();

    res.json({
      totalCertificates,
      verifiedCertificates: totalCertificates,
      pendingCertificates: 0,
      recentActivity: []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
