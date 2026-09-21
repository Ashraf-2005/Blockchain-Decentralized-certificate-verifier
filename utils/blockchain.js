const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

// Use environment variables, but will be overridden with hardcoded Account #0
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const RPC_URL = process.env.RPC_URL;

// Hardhat Account #0 private key (always has 10000 ETH)
// This is hardcoded to ensure we always use the correct account with funds
const HARDHAT_ACCOUNT_0_PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

// Minimal ABI for certificate operations
const CONTRACT_ABI = [
  {
    "inputs": [
      {"internalType": "bytes32", "name": "certHash", "type": "bytes32"},
      {"internalType": "string", "name": "certificateId", "type": "string"},
      {"internalType": "string", "name": "studentName", "type": "string"},
      {"internalType": "string", "name": "course", "type": "string"},
      {"internalType": "string", "name": "ipfsHash", "type": "string"}
    ],
    "name": "issueCertificate",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "bytes32", "name": "certHash", "type": "bytes32"}],
    "name": "verifyCertificate",
    "outputs": [
      {"internalType": "string", "name": "studentName", "type": "string"},
      {"internalType": "string", "name": "course", "type": "string"},
      {"internalType": "string", "name": "certificateId", "type": "string"},
      {"internalType": "uint256", "name": "issueDate", "type": "uint256"},
      {"internalType": "address", "name": "issuedBy", "type": "address"},
      {"internalType": "bool", "name": "isValid", "type": "bool"},
      {"internalType": "string", "name": "ipfsHash", "type": "string"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getCertificateCount",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];

let provider;
let signer;
let contract;

async function initializeBlockchain() {
  try {
    console.log('🔄 Initializing blockchain...');
    console.log('📍 Contract Address:', CONTRACT_ADDRESS);
    console.log('🌐 RPC URL:', RPC_URL);
    
    provider = new ethers.JsonRpcProvider(RPC_URL);
    
    // Use Hardhat Account #0 which always has 10000 ETH
    signer = new ethers.Wallet(HARDHAT_ACCOUNT_0_PRIVATE_KEY, provider);
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    
    console.log('✅ Blockchain initialized successfully');
    console.log('👤 Signer Address:', signer.address);
    console.log('💡 Using Hardhat Account #0 (always has 10000 ETH)');
    return true;
  } catch (error) {
    console.error('❌ Failed to initialize blockchain:', error.message);
    throw error;
  }
}

async function issueCertificate(certHash, certificateId, studentName, course, ipfsHash) {
  try {
    console.log('📝 Issuing certificate...');
    console.log('  - Hash:', certHash);
    console.log('  - ID:', certificateId);
    console.log('  - Student:', studentName);
    console.log('  - Course:', course);

    // Validate inputs
    if (!certHash || !certificateId || !studentName || !course) {
      throw new Error('Missing required certificate data');
    }

    // Check if contract is initialized
    if (!contract) {
      throw new Error('Blockchain not initialized. Call initializeBlockchain() first');
    }

    // Estimate gas
    try {
      const gasEstimate = await contract.issueCertificate.estimateGas(
        certHash,
        certificateId,
        studentName,
        course,
        ipfsHash || ''
      );
      console.log('⛽ Gas estimate:', gasEstimate.toString());
    } catch (gasError) {
      console.warn('⚠️ Gas estimation failed:', gasError.message);
    }

    // Send transaction
    const tx = await contract.issueCertificate(
      certHash,
      certificateId,
      studentName,
      course,
      ipfsHash || ''
    );

    console.log('📤 Transaction sent:', tx.hash);

    // Wait for confirmation
    const receipt = await tx.wait();

    if (!receipt) {
      throw new Error('Transaction failed - no receipt');
    }

    console.log('✅ Certificate issued successfully');
    console.log('  - TX Hash:', receipt.hash);
    console.log('  - Block:', receipt.blockNumber);
    console.log('  - Gas Used:', receipt.gasUsed.toString());

    return {
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      gasUsed: receipt.gasUsed.toString()
    };
  } catch (error) {
    console.error('❌ Error issuing certificate:', error.message);
    console.error('   Full error:', error);
    throw new Error(`Failed to issue certificate: ${error.message}`);
  }
}

async function verifyCertificate(certHash) {
  try {
    console.log('🔍 Verifying certificate hash:', certHash);

    if (!contract) {
      throw new Error('Blockchain not initialized');
    }

    // Query the blockchain
    const cert = await contract.verifyCertificate(certHash);

    // Check if certificate exists (issueDate will be 0 if not found)
    if (!cert || cert.issueDate === 0n || cert.issueDate === 0) {
      console.log('❌ Certificate not found on blockchain');
      return {
        studentName: '',
        course: '',
        certificateId: '',
        issueDate: '0',
        issuedBy: ethers.ZeroAddress,
        isValid: false,
        ipfsHash: ''
      };
    }

    console.log('✅ Certificate found on blockchain');
    console.log('  - Student:', cert.studentName);
    console.log('  - Course:', cert.course);
    console.log('  - Valid:', cert.isValid);

    return {
      studentName: cert.studentName,
      course: cert.course,
      certificateId: cert.certificateId,
      issueDate: cert.issueDate.toString(),
      issuedBy: cert.issuedBy,
      isValid: cert.isValid,
      ipfsHash: cert.ipfsHash
    };
  } catch (error) {
    console.error('❌ Error verifying certificate:', error.message);
    
    // If it's a "Certificate not found" error, return empty result
    if (error.message.includes('Certificate not found') || 
        error.message.includes('issueDate') ||
        error.message.includes('BAD_DATA')) {
      console.log('ℹ️ Certificate does not exist on blockchain');
      return {
        studentName: '',
        course: '',
        certificateId: '',
        issueDate: '0',
        issuedBy: ethers.ZeroAddress,
        isValid: false,
        ipfsHash: ''
      };
    }

    throw new Error(`Failed to verify certificate: ${error.message}`);
  }
}

async function revokeCertificate(certHash) {
  try {
    const tx = await contract.revokeCertificate(certHash);
    const receipt = await tx.wait();
    return {
      success: true,
      txHash: receipt.hash
    };
  } catch (error) {
    console.error('Error revoking certificate:', error);
    throw error;
  }
}

async function getCertificateCount() {
  try {
    const count = await contract.getCertificateCount();
    return count.toString();
  } catch (error) {
    console.error('Error getting certificate count:', error);
    throw error;
  }
}

module.exports = {
  initializeBlockchain,
  issueCertificate,
  verifyCertificate,
  revokeCertificate,
  getCertificateCount
};
