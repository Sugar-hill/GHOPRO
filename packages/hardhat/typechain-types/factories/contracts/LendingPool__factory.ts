/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type {
  Signer,
  AddressLike,
  ContractDeployTransaction,
  ContractRunner,
} from "ethers";
import type { NonPayableOverrides } from "../../common";
import type {
  LendingPool,
  LendingPoolInterface,
} from "../../contracts/LendingPool";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_oracle",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
    ],
    name: "LoanCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "LoanLiquidated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "LoanRepaid",
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
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
    ],
    name: "createLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "liquidateLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "loanCounter",
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
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "loans",
    outputs: [
      {
        internalType: "address",
        name: "borrower",
        type: "address",
      },
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "collateral",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "oracle",
    outputs: [
      {
        internalType: "contract RWAOracle",
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
        internalType: "uint256",
        name: "loanId",
        type: "uint256",
      },
    ],
    name: "repayLoan",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b506040516109a23803806109a2833981016040819052602c91605e565b60008054336001600160a01b031991821617909155600180549091166001600160a01b0392909216919091179055608c565b600060208284031215606f57600080fd5b81516001600160a01b0381168114608557600080fd5b9392505050565b6109078061009b6000396000f3fe608060405234801561001057600080fd5b506004361061007d5760003560e01c8063ab7b1c891161005b578063ab7b1c89146100de578063ccdd9f5d146100f1578063e1ec3c6814610104578063f851a4401461018657600080fd5b806334d9289e14610082578063488dd3e61461009e5780637dc0d1d0146100b3575b600080fd5b61008b60035481565b6040519081526020015b60405180910390f35b6100b16100ac3660046107e9565b610199565b005b6001546100c6906001600160a01b031681565b6040516001600160a01b039091168152602001610095565b6100b16100ec36600461082a565b61048b565b6100b16100ff36600461082a565b61067b565b61015161011236600461082a565b6002602081905260009182526040909120805460018201549282015460038301546004909301546001600160a01b039283169490921692909160ff1685565b604080516001600160a01b0396871681529590941660208601529284019190915260608301521515608082015260a001610095565b6000546100c6906001600160a01b031681565b6001546040516341976e0960e01b81526001600160a01b03858116600483015260009216906341976e0990602401602060405180830381865afa1580156101e4573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102089190610843565b116102505760405162461bcd60e51b8152602060048201526013602482015272151bdad95b881b9bdd081cdd5c1c1bdc9d1959606a1b60448201526064015b60405180910390fd5b6001546040516341976e0960e01b81526001600160a01b03858116600483015260009216906341976e0990602401602060405180830381865afa15801561029b573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102bf9190610843565b6102c99083610872565b90508281101561031b5760405162461bcd60e51b815260206004820152601760248201527f496e73756666696369656e7420636f6c6c61746572616c0000000000000000006044820152606401610247565b6040516323b872dd60e01b8152336004820152306024820152604481018390526001600160a01b038516906323b872dd906064016020604051808303816000875af115801561036e573d6000803e3d6000fd5b505050506040513d601f19601f82011682018060405250810190610392919061088f565b506040805160a081018252338082526001600160a01b03878116602080850191825284860189815260608087018a81526001608089018181526003805460009081526002808952908d90209b518c546001600160a01b0319908116918c16919091178d559851938c018054909916939099169290921790965592519588019590955593518682015591516004909501805460ff19169515159590951790945554845192835292820187905292810185905290917f3373919ad665425d2cddb4072830e5935b6ee308440fa99b23383648da473bc0910160405180910390a260038054906000610480836108b8565b919050555050505050565b6000818152600260205260409020600481015460ff166104e25760405162461bcd60e51b81526020600482015260126024820152714c6f616e206973206e6f742061637469766560701b6044820152606401610247565b80546001600160a01b0316331461053b5760405162461bcd60e51b815260206004820152601760248201527f4f6e6c7920626f72726f7765722063616e2072657061790000000000000000006044820152606401610247565b600181015460028201546040516323b872dd60e01b815233600482015230602482015260448101919091526001600160a01b03909116906323b872dd906064016020604051808303816000875af115801561059a573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105be919061088f565b5060018101548154600383015460405163a9059cbb60e01b81526001600160a01b039283166004820152602481019190915291169063a9059cbb906044016020604051808303816000875af115801561061b573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061063f919061088f565b5060048101805460ff1916905560405182907f9a7851747cd7ffb3fe0a32caf3da48b31f27cebe131267051640f8b72fc4718690600090a25050565b6000818152600260205260409020600481015460ff166106d25760405162461bcd60e51b81526020600482015260126024820152714c6f616e206973206e6f742061637469766560701b6044820152606401610247565b60018054908201546040516341976e0960e01b81526001600160a01b03918216600482015260009291909116906341976e0990602401602060405180830381865afa158015610725573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107499190610843565b82600301546107589190610872565b9050816002015481106107ad5760405162461bcd60e51b815260206004820152601e60248201527f436f6c6c61746572616c2076616c75652069732073756666696369656e7400006044820152606401610247565b60048201805460ff1916905560405183907faf91ffe368225045d42f7c2b4b90feb438133ac1e375e73bc9066652b70a1d7790600090a2505050565b6000806000606084860312156107fe57600080fd5b83356001600160a01b038116811461081557600080fd5b95602085013595506040909401359392505050565b60006020828403121561083c57600080fd5b5035919050565b60006020828403121561085557600080fd5b5051919050565b634e487b7160e01b600052601160045260246000fd5b80820281158282048414176108895761088961085c565b92915050565b6000602082840312156108a157600080fd5b815180151581146108b157600080fd5b9392505050565b6000600182016108ca576108ca61085c565b506001019056fea2646970667358221220e1f8272057b401d9c1dd1d81aae62641fdb929bf4f4b43a7e884b913747aa19764736f6c634300081a0033";

type LendingPoolConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: LendingPoolConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class LendingPool__factory extends ContractFactory {
  constructor(...args: LendingPoolConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    _oracle: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(_oracle, overrides || {});
  }
  override deploy(
    _oracle: AddressLike,
    overrides?: NonPayableOverrides & { from?: string }
  ) {
    return super.deploy(_oracle, overrides || {}) as Promise<
      LendingPool & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): LendingPool__factory {
    return super.connect(runner) as LendingPool__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): LendingPoolInterface {
    return new Interface(_abi) as LendingPoolInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): LendingPool {
    return new Contract(address, _abi, runner) as unknown as LendingPool;
  }
}