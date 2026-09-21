import { ethers } from 'ethers';

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';
const RPC_URL = import.meta.env.VITE_RPC_URL || 'http://localhost:8545';

console.log('🔧 Contract Service Configuration:');
console.log('  - Contract Address:', CONTRACT_ADDRESS);
console.log('  - RPC URL:', RPC_URL);

// Minimal ABI for certificate verification
const CONTRACT_ABI = [
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

let provider = null;
let contract = null;

/**
 * Initialize blockchain connection
 * @returns {Promise<Object>} - {provider, contract}
 */
export async function initializeBlockchain() {
  try {
    // Use JsonRpcProvider for local hardhat node
    provider = new ethers.JsonRpcProvider(RPC_URL);
    
    // Create contract instance (read-only)
    contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      provider
    );

    console.log('✅ Blockchain initialized:', CONTRACT_ADDRESS);
    return { provider, contract };
  } catch (error) {
    console.error('❌ Failed to initialize blockchain:', error);
    throw new Error('Failed to connect to blockchain: ' + error.message);
  }
}

/**
 * Verify certificate by hash
 * @param {string} certHash - Certificate hash (bytes32)
 * @returns {Promise<Object>} - Certificate data
 */
export async function verifyCertificateByHash(certHash) {
  try {
    if (!contract) {
      await initializeBlockchain();
    }

    console.log('🔍 Verifying certificate hash:', certHash);

    const result = await contract.verifyCertificate(certHash);
    
    return {
      studentName: result.studentName || result[0],
      course: result.course || result[1],
      certificateId: result.certificateId || result[2],
      issueDate: result.issueDate ? result.issueDate.toString() : result[3]?.toString(),
      issuedBy: result.issuedBy || result[4],
      isValid: result.isValid !== undefined ? result.isValid : result[5],
      ipfsHash: result.ipfsHash || result[6] || ''
    };
  } catch (error) {
    console.error('❌ Verification error:', error);
    
    // Certificate not found
    if (error.message.includes('Certificate not found') || error.message.includes('issueDate')) {
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
    
    throw error;
  }
}

/**
 * Get certificate count
 * @returns {Promise<number>}
 */
export async function getCertificateCount() {
  try {
    if (!contract) {
      await initializeBlockchain();
    }

    const count = await contract.getCertificateCount();
    return Number(count);
  } catch (error) {
    console.error('❌ Failed to get certificate count:', error);
    return 0;
  }
}

/**
 * Check if blockchain is connected
 * @returns {Promise<boolean>}
 */
export async function isBlockchainConnected() {
  try {
    if (!provider) {
      await initializeBlockchain();
    }
    
    const network = await provider.getNetwork();
    console.log('🌐 Connected to network:', network.chainId.toString());
    return true;
  } catch (error) {
    console.error('❌ Blockchain not connected:', error);
    return false;
  }
}

export { provider, contract, CONTRACT_ADDRESS };
