// SPDX-License-Identifier: MIT

//** Crox Swap Fee Contract - CROX Fee */
//** Author Alex : CROX Swap 2022.5 */

pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "@openzeppelin/contracts/utils/structs/EnumerableSet.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CroxFee is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;
    using EnumerableSet for EnumerableSet.AddressSet;

    uint256 public constant PERCENTS_DIVIDER = 100;

    uint256 public swapFee = 2; // swap fee as percent - percent divider = 1000
    uint256 public minPercent;
    uint256 public maxPercent;
    address public feeAddress;

    struct Tokens {
        uint256 tokenId;
        address tokenAdr;
        uint256 feePercent;
    }

    // tokenId => Tokens mapping
    mapping(uint256 => Tokens) public tokens;
    uint256 public currentTokenId; // Gas optimisation: The variable need not be initialized to 0 because the default value is 0. Fixed

    /** Events */
    event ChargeFee(address sender, uint256 amount);

    constructor(address _feeAddress) {
        require(_feeAddress != address(0x0), "invalid address");
        feeAddress = _feeAddress;
    }

    function setFeeAddress(address _address) external onlyOwner {
        require(_address != address(0x0), "invalid address");
        feeAddress = _address;
    }

    function setFeeRange(uint256 _minPercent, uint256 _maxPercent)
        external
        onlyOwner
    {
        require(_minPercent > 0, "should bigger than 0");
        require(_maxPercent > 0, "should bigger than 0");
        minPercent = _minPercent;
        maxPercent = _maxPercent;
    }

    function setFeeToken(
        uint256 _tokenId,
        address _tokenAdr,
        uint256 _feePercent
    ) external onlyOwner {
        require(_tokenId > 0, "wrong token ID");
        require(_tokenAdr != address(0x0), "invalid address");
        require(
            _feePercent > minPercent && _feePercent < maxPercent,
            "percent not match"
        );
        tokens[_tokenId].tokenId = _tokenId;
        tokens[_tokenId].tokenAdr = _tokenAdr;
        tokens[_tokenId].feePercent = _feePercent;
    }

    function chargeFee(uint256 _tokenId, uint256 _feeAmount)
        external
        nonReentrant
    {
        require(_tokenId != 0, "wrong token");
        require(tokens[_tokenId].feePercent != 0, "wrong percentage");

        IERC20 feeToken = IERC20(tokens[_tokenId].tokenAdr);

        require(
            feeToken.balanceOf(msg.sender) >= _feeAmount,
            "Insufficient balance"
        );

        uint256 chargeAmount = (tokens[_tokenId].feePercent * _feeAmount) /
            PERCENTS_DIVIDER;

        if (chargeAmount != 0) {
            feeToken.safeTransferFrom(msg.sender, feeAddress, chargeAmount);
        }

        emit ChargeFee(msg.sender, chargeAmount);
    }
}