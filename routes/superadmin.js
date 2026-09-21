const express = require('express');
const { users, pendingColleges, authenticateToken, authorizeRole } = require('../utils/auth');

const router = express.Router();

// Get all pending college registrations
router.get('/pending-colleges', authenticateToken, authorizeRole('superadmin'), (req, res) => {
  try {
    const pending = Object.values(pendingColleges).map(college => ({
      id: college.id,
      email: college.email,
      name: college.name,
      status: college.status
    }));
    
    res.json({ pending });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Approve college registration
router.post('/approve-college/:email', authenticateToken, authorizeRole('superadmin'), (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const college = pendingColleges[email];
    
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    // Move from pending to approved users
    college.status = 'approved';
    users[email] = college;
    delete pendingColleges[email];
    
    console.log('✅ College approved:', email);
    res.json({ 
      message: 'College approved successfully',
      college: {
        email: college.email,
        name: college.name,
        status: college.status
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reject college registration
router.post('/reject-college/:email', authenticateToken, authorizeRole('superadmin'), (req, res) => {
  try {
    const email = decodeURIComponent(req.params.email);
    const college = pendingColleges[email];
    
    if (!college) {
      return res.status(404).json({ error: 'College not found' });
    }
    
    delete pendingColleges[email];
    
    console.log('❌ College rejected:', email);
    res.json({ message: 'College registration rejected' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all approved colleges
router.get('/approved-colleges', authenticateToken, authorizeRole('superadmin'), (req, res) => {
  try {
    const approved = Object.values(users)
      .filter(user => user.role === 'college')
      .map(college => ({
        id: college.id,
        email: college.email,
        name: college.name,
        status: college.status
      }));
    
    res.json({ approved });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all verifiers
router.get('/verifiers', authenticateToken, authorizeRole('superadmin'), (req, res) => {
  try {
    const verifiers = Object.values(users)
      .filter(user => user.role === 'verifier')
      .map(verifier => ({
        id: verifier.id,
        email: verifier.email,
        name: verifier.name
      }));
    
    res.json({ verifiers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get system statistics
router.get('/stats', authenticateToken, authorizeRole('superadmin'), (req, res) => {
  try {
    const stats = {
      pendingColleges: Object.keys(pendingColleges).length,
      approvedColleges: Object.values(users).filter(u => u.role === 'college').length,
      verifiers: Object.values(users).filter(u => u.role === 'verifier').length,
      totalUsers: Object.keys(users).length
    };
    
    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
