"use client";
import * as React from "react";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";
import DeployedContracts from "~~/contracts/deployedContracts";
import { useTransactor } from "~~/hooks/scaffold-eth";
import { useState } from "react";
import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import {useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const Home: NextPage = () => {

  const [loanDetails, setLoanDetails] = useState({
    token: "",
    amount: 0,
    collateral: 0,
  });
  const [loanId, setLoanId] = useState<number | null>(null);

  const createLoanWrite = useWriteContract();
  const repayLoanWrite = useWriteContract();
  const liquidateLoanWrite = useWriteContract();
  // const readContract = useReadContract();

  const tx = useTransactor();

  const handleCreateLoan = async () => {
    try {
      await tx(
        createLoanWrite.writeContractAsync({
          address: DeployedContracts[31337].LendingPool.address,
          abi: DeployedContracts[31337].LendingPool.abi,
          functionName: "createLoan",
          args: [loanDetails.token, loanDetails.amount, loanDetails.collateral],
        }),
        { blockConfirmations: 1 }
      );
      alert("Loan created successfully!");
    } catch (error) {
      console.error("Error creating loan:", error);
      alert("Failed to create loan.");
    }
  };

  const handleRepayLoan = async () => {
    if (loanId === null) {
      alert("Please provide a valid Loan ID.");
      return;
    }

    try {
      await tx(
        repayLoanWrite.writeContractAsync({
          address: DeployedContracts[31337].LendingPool.address,
          abi: DeployedContracts[31337].LendingPool.abi,
          functionName: "repayLoan",
          args: [loanId],
        }),
        { blockConfirmations: 1 }
      );
      alert("Loan repaid successfully!");
    } catch (error) {
      console.error("Error repaying loan:", error);
      alert("Failed to repay loan.");
    }
  };

  const handleLiquidateLoan = async () => {
    if (loanId === null) {
      alert("Please provide a valid Loan ID.");
      return;
    }

    try {
      await tx(
        liquidateLoanWrite.writeContractAsync({
          address: DeployedContracts[31337].LendingPool.address,
          abi: DeployedContracts[31337].LendingPool.abi,
          functionName: "liquidateLoan",
          args: [loanId],
        }),
        { blockConfirmations: 1 }
      );
      alert("Loan liquidated successfully!");
    } catch (error) {
      console.error("Error liquidating loan:", error);
      alert("Failed to liquidate loan.");
    }
  };


  
  const { address: connectedAddress } = useAccount();

  const tokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"


  const { writeContractAsync, isPending } = useWriteContract();

  const { data: tokenPrice, isLoading: isPriceLoading} = useScaffoldReadContract({
    contractName : "RWAOracle",
    functionName :"getPrice",
    args: [tokenAddress],
    watch: true, // Watches for updates in real time on new blocks
  });
  

    // State for minting tokens
     const [mintDetails, setMintDetails] = useState({ to: "", amount: 0 });

    // Read total supply of the token
    const { data: totalSupply, isLoading: isTotalSupplyLoading } = useScaffoldReadContract({
      contractName: "MockRWAToken",
      functionName: "totalSupply",
    });
  
    // Read balance of the connected wallet
    const { data: userBalance, isLoading: isUserBalanceLoading } = useScaffoldReadContract({
      contractName: "MockRWAToken",
      functionName: "balanceOf",
      args: [connectedAddress],
    });
  
    

  const writeContractAsyncWithParams = () =>
    writeContractAsync({
      address: DeployedContracts[31337].MockRWAToken.address,
      abi: DeployedContracts[31337].MockRWAToken.abi,
      functionName: "mint",
      args: [mintDetails.to, parseEther(mintDetails.amount.toString())], // Convert amount to the correct format
    });

  const writeTx = useTransactor();

  const handleMintTokens = async () => {
    if (!mintDetails.to || mintDetails.amount <= 0) {
      alert("Please provide a valid address and a positive amount.");
      return;
    }

    try {
      await writeTx(writeContractAsyncWithParams, { blockConfirmations: 1 });
      alert("Tokens minted successfully!");
    } catch (e) {
      console.error("Error minting tokens:", e);
      alert("Failed to mint tokens.");
    }
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Scaffold-ETH 2</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <p className="text-center text-lg">
            Get started by editing{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/nextjs/app/page.tsx
            </code>
          </p>
          <p className="text-center text-lg">
            Edit your smart contract{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              YourContract.sol
            </code>{" "}
            in{" "}
            <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block">
              packages/hardhat/contracts
            </code>
          </p>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <div className="card card-compact w-64 bg-secondary text-primary-content shadow-xl m-4">
      <div className="card-body items-center text-center">
        <h2 className="card-title">Token Price</h2>
        <div className="flex flex-col items-center gap-2 w-full">
          <input
            type="text"
            placeholder="Enter Token Address"
            className="input input-bordered w-full"
            value={tokenAddress}
          />
          {tokenAddress && (
            <div className="card-actions items-center flex-col gap-1 text-lg">
              <h2 className="font-bold m-0">Price:</h2>
              {isPriceLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                <p className="m-0">{tokenPrice ? tokenPrice.toString() : "Not available"}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>

    <div className="card-actions items-center flex-col gap-2 text-lg">
          {/* Total Supply */}
          <h2 className="font-bold m-0">Total Supply:</h2>
          {isTotalSupplyLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p className="m-0">{totalSupply ? totalSupply.toString() : 0}</p>
          )}

          {/* User Balance */}
          <h2 className="font-bold m-0">Your Balance:</h2>
          {isUserBalanceLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <p className="m-0">{userBalance ? userBalance.toString() : 0}</p>
          )}

          {/* Mint Tokens */}
          <div className="card-body items-center text-center">
        <h2 className="card-title">Mint Mock RWA Tokens</h2>
        <div className="card-actions items-center flex-col gap-2 text-lg">
          <input
            type="text"
            placeholder="Recipient Address"
            className="input input-bordered w-full my-2"
            value={mintDetails.to}
            onChange={(e) => setMintDetails({ ...mintDetails, to: e.target.value })}
          />
          <input
            type="number"
            placeholder="Amount"
            className="input input-bordered w-full my-2"
            value={mintDetails.amount}
            onChange={(e) => setMintDetails({ ...mintDetails, amount: Number(e.target.value) })}
          />
          <button
            className={`btn btn-primary ${isPending ? "loading" : ""}`}
            onClick={handleMintTokens}
            disabled={isPending}
          >
            {isPending ? <span className="loading loading-spinner loading-sm"></span> : "Mint Tokens"}
          </button>
        </div>
      </div>
        </div>
        </div>

        <div className="card-body">
        <h2 className="card-title">Lending Pool Interaction</h2>

        {/* Create Loan */}
        <div className="my-4">
          <h3 className="font-bold">Create Loan</h3>
          <input
            type="text"
            placeholder="Token Address"
            className="input input-bordered w-full my-2"
            value={loanDetails.token}
            onChange={(e) => setLoanDetails({ ...loanDetails, token: e.target.value })}
          />
          <input
            type="number"
            placeholder="Loan Amount"
            className="input input-bordered w-full my-2"
            value={loanDetails.amount}
            onChange={(e) => setLoanDetails({ ...loanDetails, amount: Number(e.target.value) })}
          />
          <input
            type="number"
            placeholder="Collateral Amount"
            className="input input-bordered w-full my-2"
            value={loanDetails.collateral}
            onChange={(e) => setLoanDetails({ ...loanDetails, collateral: Number(e.target.value) })}
          />
          <button className="btn btn-primary" onClick={handleCreateLoan}>
            Create Loan
          </button>
        </div>

        {/* Repay Loan */}
        <div className="my-4">
          <h3 className="font-bold">Repay Loan</h3>
          <input
            type="number"
            placeholder="Loan ID"
            className="input input-bordered w-full my-2"
            value={loanId !== null ? loanId : ""}
            onChange={(e) => setLoanId(Number(e.target.value))}
          />
          <button className="btn btn-primary" onClick={handleRepayLoan}>
            Repay Loan
          </button>
        </div>

        {/* Liquidate Loan */}
        <div className="my-4">
          <h3 className="font-bold">Liquidate Loan</h3>
          <input
            type="number"
            placeholder="Loan ID"
            className="input input-bordered w-full my-2"
            value={loanId !== null ? loanId : ""}
            onChange={(e) => setLoanId(Number(e.target.value))}
          />
          <button className="btn btn-primary" onClick={handleLiquidateLoan}>
            Liquidate Loan
          </button>
        </div>
      </div>



      </div>
    </>
  );
};

export default Home;


