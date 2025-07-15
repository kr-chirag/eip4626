import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import AddressBook from '../utils/AddressBook';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log("deploying VaultWithFees...");
  const VaultWithFeesFactory = await ethers.getContractFactory("VaultWithFees");
  const VaultWithFees = await VaultWithFeesFactory.deploy(AddressBook.get("AssetToken"), "vfATK", "vfATK");
  await VaultWithFees.waitForDeployment();
  AddressBook.set("VaultWithFees", await VaultWithFees.getAddress())
  console.log("🚀 ~ VaultWithFees address:", AddressBook.get("VaultWithFees"))
};

deployFunction.tags = ["VaultWithFees"]
deployFunction.dependencies = ["AssetToken"]

export default deployFunction;