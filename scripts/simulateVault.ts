import { ethers } from "hardhat";
import { Vault__factory, AssetToken__factory } from "../typechain-types"
import AddressBook from "../utils/AddressBook"
import { waitForEnter } from "../utils/Input";

async function simulate() {

  const vaultAddress = AddressBook.get("Vault");

  const user1 = new ethers.Wallet(process.env.PVT_KEY1 ?? '', ethers.provider)
  const vaultU1 = Vault__factory.connect(vaultAddress, user1);
  const tokenU1 = AssetToken__factory.connect(await vaultU1.asset(), user1)

  const user2 = new ethers.Wallet(process.env.PVT_KEY2 ?? '', ethers.provider)
  const vaultU2 = Vault__factory.connect(vaultAddress, user2);
  const tokenU2 = AssetToken__factory.connect(await vaultU2.asset(), user2)

  const assetDecimals = await tokenU1.decimals();
  const shareDecimals = await vaultU1.decimals();

  console.log("Asset tokens:", await tokenU1.name());
  console.log("Share tokens:", await vaultU1.name());
  await printState();

  await waitForEnter("mint tokens for users and approve all to vault")
  await (await tokenU1.mint(user1.address, pa("1000"))).wait();
  await (await tokenU2.mint(user2.address, pa("1000"))).wait();
  await (await tokenU1.approve(vaultAddress, pa("1000"))).wait();
  await (await tokenU2.approve(vaultAddress, pa("1000"))).wait();
  await printState();

  await waitForEnter("user1 deposits 100 asset tokens");
  await (await vaultU1.deposit(pa("100"), user1.address)).wait()
  await printState();

  await waitForEnter("generating yeid of 100 tokens");
  await (await tokenU1.mint(vaultAddress, pa("100"))).wait();
  await printState();

  await waitForEnter("user2 deposits 50 asset tokens")
  await (await vaultU2.deposit(pa("50"), user2.address)).wait()
  await printState();

  await waitForEnter("generating yeid of 250 tokens");
  await (await tokenU1.mint(vaultAddress, pa("250"))).wait();
  await printState();

  await waitForEnter("user1 redeems 100 shares");
  await (await vaultU1.redeem(ps("100"), user1.address, user1.address)).wait();
  await printState();

  await waitForEnter("user1 redeems 25 shares");
  await (await vaultU2.redeem(ps("25"), user2.address, user2.address)).wait();
  await printState();

  async function printState() {
    const state = {
      "total shares supply": fs(await vaultU1.totalSupply()),
      "total assets deposited": fa(await vaultU1.totalAssets()),
      "price per share": fa(await vaultU1.convertToAssets(ps("1"))),
      "user1 assets": fa(await tokenU1.balanceOf(user1.address)),
      "user1 shares": fs(await vaultU1.balanceOf(user1.address)),
      "user2 assets": fa(await tokenU2.balanceOf(user2.address)),
      "user2 shares": fs(await vaultU1.balanceOf(user2.address)),
    }
    console.table(Object.entries(state).map(([key, value]) => ({ Property: key, Value: value })));
  }

  function pa(value: string) {
    return ethers.parseUnits(value, assetDecimals);
  }
  function fa(value: bigint) {
    return ethers.formatUnits(value, assetDecimals);
  }
  function ps(value: string) {
    return ethers.parseUnits(value, shareDecimals);
  }
  function fs(value: bigint) {
    return ethers.formatUnits(value, shareDecimals);
  }

}

simulate().catch(console.log)