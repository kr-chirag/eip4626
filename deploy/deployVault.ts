import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import AddressBook from '../utils/AddressBook';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log("deploying vault...");
  const CSPToken = "0x659FC8225270E0207D88FCe80aAE8B1C21229d3e"
  const VaultFactory = await ethers.getContractFactory("Vault");
  const Vault = await VaultFactory.deploy(CSPToken, "vCSP", "vCSP");
  await Vault.waitForDeployment();
  AddressBook.set("Vault", await Vault.getAddress())
  console.log("🚀 ~ Vault address:", AddressBook.get("Vault"))
};

export default deployFunction;