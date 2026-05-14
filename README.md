# DCVS - Decentralized Certificate Verification System

A production-ready blockchain-based certificate verification system built with Solidity, Hardhat, Express.js, and React.

## 🎯 Features

- **Admin Dashboard**: Upload certificates, generate hashes, store on blockchain
- **Verifier Dashboard**: Verify certificates by ID or file upload
- **QR Code Generation**: Quick verification via QR codes
- **Role-based Authentication**: Admin and Verifier roles
- **Modern UI**: Dark theme with glassmorphism design
- **Blockchain Integration**: Immutable certificate storage

## 📁 Project Structure

```
blockchain-hardhat2/
├── contracts/              # Solidity smart contracts
│   └── CertificateRegistry.sol
├── scripts/                # Deployment scripts
│   └── deploy.js
├── routes/                 # API routes
│   ├── auth.js
│   ├── certificates.js
│   ├── admin.js
│   └── verify.js
├── utils/                  # Utility functions
│   ├── blockchain.js
│   ├── auth.js
│   └── hash.js
├── frontend/
│   └── Certificate-Verifier/
│       └── src/
│           ├── pages/
│           │   ├── admin/
│           │   └── verifier/
│           └── App.jsx
├── server.js               # Express server
├── hardhat.config.js       # Hardhat configuration
└── .env.example            # Environment variables template
```

## 🚀 Quick Start

### Prerequisites

- Node.js v18+
- npm or yarn

### 1. Install Dependencies

```bash
# Backend dependencies
cd blockchain-hardhat2
npm install

# Frontend dependencies
cd frontend/Certificate-Verifier
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 3. Start Local Blockchain

```bash
npx hardhat node
```

### 4. Deploy Smart Contract

In a new terminal:

```bash
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address to your `.env` file.

### 5. Start Backend Server

```bash
npm run dev
```

### 6. Start Frontend

```bash
cd frontend/Certificate-Verifier
npm run dev
```

## 🔐 Demo Credentials

- **Admin**: admin@dcvs.com / admin123

## 📡 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `GET /api/auth/me` - Get current user

### Certificates (Admin)
- `POST /api/certificates/upload` - Upload new certificate
- `GET /api/certificates/all` - Get all certificates
- `GET /api/certificates/:id` - Get certificate by ID

### Verification
- `POST /api/verify/by-id` - Verify by certificate ID
- `POST /api/verify/by-file` - Verify by file upload

### Admin
- `GET /api/admin/stats` - Dashboard statistics

## 🔧 Smart Contract Functions

- `issueCertificate()` - Issue new certificate
- `revokeCertificate()` - Revoke certificate
- `verifyCertificate()` - Verify certificate
- `addIssuer()` - Add authorized issuer
- `removeIssuer()` - Remove issuer

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React + Vite + TailwindCSS |
| Backend | Node.js + Express |
| Blockchain | Solidity + Hardhat |
| Integration | Ethers.js |
| Auth | JWT |
| UI Icons | Lucide React |
| QR Codes | qrcode.react |

## 📝 License

MIT License

Running Procdre:

# 1. Start local blockchain (Terminal 1)
cd blockchain-hardhat2
npx hardhat node

# 2. Deploy contract (Terminal 2)
npx hardhat run scripts/deploy.js --network localhost
# Copy the address to .env

# 3. Start backend (Terminal 2)
npm run dev

# 4. Start frontend (Terminal 3)
cd frontend/Certificate-Verifier
npm run dev

