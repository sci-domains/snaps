export type Contracts = Array<{
  contract: {
    chainId: string,
    address: string,
  }
}>

export type Domains = Array<{
  id: string,
  contracts: Contracts,
}>

export interface ContractsGraphQLResponseQuery {
  data: {
    domains: Domains,
  }
}
