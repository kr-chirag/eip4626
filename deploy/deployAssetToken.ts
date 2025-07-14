import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import AddressBook from '../utils/AddressBook';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log("deploying AssetToken...");
  const AssetTokenFactory = await ethers.getContractFactory("AssetToken");
  const AssetToken = await AssetTokenFactory.deploy("Asset Token", "ATK");
  await AssetToken.waitForDeployment();
  AddressBook.set("AssetToken", await AssetToken.getAddress())
  console.log("🚀 ~ AssetToken address:", AddressBook.get("AssetToken"))
};

deployFunction.tags = ["AssetToken"]

export default deployFunction;