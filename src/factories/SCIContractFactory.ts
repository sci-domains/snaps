import { deployments, SCI__factory, SCI } from '@secure-ci/core'
import { Provider } from 'ethers';

type SupportedChainIds = '10' | '11155420'

export class SCIContractFactory {
  static async getContract(_provider: Provider): Promise<SCI> {
    const network = await _provider.getNetwork();
    const contractAddress = deployments[network.chainId.toString() as SupportedChainIds]['SciModule#SCI']

    if (!contractAddress) {
      throw Error(`Could not find a contract for ${network.chainId}`);
    }

    return SCI__factory.connect(contractAddress, _provider);
  }
}
