import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    worldSepolia: {
      url: "https://worldchain-sepolia.g.alchemy.com/public",
      accounts: [process.env.PVT_KEY || ""],
    },
  }
};

export default config;
