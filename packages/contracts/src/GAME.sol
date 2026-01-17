// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title GAME
 * @notice On-chain game mechanics and achievements
 */
contract GAME is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _gameIdCounter;
    Counters.Counter private _achievementIdCounter;

    enum GameType { Adventure, Puzzle, Strategy, Casual, Educational }

    struct Game {
        uint256 id;
        address creator;
        string name;
        string description;
        GameType gameType;
        string gameUrl;
        uint256 createdAt;
        bool isActive;
        uint256 totalPlayers;
        uint256 totalScore;
    }

    struct Achievement {
        uint256 id;
        uint256 gameId;
        string name;
        string description;
        uint256 points;
        bool isActive;
    }

    struct PlayerStats {
        uint256 gamesPlayed;
        uint256 totalScore;
        uint256 achievementsUnlocked;
        mapping(uint256 => bool) unlockedAchievements;
    }

    mapping(uint256 => Game) public games;
    mapping(uint256 => Achievement) public achievements;
    mapping(address => PlayerStats) public playerStats;
    mapping(address => uint256[]) public playerGames;

    event GameCreated(uint256 indexed gameId, address indexed creator, string name);
    event GamePlayed(uint256 indexed gameId, address indexed player, uint256 score);
    event AchievementCreated(uint256 indexed achievementId, uint256 indexed gameId, string name);
    event AchievementUnlocked(uint256 indexed achievementId, address indexed player);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createGame(
        string memory name,
        string memory description,
        GameType gameType,
        string memory gameUrl
    ) public returns (uint256) {
        uint256 gameId = _gameIdCounter.current();
        _gameIdCounter.increment();

        games[gameId] = Game({
            id: gameId,
            creator: msg.sender,
            name: name,
            description: description,
            gameType: gameType,
            gameUrl: gameUrl,
            createdAt: block.timestamp,
            isActive: true,
            totalPlayers: 0,
            totalScore: 0
        });

        emit GameCreated(gameId, msg.sender, name);
        return gameId;
    }

    function createAchievement(
        uint256 gameId,
        string memory name,
        string memory description,
        uint256 points
    ) public returns (uint256) {
        require(games[gameId].creator == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");

        uint256 achievementId = _achievementIdCounter.current();
        _achievementIdCounter.increment();

        achievements[achievementId] = Achievement({
            id: achievementId,
            gameId: gameId,
            name: name,
            description: description,
            points: points,
            isActive: true
        });

        emit AchievementCreated(achievementId, gameId, name);
        return achievementId;
    }

    function recordGamePlay(uint256 gameId, address player, uint256 score) public {
        require(games[gameId].creator == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(games[gameId].isActive, "Game not active");

        if (playerStats[player].gamesPlayed == 0) {
            games[gameId].totalPlayers++;
        }

        playerStats[player].gamesPlayed++;
        playerStats[player].totalScore += score;
        games[gameId].totalScore += score;

        playerGames[player].push(gameId);

        emit GamePlayed(gameId, player, score);
    }

    function unlockAchievement(uint256 achievementId, address player) public {
        Achievement memory achievement = achievements[achievementId];
        require(achievement.isActive, "Achievement not active");
        require(games[achievement.gameId].creator == msg.sender || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(!playerStats[player].unlockedAchievements[achievementId], "Already unlocked");

        playerStats[player].unlockedAchievements[achievementId] = true;
        playerStats[player].achievementsUnlocked++;
        playerStats[player].totalScore += achievement.points;

        emit AchievementUnlocked(achievementId, player);
    }

    function hasAchievement(address player, uint256 achievementId) external view returns (bool) {
        return playerStats[player].unlockedAchievements[achievementId];
    }

    function getPlayerGames(address player) external view returns (uint256[] memory) {
        return playerGames[player];
    }
}
