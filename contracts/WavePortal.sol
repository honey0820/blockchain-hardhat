//SPDX-Licenxe-Identifier: UNLICENDED

pragma solidity ^0.8.18;

import "hardhat/console.sol"; //means using console.log()

contract WavePortal {
    uint256 totalWaves;
    uint256 private seed;

     /*
     * A little magic, Google what events are in Solidity!
     */
     event NewWave(address indexed from, uint256 timestamp, string message);

    /*
     * I created a struct here named Wave.
     * A struct is basically a custom datatype where we can customize what we want to hold inside it.
     */
     struct Wave {
        address waver; // The address of the user who waved.
        string message; // The message the user sent.
        uint256 timestamp; // The timestamp when the user waved.
     }

    Wave[] waves;

    mapping(address => uint256) public lastWavedAt;

    constructor() payable {
        console.log("We have been constructed!");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public {

        require(lastWavedAt[msg.sender] + 30 seconds < block.timestamp,
        "Must wait 30 seconds before waving again.");

        lastWavedAt[msg.sender] = block.timestamp;
        totalWaves += 1;
        console.log("%s waved w/ message %s", msg.sender, _message);

         /*
         * This is where I actually store the wave data in the array.
         */
         waves.push(Wave(msg.sender, _message, block.timestamp));

         seed =(block.difficulty + block.timestamp + seed) % 100;
         console.log("Random # generated: %d", seed);

           /*
         * Give a 50% chance that the user wins the prize.
         */
        if (seed <= 50) {
            console.log("%s won!", msg.sender);

        /*
         * I added some fanciness here, Google it and try to figure out what it is!
         * Let me know what you learn in #general-chill-chat
         */
         uint256 prizeAmount = 0.00001 ether;

         require(
            prizeAmount <= address(this).balance,
            "Trying to withdraw more money than the contract has."
         );
         (bool success, ) =(msg.sender).call{value: prizeAmount}("");
         require(success, "Failed to withdraw money from contract.");
        }
         emit NewWave(msg.sender, block.timestamp, _message);

    }
         
    /*
     * I added a function getAllWaves which will return the struct array, waves, to us.
     * This will make it easy to retrieve the waves from our website!
     */
    function getAllWaves() public view returns (Wave[] memory) {
        return waves;
    }
   

    function getTotalWaves() public view returns (uint256) {
        console.log("we have %d total waves!", totalWaves);
        return totalWaves;
    }
}