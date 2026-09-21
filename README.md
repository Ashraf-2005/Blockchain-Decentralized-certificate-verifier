# 🎓 DCVS - Decentralized Certificate Verification System

A blockchain-based certificate management system with 3-tier role hierarchy (Super Admin → Colleges → Verifiers).

---

## ⚡ Quick Start

### Prerequisites
- Node.js (v16+)
- 3 Terminal windows

### Step 1: Start Blockchain (Terminal 1)
```bash
cd blockchain-hardhat2
npx hardhat node
```
**Keep running!**

### Step 2: Deploy Contract & Start Backend (Terminal 2)
```bash
cd blockchain-hardhat2

# Deploy contract
npx hardhat run scripts/deploy.js --network localhost

# Copy contract address from output and update .env:
# CONTRACT_ADDRESS=<paste_address_here>

# Start backend
npm start
```
**Keep running!**

### Step 3: Start Frontend (Terminal 3)
```bash
cd blockchain-hardhat2/frontend/Certificate-Verifier
npm run dev
```
**Keep running!**

### Step 4: Access Application
Open: **http://localhost:3000**

---

## 🔑 Login Credentials

### Super Admin (Pre-configured)
```
Email: admin@dcvs.com
Password: admin123
```

### Test College (Sign up first)
```
Name: MIT Registrar Office
Email: registrar@mit.edu
Password: mit12345
Role: College/University
Status: Needs super admin approval
```

### Test Verifier (Sign up - auto-approved)
```
Name: Google HR Team
Email: hr@google.com
Password: google123
Role: Company/Verifier
Status: Auto-approved ✅
```

---

## 🎯 3-Tier Role System

```
Level 1: SUPER ADMIN
├─ Approve/reject college registrations
├─ Manage system
└─ Pre-configured account (admin@dcvs.com)

Level 2: COLLEGE ADMINS
├─ Sign up → Wait for approval
├─ Upload certificates
└─ Multiple colleges supported

Level 3: VERIFIERS
├─ Sign up → Auto-approved
├─ Verify certificates
└─ Companies/HR departments
```

---

## 📝 Quick Test Workflow

1. **Login as Super Admin** (admin@dcvs.com / admin123)
2. **Sign up a College** (MIT with test credentials)
3. **Approve the College** (in Super Admin dashboard)
4. **Login as College** and upload a certificate
5. **Sign up as Verifier** (Google with test credentials)
6. **Verify the certificate** (upload same file)
7. ✅ **See "Valid Certificate"**

---

## 💻 Technology Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS 3
- **Backend:** Node.js, Express 4, JWT Authentication
- **Blockchain:** Hardhat 2, Solidity 0.8.24, Ethers.js 6

---

## 📚 Complete Documentation

For detailed documentation (67+ pages):

1. **Read:** `START_HERE.md` - Quick navigation guide
2. **Main Docs:** `COMPLETE_PROJECT_GUIDE.md` - Full documentation
3. **Convert to PDF:** Use https://www.markdowntopdf.com/

---

## 🔗 Ports

- **Frontend:** http://localhost:3000
- **Backend:** http://localhost:5000
- **Blockchain:** http://localhost:8545

---

## ⚠️ Important Notes

- Keep all 3 terminals running
- Hardhat data is temporary (resets on restart)
- Use the SAME file for upload and verify
- Colleges need approval before uploading
- Verifiers are auto-approved

---

## 🐛 Troubleshooting

**Can't connect to blockchain?**
- Make sure Hardhat is running (Terminal 1)
- Check CONTRACT_ADDRESS in .env

**Certificate not found when verifying?**
- Use the EXACT same file you uploaded
- Don't restart Hardhat between upload/verify

**Can't login?**
- Super Admin: admin@dcvs.com / admin123
- Colleges: Need super admin approval first
- Verifiers: Auto-approved on signup

---

## 📞 Support

- Full docs: `COMPLETE_PROJECT_GUIDE.md`
- Quick guide: `START_HERE.md`
- Test data: All credentials listed above

---

## ✨ Key Features

✅ Blockchain-powered certificate storage  
✅ 3-tier role hierarchy  
✅ Approval workflow for colleges  
✅ Instant certificate verification  
✅ Tamper-proof records  
✅ Scalable architecture  

---

**🚀 Get Started:** Open http://localhost:3000 and login with admin@dcvs.com

---

*For complete documentation, see `COMPLETE_PROJECT_GUIDE.md`*
