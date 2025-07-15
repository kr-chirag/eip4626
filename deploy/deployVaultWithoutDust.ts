import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from 'hardhat';
import AddressBook from '../utils/AddressBook';

const deployFunction: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  console.log("deploying VaultWithoutDust ...");

  const DECIMALS_OFFSET = 4;

  const VaultFactory = await ethers.getContractFactory("VaultWithoutDust");
  const VaultWithoutDust = await VaultFactory.deploy(DECIMALS_OFFSET);
  await VaultWithoutDust.waitForDeployment();
  AddressBook.set("VaultWithoutDust", await VaultWithoutDust.getAddress())
  console.log("🚀 ~ VaultWithoutDust address:", AddressBook.get("VaultWithoutDust"))
};

deployFunction.tags = ["VaultWithoutDust"]

export default deployFunction;