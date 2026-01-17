// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "./SponsorToken.sol";

/**
 * @title Sponsorship
 * @notice Sponsorship management and tracking system
 */
contract Sponsorship is AccessControl, ReentrancyGuard {
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    SponsorToken public immutable sponsorToken;

    enum SponsorshipType { Creator, Project, Event, Grant }
    enum SponsorshipStatus { Active, Completed, Cancelled }

    struct SponsorshipTier {
        string name;
        uint256 minAmount;
        string[] benefits;
    }

    struct SponsorshipCampaign {
        uint256 id;
        address creator;
        string title;
        string description;
        SponsorshipType sponsorshipType;
        uint256 goalAmount;
        uint256 raisedAmount;
        uint256 deadline;
        SponsorshipStatus status;
        SponsorshipTier[] tiers;
        address[] sponsors;
        mapping(address => uint256) sponsorContributions;
    }

    uint256 public campaignCounter;
    mapping(uint256 => SponsorshipCampaign) public campaigns;
    mapping(address => uint256[]) public userCampaigns;

    event CampaignCreated(uint256 indexed campaignId, address indexed creator, string title, uint256 goalAmount);
    event SponsorshipReceived(uint256 indexed campaignId, address indexed sponsor, uint256 amount);
    event CampaignCompleted(uint256 indexed campaignId, uint256 totalRaised);
    event CampaignCancelled(uint256 indexed campaignId);
    event TierAdded(uint256 indexed campaignId, string tierName, uint256 minAmount);

    constructor(address _sponsorToken) {
        sponsorToken = SponsorToken(_sponsorToken);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createCampaign(
        string memory title,
        string memory description,
        SponsorshipType sponsorshipType,
        uint256 goalAmount,
        uint256 duration
    ) public returns (uint256) {
        require(goalAmount > 0, "Goal must be positive");
        require(duration > 0, "Duration must be positive");

        uint256 campaignId = campaignCounter++;

        SponsorshipCampaign storage campaign = campaigns[campaignId];
        campaign.id = campaignId;
        campaign.creator = msg.sender;
        campaign.title = title;
        campaign.description = description;
        campaign.sponsorshipType = sponsorshipType;
        campaign.goalAmount = goalAmount;
        campaign.raisedAmount = 0;
        campaign.deadline = block.timestamp + duration;
        campaign.status = SponsorshipStatus.Active;

        userCampaigns[msg.sender].push(campaignId);

        emit CampaignCreated(campaignId, msg.sender, title, goalAmount);
        return campaignId;
    }

    function addTier(
        uint256 campaignId,
        string memory name,
        uint256 minAmount,
        string[] memory benefits
    ) public {
        SponsorshipCampaign storage campaign = campaigns[campaignId];
        require(campaign.creator == msg.sender, "Not creator");
        require(campaign.status == SponsorshipStatus.Active, "Campaign not active");

        campaign.tiers.push(SponsorshipTier({
            name: name,
            minAmount: minAmount,
            benefits: benefits
        }));

        emit TierAdded(campaignId, name, minAmount);
    }

    function sponsor(uint256 campaignId, uint256 amount) public nonReentrant {
        SponsorshipCampaign storage campaign = campaigns[campaignId];
        require(campaign.status == SponsorshipStatus.Active, "Campaign not active");
        require(block.timestamp < campaign.deadline, "Campaign ended");
        require(amount > 0, "Amount must be positive");

        require(sponsorToken.transferFrom(msg.sender, address(this), amount), "Transfer failed");

        if (campaign.sponsorContributions[msg.sender] == 0) {
            campaign.sponsors.push(msg.sender);
        }

        campaign.sponsorContributions[msg.sender] += amount;
        campaign.raisedAmount += amount;

        emit SponsorshipReceived(campaignId, msg.sender, amount);

        if (campaign.raisedAmount >= campaign.goalAmount) {
            _completeCampaign(campaignId);
        }
    }

    function completeCampaign(uint256 campaignId) public {
        SponsorshipCampaign storage campaign = campaigns[campaignId];
        require(
            campaign.creator == msg.sender || 
            block.timestamp >= campaign.deadline ||
            hasRole(ADMIN_ROLE, msg.sender),
            "Not authorized"
        );
        _completeCampaign(campaignId);
    }

    function _completeCampaign(uint256 campaignId) internal {
        SponsorshipCampaign storage campaign = campaigns[campaignId];
        require(campaign.status == SponsorshipStatus.Active, "Campaign not active");

        campaign.status = SponsorshipStatus.Completed;

        sponsorToken.transfer(campaign.creator, campaign.raisedAmount);

        emit CampaignCompleted(campaignId, campaign.raisedAmount);
    }

    function cancelCampaign(uint256 campaignId) public nonReentrant {
        SponsorshipCampaign storage campaign = campaigns[campaignId];
        require(campaign.creator == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(campaign.status == SponsorshipStatus.Active, "Campaign not active");

        campaign.status = SponsorshipStatus.Cancelled;

        for (uint256 i = 0; i < campaign.sponsors.length; i++) {
            address sponsor = campaign.sponsors[i];
            uint256 amount = campaign.sponsorContributions[sponsor];
            if (amount > 0) {
                sponsorToken.transfer(sponsor, amount);
            }
        }

        emit CampaignCancelled(campaignId);
    }

    function getCampaignSponsors(uint256 campaignId) external view returns (address[] memory) {
        return campaigns[campaignId].sponsors;
    }

    function getSponsorContribution(uint256 campaignId, address sponsor) external view returns (uint256) {
        return campaigns[campaignId].sponsorContributions[sponsor];
    }

    function getUserCampaigns(address user) external view returns (uint256[] memory) {
        return userCampaigns[user];
    }

    function getTiers(uint256 campaignId) external view returns (SponsorshipTier[] memory) {
        return campaigns[campaignId].tiers;
    }
}
