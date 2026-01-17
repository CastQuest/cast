// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./GovernanceV2.sol";
import "./SponsorToken.sol";

/**
 * @title SubDAOs
 * @notice Hierarchical DAO structure for specialized groups
 */
contract SubDAOs is AccessControl {
    using Counters for Counters.Counter;

    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");

    Counters.Counter private _daoIdCounter;

    struct SubDAO {
        uint256 id;
        string name;
        string description;
        address governance;
        address treasury;
        address[] members;
        mapping(address => bool) isMember;
        uint256 createdAt;
        bool isActive;
    }

    mapping(uint256 => SubDAO) public subDAOs;
    mapping(address => uint256[]) public userDAOs;

    event SubDAOCreated(uint256 indexed daoId, string name, address governance);
    event MemberAdded(uint256 indexed daoId, address indexed member);
    event MemberRemoved(uint256 indexed daoId, address indexed member);
    event SubDAODeactivated(uint256 indexed daoId);

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
    }

    function createSubDAO(
        string memory name,
        string memory description,
        address governance,
        address treasury
    ) public returns (uint256) {
        uint256 daoId = _daoIdCounter.current();
        _daoIdCounter.increment();

        SubDAO storage dao = subDAOs[daoId];
        dao.id = daoId;
        dao.name = name;
        dao.description = description;
        dao.governance = governance;
        dao.treasury = treasury;
        dao.createdAt = block.timestamp;
        dao.isActive = true;

        dao.members.push(msg.sender);
        dao.isMember[msg.sender] = true;
        userDAOs[msg.sender].push(daoId);

        emit SubDAOCreated(daoId, name, governance);
        return daoId;
    }

    function addMember(uint256 daoId, address member) public {
        SubDAO storage dao = subDAOs[daoId];
        require(dao.isMember[msg.sender] || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(!dao.isMember[member], "Already member");

        dao.members.push(member);
        dao.isMember[member] = true;
        userDAOs[member].push(daoId);

        emit MemberAdded(daoId, member);
    }

    function removeMember(uint256 daoId, address member) public {
        SubDAO storage dao = subDAOs[daoId];
        require(dao.isMember[msg.sender] || hasRole(ADMIN_ROLE, msg.sender), "Not authorized");
        require(dao.isMember[member], "Not a member");

        dao.isMember[member] = false;

        emit MemberRemoved(daoId, member);
    }

    function deactivateSubDAO(uint256 daoId) public onlyRole(ADMIN_ROLE) {
        subDAOs[daoId].isActive = false;
        emit SubDAODeactivated(daoId);
    }

    function isMember(uint256 daoId, address user) external view returns (bool) {
        return subDAOs[daoId].isMember[user];
    }

    function getMembers(uint256 daoId) external view returns (address[] memory) {
        return subDAOs[daoId].members;
    }

    function getUserDAOs(address user) external view returns (uint256[] memory) {
        return userDAOs[user];
    }
}
