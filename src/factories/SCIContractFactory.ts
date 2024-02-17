import { Provider } from "ethers";
import { SCI_GOERLI_CONTRACT_ADDRESS } from "../constants";
import {SCI, SCI__factory} from "@secure-ci/core/dist/typechain-types";

export class SCIContractFactory {
  private static _configs: {[key: number]: string} = {
    5: SCI_GOERLI_CONTRACT_ADDRESS,
  }

  static async getContract(_provider: Provider): Promise<SCI> {
    const network = await _provider.getNetwork();
    const contractAddress = this._configs[network.chainId as unknown as number]

    if (!contractAddress) throw Error(`Could not find a contract for ${network.chainId}`)

    return SCI__factory.connect(contractAddress, _provider)
  }
}
