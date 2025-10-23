// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract PoapStudent {
    address public verifier; // event organizer wallet

    struct Event {
        string eventName;
        uint256 timestamp;
    }

    mapping(address => Event[]) public studentPOAPs;
    mapping(bytes32 => bool) public usedSignatures;

    event POAPMinted(address indexed attendee, string eventName, uint256 timestamp);

    constructor(address _verifier) {
        verifier = _verifier; // organizer or teacher wallet
    }

    function mintPOAP(
        string memory eventName,
        bytes memory signature
    ) public {
        bytes32 messageHash = keccak256(abi.encodePacked(msg.sender, eventName));
        bytes32 ethSignedMessageHash = getEthSignedMessageHash(messageHash);

        require(recoverSigner(ethSignedMessageHash, signature) == verifier, "Invalid signature");
        require(!usedSignatures[messageHash], "Already used");

        usedSignatures[messageHash] = true;
        studentPOAPs[msg.sender].push(Event(eventName, block.timestamp));

        emit POAPMinted(msg.sender, eventName, block.timestamp);
    }

    function getEthSignedMessageHash(bytes32 _messageHash) internal pure returns (bytes32) {
        return keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash)
        );
    }

    function recoverSigner(bytes32 _ethSignedMessageHash, bytes memory _signature)
        internal
        pure
        returns (address)
    {
        (bytes32 r, bytes32 s, uint8 v) = splitSignature(_signature);
        return ecrecover(_ethSignedMessageHash, v, r, s);
    }

    function splitSignature(bytes memory sig)
        internal
        pure
        returns (bytes32 r, bytes32 s, uint8 v)
    {
        require(sig.length == 65, "Invalid signature length");
        assembly {
            r := mload(add(sig, 32))
            s := mload(add(sig, 64))
            v := byte(0, mload(add(sig, 96)))
        }
    }

    function getMyPOAPs() external view returns (Event[] memory) {
        return studentPOAPs[msg.sender];
    }
}