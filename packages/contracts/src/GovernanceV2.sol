// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./SponsorToken.sol";

/**
 * @title GovernanceV2
 * @notice Decentralized governance with proposal and voting
 */
contract GovernanceV2 is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _proposalIdCounter;

    SponsorToken public immutable governanceToken;
    uint256 public proposalThreshold;
    uint256 public votingPeriod;
    uint256 public quorumPercentage;

    enum ProposalState { Pending, Active, Succeeded, Defeated, Executed, Cancelled }

    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        uint256 startBlock;
        uint256 endBlock;
        uint256 forVotes;
        uint256 againstVotes;
        uint256 abstainVotes;
        ProposalState state;
        mapping(address => bool) hasVoted;
        address[] targets;
        uint256[] values;
        bytes[] calldatas;
    }

    mapping(uint256 => Proposal) public proposals;

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCast(uint256 indexed proposalId, address indexed voter, uint8 support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId);
    event ProposalCancelled(uint256 indexed proposalId);

    constructor(address _governanceToken, uint256 _proposalThreshold, uint256 _votingPeriod, uint256 _quorumPercentage) {
        governanceToken = SponsorToken(_governanceToken);
        proposalThreshold = _proposalThreshold;
        votingPeriod = _votingPeriod;
        quorumPercentage = _quorumPercentage;
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function propose(
        string memory title,
        string memory description,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas
    ) public returns (uint256) {
        require(governanceToken.balanceOf(msg.sender) >= proposalThreshold, "Below proposal threshold");
        require(targets.length == values.length && targets.length == calldatas.length, "Invalid proposal");

        uint256 proposalId = _proposalIdCounter.current();
        _proposalIdCounter.increment();

        Proposal storage proposal = proposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.title = title;
        proposal.description = description;
        proposal.startBlock = block.number;
        proposal.endBlock = block.number + votingPeriod;
        proposal.state = ProposalState.Active;
        proposal.targets = targets;
        proposal.values = values;
        proposal.calldatas = calldatas;

        emit ProposalCreated(proposalId, msg.sender, title);
        return proposalId;
    }

    function castVote(uint256 proposalId, uint8 support) public {
        Proposal storage proposal = proposals[proposalId];
        require(proposal.state == ProposalState.Active, "Proposal not active");
        require(block.number <= proposal.endBlock, "Voting ended");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        uint256 weight = governanceToken.balanceOf(msg.sender);
        require(weight > 0, "No voting power");

        proposal.hasVoted[msg.sender] = true;

        if (support == 0) {
            proposal.againstVotes += weight;
        } else if (support == 1) {
            proposal.forVotes += weight;
        } else if (support == 2) {
            proposal.abstainVotes += weight;
        } else {
            revert("Invalid vote type");
        }

        emit VoteCast(proposalId, msg.sender, support, weight);
    }

    function executeProposal(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(block.number > proposal.endBlock, "Voting not ended");
        require(proposal.state == ProposalState.Active, "Proposal not active");

        uint256 totalVotes = proposal.forVotes + proposal.againstVotes + proposal.abstainVotes;
        uint256 quorum = (governanceToken.totalSupply() * quorumPercentage) / 100;

        if (totalVotes >= quorum && proposal.forVotes > proposal.againstVotes) {
            proposal.state = ProposalState.Succeeded;
            
            for (uint256 i = 0; i < proposal.targets.length; i++) {
                (bool success, ) = proposal.targets[i].call{value: proposal.values[i]}(proposal.calldatas[i]);
                require(success, "Transaction execution failed");
            }
            
            proposal.state = ProposalState.Executed;
            emit ProposalExecuted(proposalId);
        } else {
            proposal.state = ProposalState.Defeated;
        }
    }

    function cancelProposal(uint256 proposalId) public {
        Proposal storage proposal = proposals[proposalId];
        require(msg.sender == proposal.proposer || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(proposal.state == ProposalState.Active, "Proposal not active");

        proposal.state = ProposalState.Cancelled;
        emit ProposalCancelled(proposalId);
    }

    function getProposalState(uint256 proposalId) external view returns (ProposalState) {
        return proposals[proposalId].state;
    }

    function hasVoted(uint256 proposalId, address voter) external view returns (bool) {
        return proposals[proposalId].hasVoted[voter];
    }
}
