// SPDX-License-Identifier: MIT

//** Standard ERC20 - CROX Token */
//** Author Alex : CROX 2022.5 */

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract CroxToken is ERC20 {
    constructor() ERC20("CROX Test Token", "CROX") {}

    function mintToWallet(address address_, uint256 amount)
        public
        payable
        returns (bool)
    {
        _mint(address_, amount);
        return true;
    }
}