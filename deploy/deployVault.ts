import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import AddressBook from '../utils/AddressBook';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {

  const DECIMALS_OFFSET = 0;

  console.log("deploying Vault ...");
  const VaultFactory = await ethers.getContractFactory("Vault");
  const Vault = await VaultFactory.deploy(DECIMALS_OFFSET);
  await Vault.waitForDeployment();
  AddressBook.set("Vault", await Vault.getAddress())
  console.log("🚀 ~ Vault address:", AddressBook.get("Vault"))
};

deployFunction.tags = ["Vault"]

export default deployFunction;