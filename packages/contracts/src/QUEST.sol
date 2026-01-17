// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CAST.sol";

/**
 * @title QUEST
 * @notice Quest system for bounties, challenges, and missions
 */
contract QUEST is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _questIdCounter;

    enum QuestStatus { Active, Completed, Cancelled }
    enum QuestType { Bounty, Challenge, Mission, Tutorial }

    struct Quest {
        uint256 id;
        address creator;
        string title;
        string description;
        QuestType questType;
        uint256 reward;
        uint256 deadline;
        QuestStatus status;
        uint256 castIdRequired;
        address[] participants;
        address winner;
    }

    mapping(uint256 => Quest) public quests;
    mapping(address => uint256[]) public userQuests;

    event QuestCreated(uint256 indexed questId, address indexed creator, string title, uint256 reward);
    event QuestJoined(uint256 indexed questId, address indexed participant);
    event QuestCompleted(uint256 indexed questId, address indexed winner, uint256 reward);
    event QuestCancelled(uint256 indexed questId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createQuest(
        string memory title,
        string memory description,
        QuestType questType,
        uint256 reward,
        uint256 deadline,
        uint256 castIdRequired
    ) public payable returns (uint256) {
        require(msg.value >= reward, "Insufficient reward funds");
        require(deadline > block.timestamp, "Invalid deadline");

        uint256 questId = _questIdCounter.current();
        _questIdCounter.increment();

        Quest storage quest = quests[questId];
        quest.id = questId;
        quest.creator = msg.sender;
        quest.title = title;
        quest.description = description;
        quest.questType = questType;
        quest.reward = reward;
        quest.deadline = deadline;
        quest.status = QuestStatus.Active;
        quest.castIdRequired = castIdRequired;

        userQuests[msg.sender].push(questId);

        emit QuestCreated(questId, msg.sender, title, reward);
        return questId;
    }

    function joinQuest(uint256 questId) public {
        Quest storage quest = quests[questId];
        require(quest.status == QuestStatus.Active, "Quest not active");
        require(block.timestamp < quest.deadline, "Quest expired");

        quest.participants.push(msg.sender);
        userQuests[msg.sender].push(questId);

        emit QuestJoined(questId, msg.sender);
    }

    function completeQuest(uint256 questId, address winner) public {
        Quest storage quest = quests[questId];
        require(msg.sender == quest.creator || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(quest.status == QuestStatus.Active, "Quest not active");

        quest.status = QuestStatus.Completed;
        quest.winner = winner;

        payable(winner).transfer(quest.reward);

        emit QuestCompleted(questId, winner, quest.reward);
    }

    function cancelQuest(uint256 questId) public {
        Quest storage quest = quests[questId];
        require(msg.sender == quest.creator, "Not creator");
        require(quest.status == QuestStatus.Active, "Quest not active");

        quest.status = QuestStatus.Cancelled;
        payable(quest.creator).transfer(quest.reward);

        emit QuestCancelled(questId);
    }

    function getQuestsByUser(address user) external view returns (uint256[] memory) {
        return userQuests[user];
    }

    function getQuestParticipants(uint256 questId) external view returns (address[] memory) {
        return quests[questId].participants;
    }
}
