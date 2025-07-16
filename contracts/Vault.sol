// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "./AssetToken.sol";

contract Vault is ERC4626 {

    AssetToken private __asset = new AssetToken("Asset Token", "ATK");
    uint8 private __decimalsOffset = 0;

    constructor(uint8 decimalsOffset_) ERC4626(IERC20(address(__asset))) ERC20("Vault Token", "VTK") {
        __decimalsOffset = decimalsOffset_;
    }

    function _decimalsOffset() internal view override returns (uint8) {
        return __decimalsOffset;
    }
}
