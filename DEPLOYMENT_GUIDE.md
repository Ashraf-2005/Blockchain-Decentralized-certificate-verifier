# 🚀 Deployment Guide - Vercel & Render

Complete guide to deploy your DCVS project to production.

---

## 📋 Prerequisites

Before deploying, you need:

1. ✅ **GitHub Account** - To host your code
2. ✅ **Vercel Account** - For frontend (free)
3. ✅ **Render Account** - For backend (free)
4. ✅ **Blockchain RPC Provider** - Alchemy/Infura (free tier)
5. ✅ **Deployed Smart Contract** - On testnet/mainnet

---

## 🔗 Deployment Overview

```
┌─────────────────────────────────────────────────────────┐
│                    PRODUCTION SETUP                     │
└─────────────────────────────────────────────────────────┘

Frontend (React)               Backend (Node.js)           Blockchain
     │                              │                           │
     ├─ Vercel                      ├─ Render.com              ├─ Sepolia/Polygon
     ├─ Static Build                ├─ Web Service             ├─ Smart Contract
     └─ https://your-app.vercel.app └─ https://api.onrender.com└─ RPC Provider
              │                              │                           │
              └──────────── API Calls ───────┴──── Web3 Calls ─────────┘
```

---

## 🎯 Deployment Steps

### **Phase 1: Prepare Blockchain (30 minutes)**

#### **Step 1: Choose Your Blockchain Network**

**Option A: Sepolia Testnet (Recommended for testing)**
- Free test ETH available
- Fast transactions
- Same as mainnet but no real money

**Option B: Polygon Mumbai Testnet**
- Free test MATIC
- Cheaper than Ethereum
- Good for testing

**Option C: Polygon Mainnet**
- Real blockchain
- Very cheap fees (~$0.01)
- Production ready

#### **Step 2: Get RPC Provider (Alchemy)**

1. Go to: https://www.alchemy.com/
2. Sign up for free account
3. Click "Create App"
4. Choose:
   - Chain: Ethereum
   - Network: Sepolia (or your choice)
5. Click "View Key"
6. Copy the **HTTPS URL**: `https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY`

**Alternative RPC Providers:**
- **Infura**: https://infura.io/
- **QuickNode**: https://www.quicknode.com/
- **Public RPCs**: https://chainlist.org/

#### **Step 3: Get Testnet Funds**

