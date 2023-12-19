export const THE_GRAPH_CONTRACTS_WHITELISTED_QUERY = `
query DomainWhitelistedAddresses($domain: ID!, $contract: String!) {
    domains(where: {id: $domain}) {
      id
      contracts(where: {contract: $contract}) {
        contract {
          id
          chainId
          address
        }
      }
    }
  }
`
