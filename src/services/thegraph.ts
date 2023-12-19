
export type Contracts = Array<{contract: {chainId: string, address: string}}>
export type Domains = Array<{
  id: string
  contracts: Contracts
}>
export interface ContractsGraphQLResponseQuery {
  data: {
    domains: Domains
  }
}

export async function queryTheGraphGraphQl(body: string): Promise<Domains | null>   {
  try {
    const response = await fetch('https://api.thegraph.com/subgraphs/name/alavarello/sci-goerli', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body
    })

    if (response.status !== 200) {
      return null;
    }

    const json: ContractsGraphQLResponseQuery = await response.json()
    return json.data.domains;

  } catch(error: unknown) {
    console.error(error)
    return null
  }
}
