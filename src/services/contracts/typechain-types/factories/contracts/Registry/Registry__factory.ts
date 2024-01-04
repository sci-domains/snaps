/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Interface, type ContractRunner } from "ethers";
import type {
  Registry,
  RegistryInterface,
} from "../../../contracts/Registry/Registry";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
    ],
    name: "AccountIsNotAuthorizeToRegisterDomain",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
    ],
    name: "AccountIsNotDomainOwner",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "authorizerId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "contract Authorizer",
        name: "authorizer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
    ],
    name: "AuthorizerAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "authorizer",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "domain",
        type: "string",
      },
    ],
    name: "DomainRegistered",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "verifierId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "contract Verifier",
        name: "verifier",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
    ],
    name: "TrustedVerifierAdded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "contract Verifier",
        name: "verifier",
        type: "address",
      },
    ],
    name: "VerifierAdded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "authorizerId",
        type: "uint256",
      },
      {
        internalType: "contract Authorizer",
        name: "authorizer",
        type: "address",
      },
    ],
    name: "addAuthorizer",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
      {
        internalType: "contract Verifier",
        name: "verifier",
        type: "address",
      },
    ],
    name: "addVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
    ],
    name: "domainHashToRecord",
    outputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "contract Verifier",
        name: "verifier",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
    ],
    name: "domainOwner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
    ],
    name: "domainVerifier",
    outputs: [
      {
        internalType: "contract Verifier",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "domainHash",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "isDomainOwner",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "authorizer",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "string",
        name: "domain",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isWildcard",
        type: "bool",
      },
    ],
    name: "registerDomain",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "authorizer",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "domain",
        type: "string",
      },
      {
        internalType: "bool",
        name: "isWildcard",
        type: "bool",
      },
      {
        internalType: "contract Verifier",
        name: "verifier",
        type: "address",
      },
    ],
    name: "registerDomainWithVerifier",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

export class Registry__factory {
  static readonly abi = _abi;
  static createInterface(): RegistryInterface {
    return new Interface(_abi) as RegistryInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Registry {
    return new Contract(address, _abi, runner) as unknown as Registry;
  }
}
