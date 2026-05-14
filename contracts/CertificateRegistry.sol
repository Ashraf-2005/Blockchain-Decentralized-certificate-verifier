// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CertificateRegistry {
    address public admin;
    mapping(address => bool) public issuers;

    constructor() {
        admin = msg.sender;
        issuers[msg.sender] = true;
    }

    struct Certificate {
        string studentName;
        string course;
        string certificateId;
        uint256 issueDate;
        address issuedBy;
        bool isValid;
        string ipfsHash;
    }

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

    mapping(bytes32 => Certificate) public certificates;
    bytes32[] public certificateHashes;

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    modifier onlyIssuer() {
        require(issuers[msg.sender], "Only issuer");
        _;
    }

    function addIssuer(address _issuer) public onlyAdmin {
        issuers[_issuer] = true;
        emit IssuerAdded(_issuer);
    }

    function removeIssuer(address _issuer) public onlyAdmin {
        issuers[_issuer] = false;
        emit IssuerRemoved(_issuer);
    }

    function issueCertificate(
        bytes32 certHash,
        string memory certificateId,
        string memory studentName,
        string memory course,
        string memory ipfsHash
    ) public onlyIssuer {
        require(certificates[certHash].issueDate == 0, "Certificate exists");

        certificates[certHash] = Certificate({
            studentName: studentName,
            course: course,
            certificateId: certificateId,
            issueDate: block.timestamp,
            issuedBy: msg.sender,
            isValid: true,
            ipfsHash: ipfsHash
        });

        certificateHashes.push(certHash);

        emit CertificateIssued(
            certHash,
            certificateId,
            studentName,
            course,
            block.timestamp,
            msg.sender
        );
    }

    function revokeCertificate(bytes32 certHash) public onlyIssuer {
        require(certificates[certHash].issueDate != 0, "Certificate not found");
        require(certificates[certHash].issuedBy == msg.sender || msg.sender == admin, "Not authorized");

        certificates[certHash].isValid = false;
        emit CertificateRevoked(certHash, block.timestamp);
    }

    function verifyCertificate(bytes32 certHash)
        public
        view
        returns (
            string memory studentName,
            string memory course,
            string memory certificateId,
            uint256 issueDate,
            address issuedBy,
            bool isValid,
            string memory ipfsHash
        )
    {
        Certificate memory cert = certificates[certHash];
        return (
            cert.studentName,
            cert.course,
            cert.certificateId,
            cert.issueDate,
            cert.issuedBy,
            cert.isValid,
            cert.ipfsHash
        );
    }

    function getCertificateCount() public view returns (uint256) {
        return certificateHashes.length;
    }

    function getCertificateHashAt(uint256 index) public view returns (bytes32) {
        return certificateHashes[index];
    }
}