"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import ClientWrapper from "@/components/ClientWrapper";
import { ethers } from "ethers";

export default function Home() {
  const [account, setAccount] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState("home"); // ⭐ Track which section is active

  useEffect(() => {
    const ethereum = (window as any).ethereum as ethers.Eip1193Provider;
    if (ethereum && ethereum.selectedAddress) {
      setAccount(ethereum.selectedAddress);
    }
  }, []);

  useEffect(() => {
    // Listen to URL hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      setActiveSection(hash || "home"); // default to "home"
    };

    window.addEventListener("hashchange", handleHashChange);
    handleHashChange(); // run once on mount

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <div id="home">
      <Navbar onAccountChange={setAccount} />
      <div className="container">
        {/* --- Section Content Based on activeSection --- */}
        <div className="mt-10 animate-fadeIn animate-delay-500">

          {activeSection === "home" && (
            <>
              {account ? (
                <ClientWrapper />
              ) : (
                <>
                  {/* --- Welcome Title --- */}
                  <h1 className="text-3xl font-bold text-center mt-10 mb-10 animate-fadeIn animate-delay-300">
                    Welcome to the Voting DApp
                  </h1>
                  <div className="text-center max-w-3xl mx-auto p-6 bg-gray-800 dark:bg-gray-100 rounded-lg shadow-lg">
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
                </>

              )}
            </>
          )}

          {activeSection === "create-poll" && (
            <div className="text-center text-gray-400 max-w-2xl mx-auto mt-20 p-6 bg-gray-800 dark:bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-8 text-purple-400 dark:text-purple-700">Create a New Poll</h2>
              🚀 Coming Soon: Create your own polls, set options, expiration time, and launch a new decentralized election!
            </div>
          )}

          {activeSection === "my-votes" && (
            <div className="text-center text-gray-400 max-w-2xl mx-auto mt-20 p-6 bg-gray-800 dark:bg-gray-100 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-center mb-8 text-purple-400 dark:text-purple-700">Your Votes</h2>
              📊 Coming Soon: View the polls you've participated in and your voting history secured on the blockchain.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
