# ✅ Deployment Checklist

Quick reference checklist for deploying DCVS to production.

---

## 📋 Pre-Deployment

### **1. Blockchain Setup**
- [ ] Created Alchemy/Infura account
- [ ] Got RPC URL
- [ ] Got testnet funds (Sepolia/Mumbai)
- [ ] Deployed smart contract to testnet
- [ ] Saved contract address
- [ ] Saved wallet private key securely

### **2. GitHub Setup**
- [ ] Created GitHub account
- [ ] Created repository for backend
- [ ] Created repository for frontend
- [ ] Added .gitignore files
- [ ] Committed code to both repos

### **3. Accounts Created**
- [ ] Vercel account (sign up with GitHub)
- [ ] Render account (sign up with GitHub)

---

## 🔧 Backend Deployment (Render)

### **Step 1: Environment Variables**
Prepare these values before deploying:

```
✅ NODE_ENV=production
✅ PORT=10000
✅ JWT_SECRET=<generate-random-32-chars>
✅ CONTRACT_ADDRESS=<your-deployed-contract>
✅ PRIVATE_KEY=<your-wallet-private-key>
✅ RPC_URL=<alchemy-or-infura-url>
✅ ADMIN_EMAIL=admin@dcvs.com
✅ ADMIN_PASSWORD=<strong-password>
✅ FRONTEND_URL=<vercel-url-after-frontend-deployed>
```

### **Step 2: Deploy**
- [ ] Go to Render.com
- [ ] New → Web Service
- [ ] Connect GitHub repo (backend)
- [ ] Build: `npm install`
- [ ] Start: `npm start`
- [ ] Add all environment variables
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (3-5 min)
- [ ] Copy backend URL: `https://your-app.onrender.com`

### **Step 3: Test Backend**
- [ ] Visit: `https://your-app.onrender.com/api/health`
- [ ] Should return `{"status":"ok"}`

---

## 🎨 Frontend Deployment (Vercel)

### **Step 1: Environment Variables**
Prepare these values:

```
✅ VITE_API_URL=<render-backend-url>
✅ VITE_CONTRACT_ADDRESS=<your-deployed-contract>
✅ VITE_RPC_URL=<alchemy-or-infura-url>
```

### **Step 2: Deploy**
- [ ] Go to Vercel.com
- [ ] New Project
- [ ] Import GitHub repo (frontend)
- [ ] Framework: Vite
- [ ] Build: `npm run build`
- [ ] Output: `dist`
- [ ] Add environment variables
- [ ] Click "Deploy"
- [ ] Wait for deployment (2-3 min)
- [ ] Copy frontend URL: `https://your-app.vercel.app`

### **Step 3: Update Backend CORS**
- [ ] Go back to Render
- [ ] Update `FRONTEND_URL` env variable
- [ ] Add your Vercel URL
- [ ] Save (triggers redeploy)

---

## ✅ Final Verification

### **Test Complete Flow:**

1. **Access App**
   - [ ] Open frontend URL in browser
   - [ ] No console errors
   - [ ] Page loads correctly

2. **Test Super Admin**
   - [ ] Login: admin@dcvs.com
   - [ ] Dashboard loads
   - [ ] Can see pending colleges section

3. **Test College Signup**
   - [ ] Sign up as college
   - [ ] See "pending" message
   - [ ] Can't login yet

4. **Test Approval**
   - [ ] Login as super admin
   - [ ] See pending college
   - [ ] Click approve
   - [ ] College appears in approved list

5. **Test Certificate Upload**
   - [ ] Login as approved college
   - [ ] Upload certificate
   - [ ] See success message
   - [ ] Wait for blockchain confirmation

6. **Test Verifier**
   - [ ] Sign up as verifier
   - [ ] Auto-approved
   - [ ] Upload same certificate file
   - [ ] Click verify
   - [ ] See "Valid Certificate" ✅

---

## 🔐 Security Final Check

- [ ] Changed default admin password
- [ ] JWT_SECRET is strong (32+ chars)
- [ ] Private key is secure
- [ ] No .env files committed to Git
- [ ] All secrets in environment variables
- [ ] HTTPS enabled (automatic)
- [ ] CORS configured correctly

---

## 📊 Monitoring Setup

- [ ] Render dashboard bookmarked
- [ ] Vercel dashboard bookmarked
- [ ] Etherscan/Polygonscan for contract
- [ ] Log monitoring enabled

---

## 🎯 Optional (Post-Launch)

- [ ] Set up custom domain
- [ ] Enable analytics
- [ ] Set up UptimeRobot (keep Render awake)
- [ ] Add error tracking (Sentry)
- [ ] Enable rate limiting
- [ ] Set up database (when needed)
- [ ] Add email notifications
- [ ] Mobile app (future)

---

## 🚨 Troubleshooting

### **Backend Issues:**
- [ ] Check Render logs
- [ ] Verify environment variables
- [ ] Test health endpoint
- [ ] Check blockchain connection

### **Frontend Issues:**
- [ ] Check Vercel logs
- [ ] Open browser console
- [ ] Verify API URL correct
- [ ] Test on different browsers

### **CORS Issues:**
- [ ] Verify FRONTEND_URL in Render
- [ ] Check server.js corsOptions
- [ ] URLs match exactly (no trailing /)

---

## 📝 Deployment Info

Record your deployment details:

```
Frontend URL: ____________________________
Backend URL: _____________________________
Contract Address: ________________________
Network: _________________________________
RPC Provider: ____________________________

Deployed Date: ___________________________
Deployed By: _____________________________
```

---

## 🎉 Success Criteria

Your deployment is successful when:

✅ Frontend loads without errors  
✅ Backend health check passes  
✅ Login works for all roles  
✅ Certificates can be uploaded  
✅ Certificates can be verified  
✅ Blockchain transactions succeed  
✅ No CORS errors  
✅ Mobile responsive  
✅ All 3 roles function correctly  

---

## 📞 Quick Commands

### **Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### **Test Backend:**
```bash
curl https://your-app.onrender.com/api/health
```

### **Check Logs:**
```bash
# Render: Dashboard → Service → Logs
# Vercel: Dashboard → Project → Logs
```

### **Redeploy:**
```bash
# Just push to GitHub main branch
git add .
git commit -m "Update"
git push origin main
```

---

## 🔄 Update Checklist (Future Updates)

When making changes:

- [ ] Test locally first
- [ ] Commit to feature branch
- [ ] Create pull request
- [ ] Review changes
- [ ] Merge to main
- [ ] Auto-deployment triggered
- [ ] Verify deployment successful
- [ ] Test production app
- [ ] Monitor for errors

---

**Print this checklist and mark items as you complete them!** ✅

---

**Need detailed instructions? See `DEPLOYMENT_GUIDE.md`**

