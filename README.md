# secure-ci

### Description

This project is structured in several parts that together build up the whole system.
- A `contract` folder containing all infrastructure and code necessary to deploy and run the smart contract Regitry and authorize.
- A `eas-contracts` folder with the infrastructure and code to run the EAS.
- A `graphql` folder with the specifications an infrastructure to run the graph deployed in The Graph.
- `nounsbg` folder gives a script to create a nice background image with randomized nouns.
- `snaps` contains the main code to be run to get the Metamask snap for secure CI up and running and finally
- `app` folder contains the main applications and front-ends used to gather all the pieces together

## Contract

## EAS-Contracts

## GraphQL

## NounsBG

## Snaps

- Bootstrapped on the metamask example on snaps

### How to run
On the `snaps` folder root run
- nvm use
- yarn
- yarn start

This will start the snap in localhost:8080

## App
.

# TypeScript Example Snap

This snap demonstrates how to develop a snap with TypeScript. It is a simple
snap that displays a confirmation dialog when the `hello` JSON-RPC method is
called.

## Testing

The snap comes with some basic tests, to demonstrate how to write tests for
snaps. To test the snap, run `yarn test` in this directory. This will use
[`@metamask/snaps-jest`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-jest)
to run the tests in `src/index.test.ts`.
