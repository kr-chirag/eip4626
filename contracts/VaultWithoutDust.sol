// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC4626.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "./AssetToken.sol";

contract VaultWithoutDust is ERC4626 {
    using Math for uint256;

    uint8 private decimalsOffset = 0;
    AssetToken private _asset = new AssetToken("Asset Token", "ATK");

    constructor(uint8 decimalsOffset_) ERC4626(IERC20(address(_asset))) ERC20("Vault Token", "VTK") {
      decimalsOffset = decimalsOffset_;
    }

    function _convertToShares(uint256 assets, Math.Rounding rounding) internal view override returns (uint256) {
        return assets.mulDiv(nonZeroShares(totalSupply()), nonZeroAssets(totalAssets()), rounding);
    }

    function _convertToAssets(uint256 shares, Math.Rounding rounding) internal view override returns (uint256) {
        return shares.mulDiv(nonZeroAssets(totalAssets()), nonZeroShares(totalSupply()), rounding);
    }

    function _decimalsOffset() internal view override returns (uint8) {
        return decimalsOffset;
    }

    function nonZeroShares(uint256 value) internal view returns (uint256){
      return value == 0 ? 10 ** _decimalsOffset() : value;
    }

    function nonZeroAssets(uint256 value) internal pure returns (uint256){
      return value == 0 ? 1 : value;
    }
}
