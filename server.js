require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { initializeBlockchain } = require('./utils/blockchain');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Initialize blockchain on startup
let blockchainReady = false;

(async () => {
  try {
    await initializeBlockchain();
    blockchainReady = true;
    console.log('✅ Blockchain initialized successfully');
  } catch (error) {
    console.error('⚠️ Blockchain initialization failed:', error.message);
    console.error('⚠️ Certificate uploads will fail until blockchain is available');
  }
})();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/certificates', require('./routes/certificates'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/verify', require('./routes/verify'));
app.use('/api/superadmin', require('./routes/superadmin'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    blockchain: blockchainReady ? 'ready' : 'initializing'
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Blockchain status: ${blockchainReady ? '✅ Ready' : '⏳ Initializing'}`);
});
