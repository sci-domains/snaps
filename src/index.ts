import type { Json, OnTransactionHandler } from '@metamask/snaps-types';
import { copyable, divider, heading, image, panel, text } from '@metamask/snaps-ui';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BigNumberish, toBeHex } from 'ethers';

interface ContractsGraphQLResponseQuery {
  data: {
    domains: Array<{
      id: string
      contracts: Array<{contract: {chainId: string, address: string}}>
    }>
  }
}

async function queryTheGraphGraphQl(query: any) {
  const r = await fetch('https://api.thegraph.com/subgraphs/name/alavarello/sci-goerli', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })

  if (r.status !== 200) {
    return null;
  }


  const b: ContractsGraphQLResponseQuery = await r.json()
  return b.data;
}

async function getWhitelistedAddressForDomain(domain: string, chainId: string, address: string) {
  const response = await queryTheGraphGraphQl(`
    query DomainWhitelistedAddresses {
        domains(where:{id: "${domain}"}) {
          id
          contracts(where: {contract: "${chainId}:${address}"}) {
            contract {
              id
              chainId
              address
            }
          }
        }
      }
  `)
  if (!response) return null;

  return response
}

export const reportContractSchema = {
  // Real
  // uid: '0xb3e08a4b4e4d5f630f5a99978ad145cbe9eab4d9056764d5ae1dc7affcbc9649',

  // Fake
  uid: '0x83afd9a91bb9fc6178eccaac3ada2b308e841c4734e604ac6ee05baba196ce01',
};

export const reportDomainSchema = {
  // Real
  // uid: '0xeb484fecad7933bf4a88ee7f5308f167e5bdddfa6a751f618da49cd9497509af',

  // Fake
  uid: '0x6e5d0825f511b78440f9ff4e83bbaf4afeb51458bec3ca781612f2c944ef3d7f',
};

const EAS_SEPOLIA_GRAPH_QL = 'https://sepolia.easscan.org/graphql';

export async function getReportsByContract(chainId: BigNumberish, contractAddress: string | number | boolean | Json[] | { [prop: string]: Json; } | null | undefined) {
  const r = await queryEASGraphQl(`
  query ReportsByContract {
    aggregateAttestation(where: {
      schemaId: {
        equals: "${reportContractSchema.uid}"
      }
      AND: [
        {
          decodedDataJson: {
            contains: "{\\"name\\":\\"chainId\\",\\"type\\":\\"uint256\\",\\"value\\":{\\"type\\":\\"BigNumber\\",\\"hex\\":\\"${toBeHex(chainId)}\\"}}"
          }
        },
        {
          decodedDataJson: {
            contains: "{\\"name\\":\\"contractAddress\\",\\"type\\":\\"address\\",\\"value\\":\\"${contractAddress}\\"}"
          }
        }
      ]
    }) {
      _count {
        id
      }
    }
  }
  `)
  if (!r) {
    return 0;
  }
  return r.aggregateAttestation._count.id;
}

export async function getReportsByDomainName(domainName: string | undefined) {
  const r = await queryEASGraphQl(`
  query ReportsByDomain {
    aggregateAttestation(where: {
      schemaId: {
        equals: "${reportDomainSchema.uid}"
      }
      decodedDataJson: {
        contains: "{\\"name\\":\\"domainName\\",\\"type\\":\\"string\\",\\"value\\":\\"${domainName}\\"}"
      }
    }) {
      _count {
        id
      }
    }
  }
  `)
  if (!r) {
    return 0;
  }
  return r.aggregateAttestation._count.id;
}

async function queryEASGraphQl(query: string) {
  const r = await fetch(EAS_SEPOLIA_GRAPH_QL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      query,
    })
  })

  if (r.status !== 200) {
    return null;
  }

  const b = await r.json()

  console.debug('eas graphql response', b)

  return b.data;
}

export const onTransaction: OnTransactionHandler = async ({
  transactionOrigin,
  transaction,
  chainId,
}) => {
  const domain = transactionOrigin?.split('//').at(1);
  const chainNumber = chainId.split(':').at(1)

  const [reportsByContract, reportsByDomainName, whitelistedAddressForDomain] = await Promise.all([
    getReportsByContract(chainNumber as unknown as BigNumberish, transaction.to),
    getReportsByDomainName(domain),
    getWhitelistedAddressForDomain(domain as string, chainNumber as string, transaction.to as string)
  ])

  const isWhitelisted = whitelistedAddressForDomain?.domains.find(
    (val) => val.contracts.find(val => val.contract.address === transaction.to))

  let verifiedImage = image('<svg style="width: 100%; width: 50px; height: 50px;" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="16px" height="16px"><path fill="#bae0bd" d="M20,38.5C9.8,38.5,1.5,30.2,1.5,20S9.8,1.5,20,1.5S38.5,9.8,38.5,20S30.2,38.5,20,38.5z"/><path fill="#5e9c76" d="M20,2c9.9,0,18,8.1,18,18s-8.1,18-18,18S2,29.9,2,20S10.1,2,20,2 M20,1C9.5,1,1,9.5,1,20s8.5,19,19,19	s19-8.5,19-19S30.5,1,20,1L20,1z"/><path fill="none" stroke="#fff" stroke-miterlimit="10" stroke-width="3" d="M11.2,20.1l5.8,5.8l13.2-13.2"/></svg>')
  let verifiedMessage = text('This Contract is verified')


  if(reportsByContract + reportsByDomainName > 0) {
    verifiedMessage = text('This Contract or Domain has been flagged')
    verifiedImage = image('<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#FAB005" stroke-width="1.5"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM8 11.25C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H16C16.4142 12.75 16.75 12.4142 16.75 12C16.75 11.5858 16.4142 11.25 16 11.25H8Z" fill="#FAB005" /></svg>')
  }

  if (isWhitelisted) {
    return {
      content: panel([
        heading('SCI Verification'),
        text(`Origin: **${transactionOrigin}**!`),
        text(`Chain ${chainId}`),
        text(`Contract ${transaction.to}`),
        divider(),
        verifiedMessage,
        verifiedImage,
        divider(),
        text('SCI Flags:'),
        text(`Domain reports ${reportsByDomainName}`),
        text(`Contract reports ${reportsByContract}`),
        divider(),
        text('Additional info can be found at:'),
        copyable(`https://secureci.xyz/domains/${domain}`)
      ]),
    }
  }

  return {
    content: panel([
      heading('SCI Verification'),
      text(`Origin: **${transactionOrigin}**!`),
      text(`Chain ${chainId}`),
      text(`Contract ${transaction.to}`),
      divider(),
      text('This Contract is not verified!'),
      image('<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 40 40" width="40px" height="40px"><path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"/><path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"/><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"/><path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"/></svg>'),
      divider(),
      text('SCI Flags:'),
      text(`Domain reports ${reportsByDomainName}`),
      text(`Contract reports ${reportsByContract}`),
      divider(),
      text('Additional info can be found at:'),
      copyable(`https://secureci.xyz/domains/${domain}`)
    ]),
  };
};
