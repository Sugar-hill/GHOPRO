# GHO-PRO

<h4 align="center">
  <a href="https://docs.scaffoldeth.io">Documentation</a> |
  <a href="https://scaffoldeth.io">Website</a>
</h4>

# 🌍 Real Estate-Backed Lending Platform

A blockchain-based lending protocol that allows users to secure loans by tokenizing real-world assets (RWAs) like real estate. This platform ensures transparency, traceability, and security through decentralized smart contracts. Users can tokenize their assets, set collateral, borrow funds, and repay loans seamlessly.

---

## ✨ Features
- **Real-World Asset Tokenization**: Convert tangible assets (e.g., farmland, gold, real estate) into digital tokens.
- **Collateralized Lending**: Borrow funds against tokenized assets as collateral.
- **Oracle Integration**: Ensures real-time and accurate pricing of tokenized assets.
- **Automated Liquidation**: Safeguards lenders by selling collateral if its value falls below the loan amount.
- **Blockchain Transparency**: Immutable and traceable transactions.

---

## 🛠 Tech Stack
- **Smart Contracts**: Built using Solidity for decentralized operations.
  - `LendingPool.sol`: Handles loan creation, repayment, and liquidation.
  - `RWAOracle.sol`: Manages real-time price feeds for tokenized assets.
  - `MockRWAToken.sol`: Simulates tokenized real-world assets.Deployed at : https://block-explorer.testnet.lens.dev/address/0x8D2F2B42973b07b43eF2126281ab3721aaf88F09
- **Frontend**: 
  - React.js for a seamless user interface.
  - TailwindCSS for responsive design.
- **Backend**:
  - Node.js for API interactions.
  - Express.js for server-side logic.
- **Blockchain**: Deployed on the **Lens Protocol** for secure and decentralized asset management.
- **Testing**: Hardhat and Mocha for robust smart contract testing.
- **Deployment**: Deployed to Ethereum-compatible networks using Hardhat.

---

## 🚀 How It Works
1. **Tokenization**: Users mint tokens representing their assets using `MockRWAToken`.
2. **Collateralization**: Approve the `LendingPool` contract to hold collateral.
3. **Loan Request**: Borrow funds by providing collateral. The loan is approved if the collateral value meets the requirement.
4. **Repayment**: Repay the loan to retrieve collateral.
5. **Liquidation**: Automatically liquidate collateral if its value drops below the loan amount.

---

## 📦 Installation

### Prerequisites
- Node.js
- Yarn or npm
- Hardhat

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-estate-lending-platform.git
   cd real-estate-lending-platform


## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.18)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

## Quickstart

To get started with , follow the steps below:

1. Install 

```
npx create-eth@latest
```

This command will install all the necessary packages and dependencies, so it might take a while.

> [!NOTE]
> You can also initialize your project with one of our extensions to add specific features or starter-kits. Learn more in our [extensions documentation](https://docs.scaffoldeth.io/extensions/).

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network that runs on your local machine and can be used for testing and development. Learn how to [customize your network configuration](https://docs.scaffoldeth.io/quick-start/environment#1-initialize-a-local-blockchain).

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. You can find more information about how to customize your contract and deployment script in our [documentation](https://docs.scaffoldeth.io/quick-start/environment#2-deploy-your-smart-contract).

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.


