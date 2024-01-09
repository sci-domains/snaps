import { AbstractProvider } from "ethers";
import { SCI, SCI__factory } from "../services/contracts/typechain-types";


interface SCIContractProviderParams {
  contractAddress: string, provider: AbstractProvider
}

export class SCIContractProvider {
  private SCIContract: SCI;

  constructor({ contractAddress, provider }: SCIContractProviderParams) {
    this.SCIContract = SCI__factory.connect(contractAddress, provider)
  }

  isVerifiedForDomain = async (domain: string, chainId: string, address: string): Promise<boolean> => {
    return this.SCIContract.isVerifiedForDomain(domain, chainId, address)
  }
}
