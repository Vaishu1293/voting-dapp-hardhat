// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VotingDApp {
    address public owner;

    struct Poll {
        string title;
        string description;
        string[] options;
        uint expiration;
        bool active;
        mapping(address => bool) hasVoted;
        mapping(uint => uint) voteCount;
    }

    uint public pollCount;
    mapping(uint => Poll) private polls;
    mapping(uint => string[]) private optionLabels;

    event PollCreated(uint pollId, string title);
    event Voted(uint pollId, uint option);

    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier pollExists(uint pollId) {
        require(pollId > 0 && pollId <= pollCount, "Poll doesn't exist");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createPoll(
        string memory _title,
        string memory _description,
        string[] memory _options,
        uint _durationDays
    ) public onlyOwner {
        require(_options.length >= 2, "At least two options required");

        pollCount++;
        Poll storage newPoll = polls[pollCount];
        newPoll.title = _title;
        newPoll.description = _description;
        newPoll.options = _options;
        newPoll.expiration = block.timestamp + (_durationDays * 1 days);
        newPoll.active = true;
        optionLabels[pollCount] = _options;

        emit PollCreated(pollCount, _title);
    }

    function vote(uint pollId, uint optionIndex) public pollExists(pollId) {
        Poll storage poll = polls[pollId];
        require(block.timestamp < poll.expiration, "Poll expired");
        require(!poll.hasVoted[msg.sender], "Already voted");
        require(optionIndex < poll.options.length, "Invalid option");

        poll.hasVoted[msg.sender] = true;
        poll.voteCount[optionIndex]++;
        emit Voted(pollId, optionIndex);
    }

    function getPoll(uint pollId) public view pollExists(pollId) returns (
        string memory title,
        string memory description,
        string[] memory options,
        uint expiration,
        bool isActive,
        uint[] memory voteCounts
    ) {
        Poll storage poll = polls[pollId];
        uint optionLen = poll.options.length;
        voteCounts = new uint[](optionLen);

        for (uint i = 0; i < optionLen; i++) {
            voteCounts[i] = poll.voteCount[i];
        }

        return (
            poll.title,
            poll.description,
            poll.options,
            poll.expiration,
            block.timestamp < poll.expiration,
            voteCounts
        );
    }

    function getPollCount() public view returns (uint) {
        return pollCount;
    }

    function hasVoted(uint pollId, address voter) public view returns (bool) {
        return polls[pollId].hasVoted[voter];
    }
}
