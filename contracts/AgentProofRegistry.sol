// SPDX-License-Identifier: MIT
pragma solidity 0.8.38;

/// @title AgentProofRegistry
/// @notice Anchors SHA-256 digests of agent statements. The statement stays off-chain.
contract AgentProofRegistry {
    struct Record {
        address agent;
        uint64 anchoredAt;
        string label;
    }

    mapping(bytes32 => Record) private records;
    uint256 public count;

    event ProofAnchored(
        bytes32 indexed contentHash,
        address indexed agent,
        string label,
        uint256 anchoredAt
    );

    error EmptyHash();
    error BadLabel();
    error AlreadyAnchored();

    function anchor(bytes32 contentHash, string calldata label) external {
        if (contentHash == bytes32(0)) revert EmptyHash();
        uint256 size = bytes(label).length;
        if (size == 0 || size > 80) revert BadLabel();
        if (records[contentHash].anchoredAt != 0) revert AlreadyAnchored();

        records[contentHash] = Record({
            agent: msg.sender,
            anchoredAt: uint64(block.timestamp),
            label: label
        });
        count += 1;

        emit ProofAnchored(contentHash, msg.sender, label, block.timestamp);
    }

    function verify(bytes32 contentHash)
        external
        view
        returns (bool exists, address agent, string memory label, uint256 anchoredAt)
    {
        Record storage record = records[contentHash];
        exists = record.anchoredAt != 0;
        agent = record.agent;
        label = record.label;
        anchoredAt = record.anchoredAt;
    }
}
