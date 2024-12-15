import type { OnTransactionHandler } from "@metamask/snaps-sdk";
import { Box, Heading, Text, Image, Row, Address, Divider, Link } from "@metamask/snaps-sdk/jsx";
import { NOT_VERIFIED_IMAGE,CAUTION_IMAGE, VERIFIED_IMAGE } from "./utils/images";
import { SCIContractFactory } from "./factories/SCIContractFactory";
import { namehash } from "@ensdomains/ensjs/utils";
import { AlchemyProvider } from "ethers";
import { extractDomain, formatAddress, getRegistrationTime, wasVerifiedRecently } from "./utils/helpers";
import { formatTimestamp } from "./utils/time";

const ONE_DAY_MS = 86_400_000n * BigInt(3); // 3 days in milliseconds as bigint

// Handle outgoing transactions.
export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin,
  transaction,
  chainId,
}) => {
  const domain = extractDomain(transactionOrigin);
  const domainHash = namehash(domain);
  const chainNumber = chainId.split(":").at(1);
  const provider = new AlchemyProvider(
    process.env.CHAIN ?? "mainnet",
    process.env.ALCHEMY_PROVIDER_API_KEY
  );
  const contract = await SCIContractFactory.getContract(provider);

  const registrationTime = await getRegistrationTime(
    contract,
    domainHash,
    transaction.to as string,
    chainNumber as string
  );

  const contractIsVerified = registrationTime > 0n;
  const now = BigInt(Date.now());
  const contractIsVerifiedLessThanADayAgo = wasVerifiedRecently(
    registrationTime,
    now,
    ONE_DAY_MS
  );
  return {
    content: (
      <Box>
        <Image src={contractIsVerifiedLessThanADayAgo ? CAUTION_IMAGE : contractIsVerified ? VERIFIED_IMAGE : NOT_VERIFIED_IMAGE} />
        <Heading>SCI Verification</Heading>
        <Text>
          {`This Contract is ${!contractIsVerified ? 'not' : ''} verified`}
        </Text>
        {contractIsVerifiedLessThanADayAgo && <Heading>Caution! This contract was verified less than a day ago</Heading>}
        <Divider/>
        <Row label="Origin" tooltip="The website domain where the transaction has been invoked">
          <Text>
          {domain}
          </Text>
        </Row>
        <Row label="Chain ID" tooltip="The chain where the transaction is taking place">
          <Text>
          {chainId}
          </Text>
        </Row>
        <Row label="Contract" tooltip={transaction.to.toString()}>
          <Address address={formatAddress(transaction.to.toString())}/>
        </Row>
        <Row label="Registration">
          <Text>{formatTimestamp(registrationTime)}</Text>
        </Row>
        {!contractIsVerified &&
          <Box>
            <Divider/>
            <Heading>Are you the owner of this domain?</Heading>
            <Box alignment="center">
              <Link href="https://www.app.sci.domains/domains/add">Verify Domain</Link>
            </Box>
          </Box>
        }
      </Box>
    ),
  };
};
