import * as fs from 'fs'
import { network } from 'hardhat';

type TAddressType = "Vault" | "AssetToken"

class AddressBook {
  static dir = "./deployments/"
  static path = `${this.dir}${network.name}.json`
  static set(type: TAddressType, address: string){
    try{
      if (!fs.existsSync(this.dir)) {
        fs.mkdirSync(this.dir, { recursive: true });
      }
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, '{}', 'utf-8');
      }
      const data = fs.readFileSync(this.path, 'utf-8')
      const addresses: { [key in TAddressType]?: string } = JSON.parse(data);
      addresses[type] = address;
      fs.writeFileSync(this.path, JSON.stringify(addresses, null, 2), 'utf-8');
    }catch(error){
      console.log("error while daving address:", error)
    }
  }
  static get(type: TAddressType): string {
    try {
      const data = fs.readFileSync(this.path, 'utf-8');
      const addresses: { [key in TAddressType]?: string } = JSON.parse(data);
      return addresses[type] || '';
    } catch (error) {
      console.log("error while getting address:", error);
      return '';
    }
  }
}

export default AddressBook;