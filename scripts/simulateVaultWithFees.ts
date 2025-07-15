import { ethers, network } from "hardhat";
import { Vault__factory, AssetToken__factory } from "../typechain-types"
import AddressBook from "../utils/AddressBook"

import readline from "readline";
function waitForEnter(msg: string): Promise<void> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(`\n${msg}\nPress Enter to continue...`, () => {
      rl.close();
      resolve();
    });
  });
}


async function simulate() {

  const vaultAddress = AddressBook.get("VaultWithFees");

  const user1 = new ethers.Wallet(process.env.PVT_KEY1 ?? '', ethers.provider)
  const vaultU1 = Vault__factory.connect(vaultAddress, user1);
  const tokenU1 = AssetToken__factory.connect(await vaultU1.asset(), user1)

  const user2 = new ethers.Wallet(process.env.PVT_KEY2 ?? '', ethers.provider)
  const vaultU2 = Vault__factory.connect(vaultAddress, user2);
  const tokenU2 = AssetToken__factory.connect(await vaultU2.asset(), user2)

  const tc1 = ethers.parseUnits("1", 6);
  const tc25 = ethers.parseUnits("25", 6);
  const tc20 = ethers.parseUnits("20", 6);
  const tc50 = ethers.parseUnits("50", 6);
  const tc90 = ethers.parseUnits("90", 6);
  const tc100 = ethers.parseUnits("100", 6);
  const tc250 = ethers.parseUnits("250", 6);
  const tc1k = ethers.parseUnits("1000", 6);
  
  console.log("Asset tokens:", await tokenU1.name());
  console.log("Share tokens:", await vaultU1.name());
  await printState();
  
  // mint tokens for users and approve all to vault
  await waitForEnter("mint tokens for users and approve all to vault")
  await (await tokenU1.mint(user1.address, tc1k)).wait();
  await (await tokenU2.mint(user2.address, tc1k)).wait();
  await (await tokenU1.approve(vaultAddress, tc1k)).wait();
  await (await tokenU2.approve(vaultAddress, tc1k)).wait();
  await printState();

  // user1 deposits 100 asset tokens
  await waitForEnter("user1 deposits 100 asset tokens");
  await (await vaultU1.deposit(tc100, user1.address)).wait()
  await printState();


  // generating yeid of 100 tokens
  await waitForEnter("generating yeid of 100 tokens");
  await (await tokenU1.mint(vaultAddress, tc100)).wait();
  await printState();

  // user2 deposits 50 asset tokens
  await waitForEnter("user2 deposits 50 asset tokens")
  await (await vaultU2.deposit(tc50, user2.address)).wait()
  await printState();

  // generating yeid of 250 tokens
  await waitForEnter("generating yeid of 250 tokens");
  await (await tokenU1.mint(vaultAddress, tc250)).wait();
  await printState();

  // user1 redeems 90 shares
  await waitForEnter("user1 redeems 90 shares");
  await (await vaultU1.redeem(tc90, user1.address, user1.address)).wait();
  await printState();

  // user2 redeems 20 shares
  await waitForEnter("user1 redeems 20 shares");
  await (await vaultU2.redeem(tc20, user2.address, user2.address)).wait();
  await printState();

  async function printState(){
    console.log("\ntotal shares supply:", ethers.formatUnits(await vaultU1.totalSupply(), 6))
    console.log("total assets deposited:", ethers.formatUnits(await vaultU1.totalAssets(), 6))
    console.log("price per share:", ethers.formatUnits(await vaultU1.convertToAssets(tc1), 6))
    console.log("user1 assets:", ethers.formatUnits(await tokenU1.balanceOf(user1.address), 6))
    console.log("user1 shares:", ethers.formatUnits(await vaultU1.balanceOf(user1.address), 6))
    console.log("user2 assets:", ethers.formatUnits(await tokenU2.balanceOf(user2.address), 6))
    console.log("user2 shares:", ethers.formatUnits(await vaultU1.balanceOf(user2.address), 6))
  }

}

simulate().catch(console.log)