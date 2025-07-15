import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import AddressBook from '../utils/AddressBook';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log("deploying AssetToken2...");
  const AssetTokenFactory = await ethers.getContractFactory("AssetToken");
  const AssetToken2 = await AssetTokenFactory.deploy("Asset Token2", "ATK2");
  await AssetToken2.waitForDeployment();
  AddressBook.set("AssetToken2", await AssetToken2.getAddress())
  console.log("🚀 ~ AssetToken2 address:", AddressBook.get("AssetToken2"))
};

deployFunction.tags = ["AssetToken2"]

export default deployFunction;