export const THE_GRAPH_CONTRACTS_WHITELISTED_QUERY = `
query DomainWhitelistedAddresses($domain: String, $chainId: String, $address: String) {
    domains(where:{id: $domain}) {
      id
      contracts(where: {contract: $chainId:$address}) {
        contract {
          id
          chainId
          address
        }
      }
    }
  }
`
