import React, { createContext, useContext, useState, ReactNode } from 'react';

type VotingContextType = {
  walletAddress: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
};

export const VotingContext = createContext<VotingContextType | null>(null);

export const VotingProvider = ({ children }: { children: ReactNode }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWallet = async () => {
    if ((window as any).ethereum) {
      const accounts = await (window as any).ethereum.request({ method: 'eth_requestAccounts' });
      setWalletAddress(accounts[0]);
      setIsConnected(true);
    } else {
      alert("MetaMask not detected!");
    }
  };

  return (
    <VotingContext.Provider value={{ walletAddress, isConnected, connectWallet }}>
      {children}
    </VotingContext.Provider>
  );
};

export const useVotingContext = () => useContext(VotingContext);
