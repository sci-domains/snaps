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
  `<svg width="200" height="25" viewBox="0 0 200 25" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
    <g clip-path="url(#clip0_8_612)">
      <rect x="0.940918" y="0.100647" width="24" height="24" rx="12" fill="#C8FCB6"/>
      <path d="M6.58704 12.9011L10.6041 16.6854L19.6607 8.15369" stroke="#257F06" stroke-width="1.24759" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.9411 1.34824C18.87 1.34824 23.6935 6.17173 23.6935 12.1006C23.6935 18.0295 18.87 22.853 12.9411 22.853C7.01224 22.853 2.18876 18.0295 2.18876 12.1006C2.18876 6.17173 7.01224 1.34824 12.9411 1.34824ZM12.9411 0.100647C6.31376 0.100647 0.941162 5.47324 0.941162 12.1006C0.941162 18.728 6.31376 24.1006 12.9411 24.1006C19.5685 24.1006 24.9411 18.728 24.9411 12.1006C24.9411 5.47324 19.5686 0.100647 12.9411 0.100647Z" fill="#257F06"/>
    </g>
    <defs>
      <clipPath id="clip0_8_612">
        <rect x="0.940918" y="0.100647" width="24" height="24" rx="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>`
);

const NOT_VERIFIED_IMAGE = image(
  `<svg width="200" height="25" viewBox="0 0 200 25" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin">
    <g clip-path="url(#clip0_7_410)">
      <rect x="0" y="0.100685" width="24" height="24" rx="12" fill="#FFD0D6"/>
      <path d="M17.8151 17.156L6.18555 7.04533" stroke="#850010" stroke-width="1.24759" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.18463 17.156L17.8142 7.04533" stroke="#850010" stroke-width="1.24759" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12 1.34828C17.9289 1.34828 22.7524 6.17177 22.7524 12.1007C22.7524 18.0296 17.9289 22.853 12 22.853C6.07108 22.853 1.24759 18.0296 1.24759 12.1007C1.24759 6.17177 6.07108 1.34828 12 1.34828ZM12 0.100685C5.37259 0.100685 0 5.47328 0 12.1007C0 18.728 5.37259 24.1006 12 24.1006C18.6274 24.1006 24 18.728 24 12.1007C24 5.47328 18.6274 0.100685 12 0.100685Z" fill="#850010"/>
    </g>
    <defs>
      <clipPath id="clip0_7_410">
        <rect x="0" y="0.100685" width="24" height="24" rx="12" fill="white"/>
      </clipPath>
    </defs>
  </svg>`
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
      isWhitelisted ? VERIFIED_IMAGE : NOT_VERIFIED_IMAGE,
      heading('SCI Verification'),
      isWhitelisted
      ? text('This Contract is verified')
      : text('This Contract is not verified!'),
      divider(),
      text('**Origin**'),
      text(transactionOrigin),
      text('**Chain ID**'),
      text(chainId),
      text('**Contract**'),
      text(transaction.to?.toString()),
    ]),
  };
};
