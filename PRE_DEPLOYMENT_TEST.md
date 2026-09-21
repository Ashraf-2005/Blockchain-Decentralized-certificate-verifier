# ✅ Pre-Deployment Testing Checklist

Test everything locally before deploying to production.

---

## 🧪 Local Testing Before Deploy

### **1. Environment Setup**

- [ ] All dependencies installed (`npm install` in both backend and frontend)
- [ ] `.env` files configured correctly
- [ ] Contract deployed to testnet (Sepolia/Mumbai)
- [ ] Test funds available in wallet

---

### **2. Backend Tests**

```bash
cd blockchain-hardhat2
npm start
```

**Test endpoints:**

```bash
# Health check
curl http://localhost:5000/api/health

# Should return:
# {"status":"ok","blockchain":"ready","timestamp":"..."}

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dcvs.com","password":"admin123"}'

# Should return token and user object
```

**Checklist:**
- [ ] Server starts without errors
- [ ] Health endpoint returns OK
- [ ] Login works
- [ ] Blockchain connection established
- [ ] No console errors

---

### **3. Frontend Tests**

```bash
cd frontend/Certificate-Verifier
npm run dev
```

**Open:** http://localhost:3000

**Test Flow:**

1. **Super Admin:**
   - [ ] Login: admin@dcvs.com / admin123
   - [ ] Dashboard loads
   - [ ] Pending colleges section visible
   - [ ] No console errors

2. **College Signup:**
   - [ ] Logout
   - [ ] Sign up as college
   - [ ] See "pending" message
   - [ ] Cannot login yet

3. **College Approval:**
   - [ ] Login as super admin
   - [ ] See pending college
   - [ ] Click approve
   - [ ] College moves to approved list

4. **Certificate Upload:**
   - [ ] Login as approved college
   - [ ] Upload certificate (use test PDF)
   - [ ] See success message
   - [ ] Wait for blockchain confirmation
   - [ ] No errors in console

5. **Verifier:**
   - [ ] Logout
   - [ ] Sign up as verifier
   - [ ] Auto-approved
   - [ ] Upload SAME certificate file
   - [ ] Click verify
   - [ ] See "Valid Certificate" ✅
   - [ ] All details shown correctly

6. **Mobile Test:**
   - [ ] Open on mobile browser
   - [ ] Interface responsive
   - [ ] All features work

---

### **4. Build Test (Important!)**

Test if production build works:

**Backend:**
```bash
cd blockchain-hardhat2
NODE_ENV=production npm start
```

- [ ] Starts without errors
- [ ] Connects to testnet blockchain
- [ ] Health check works

**Frontend:**
```bash
cd frontend/Certificate-Verifier
npm run build
npm run preview
```

- [ ] Build completes without errors
- [ ] Preview works (http://localhost:4173)
- [ ] All pages load
- [ ] Login works
- [ ] No console errors

---

### **5. Network Test**

Test with testnet blockchain:

**Update .env to use testnet:**
```env
RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
CONTRACT_ADDRESS=<your_sepolia_contract_address>
PRIVATE_KEY=<your_wallet_private_key>
```

**Test:**
- [ ] Backend connects to testnet
- [ ] Can upload certificate to testnet
- [ ] Can verify certificate from testnet
- [ ] Transaction appears on Etherscan
- [ ] Gas fees reasonable

**Check on Etherscan:**
- Visit: https://sepolia.etherscan.io/
- Search your contract address
- [ ] Contract verified
- [ ] Transactions visible

---

### **6. Security Check**

- [ ] No `.env` files in git
- [ ] Private keys not committed
- [ ] `.gitignore` includes sensitive files
- [ ] Strong JWT_SECRET generated
- [ ] Admin password changed from default
- [ ] CORS configured correctly
- [ ] No sensitive data in console logs

---

### **7. Performance Check**

**Frontend:**
- [ ] Page loads in < 3 seconds
- [ ] Images optimized
- [ ] No unnecessary re-renders
- [ ] Build size reasonable (< 1MB)

**Backend:**
- [ ] API responses < 1 second
- [ ] Blockchain queries optimized
- [ ] No memory leaks

---

### **8. Error Handling**

Test error scenarios:

**Backend:**
- [ ] Invalid login credentials → proper error
- [ ] Missing required fields → proper error
- [ ] Unauthorized access → 403 error
- [ ] Blockchain connection fails → graceful error

**Frontend:**
- [ ] No internet → shows error message
- [ ] API down → shows error, doesn't crash
- [ ] Invalid file upload → shows error
- [ ] Blockchain transaction fails → shows error

---

### **9. Browser Compatibility**

Test on multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if Mac available)
- [ ] Mobile Chrome
- [ ] Mobile Safari

---

### **10. Final Checklist**

**Code Quality:**
- [ ] No console.log() in production code
- [ ] No commented-out code
- [ ] No TODO comments unresolved
- [ ] Code formatted consistently
- [ ] No unused imports/variables

**Documentation:**
- [ ] README.md updated
- [ ] Deployment guides reviewed
- [ ] API endpoints documented
- [ ] Environment variables documented

**Git:**
- [ ] All changes committed
- [ ] Meaningful commit messages
- [ ] No merge conflicts
- [ ] Repository clean

---

## 🎯 Test Data

Use this for testing:

**Super Admin:**
```
Email: admin@dcvs.com
Password: admin123
```

**Test College:**
```
Name: Test University
Email: test@university.edu
Password: test12345
Role: College/University
```

**Test Verifier:**
```
Name: Test Company HR
Email: hr@testcompany.com
Password: test12345
Role: Company/Verifier
```

**Test Certificate:**
```
Student: John Test
Course: Test Degree Program
File: Any PDF (use same file for upload and verify)
```

---

## 🚨 Common Issues to Check

### **Issue 1: Blockchain Connection**
```bash
# Test connection
curl http://localhost:5000/api/health
# Should show "blockchain":"ready"
```

### **Issue 2: CORS in Production**
```javascript
// server.js should have:
const corsOptions = {
  origin: process.env.FRONTEND_URL || ...
```

### **Issue 3: Environment Variables**
```bash
# Make sure all required vars are set
echo $CONTRACT_ADDRESS
echo $RPC_URL
echo $PRIVATE_KEY
```

### **Issue 4: Build Errors**
```bash
# Frontend build should succeed
npm run build
# Check dist/ folder is created
```

---

## ✅ Ready to Deploy?

If all items are checked ✅ above, you're ready!

**Next Steps:**
1. Open `QUICK_DEPLOY.md`
2. Follow deployment instructions
3. Deploy to Vercel + Render
4. Test production deployment
5. Share with users! 🎉

---

## 📝 Test Results Template

```
PRE-DEPLOYMENT TEST RESULTS
Date: _____________
Tester: ___________

Backend Tests:        ✅ / ❌
Frontend Tests:       ✅ / ❌
Build Tests:          ✅ / ❌
Network Tests:        ✅ / ❌
Security Check:       ✅ / ❌
Performance Check:    ✅ / ❌
Error Handling:       ✅ / ❌
Browser Compat:       ✅ / ❌

Notes:
_____________________
_____________________
_____________________

Ready to Deploy: YES / NO
```

---

**After all tests pass, proceed to QUICK_DEPLOY.md** 🚀

