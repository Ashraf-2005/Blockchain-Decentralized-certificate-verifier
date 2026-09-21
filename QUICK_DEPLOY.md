# ⚡ Quick Deploy Guide

Deploy your DCVS project in 30 minutes!

---

## 🚀 Fast Track Deployment

### **Part 1: Get RPC & Deploy Contract (10 min)**

1. **Get Alchemy RPC:**
   - Go to: https://www.alchemy.com/
   - Sign up → Create App → Sepolia
   - Copy HTTPS URL

2. **Get Test ETH:**
   - Visit: https://sepoliafaucet.com/
   - Enter your MetaMask address
   - Get free test ETH

3. **Deploy Contract:**
```bash
cd blockchain-hardhat2

# Update .env
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_KEY
PRIVATE_KEY=your_metamask_private_key

# Deploy
npx hardhat run scripts/deploy.js --network sepolia

# Copy contract address!
```

---

### **Part 2: Deploy Backend (Render) (10 min)**

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Deploy ready"
git remote add origin https://github.com/USERNAME/dcvs-backend.git
git push -u origin main
```

2. **Deploy on Render:**
   - Go to: https://render.com/
   - New → Web Service
   - Connect repo
   - Build: `npm install`
   - Start: `npm start`

3. **Add Environment Variables:**
```
NODE_ENV=production
JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
CONTRACT_ADDRESS=<your-contract-address>
PRIVATE_KEY=<your-wallet-key>
RPC_URL=<your-alchemy-url>
ADMIN_EMAIL=admin@dcvs.com
ADMIN_PASSWORD=admin123
```

4. **Click Deploy → Copy URL**

---

### **Part 3: Deploy Frontend (Vercel) (10 min)**

1. **Push Frontend:**
```bash
cd frontend/Certificate-Verifier
git init
git add .
git commit -m "Deploy ready"
git remote add origin https://github.com/USERNAME/dcvs-frontend.git
git push -u origin main
```

2. **Deploy on Vercel:**
   - Go to: https://vercel.com/
   - Import Project → Your repo
   - Framework: Vite
   - Build: `npm run build`
   - Output: `dist`

3. **Add Environment Variables:**
```
VITE_API_URL=<your-render-url>
VITE_CONTRACT_ADDRESS=<your-contract-address>
VITE_RPC_URL=<your-alchemy-url>
```

4. **Deploy → Copy URL**

---

### **Part 4: Final Steps (2 min)**

1. **Update Backend CORS:**
   - Render → Your Service → Environment
   - Add: `FRONTEND_URL=<your-vercel-url>`
   - Save

2. **Test App:**
   - Open: `https://your-app.vercel.app`
   - Login: admin@dcvs.com / admin123
   - Test upload & verify

---

## ✅ Done!

Your app is now live at:
- **Frontend:** https://your-app.vercel.app
- **Backend:** https://your-app.onrender.com

---

## 🆘 Quick Troubleshooting

**CORS Error?**
- Check FRONTEND_URL in Render matches Vercel URL exactly

**Can't connect to blockchain?**
- Verify RPC_URL is correct
- Check contract address
- Ensure you have test ETH

**Build fails?**
- Check all environment variables are set
- Verify node version (16+)

---

**Need detailed guide? See `DEPLOYMENT_GUIDE.md`**

