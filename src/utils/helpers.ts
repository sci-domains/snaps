export const formatAddress = (input: string): `0x${string}` => {
  if (input.startsWith('0x')) {
    return input as `0x${string}`;
  }
  const stripped = input.split('0x')[1];
  return `0x${stripped}`;
};

export const extractDomain = (
  transactionOrigin: string | undefined,
): string => {
  if (!transactionOrigin) {
    return '';
  }
  const domain = transactionOrigin.split('//').at(1);
  if (!domain) {
    throw new Error(`Could not get domain from: ${transactionOrigin}`);
  }
  return domain;
};

export const getRegistrationTime = async (
  contract: any,
  domainHash: string,
  to: string,
  chainNumber: string,
): Promise<bigint> => {
  try {
    return await contract.isVerifiedForDomainHash(domainHash, to, chainNumber);
  } catch (error) {
    console.error('Error verifying domain:', error);
    return 0n;
  }
};

export const wasVerifiedRecently = (
  registrationTime: bigint,
  now: bigint,
  thresholdMs: bigint,
): boolean => {
  return now - registrationTime * 1000n < thresholdMs;
};
