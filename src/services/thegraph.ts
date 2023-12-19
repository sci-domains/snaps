interface ContractsGraphQLResponseQuery {
  data: {
    domains: Array<{
      id: string
      contracts: Array<{contract: {chainId: string, address: string}}>
    }>
  }
}

export async function queryTheGraphGraphQl(body: string) {
  const r = await fetch('https://api.thegraph.com/subgraphs/name/alavarello/sci-goerli', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body
  })

  if (r.status !== 200) {
    return null;
  }


  const response: ContractsGraphQLResponseQuery = await r.json()
  return response.data;
}
