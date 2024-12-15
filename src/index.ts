import { namehash } from '@ensdomains/ensjs/utils';
import type { OnTransactionHandler } from '@metamask/snaps-types';
import { divider, heading, panel, text } from '@metamask/snaps-ui';
import { AlchemyProvider } from 'ethers';

import { SCIContractFactory } from './factories/SCIContractFactory';
import { NOT_VERIFIED_IMAGE, VERIFIED_IMAGE } from './utils/images';
import { formatTimestamp } from './utils/time';

export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin,
  transaction,
  chainId,
}) => {
  const domain = transactionOrigin?.split('//').at(1);
  if (!domain) {
    throw Error(
      `Could not get domain from transaction origin: ${transactionOrigin}`,
    );
  }
  const domainHash = namehash(domain.toString());
  const chainNumber = chainId.split(':').at(1);
  const provider = new AlchemyProvider(
    process.env.CHAIN ?? 'mainnet',
    process.env.ALCHEMY_PROVIDER_API_KEY,
  );
  const contract = await SCIContractFactory.getContract(provider);

  let registrationTime = 0n;

  try {
    registrationTime = await contract.isVerifiedForDomainHash(
      domainHash,
      transaction.to as string,
      chainNumber as string,
    );
  } catch (error) {
    console.error('Error verifiying domain:', error);
  }

  return {
    content: panel(
      [
        registrationTime > 0 ? VERIFIED_IMAGE : NOT_VERIFIED_IMAGE,
        heading('SCI Verification'),
        registrationTime > 0
          ? text('This Contract is verified')
          : text('This Contract is not verified!'),
        divider(),
        text('**Origin**'),
        text(transactionOrigin),
        text('**Chain ID**'),
        text(chainId),
        text('**Contract**'),
        text(transaction.to?.toString()),
      ].concat(
        registrationTime > 0
          ? [text('**Registration**'), text(formatTimestamp(registrationTime))]
          : [],
      ),
    ),
  };
};
