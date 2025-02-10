import type { SCI } from '@secure-ci/core';
import { SCI__factory } from '@secure-ci/core';
import { deployments } from '@secure-ci/core/dist/deployments'
import { Provider } from 'ethers';

export class SCIContractFactory {
  static async getContract(_provider: Provider): Promise<SCI> {
    const network = await _provider.getNetwork();
    const contractAddress = deployments[network.chainId.toString()]?.['SciModule#SCI']

    if (!contractAddress) {
      throw Error(`Could not find a contract for ${network.chainId}`);
    }

    // TODO: Fix _provider cast to any. Expects ContractRunner
    return SCI__factory.connect(
      contractAddress, _provider
    );
  }
}
