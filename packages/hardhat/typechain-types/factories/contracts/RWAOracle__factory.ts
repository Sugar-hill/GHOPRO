/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../../common";
import type { RWAOracle, RWAOracleInterface } from "../../contracts/RWAOracle";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "PriceUpdated",
    type: "event",
  },
  {
    inputs: [],
    name: "admin",
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
        internalType: "address",
        name: "token",
        type: "address",
      },
    ],
    name: "getPrice",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "prices",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
    ],
    name: "setPrice",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50600080546001600160a01b03191633179055610241806100316000396000f3fe608060405234801561001057600080fd5b506004361061004b5760003560e01c8062e4768b1461005057806341976e0914610065578063cfed246b146100a1578063f851a440146100c1575b600080fd5b61006361005e3660046101bf565b6100ec565b005b61008e6100733660046101e9565b6001600160a01b031660009081526001602052604090205490565b6040519081526020015b60405180910390f35b61008e6100af3660046101e9565b60016020526000908152604090205481565b6000546100d4906001600160a01b031681565b6040516001600160a01b039091168152602001610098565b6000546001600160a01b0316331461014a5760405162461bcd60e51b815260206004820152601c60248201527f4f6e6c792061646d696e2063616e207570646174652070726963657300000000604482015260640160405180910390fd5b6001600160a01b03821660008181526001602052604090819020839055517f0d86730737b142fc160892fa8a0f2db687a92a0e294d1ad70624cf5acef03b84906101979084815260200190565b60405180910390a25050565b80356001600160a01b03811681146101ba57600080fd5b919050565b600080604083850312156101d257600080fd5b6101db836101a3565b946020939093013593505050565b6000602082840312156101fb57600080fd5b610204826101a3565b939250505056fea264697066735822122048d01c37e2ed7f931b0ba3b9a95028a687264681f66bd188779400fa2f350c7764736f6c634300081a0033";

type RWAOracleConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: RWAOracleConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class RWAOracle__factory extends ContractFactory {
  constructor(...args: RWAOracleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      RWAOracle & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): RWAOracle__factory {
    return super.connect(runner) as RWAOracle__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RWAOracleInterface {
    return new Interface(_abi) as RWAOracleInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): RWAOracle {
    return new Contract(address, _abi, runner) as unknown as RWAOracle;
  }
}
