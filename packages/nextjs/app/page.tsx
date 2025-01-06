"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";
import {useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract"
const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();
  const tokenAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"
  const { data: tokenPrice, isLoading: isPriceLoading} = useScaffoldReadContract({
    contractName : "RWAOracle",
    functionName :"getPrice",
    args: [tokenAddress],
    watch: true, // Watches for updates in real time on new blocks
  });
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
        </div>
      </div>
    </>
  );
};

export default Home;

