const express = require('express');
const bcrypt = require('bcryptjs');
const { users, pendingColleges, generateToken, authenticateToken } = require('../utils/auth');

const router = express.Router();

router.post('/login', (req, res) => {
  try {
    console.log('🔐 Login request received');
    console.log('  - Email:', req.body.email);
    
    const { email, password } = req.body;

    if (!email || !password) {
      console.log('❌ Missing email or password');
      return res.status(400).json({ error: 'Email and password required' });
    }

    const user = users[email];
    console.log('  - User found:', !!user);
    
    if (!user) {
      console.log('❌ User not found:', email);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);
    console.log('  - Password match:', passwordMatch);
    
    if (!passwordMatch) {
      console.log('❌ Password mismatch');
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    console.log('✅ Login successful');
    console.log('  - Token generated');
    console.log('  - User role:', user.role);
    
    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        name: user.name
      }
    });
  } catch (error) {
    console.error('❌ Login error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

router.post('/register', (req, res) => {
  const { email, password, name, role } = req.body;

  if (users[email] || pendingColleges[email]) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const newUser = {
    id: Date.now().toString(),
    email,
    password: bcrypt.hashSync(password, 10),
    role: role === 'college' ? 'college' : 'verifier',
    name,
    status: role === 'college' ? 'pending' : 'approved'
  };

  if (role === 'college') {
    // College signup - needs approval
    pendingColleges[email] = newUser;
    res.status(201).json({
      message: 'College registration submitted. Waiting for super admin approval.',
      status: 'pending'
    });
  } else {
    // Verifier signup - auto approved
    users[email] = newUser;
    const token = generateToken(newUser);
    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        name: newUser.name,
        status: newUser.status
      }
    });
  }
});

router.get('/me', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