**For Sepolia:**
1. Create MetaMask wallet (if you don't have)
2. Copy your wallet address
3. Go to: https://sepoliafaucet.com/
4. Enter your address
5. Get free test ETH

**For Polygon Mumbai:**
- Faucet: https://faucet.polygon.technology/

#### **Step 4: Deploy Smart Contract**

1. **Update hardhat.config.js:**

```javascript
require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: process.env.RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 11155111
    },
    polygon: {
      url: process.env.RPC_URL || "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 137
    },
    polygonMumbai: {
      url: process.env.RPC_URL || "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001
    }
  }
};
```

2. **Update .env with your wallet:**

```env
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=your_wallet_private_key_here
```

⚠️ **IMPORTANT:** Never commit your private key to GitHub!

3. **Deploy contract:**

```bash
cd blockchain-hardhat2
npx hardhat run scripts/deploy.js --network sepolia
```

4. **Copy contract address:**

```
CertificateRegistry deployed to: 0x1234567890abcdef...
```

Save this address! You'll need it for frontend and backend.

---

### **Phase 2: Deploy Backend to Render (15 minutes)**

#### **Step 1: Push Code to GitHub**

1. **Create .gitignore:**

```bash
# Already exists, but verify it contains:
node_modules/
.env
.env.local
*.log
dist/
build/
.DS_Store
```

2. **Initialize Git (if not already):**

```bash
cd blockchain-hardhat2
git init
git add .
git commit -m "Initial commit - DCVS Backend"
```

3. **Create GitHub Repository:**
- Go to: https://github.com/new
- Name: `dcvs-backend`
- Visibility: Private (recommended)
- Click "Create repository"

4. **Push to GitHub:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/dcvs-backend.git
git branch -M main
git push -u origin main
```

#### **Step 2: Deploy on Render**

1. **Go to Render:**
- Visit: https://render.com/
- Sign up with GitHub

2. **Create New Web Service:**
- Click "New +" → "Web Service"
- Connect your GitHub repository: `dcvs-backend`
- Click "Connect"

3. **Configure Service:**

```
Name: dcvs-backend
Region: Select closest to you
Branch: main
Root Directory: (leave blank or "blockchain-hardhat2")
Runtime: Node
Build Command: npm install
Start Command: npm start
Plan: Free
```

4. **Add Environment Variables:**

Click "Advanced" → "Add Environment Variable"

Add these variables:

```
NODE_ENV = production
PORT = 10000
JWT_SECRET = your_random_secret_key_here_min_32_chars
CONTRACT_ADDRESS = 0x1234...your_deployed_contract_address
PRIVATE_KEY = your_wallet_private_key
RPC_URL = https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
ADMIN_EMAIL = admin@dcvs.com
ADMIN_PASSWORD = admin123
FRONTEND_URL = https://your-frontend.vercel.app (add after frontend deployed)
```

**To generate JWT_SECRET:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

5. **Deploy:**
- Click "Create Web Service"
- Wait 3-5 minutes for deployment
- Copy your backend URL: `https://dcvs-backend.onrender.com`

6. **Test Backend:**

Open: `https://dcvs-backend.onrender.com/api/health`

Should see:
```json
{
  "status": "ok",
  "blockchain": "ready",
  "timestamp": "2026-09-21T..."
}
```

---

### **Phase 3: Deploy Frontend to Vercel (10 minutes)**

#### **Step 1: Update Frontend Environment**

1. **Create production .env:**

In `frontend/Certificate-Verifier/.env.production`:

```env
VITE_API_URL=https://dcvs-backend.onrender.com
VITE_CONTRACT_ADDRESS=0x1234...your_deployed_contract_address
VITE_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

2. **Update vite.config.js (if needed):**

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          web3: ['ethers']
        }
      }
    }
  },
  server: {
    port: 3000
  }
})
```

#### **Step 2: Push Frontend to GitHub**

1. **Create separate repository for frontend:**

```bash
cd frontend/Certificate-Verifier
git init
git add .
git commit -m "Initial commit - DCVS Frontend"
```

2. **Create GitHub Repository:**
- Go to: https://github.com/new
- Name: `dcvs-frontend`
- Click "Create repository"

3. **Push:**

```bash
git remote add origin https://github.com/YOUR_USERNAME/dcvs-frontend.git
git branch -M main
git push -u origin main
```

#### **Step 3: Deploy on Vercel**

1. **Go to Vercel:**
- Visit: https://vercel.com/
- Sign up with GitHub

2. **Import Project:**
- Click "Add New..." → "Project"
- Import `dcvs-frontend` repository
- Click "Import"

3. **Configure Project:**

```
Framework Preset: Vite
Root Directory: ./
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

4. **Add Environment Variables:**

Click "Environment Variables" and add:

```
VITE_API_URL = https://dcvs-backend.onrender.com
VITE_CONTRACT_ADDRESS = 0x1234...your_contract_address
VITE_RPC_URL = https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
```

5. **Deploy:**
- Click "Deploy"
- Wait 2-3 minutes
- Copy your frontend URL: `https://dcvs-frontend.vercel.app`

6. **Update Backend CORS:**

Go back to Render → Your backend service → Environment

Add/Update:
```
FRONTEND_URL = https://dcvs-frontend.vercel.app
```

Click "Save Changes" (backend will redeploy)

---

### **Phase 4: Update server.js CORS (Important!)**

Update the CORS configuration in `server.js`:

```javascript
const corsOptions = {
  origin: process.env.FRONTEND_URL || 
    (process.env.NODE_ENV === 'production' 
      ? ['https://dcvs-frontend.vercel.app'] // Your actual Vercel URL
      : ['http://localhost:3000', 'http://localhost:5173']),
  credentials: true,
  optionsSuccessStatus: 200
};
```

Commit and push this change to trigger backend redeployment.

---

## ✅ Verify Deployment

### **1. Test Backend:**

```bash
# Health check
curl https://dcvs-backend.onrender.com/api/health

# Test login
curl -X POST https://dcvs-backend.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dcvs.com","password":"admin123"}'
```

### **2. Test Frontend:**

1. Open: `https://dcvs-frontend.vercel.app`
2. Login: `admin@dcvs.com` / `admin123`
3. Upload a certificate
4. Verify the certificate

---

## 🔐 Security Checklist

Before going live:

- [ ] Change default admin password
- [ ] Use strong JWT_SECRET (32+ characters)
- [ ] Never commit `.env` files
- [ ] Enable HTTPS only (automatic on Vercel/Render)
- [ ] Keep private keys secure
- [ ] Use environment variables for all secrets
- [ ] Enable Render's "Auto-Deploy" from main branch
- [ ] Set up custom domain (optional)
- [ ] Enable rate limiting (for production)
- [ ] Add monitoring (Render provides logs)

---

## 💰 Cost Breakdown

### **Free Tier Limits:**

**Vercel (Frontend):**
- ✅ Free forever for hobby projects
- ✅ 100GB bandwidth/month
- ✅ Unlimited sites
- ✅ Automatic SSL

**Render (Backend):**
- ✅ Free tier available
- ⚠️ Spins down after 15 min inactivity
- ⚠️ Cold starts take 30-60 seconds
- ✅ 750 hours/month free
- ✅ Automatic SSL

**Alchemy (RPC):**
- ✅ Free tier: 300M compute units/month
- ✅ Enough for testing/small apps

**Total Cost: $0/month** for development and small-scale use

### **Paid Upgrade (Optional):**

- Render (Starter): $7/month - No spin down
- Vercel Pro: $20/month - More bandwidth
- Alchemy Growth: $49/month - More requests

---

## 🚨 Common Issues

### **Issue 1: Backend Spins Down (Render Free)**

**Problem:** First request takes 30-60 seconds

**Solutions:**
1. Upgrade to Render Starter ($7/month)
2. Use UptimeRobot to ping every 14 minutes
3. Show loading state in frontend

### **Issue 2: CORS Errors**

**Problem:** Frontend can't connect to backend

**Solutions:**
1. Check FRONTEND_URL in Render environment
2. Update server.js corsOptions
3. Verify URLs match exactly (no trailing slash)

### **Issue 3: Environment Variables Not Working**

**Problem:** App can't read .env values

**Solutions:**
1. Add variables in Render dashboard (not .env file)
2. Restart service after adding variables
3. Check variable names match exactly (case-sensitive)

### **Issue 4: Build Fails on Vercel**

**Problem:** "Build failed" error

**Solutions:**
1. Check build command: `npm run build`
2. Verify all dependencies in package.json
3. Check build logs for specific errors
4. Make sure .env.production exists

---

## 🔄 Continuous Deployment

### **Auto-Deploy Setup:**

**Vercel:**
- Automatically deploys on every push to main
- Preview deployments for pull requests
- Instant rollbacks available

**Render:**
- Enable "Auto-Deploy" in settings
- Deploys on every push to main branch
- Manual deploy button available

### **Development Workflow:**

```bash
# Local development
git checkout -b feature/new-feature
# Make changes
git commit -m "Add new feature"
git push origin feature/new-feature

# Create pull request on GitHub
# Review and merge

# Automatic deployment triggers!
```

---

## 📊 Monitoring

### **Render Logs:**
- Dashboard → Your Service → Logs
- Real-time log streaming
- Filter by log level

### **Vercel Analytics:**
- Dashboard → Your Project → Analytics
- Page views, performance
- Error tracking

### **Blockchain Monitoring:**
- Etherscan (Sepolia): https://sepolia.etherscan.io/
- PolygonScan: https://polygonscan.com/
- Check contract transactions

---

## 🎯 Post-Deployment Checklist

- [ ] Frontend accessible at Vercel URL
- [ ] Backend accessible at Render URL
- [ ] Health check returns success
- [ ] Login works
- [ ] Certificate upload works
- [ ] Certificate verification works
- [ ] All 3 roles function correctly
- [ ] Blockchain transactions succeed
- [ ] No CORS errors
- [ ] Mobile responsive
- [ ] HTTPS enabled (automatic)
- [ ] Environment variables set
- [ ] Documentation updated with URLs

---

## 🌟 Optional Enhancements

### **1. Custom Domain:**

**Vercel:**
- Settings → Domains → Add Domain
- Update DNS records with your provider

**Render:**
- Settings → Custom Domain
- Add CNAME record

### **2. Database (Future):**

When you outgrow in-memory storage:
- Render PostgreSQL (free tier available)
- MongoDB Atlas (free tier)
- Supabase (free tier)

### **3. File Storage (Future):**

For actual certificate files:
- AWS S3
- Cloudflare R2
- IPFS (decentralized)

---

## 📞 Support

**Deployment Issues:**
- Vercel Docs: https://vercel.com/docs
- Render Docs: https://render.com/docs
- Hardhat Docs: https://hardhat.org/docs

**Community:**
- Vercel Discord
- Render Community Forum
- Stack Overflow

---

## 🎉 Congratulations!

Your DCVS project is now deployed and accessible worldwide!

**Your Production URLs:**
- Frontend: `https://dcvs-frontend.vercel.app`
- Backend: `https://dcvs-backend.onrender.com`
- Smart Contract: On Sepolia/Polygon blockchain

---

## 📝 Next Steps

1. Share your app with testers
2. Gather feedback
3. Monitor logs for errors
4. Add more features
5. Scale as needed
6. Consider upgrading to paid tiers for production

---

**Need help? Check the troubleshooting section or reach out to the community!** 🚀

