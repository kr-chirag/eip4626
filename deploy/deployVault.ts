import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import AddressBook from '../utils/AddressBook';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log("deploying vault...");
  const VaultFactory = await ethers.getContractFactory("Vault");
  const Vault = await VaultFactory.deploy(AddressBook.get("AssetToken"), "vCSP", "vCSP");
  await Vault.waitForDeployment();
  AddressBook.set("Vault", await Vault.getAddress())
  console.log("🚀 ~ Vault address:", AddressBook.get("Vault"))
};

deployFunction.tags = ["Vault"]
deployFunction.dependencies = ["AssetToken"]

export default deployFunction;