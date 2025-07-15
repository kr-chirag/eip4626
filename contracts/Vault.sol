// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "./AssetToken.sol";

contract Vault is ERC4626 {

    AssetToken private _asset = new AssetToken("Asset Token", "ATK");

    constructor() ERC4626(IERC20(address(_asset))) ERC20("Vault Token", "VTK") {}
}
