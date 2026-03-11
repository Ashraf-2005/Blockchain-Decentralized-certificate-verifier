// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract CertificateRegistry {

    address public university;

    constructor() {
        university = msg.sender;
    }

    struct Certificate {
        string studentName;
        string course;
        uint256 issueDate;
        address issuedBy;
        bool isValid;
    }

    event CertificateIssued(
        bytes32 certHash,
        string studentName,
        string course,
        uint256 issueDate
    );

    event CertificateRevoked(
        bytes32 certHash,
        uint256 revokedAt
    );

    mapping(bytes32 => Certificate) public certificates;

    function issueCertificate(
        bytes32 certHash,
        string memory studentName,
        string memory course
    ) public {

        require(msg.sender == university, "Only university can issue");

        require(certificates[certHash].issueDate == 0,
            "Certificate already exists");

        certificates[certHash] = Certificate({
            studentName: studentName,
            course: course,
            issueDate: block.timestamp,
            issuedBy: msg.sender,
            isValid: true
        });

        emit CertificateIssued(
            certHash,
            studentName,
            course,
            block.timestamp
        );
    }

    function revokeCertificate(bytes32 certHash) public {

        require(msg.sender == university, "Only university can revoke");

        require(certificates[certHash].issueDate != 0,
            "Certificate does not exist");

        certificates[certHash].isValid = false;

        emit CertificateRevoked(certHash, block.timestamp);
    }

    function verifyCertificate(bytes32 certHash)
        public
        view
        returns (
            string memory studentName,
            string memory course,
            uint256 issueDate,
            address issuedBy,
            bool isValid
        )
    {
        Certificate memory cert = certificates[certHash];

        return (
            cert.studentName,
            cert.course,
            cert.issueDate,
            cert.issuedBy,
            cert.isValid
        );
    }
}