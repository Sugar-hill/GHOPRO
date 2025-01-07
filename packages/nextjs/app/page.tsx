"use client";

import * as React from "react";
import { useState } from "react";
import { parseEther } from "viem";
import { useWriteContract, useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useTransactor } from "~~/hooks/scaffold-eth";
import DeployedContracts from "~~/contracts/deployedContracts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home: React.FC = () => {
  const { address: connectedAddress } = useAccount();
  const tx = useTransactor();

  const [loanDetails, setLoanDetails] = useState({ token: "", amount: 0, collateral: 0 });
  const [loanId, setLoanId] = useState<number | null>(null);
  const [mintDetails, setMintDetails] = useState({ to: "", amount: 0 });

  const { writeContractAsync } = useWriteContract();
  const { data: tokenPrice, isLoading: isPriceLoading } = useScaffoldReadContract({
    contractName: "RWAOracle",
    functionName: "getPrice",
    args: ["0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"],
    watch: true,
  });

  const { data: totalSupply, isLoading: isTotalSupplyLoading } = useScaffoldReadContract({
    contractName: "MockRWAToken",
    functionName: "totalSupply",
  });

  const { data: userBalance, isLoading: isUserBalanceLoading } = useScaffoldReadContract({
    contractName: "MockRWAToken",
    functionName: "balanceOf",
    args: [connectedAddress],
  });

  const handleTransaction = async (action: Function, successMessage: string) => {
    try {
      await action();
      toast.success(successMessage);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred. Check the console for details.");
    }
  };

  return (
    <>
      <div className="min-h-screen bg-base-100 flex flex-col items-center py-10">
        <h1 className="text-4xl font-bold mb-6">Empowering Your Investments with Real World Assets</h1>
        <p className="text-lg mb-4">
          Connected Address: <Address address={connectedAddress} />
        </p>

        {/* Token Info Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-4xl">
          <div className="card shadow-xl p-6 bg-secondary text-primary-content">
            <h2 className="card-title">Token Price</h2>
            <p>{isPriceLoading ? "Loading..." : tokenPrice?.toString() || "Not available"}</p>
          </div>
          <div className="card shadow-xl p-6 bg-secondary text-primary-content">
  <h2 className="card-title">Total Supply</h2>
  <p>
    {isTotalSupplyLoading
      ? "Loading..."
      : totalSupply
      ? (Number(totalSupply) / 1e18).toFixed(4) // Dividing by 10^18 and formatting to 4 decimals
      : "0"}
  </p>
</div>
<div className="card shadow-xl p-6 bg-secondary text-primary-content">
  <h2 className="card-title">Your Balance</h2>
  <p>
    {isUserBalanceLoading
      ? "Loading..."
      : userBalance
      ? (Number(userBalance) / 1e18).toFixed(4) // Dividing by 10^18 and formatting to 4 decimals
      : "0"}
  </p>
</div>

        </div>

        {/* Mint Tokens Section */}
        <div className="card shadow-xl w-full max-w-lg mt-10 p-6 bg-primary text-primary-content">
          <h2 className="card-title">Mint Tokens</h2>
          <input
            type="text"
            placeholder="Recipient Address"
            className="input input-bordered w-full mb-4"
            value={mintDetails.to}
            onChange={(e) => setMintDetails({ ...mintDetails, to: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full mb-4"
            value={mintDetails.amount}
            onChange={(e) => setMintDetails({ ...mintDetails, amount: Number(e.target.value) })}
          />
          <button
            className="btn btn-accent"
            onClick={() =>
              handleTransaction(
                () =>
                  writeContractAsync({
                    address: DeployedContracts[31337].MockRWAToken.address,
                    abi: DeployedContracts[31337].MockRWAToken.abi,
                    functionName: "mint",
                    args: [mintDetails.to, parseEther(mintDetails.amount.toString())],
                  }),
                "Tokens minted successfully!"
              )
            }
          >
            Mint Tokens
          </button>
        </div>

        {/* Lending Pool Section */}
        <div className="card shadow-xl w-full max-w-lg mt-10 p-6 bg-secondary text-secondary-content">
          <h2 className="card-title">Lending Pool</h2>
          {/* Create Loan */}
          <h3 className="font-bold mt-4">Create Loan</h3>
          <input
            type="text"
            placeholder="Token Address"
            className="input input-bordered w-full mb-2"
            value={loanDetails.token}
            onChange={(e) => setLoanDetails({ ...loanDetails, token: e.target.value })}
          />
          <input
            type="number"
            placeholder="Loan Amount"
            className="input input-bordered w-full mb-2"
            value={loanDetails.amount}
            onChange={(e) => setLoanDetails({ ...loanDetails, amount: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Collateral"
            className="input input-bordered w-full mb-2"
            value={loanDetails.collateral}
            onChange={(e) => setLoanDetails({ ...loanDetails, collateral: Number(e.target.value) })}
          />
          <button
            className="btn btn-accent"
            onClick={() =>
              handleTransaction(
                () =>
                  tx(
                    writeContractAsync({
                      address: DeployedContracts[31337].LendingPool.address,
                      abi: DeployedContracts[31337].LendingPool.abi,
                      functionName: "createLoan",
                      args: [loanDetails.token, loanDetails.amount, loanDetails.collateral],
                    }),
                    "Loan created successfully!"
                  )
              )
            }
          >
            Create Loan
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
      <ToastContainer />
    </>
  );
};

export default Home;

