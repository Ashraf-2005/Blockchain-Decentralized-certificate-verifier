import { ethers } from "ethers"
import QRCode from "qrcode"

const contractAddress = "0x3Aa5ebB10DC797CAC828524e59A333d0A371443c"

const abi = [
"function verifyCertificate(bytes32 certHash) view returns(string,string,uint256,address,bool)",
"function issueCertificate(bytes32 certHash,string studentName,string course)",
"function revokeCertificate(bytes32 certHash)"
]
window.verifyCertificate = async function () {

const certInput = document.getElementById("certHash").value

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")

const contract = new ethers.Contract(contractAddress, abi, provider)

try {

const certHash = ethers.keccak256(
  ethers.toUtf8Bytes(certInput)
)

const result = await contract.verifyCertificate(certHash)

document.getElementById("result").innerHTML = `
<p>Student: ${result[0]}</p>
<p>Course: ${result[1]}</p>
<p>Status: ${result[4] ? "VALID" : "REVOKED"}</p>
`

// Generate QR Code
if(result[2] != 0){
const verifyURL = "http://172.16.21.118:5173/?cert=" + certInput

QRCode.toCanvas(
document.getElementById("qrCanvas"),
verifyURL,
{ width: 150 }
)
}

} catch (err) {

document.getElementById("result").innerHTML =
"Certificate not found"

}

}
window.issueCertificate = async function () {

const studentName = document.getElementById("studentName").value
const course = document.getElementById("course").value
const certId = document.getElementById("certId").value

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")

const signer = await provider.getSigner()

const contract = new ethers.Contract(contractAddress, abi, signer)

try {

const certHash = ethers.keccak256(
ethers.toUtf8Bytes(certId)
)

const tx = await contract.issueCertificate(
certHash,
studentName,
course
)

await tx.wait()

document.getElementById("issueResult").innerHTML =
"✅ Certificate Issued Successfully"

} catch (err) {

document.getElementById("issueResult").innerHTML =
"❌ Error issuing certificate"

}

}
window.revokeCertificate = async function () {

const certId = document.getElementById("revokeCertId").value

const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545")

const signer = await provider.getSigner()

const contract = new ethers.Contract(contractAddress, abi, signer)

try {

const certHash = ethers.keccak256(
ethers.toUtf8Bytes(certId)
)

const tx = await contract.revokeCertificate(certHash)

await tx.wait()

document.getElementById("revokeResult").innerHTML =
"🚫 Certificate Revoked Successfully"

} catch (err) {

document.getElementById("revokeResult").innerHTML =
"❌ Error revoking certificate"

}

}