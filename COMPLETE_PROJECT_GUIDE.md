# 📚 DCVS - Complete Project Documentation

## Decentralized Certificate Verification System

**A Blockchain-based certificate management system with 3-tier role hierarchy**

---

# 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Technology Stack](#technology-stack)
4. [3-Tier Role System](#3-tier-role-system)
5. [Installation & Setup](#installation--setup)
6. [How to Run the Project](#how-to-run-the-project)
7. [Complete User Guide](#complete-user-guide)
8. [API Documentation](#api-documentation)
9. [Smart Contract Details](#smart-contract-details)
10. [Frontend Components](#frontend-components)
11. [Testing Guide](#testing-guide)
12. [Troubleshooting](#troubleshooting)
13. [Security Considerations](#security-considerations)
14. [Future Enhancements](#future-enhancements)

---

# 🎯 Project Overview

## What is DCVS?

DCVS (Decentralized Certificate Verification System) is a blockchain-based platform that allows educational institutions to issue tamper-proof certificates and enables companies/verifiers to instantly verify their authenticity.

## Key Features

✅ **Blockchain-Powered** - All certificates stored on Ethereum blockchain  
✅ **3-Tier Role System** - Super Admin → College Admins → Verifiers  
✅ **Tamper-Proof** - Certificates cannot be altered once issued  
✅ **Instant Verification** - Real-time certificate authentication  
✅ **Approval Workflow** - Colleges must be approved by super admin  
✅ **File Hash Verification** - Uses SHA-256 hashing for file integrity  
✅ **Scalable Architecture** - Supports multiple colleges and verifiers  

## Problem Statement

Traditional certificate verification is:
- **Time-consuming** - Requires manual verification from institutions
- **Prone to fraud** - Easy to forge paper certificates
- **Inefficient** - Multiple back-and-forth communications
- **Costly** - Requires staff and resources for verification

## Solution

DCVS provides:
- **Instant Verification** - Upload file → Get result in seconds
- **Immutable Records** - Blockchain ensures certificates cannot be tampered
- **Decentralized Trust** - No single point of failure
- **Easy Integration** - Simple API for companies to integrate

---

# 🏗️ System Architecture

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (React + Vite)                  │
│                    http://localhost:3000                    │
└───────────────────┬─────────────────────────────────────────┘
                    │ REST API Calls
                    ↓
┌─────────────────────────────────────────────────────────────┐
│                BACKEND (Node.js + Express)                  │
│                  http://localhost:5000                      │
│  ┌──────────────┬──────────────┬──────────────────────┐   │
│  │ Auth Routes  │ Certificate  │ Super Admin Routes   │   │
│  │              │ Routes       │                      │   │
│  └──────────────┴──────────────┴──────────────────────┘   │
└───────────────────┬─────────────────────────────────────────┘
                    │ Web3/Ethers.js
                    ↓
┌─────────────────────────────────────────────────────────────┐
│          BLOCKCHAIN (Hardhat Local Network)                 │
│                http://localhost:8545                        │
│  ┌───────────────────────────────────────────────────┐    │
│  │    Smart Contract: CertificateRegistry.sol        │    │
│  │    - Issue Certificate                            │    │
│  │    - Verify Certificate                           │    │
│  │    - Revoke Certificate                           │    │
│  └───────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
```

## Component Breakdown

### **1. Frontend (React + Vite + Tailwind CSS)**
- **Technology**: React 18.2.0, Vite 5.0.8, Tailwind CSS 3.3.6
- **Port**: 3000
- **Features**:
  - Modern, responsive UI
  - Role-based dashboards
  - Real-time feedback with toast notifications
  - File upload with drag-and-drop
  - Certificate verification interface

### **2. Backend (Node.js + Express)**
- **Technology**: Node.js, Express 4.18.2, JWT authentication
- **Port**: 5000
- **Features**:
  - RESTful API endpoints
  - JWT-based authentication
  - Role-based access control
  - Blockchain interaction via Ethers.js
  - File hashing (SHA-256)

### **3. Blockchain (Hardhat + Solidity)**
- **Technology**: Hardhat 2.22.3, Solidity 0.8.24, Ethers.js 6.10.0
- **Port**: 8545
- **Features**:
  - Smart contract deployment
  - Certificate storage on-chain
  - Immutable record keeping
  - Event logging

---

# 💻 Technology Stack

## Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | UI library |
| **Vite** | 5.0.8 | Build tool & dev server |
| **Tailwind CSS** | 3.3.6 | Styling framework |
| **React Router** | 6.20.0 | Client-side routing |
| **Axios** | 1.6.2 | HTTP client |
| **Ethers.js** | 6.16.0 | Blockchain interaction |
| **Lucide React** | 0.294.0 | Icon library |

## Backend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | Latest | Runtime environment |
| **Express** | 4.18.2 | Web framework |
| **Ethers.js** | 6.10.0 | Blockchain library |
| **JWT** | 9.0.2 | Authentication tokens |
| **Bcrypt.js** | 2.4.3 | Password hashing |
| **Multer** | 1.4.5 | File upload handling |
| **CORS** | 2.8.5 | Cross-origin support |
| **Dotenv** | 16.3.1 | Environment variables |

## Blockchain Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| **Hardhat** | 2.22.3 | Development environment |
| **Solidity** | 0.8.24 | Smart contract language |
| **Ethers.js** | 6.10.0 | Ethereum library |
| **Hardhat Toolbox** | 5.0.0 | Testing & deployment tools |

---

# 🎭 3-Tier Role System

## Role Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│                  Level 1: SUPER ADMIN                       │
│              (Education Government Authority)               │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • Approve/Reject college registrations              │   │
│  │ • View all system statistics                        │   │
│  │ • Manage system-wide settings                       │   │
│  │ • Upload certificates (optional)                    │   │
│  │ • Pre-configured account                            │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────────┐
│             Level 2: COLLEGE ADMINS                         │
│         (Universities & Educational Institutions)           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • Sign up → Wait for super admin approval           │   │
│  │ • Upload student certificates                       │   │
│  │ • View certificates issued by their college         │   │
│  │ • Cannot approve other colleges                     │   │
│  │ • Multiple colleges supported                       │   │
│  └─────────────────────────────────────────────────────┘   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ↓
┌─────────────────────────────────────────────────────────────┐
│                 Level 3: VERIFIERS                          │
│           (Companies, HR Departments, Industry)             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │ • Sign up → Auto-approved (instant access)          │   │
│  │ • Verify certificate authenticity                   │   │
│  │ • Upload file to check against blockchain           │   │
│  │ • View verification results                         │   │
│  │ • Cannot upload certificates                        │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

## Role Comparison Table

| Feature | Super Admin | College Admin | Verifier |
|---------|-------------|---------------|----------|
| **Account Type** | Pre-configured | Sign up + Approval | Sign up (Auto) |
| **Login Method** | LOGIN only | SIGNUP → LOGIN | SIGNUP (direct) |
| **Approve Colleges** | ✅ Yes | ❌ No | ❌ No |
| **Upload Certificates** | ✅ Yes | ✅ Yes (after approval) | ❌ No |
| **Verify Certificates** | ✅ Yes | ❌ No | ✅ Yes |
| **View System Stats** | ✅ Yes | ❌ No | ❌ No |
| **Manage Users** | ✅ Yes | ❌ No | ❌ No |
| **Dashboard URL** | /superadmin | /admin | /verifier |
| **Needs Approval** | N/A (Pre-exists) | ✅ Yes | ❌ No (Auto) |

## User Workflows

### **Super Admin Workflow**
```
1. LOGIN (admin@dcvs.com / admin123)
    ↓
2. View "Pending Colleges" tab
    ↓
3. See list of colleges awaiting approval
    ↓
4. Click "Approve" or "Reject"
    ↓
5. Approved colleges can now login and upload
```

### **College Admin Workflow**
```
1. SIGN UP (name, email, password, role: College)
    ↓
2. Message: "Registration submitted!"
    ↓
3. Status: "Pending" (cannot login yet)
    ↓
4. Wait for super admin approval
    ↓
5. After approval: LOGIN with credentials
    ↓
6. Upload certificates
```

### **Verifier Workflow**
```
1. SIGN UP (name, email, password, role: Verifier)
    ↓
2. Auto-approved! ✅
    ↓
3. Redirected to verification page
    ↓
4. Upload certificate file
    ↓
5. View verification result instantly
```

---

# 🚀 Installation & Setup

## Prerequisites

Before you begin, ensure you have:

✅ **Node.js** (v16 or higher) - [Download](https://nodejs.org/)  
✅ **npm** (comes with Node.js)  
✅ **Git** (optional) - [Download](https://git-scm.com/)  
✅ **Code Editor** (VS Code recommended) - [Download](https://code.visualstudio.com/)  
✅ **3 Terminal Windows** (or terminal tabs)  

## Step 1: Clone or Download Project

```bash
# If you have Git:
git clone <repository-url>
cd blockchain-hardhat2

# Or download ZIP and extract
```

## Step 2: Install Backend Dependencies

```bash
# Navigate to project root
cd blockchain-hardhat2

# Install dependencies
npm install
```

**Packages installed:**
- express
- cors
- dotenv
- jsonwebtoken
- bcryptjs
- multer
- ethers
- hardhat
- @nomicfoundation/hardhat-toolbox

## Step 3: Install Frontend Dependencies

```bash
# Navigate to frontend folder
cd frontend/Certificate-Verifier

# Install dependencies
npm install
```

**Packages installed:**
- react
- react-dom
- react-router-dom
- axios
- ethers
- tailwindcss
- vite
- lucide-react

## Step 4: Configure Environment Variables

### Backend .env File

Create/edit `blockchain-hardhat2/.env`:

```env
# Blockchain Configuration
HARDHAT_URL=http://127.0.0.1:8545
PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
CONTRACT_ADDRESS=<will_be_set_after_deployment>

# Server Configuration
PORT=5000

# JWT Secret
JWT_SECRET=your-secret-key-change-in-production

# Signer Address (Hardhat Account #0)
SIGNER_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
```

### Frontend .env File

Create/edit `blockchain-hardhat2/frontend/Certificate-Verifier/.env`:

```env
# Backend API URL
VITE_API_URL=http://localhost:5000
```

## Step 5: Verify Installation

Check if everything is installed correctly:

```bash
# Check Node.js version
node --version
# Should show: v16.x.x or higher

# Check npm version
npm --version
# Should show: 8.x.x or higher

# Check Hardhat installation
npx hardhat --version
# Should show: 2.22.3 or similar
```

---

# 🏃 How to Run the Project

## Complete Startup Process

You need **3 terminal windows** running simultaneously.

### Terminal 1: Start Hardhat Blockchain

```bash
# Navigate to project root
cd blockchain-hardhat2

# Start local blockchain
npx hardhat node
```

**What you'll see:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8 (10000 ETH)
...
```

**⚠️ IMPORTANT: Keep this terminal running! Do not close it.**

---

### Terminal 2: Deploy Contract & Start Backend

**Step 2.1: Deploy Smart Contract**

```bash
# In a NEW terminal, navigate to project root
cd blockchain-hardhat2

# Deploy the contract
npx hardhat run scripts/deploy.js --network localhost
```

**What you'll see:**
```
CertificateRegistry deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Step 2.2: Update .env with Contract Address**

Copy the contract address from the output above and update your `.env` file:

```env
CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
```

**Step 2.3: Start Backend Server**

```bash
# In the same terminal (Terminal 2)
npm start
```

**What you'll see:**
```
🚀 Server running on port 5000
✅ Blockchain initialized successfully
📍 Blockchain status: ✅ Ready
```

**⚠️ IMPORTANT: Keep this terminal running!**

---

### Terminal 3: Start Frontend

```bash
# In a NEW terminal, navigate to frontend
cd blockchain-hardhat2/frontend/Certificate-Verifier

# Start development server
npm run dev
```

**What you'll see:**
```
  VITE v5.0.8  ready in 523 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

**⚠️ IMPORTANT: Keep this terminal running!**

---

## Quick Start Summary

```bash
# Terminal 1 - Blockchain
cd blockchain-hardhat2
npx hardhat node

# Terminal 2 - Deploy & Backend
cd blockchain-hardhat2
npx hardhat run scripts/deploy.js --network localhost
# Copy contract address → Update .env
npm start

# Terminal 3 - Frontend
cd blockchain-hardhat2/frontend/Certificate-Verifier
npm run dev
```

## Access the Application

Once all 3 terminals are running:

🌐 **Open your browser:** http://localhost:3000

---

# 📖 Complete User Guide

## Super Admin Guide

### Login as Super Admin

**Credentials:**
- Email: `admin@dcvs.com`
- Password: `admin123`

**Steps:**
1. Go to http://localhost:3000
2. Enter email and password
3. Click "Sign In"
4. ✅ Redirected to Super Admin Dashboard

### Approve College Registrations

**Steps:**
1. Login as super admin
2. Click "Pending Colleges" tab
3. View list of colleges waiting for approval
4. For each college:
   - Review college name and email
   - Click "Approve" to allow access
   - Click "Reject" to deny access
5. Approved colleges can now login

### View System Statistics

**Dashboard shows:**
- Total pending colleges
- Total approved colleges
- Total verifiers registered
- Recent activity

### Upload Certificates (Optional)

Super admin can also upload certificates:
1. Click "Upload Certificate" tab
2. Fill in:
   - Student Name
   - Course Name
   - Select certificate file (PDF/image)
3. Click "Upload & Register"
4. ✅ Certificate stored on blockchain

---

## College Admin Guide

### Sign Up as College

**Steps:**
1. Go to http://localhost:3000
2. Click "Don't have an account? Sign Up"
3. Fill in the form:
   - **Full Name**: MIT Registrar Office
   - **Email**: registrar@mit.edu
   - **Password**: mit12345
   - **Role**: Select "College/University" (IMPORTANT!)
4. Click "Sign Up"
5. Message: "College registration submitted!"
6. ⚠️ You cannot login yet - wait for super admin approval

### After Approval - Login

**Steps:**
1. Wait for super admin to approve your college
2. Go to http://localhost:3000
3. Click "Already have an account? Sign In"
4. Enter your email and password
5. Click "Sign In"
6. ✅ Redirected to College Dashboard

### Upload Student Certificate

**Steps:**
1. Login as college admin
2. Click "Upload Certificate" (or navigate to upload page)
3. Fill in the certificate details:
   - **Student Name**: John Smith
   - **Course**: Bachelor of Science in Computer Science
   - **Certificate File**: Select PDF or image file
4. Click "Upload & Register"
5. System will:
   - Calculate file hash (SHA-256)
   - Store certificate on blockchain
   - Show success message
6. ✅ Certificate uploaded and blockchain-verified

### View Your Certificates

**Steps:**
1. Login as college admin
2. Click "Certificate List" tab
3. View all certificates uploaded by your college
4. Each certificate shows:
   - Student name
   - Course name
   - Issue date
   - Blockchain transaction hash
   - Status (Valid/Revoked)

---

## Verifier Guide

### Sign Up as Verifier

**Steps:**
1. Go to http://localhost:3000
2. Click "Don't have an account? Sign Up"
3. Fill in the form:
   - **Full Name**: Google HR Team
   - **Email**: hr@google.com
   - **Password**: google123
   - **Role**: Select "Company/Verifier" (IMPORTANT!)
4. Click "Sign Up"
5. ✅ Auto-approved! Redirected to verify page immediately

### Verify a Certificate

**Steps:**
1. Login as verifier (or after signup)
2. You'll see the "Verify Certificate" page
3. Click "Select File" or drag & drop certificate file
4. Select the SAME file that was uploaded by the college
5. Click "Verify File"
6. System will:
   - Calculate file hash
   - Check blockchain for matching hash
   - Display verification result

### Understanding Verification Results

**✅ Valid Certificate:**
```
✅ Valid Certificate

Student: John Smith
Course: Bachelor of Science in Computer Science
Issued By: MIT Registrar Office
Issue Date: September 21, 2026
Certificate ID: CERT-2026-001
Status: Valid
```

**❌ Invalid Certificate:**
```
❌ Invalid Certificate

This certificate was not found on the blockchain 
or has been revoked.

Possible reasons:
- Certificate file has been modified
- Certificate was never issued
- Certificate has been revoked
```

---

# 🔌 API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## API Endpoints

### **Authentication Endpoints**

#### 1. Register (Sign Up)

```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "MIT Registrar Office",
  "email": "registrar@mit.edu",
  "password": "mit12345",
  "role": "college"  // or "verifier"
}
```

**Response (College - Pending):**
```json
{
  "status": "pending",
  "message": "College registration submitted"
}
```

**Response (Verifier - Auto-approved):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "2",
    "email": "hr@google.com",
    "name": "Google HR Team",
    "role": "verifier",
    "status": "approved"
  }
}
```

#### 2. Login

```http
POST /api/auth/login
```

**Request Body:**
```json
{
  "email": "admin@dcvs.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "email": "admin@dcvs.com",
    "name": "Super Admin",
    "role": "superadmin",
    "status": "approved"
  }
}
```

---

### **Super Admin Endpoints**

#### 1. Get Pending Colleges

```http
GET /api/superadmin/pending-colleges
```

**Headers:**
```
Authorization: Bearer <super_admin_token>
```

**Response:**
```json
{
  "pendingColleges": [
    {
      "email": "registrar@mit.edu",
      "name": "MIT Registrar Office",
      "registeredAt": "2026-09-21T10:30:00.000Z"
    }
  ]
}
```

#### 2. Approve College

```http
POST /api/superadmin/approve-college/:email
```

**Headers:**
```
Authorization: Bearer <super_admin_token>
```

**Response:**
```json
{
  "message": "College approved successfully",
  "college": {
    "email": "registrar@mit.edu",
    "name": "MIT Registrar Office",
    "role": "college",
    "status": "approved"
  }
}
```

#### 3. Reject College

```http
POST /api/superadmin/reject-college/:email
```

**Headers:**
```
Authorization: Bearer <super_admin_token>
```

**Response:**
```json
{
  "message": "College rejected successfully"
}
```

#### 4. Get System Statistics

```http
GET /api/superadmin/stats
```

**Headers:**
```
Authorization: Bearer <super_admin_token>
```

**Response:**
```json
{
  "pendingColleges": 2,
  "approvedColleges": 5,
  "totalVerifiers": 8,
  "totalCertificates": 150
}
```

---

### **Certificate Endpoints**

#### 1. Upload Certificate

```http
POST /api/certificates/upload
```

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
studentName: John Smith
course: Bachelor of Science in Computer Science
certificateFile: <file>
```

**Response:**
```json
{
  "message": "Certificate registered successfully",
  "certificate": {
    "certHash": "0x1234567890abcdef...",
    "certificateId": "CERT-2026-001",
    "studentName": "John Smith",
    "course": "Bachelor of Science in Computer Science",
    "ipfsHash": "QmX...",
    "blockchainTx": "0xabcdef..."
  }
}
```

#### 2. Get All Certificates

```http
GET /api/certificates/all
```

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "certificates": [
    {
      "certHash": "0x1234...",
      "studentName": "John Smith",
      "course": "Computer Science",
      "certificateId": "CERT-2026-001",
      "issueDate": 1726923600,
      "issuedBy": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      "isValid": true,
      "ipfsHash": "QmX..."
    }
  ]
}
```

---

### **Verification Endpoints**

#### 1. Verify Certificate by File

```http
POST /api/verify/by-file
```

**Headers:**
```
Content-Type: multipart/form-data
```

**Form Data:**
```
certificateFile: <file>
```

**Response (Valid):**
```json
{
  "valid": true,
  "certificate": {
    "studentName": "John Smith",
    "course": "Bachelor of Science in Computer Science",
    "certificateId": "CERT-2026-001",
    "issueDate": "2026-09-21T10:30:00.000Z",
    "issuedBy": "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
    "isValid": true,
    "ipfsHash": "QmX..."
  }
}
```

**Response (Invalid):**
```json
{
  "valid": false,
  "message": "Certificate not found or has been revoked"
}
```

---

# 🔒 Smart Contract Details

## CertificateRegistry.sol

### Contract Overview

**Language:** Solidity 0.8.24  
**License:** MIT  
**Purpose:** Store and verify certificate hashes on blockchain

### Contract Structure

```solidity
contract CertificateRegistry {
    address public admin;
    mapping(address => bool) public issuers;
    mapping(bytes32 => Certificate) public certificates;
    bytes32[] public certificateHashes;
}
```

### Certificate Struct

```solidity
struct Certificate {
    string studentName;
    string course;
    string certificateId;
    uint256 issueDate;
    address issuedBy;
    bool isValid;
    string ipfsHash;
}
```

### Key Functions

#### 1. Issue Certificate

```solidity
function issueCertificate(
    bytes32 certHash,
    string memory certificateId,
    string memory studentName,
    string memory course,
    string memory ipfsHash
) public onlyIssuer
```

**Purpose:** Store a new certificate on blockchain  
**Access:** Only authorized issuers (colleges)  
**Parameters:**
- `certHash`: SHA-256 hash of certificate file
- `certificateId`: Unique certificate ID
- `studentName`: Name of student
- `course`: Course name
- `ipfsHash`: IPFS hash (optional)

**Emits:** `CertificateIssued` event

#### 2. Verify Certificate

```solidity
function verifyCertificate(bytes32 certHash)
    public view
    returns (
        string memory studentName,
        string memory course,
        string memory certificateId,
        uint256 issueDate,
        address issuedBy,
        bool isValid,
        string memory ipfsHash
    )
```

**Purpose:** Retrieve certificate details from blockchain  
**Access:** Public (anyone can verify)  
**Parameters:**
- `certHash`: SHA-256 hash of certificate file

**Returns:** Complete certificate details

#### 3. Revoke Certificate

```solidity
function revokeCertificate(bytes32 certHash) 
    public onlyIssuer
```

**Purpose:** Mark certificate as invalid  
**Access:** Only issuer or admin  
**Parameters:**
- `certHash`: SHA-256 hash of certificate to revoke

**Emits:** `CertificateRevoked` event

#### 4. Add Issuer

```solidity
function addIssuer(address _issuer) 
    public onlyAdmin
```

**Purpose:** Authorize a new address to issue certificates  
**Access:** Only admin  
**Parameters:**
- `_issuer`: Address to authorize

**Emits:** `IssuerAdded` event

### Events

```solidity
event CertificateIssued(
    bytes32 indexed certHash,
    string certificateId,
    string studentName,
    string course,
    uint256 issueDate,
    address indexed issuedBy
);

event CertificateRevoked(
    bytes32 indexed certHash,
    uint256 revokedAt
);

event IssuerAdded(address indexed issuer);
event IssuerRemoved(address indexed issuer);
```

### Security Features

✅ **Access Control** - Only authorized issuers can upload  
✅ **Duplicate Prevention** - Same hash cannot be registered twice  
✅ **Revocation Support** - Certificates can be invalidated  
✅ **Event Logging** - All actions are logged on-chain  
✅ **Immutable Storage** - Data cannot be altered once written  

---

# 🎨 Frontend Components

## Component Structure

```
src/
├── pages/
│   ├── Login.jsx                    # Login & Signup page
│   ├── admin/
│   │   ├── Dashboard.jsx            # College admin dashboard
│   │   ├── UploadCertificate.jsx    # Upload certificate form
│   │   └── CertificateList.jsx      # List of certificates
│   ├── superadmin/
│   │   ├── Dashboard.jsx            # Super admin dashboard
│   │   └── PendingColleges.jsx      # College approval page
│   └── verifier/
│       ├── Dashboard.jsx            # Verifier dashboard
│       └── VerifyCertificate.jsx    # Certificate verification
├── components/
│   └── Toast.jsx                    # Toast notification component
├── services/
│   └── contractService.js           # Blockchain interaction
├── utils/
│   └── hashFile.js                  # File hashing utility
├── App.jsx                          # Main app with routing
└── main.jsx                         # Entry point
```

## Key Components

### 1. Login.jsx

**Purpose:** Handles both login and signup  
**Features:**
- Toggle between login/signup modes
- Role selection (College/Verifier)
- Form validation
- JWT token storage
- Redirect based on role

### 2. Super Admin Dashboard

**Purpose:** Manage college approvals  
**Features:**
- View pending colleges
- Approve/reject colleges
- System statistics
- View approved colleges

### 3. Upload Certificate

**Purpose:** Upload student certificates  
**Features:**
- File upload with validation
- Form inputs (name, course)
- Blockchain transaction
- Success/error feedback

### 4. Verify Certificate

**Purpose:** Verify certificate authenticity  
**Features:**
- File upload
- Hash calculation
- Blockchain verification
- Result display

### 5. contractService.js

**Purpose:** Handle blockchain interactions  
**Key Functions:**

```javascript
// Initialize blockchain connection
export const initializeBlockchain = async () => {
  const provider = new ethers.JsonRpcProvider(HARDHAT_URL);
  const signer = new ethers.Wallet(PRIVATE_KEY, provider);
  const contract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CertificateRegistryABI,
    signer
  );
  return { provider, signer, contract };
};

// Issue certificate on blockchain
export const issueCertificate = async (
  certHash, 
  certificateId, 
  studentName, 
  course, 
  ipfsHash
) => {
  const { contract } = await initializeBlockchain();
  const tx = await contract.issueCertificate(
    certHash,
    certificateId,
    studentName,
    course,
    ipfsHash
  );
  await tx.wait();
  return tx;
};

// Verify certificate
export const verifyCertificate = async (certHash) => {
  const { contract } = await initializeBlockchain();
  const result = await contract.verifyCertificate(certHash);
  return result;
};
```

### 6. hashFile.js

**Purpose:** Calculate SHA-256 hash of files  
**Implementation:**

```javascript
export async function hashFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = async (event) => {
      try {
        const arrayBuffer = event.target.result;
        const hashBuffer = await crypto.subtle.digest(
          'SHA-256', 
          arrayBuffer
        );
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = '0x' + hashArray
          .map(b => b.toString(16).padStart(2, '0'))
          .join('');
        resolve(hashHex);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}
```

---

# 🧪 Testing Guide

## Sample Test Data

### Super Admin (Pre-existing)
```
Email: admin@dcvs.com
Password: admin123
Role: superadmin (hardcoded)
```

### Sample Colleges (Sign Up)

**College 1: MIT**
```
Name: MIT Registrar Office
Email: registrar@mit.edu
Password: mit12345
Role: College/University
Status: Needs approval
```

**College 2: Stanford**
```
Name: Stanford Admin Office
Email: admin@stanford.edu
Password: stanford123
Role: College/University
Status: Needs approval
```

**College 3: Harvard**
```
Name: Harvard Registrar
Email: registrar@harvard.edu
Password: harvard456
Role: College/University
Status: Needs approval
```

### Sample Verifiers (Sign Up)

**Verifier 1: Google**
```
Name: Google HR Team
Email: hr@google.com
Password: google123
Role: Company/Verifier
Status: Auto-approved
```

**Verifier 2: Microsoft**
```
Name: Microsoft Recruitment
Email: recruitment@microsoft.com
Password: microsoft456
Role: Company/Verifier
Status: Auto-approved
```

### Sample Certificate Data

**Certificate 1:**
```
Student Name: John Smith
Course: Bachelor of Science in Computer Science
File: Any PDF or image file
```

**Certificate 2:**
```
Student Name: Sarah Johnson
Course: Master of Engineering
File: Any PDF or image file
```

## Complete Test Workflow (10 Minutes)

### **Phase 1: Super Admin (2 minutes)**

**Step 1.1: Login**
1. Go to http://localhost:3000
2. Email: admin@dcvs.com
3. Password: admin123
4. Click "Sign In"
5. ✅ See Super Admin Dashboard

**Step 1.2: Check Pending Colleges**
1. Click "Pending Colleges" tab
2. Currently: 0 pending (none signed up yet)

---

### **Phase 2: College Signup (2 minutes)**

**Step 2.1: Sign Up MIT**
1. Logout (top right)
2. Click "Don't have an account? Sign Up"
3. Fill form:
   - Name: MIT Registrar Office
   - Email: registrar@mit.edu
   - Password: mit12345
   - Role: ○ College/University
4. Click "Sign Up"
5. ✅ See: "Registration submitted!"

**Step 2.2: Sign Up Stanford**
1. Repeat with Stanford data
2. ✅ See: "Registration submitted!"

---

### **Phase 3: Approve Colleges (2 minutes)**

**Step 3.1: Login as Super Admin**
1. Switch to "Sign In" mode
2. Email: admin@dcvs.com
3. Password: admin123
4. Click "Sign In"

**Step 3.2: Approve Colleges**
1. Click "Pending Colleges" tab
2. See: MIT and Stanford in the list
3. Click "Approve" for MIT
4. Click "Approve" for Stanford
5. ✅ Both moved to "Approved Colleges"

---

### **Phase 4: Upload Certificate (2 minutes)**

**Step 4.1: Login as MIT**
1. Logout
2. Sign In:
   - Email: registrar@mit.edu
   - Password: mit12345
3. ✅ Redirected to College Dashboard

**Step 4.2: Upload**
1. Click "Upload Certificate"
2. Fill form:
   - Student Name: John Smith
   - Course: Bachelor of Science in Computer Science
   - File: Select any PDF or image
3. Click "Upload & Register"
4. Wait 3-5 seconds
5. ✅ See: "Certificate Registered!"

**Important:** Remember which file you uploaded!

---

### **Phase 5: Verify Certificate (2 minutes)**

**Step 5.1: Sign Up as Verifier**
1. Logout
2. Click "Don't have an account? Sign Up"
3. Fill form:
   - Name: Google HR Team
   - Email: hr@google.com
   - Password: google123
   - Role: ○ Company/Verifier
4. Click "Sign Up"
5. ✅ Auto-approved! Redirected to verify page

**Step 5.2: Verify**
1. Click "Select File" or drag & drop
2. Select the SAME file you uploaded in Step 4.2
3. Click "Verify File"
4. Wait 2-3 seconds
5. ✅ See: "Valid Certificate" with details:
   - Student: John Smith
   - Course: Bachelor of Science in Computer Science
   - Issued by: MIT Registrar Office
   - Issue Date: Today
   - Status: Valid

---

## Test Results

If you see all ✅ checkmarks above, your system is working perfectly!

---

# ⚠️ Troubleshooting

## Common Issues & Solutions

### Issue 1: "Cannot connect to blockchain"

**Symptoms:**
- Backend shows: "Blockchain initialization failed"
- Uploads fail with network errors

**Solutions:**
1. Check if Hardhat is running in Terminal 1
2. Restart Hardhat:
   ```bash
   # Terminal 1
   Ctrl+C (to stop)
   npx hardhat node
   ```
3. Redeploy contract (Terminal 2)
4. Restart backend (Terminal 2)

---

### Issue 2: "Contract address not found"

**Symptoms:**
- Backend error: "CONTRACT_ADDRESS is not defined"
- Uploads fail immediately

**Solutions:**
1. Deploy contract:
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```
2. Copy contract address from output
3. Update `.env` file:
   ```env
   CONTRACT_ADDRESS=0x5FbDB2315678afecb367f032d93F642f64180aa3
   ```
4. Restart backend

---

### Issue 3: "Certificate not found when verifying"

**Symptoms:**
- Verification shows: "Invalid Certificate"
- But you just uploaded it

**Solutions:**
1. Make sure you're using the EXACT SAME file
2. Don't edit or rename the file after upload
3. Check if Hardhat restarted (data lost)
4. Try uploading again

---

### Issue 4: "Cannot login as college after approval"

**Symptoms:**
- College approved by super admin
- But login fails with "Invalid credentials"

**Solutions:**
1. Make sure you're using correct email/password
2. Check if approval was successful (login as super admin)
3. Try clearing browser cache
4. Check backend logs for errors

---

### Issue 5: "Port already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Option 1: Kill the process**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

**Option 2: Use different port**
```bash
# Frontend
npm run dev -- --port 3001

# Backend (.env)
PORT=5001
```

---

### Issue 6: "Signer address mismatch"

**Symptoms:**
- Blockchain transactions fail
- Error: "Insufficient funds" or "Invalid signer"

**Solutions:**
1. Check `.env` private key:
   ```env
   PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
   ```
2. This should match Hardhat Account #0
3. Check signer address:
   ```env
   SIGNER_ADDRESS=0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
   ```
4. Restart backend after changes

---

### Issue 7: "Frontend can't connect to backend"

**Symptoms:**
- Login fails
- Network errors in browser console
- CORS errors

**Solutions:**
1. Check backend is running (Terminal 2)
2. Check frontend .env:
   ```env
   VITE_API_URL=http://localhost:5000
   ```
3. Check backend CORS settings (should allow all origins in dev)
4. Clear browser cache
5. Restart frontend

---

### Issue 8: "Token expired or invalid"

**Symptoms:**
- Logged in but actions fail
- Error: "Invalid token"

**Solutions:**
1. Logout and login again
2. Clear localStorage:
   ```javascript
   // Browser console
   localStorage.clear()
   ```
3. Check if backend restarted (tokens invalidated)
4. Check JWT_SECRET in `.env` hasn't changed

---

## Debug Checklist

Before asking for help, verify:

- [ ] All 3 terminals are running
- [ ] Hardhat shows accounts list
- [ ] Backend shows "Blockchain status: ✅ Ready"
- [ ] Frontend shows no console errors
- [ ] `.env` files are configured correctly
- [ ] Contract is deployed (address in `.env`)
- [ ] You're using the correct credentials
- [ ] Browser is pointing to http://localhost:3000
- [ ] You're using the SAME file for upload/verify

---

# 🔐 Security Considerations

## Current Implementation (Development)

### ⚠️ Development Security Warnings

**The current implementation is for DEVELOPMENT/TESTING only.**

**Security Issues:**
1. ❌ Hardcoded admin credentials
2. ❌ In-memory user storage (no database)
3. ❌ Simple JWT secret
4. ❌ No password complexity requirements
5. ❌ No rate limiting
6. ❌ No HTTPS
7. ❌ Local blockchain (data not persistent)
8. ❌ Exposed private keys in .env

### ⚠️ Do NOT Use in Production

This system is **NOT production-ready**. Use it for:
- ✅ Learning blockchain concepts
- ✅ Prototyping
- ✅ Educational purposes
- ✅ Local testing

---

## Production Security Recommendations

### 1. Authentication & Authorization

**Implement:**
✅ Proper user database (PostgreSQL/MongoDB)  
✅ Password hashing with bcrypt (salt rounds: 12+)  
✅ Strong password requirements  
✅ Multi-factor authentication (MFA)  
✅ Account lockout after failed attempts  
✅ Email verification for signups  
✅ Password reset functionality  

### 2. API Security

**Implement:**
✅ Rate limiting (express-rate-limit)  
✅ Input validation (joi/yup)  
✅ SQL injection prevention  
✅ XSS protection  
✅ CSRF tokens  
✅ Helmet.js for security headers  
✅ HTTPS/TLS encryption  

### 3. Blockchain Security

**Implement:**
✅ Use production blockchain (Ethereum mainnet/Polygon)  
✅ Secure private key management (AWS KMS/HashiCorp Vault)  
✅ Never commit private keys to git  
✅ Use hardware wallets for admin accounts  
✅ Implement gas price limits  
✅ Add circuit breakers for critical functions  
✅ Audit smart contracts  

### 4. Data Security

**Implement:**
✅ Encrypt sensitive data at rest  
✅ Encrypt data in transit (TLS 1.3)  
✅ Secure file upload validation  
✅ Virus scanning for uploads  
✅ Database encryption  
✅ Regular backups  
✅ Audit logging  

### 5. Infrastructure Security

**Implement:**
✅ Use environment variables properly  
✅ Separate dev/staging/production environments  
✅ Firewall configuration  
✅ DDoS protection  
✅ Regular security updates  
✅ Container security (if using Docker)  
✅ Regular penetration testing  

---

## Secure Deployment Checklist

Before deploying to production:

- [ ] Remove all hardcoded credentials
- [ ] Implement real database with encryption
- [ ] Add SSL/TLS certificates
- [ ] Configure secure JWT secrets (256-bit random)
- [ ] Enable rate limiting on all endpoints
- [ ] Add input validation on all inputs
- [ ] Implement proper error handling (don't expose stack traces)
- [ ] Set up monitoring and alerting
- [ ] Conduct security audit
- [ ] Perform penetration testing
- [ ] Have incident response plan
- [ ] Set up backup and recovery
- [ ] Document all security measures
- [ ] Train users on security best practices

---

# 🚀 Future Enhancements

## Short-term Improvements (1-2 months)

### **1. User Experience**
- [ ] Email notifications for approvals
- [ ] Dashboard with charts and analytics
- [ ] Batch certificate upload (CSV)
- [ ] Certificate templates
- [ ] QR code generation for certificates
- [ ] Mobile-responsive design improvements
- [ ] Dark mode

### **2. Features**
- [ ] Certificate revocation from UI
- [ ] Search and filter certificates
- [ ] Export certificate data (PDF/Excel)
- [ ] Certificate expiry dates
- [ ] Multi-language support
- [ ] Audit trail/activity logs
- [ ] Certificate categories/tags

### **3. Technical**
- [ ] Real database (PostgreSQL/MongoDB)
- [ ] Redis for session management
- [ ] File storage (AWS S3/IPFS)
- [ ] Improved error handling
- [ ] API rate limiting
- [ ] Comprehensive logging
- [ ] Unit and integration tests

---

## Long-term Improvements (3-6 months)

### **1. Scalability**
- [ ] Deploy to production blockchain
- [ ] Load balancing for backend
- [ ] CDN for frontend
- [ ] Database replication
- [ ] Caching layer
- [ ] Microservices architecture
- [ ] Kubernetes deployment

### **2. Advanced Features**
- [ ] API access for third-party integration
- [ ] Webhook support for verifications
- [ ] Blockchain analytics dashboard
- [ ] AI-powered fraud detection
- [ ] Smart contract upgrades
- [ ] Multi-chain support
- [ ] NFT certificates

### **3. Security**
- [ ] Biometric authentication
- [ ] Zero-knowledge proofs
- [ ] Decentralized identity (DID)
- [ ] Smart contract formal verification
- [ ] Bug bounty program
- [ ] Regular security audits
- [ ] Compliance certifications (ISO 27001)

### **4. Business Features**
- [ ] Subscription plans for colleges
- [ ] Payment integration
- [ ] White-label solution
- [ ] Custom branding
- [ ] Multi-tenant architecture
- [ ] Licensing management
- [ ] Partner program

---

## Technology Upgrades

### **Blockchain**
- [ ] Migrate to Polygon/Ethereum mainnet
- [ ] Layer 2 solutions for lower gas fees
- [ ] IPFS integration for file storage
- [ ] Chainlink oracles for external data
- [ ] Cross-chain bridges

### **Backend**
- [ ] GraphQL API
- [ ] WebSocket for real-time updates
- [ ] Message queue (RabbitMQ/Kafka)
- [ ] Elasticsearch for search
- [ ] Background job processing

### **Frontend**
- [ ] Progressive Web App (PWA)
- [ ] Server-side rendering (Next.js)
- [ ] State management (Redux/Zustand)
- [ ] Component library (Storybook)
- [ ] E2E testing (Cypress/Playwright)

---

# 📞 Support & Resources

## Documentation

- **README.md** - Quick start guide
- **HOW_TO_RUN.md** - Detailed setup instructions
- **3-TIER-SYSTEM-GUIDE.md** - Role system explanation
- **SAMPLE_TEST_DATA.md** - Test credentials and data
- **QUICK_TEST_GUIDE.md** - 5-minute test workflow

## Online Resources

### Blockchain & Solidity
- [Hardhat Documentation](https://hardhat.org/docs)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)

### Frontend
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)

### Backend
- [Express.js Guide](https://expressjs.com/)
- [JWT Introduction](https://jwt.io/introduction)
- [Node.js Documentation](https://nodejs.org/docs)

---

# 📄 License

This project is for educational and development purposes.

---

# 🎉 Conclusion

You now have a complete, working blockchain-based certificate verification system with:

✅ 3-tier role hierarchy (Super Admin → Colleges → Verifiers)  
✅ Approval workflow for colleges  
✅ Blockchain-powered certificate storage  
✅ Instant verification system  
✅ Modern, responsive UI  
✅ RESTful API backend  
✅ Comprehensive documentation  

## Next Steps

1. **Test thoroughly** - Use the sample data provided
2. **Customize** - Modify for your specific use case
3. **Learn** - Understand blockchain and smart contracts
4. **Improve** - Add features from the enhancement list
5. **Deploy** - Follow security checklist before production

---

## Project Statistics

- **Total Lines of Code**: ~3,500+
- **Smart Contracts**: 1 (CertificateRegistry.sol)
- **API Endpoints**: 12+
- **React Components**: 10+
- **Technologies Used**: 15+
- **Development Time**: Extensive
- **Documentation Pages**: This comprehensive guide!

---

# 🚀 Get Started Now!

```bash
# 1. Start Hardhat (Terminal 1)
cd blockchain-hardhat2
npx hardhat node

# 2. Deploy & Start Backend (Terminal 2)
npx hardhat run scripts/deploy.js --network localhost
npm start

# 3. Start Frontend (Terminal 3)
cd frontend/Certificate-Verifier
npm run dev

# 4. Open Browser
http://localhost:3000
```

**Login:** admin@dcvs.com / admin123

---

## ⭐ Remember

- Keep all 3 terminals running
- Use same file for upload and verify
- Colleges need approval before uploading
- Verifiers are auto-approved
- Hardhat data is temporary (resets on restart)

---

**Good luck with your project! 🎓🔗✨**

---

*Last Updated: September 21, 2026*  
*Version: 1.0.0*  
*Documentation by: DCVS Development Team*

