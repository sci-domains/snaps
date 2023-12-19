# secure-ci Snaps

## Description

Contains the main code to be run to get the Metamask snap for secure CI up and running.

## How to run
On the `snaps` folder root run
- nvm use
- yarn
- yarn start

This will start the snap in localhost:8080

## Testing

The snap comes with some basic tests, to demonstrate how to write tests for
snaps. To test the snap, run `yarn test` in this directory. This will use
[`@metamask/snaps-jest`](https://github.com/MetaMask/snaps/tree/main/packages/snaps-jest)
to run the tests in `src/index.test.ts`.

## More on Metamask Snaps
- [Metamask Snaps Docs](https://docs.metamask.io/snaps/)
