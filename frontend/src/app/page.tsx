"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ClientWrapper from "@/components/ClientWrapper";
import { ethers } from "ethers";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const ethereum = (window as any).ethereum as ethers.Eip1193Provider;
    if (ethereum && ethereum.selectedAddress) {
      setAccount(ethereum.selectedAddress);
    }
  }, []);

  return (
    <div>
      <Navbar onAccountChange={setAccount} /> {/* ⭐ Pass setter to Navbar */}
      <div className="container">
        <h1 className="text-3xl font-bold text-center mt-10 animate-fadeIn animate-delay-300">
          Welcome to the Voting DApp
        </h1>

        {account ? (
          // ⭐ Wallet connected: Show DApp
          <div className="mt-10 animate-fadeIn animate-delay-500">
            <ClientWrapper />
          </div>
        ) : (
          // ❗ Wallet not connected: Show Hero About Section
          <div className="mt-10 text-center max-w-3xl mx-auto p-6 bg-gray-800 dark:bg-gray-100 rounded-lg shadow-lg animate-fadeIn animate-delay-500">
            <h2 className="text-2xl font-bold mb-4 text-purple-400 dark:text-purple-700">
              Empowering Decentralized Voting
            </h2>
            <p className="text-gray-300 dark:text-gray-700 mb-6 leading-relaxed">
              Our Voting DApp enables transparent, secure, and tamper-proof elections powered by blockchain technology.
              Connect your wallet to start participating in polls, create new ones, and have your voice heard without
              intermediaries. Easy, decentralized, and trusted voting for everyone.
            </p>
            <p className="text-gray-400 dark:text-gray-600 font-semibold">
              👉 Connect your MetaMask Wallet to explore active polls and cast your votes now!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
