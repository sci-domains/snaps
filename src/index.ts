import type { OnTransactionHandler } from '@metamask/snaps-types';
import {
  divider,
  heading,
  image,
  panel,
  text,
} from '@metamask/snaps-ui';
import { AlchemyProvider } from 'ethers';

import { SCIContractFactory } from './factories/SCIContractFactory';

const VERIFIED_IMAGE = image(
  '<svg style="width: 100%; width: 50px; height: 50px;" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="16px" height="16px"><path fill="#bae0bd" d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"/><path fill="#5e9c76" d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19,s19-8.5,19-19S30.5,1,20,1L20,1z"/><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="3" d="M11.2,20.1l5.8,5.8l13.2-13.2"/></svg>',
);
const NOT_VERIFIED_IMAGE = image(
  '<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="40px" height="40px"><path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"/><path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"/><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"/><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"/></svg>',
);

export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin,
  transaction,
  chainId,
}) => {
  const domain = transactionOrigin?.split('//').at(1);
  const chainNumber = chainId.split(':').at(1);
  const provider = new AlchemyProvider('mainnet', process.env.ALCHEMY_PROVIDER_API_KEY);
  const contract = await SCIContractFactory.getContract(provider);

  let isWhitelisted = false;

  try {
    isWhitelisted = await contract.isVerifiedForDomain(
      domain as string,
      transaction.to as string,
      chainNumber as string,
    );
  } catch (error) {
    console.error('Error verifiying domain:', error);
  }

  return {
    content: panel([
      heading('SCI Verification'),
      text(`Origin: **${transactionOrigin!}**!`),
      text(`Chain id: ${chainId}`),
      text(`Contract ${transaction.to}`),
      divider(),
      isWhitelisted
        ? text('This Contract is verified')
        : text('This Contract is not verified!'),
      isWhitelisted ? VERIFIED_IMAGE : NOT_VERIFIED_IMAGE,
    ]),
  };
};
