const { ethers } = require('ethers');
const fs = require('fs');
const path = require('path');

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const RPC_URL = process.env.RPC_URL;

// Load contract ABI
const contractABI = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '../artifacts/contracts/CertificateRegistry.sol/CertificateRegistry.json'),
    'utf8'
  )
).abi;

let provider;
let signer;
let contract;

function initializeBlockchain() {
  provider = new ethers.JsonRpcProvider(RPC_URL);
  signer = new ethers.Wallet(PRIVATE_KEY, provider);
  contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);
  console.log('Blockchain initialized');
}

async function issueCertificate(certHash, certificateId, studentName, course, ipfsHash) {
  try {
    const tx = await contract.issueCertificate(
      certHash,
      certificateId,
      studentName,
      course,
      ipfsHash
    );
    const receipt = await tx.wait();
    return {
      success: true,
      txHash: receipt.hash,
      blockNumber: receipt.blockNumber
    };
  } catch (error) {
    console.error('Error issuing certificate:', error);
    throw error;
  }
}

async function verifyCertificate(certHash) {
  try {
    const cert = await contract.verifyCertificate(certHash);
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
    console.error('Error verifying certificate:', error);
    throw error;
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
