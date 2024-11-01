import type { SCI } from '@secure-ci/core';
import { SCI__factory } from '@secure-ci/core';
import * as rawAddresses from '@secure-ci/core/addresses.json';
import type { Provider } from 'ethers';

type AddressMap = {
  [networkId: string]: {
    'SciRegistry#SciRegistry': string;
    'PublicListVerifier#PublicListVerifier': string;
    'SciRegstrar#SciRegistrar': string;
    'ProxyModule#SCI': string;
    'ProxyModule#TransparentUpgradeableProxy': string;
    'ProxyModule#ProxyAdmin': string;
    'SciModule#SCI': string;
  };
};

const addresses = rawAddresses as AddressMap;

export class SCIContractFactory {
  static async getContract(_provider: Provider): Promise<SCI> {
    const network = await _provider.getNetwork();
    const contractAddress =
      addresses[network.chainId.toString()]?.['SciModule#SCI'];

    if (!contractAddress) {
      throw Error(`Could not find a contract for ${network.chainId}`);
    }

    // TODO: Fix _provider cast to any. Expects ContractRunner
    return SCI__factory.connect(contractAddress, _provider as any);
  }
}
