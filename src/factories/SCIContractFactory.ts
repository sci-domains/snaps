import type { SCI } from '@secure-ci/core/dist/types';
import { SCI__factory as SCIFactory } from '@secure-ci/core/dist/types/factories/contracts';
import type { Provider } from 'ethers';

import { SCI_GOERLI_CONTRACT_ADDRESS } from '../constants';

export class SCIContractFactory {
  private static readonly _configs: { [key: number]: string } = {
    5: SCI_GOERLI_CONTRACT_ADDRESS,
  };

  static async getContract(_provider: Provider): Promise<SCI> {
    const network = await _provider.getNetwork();
    const contractAddress = this._configs[network.chainId as unknown as number];

    if (!contractAddress) {
      throw Error(`Could not find a contract for ${network.chainId}`);
    }

    return SCIFactory.connect(contractAddress, _provider);
  }
}
