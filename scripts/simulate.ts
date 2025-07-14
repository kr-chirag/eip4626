import { ethers } from "hardhat";
import {Vault__factory} from "../typechain-types"
import AddressBook from "../utils/AddressBook"

async function simulate(){
  const [signer] = await ethers.getSigners();
  const vaultAddress = AddressBook.get("Vault");
  const vault = Vault__factory.connect(vaultAddress, signer);

  console.log(await vault.name());
  
}

simulate().catch(console.log)