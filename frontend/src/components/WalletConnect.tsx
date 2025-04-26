import React from 'react';
import { useVotingContext } from '../context/VotingContext';

const WalletConnect = () => {
  const context = useVotingContext();

  if (!context) {
    return <p className="text-red-500">Voting context not available!</p>;
  }

  const { walletAddress, connectWallet } = context;

  return walletAddress ? (
    <span className="text-green-400 font-semibold text-sm">
      Connected: {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
    </span>
  ) : (
    <button
      onClick={connectWallet}
      className="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded shadow"
    >
      Connect Wallet
    </button>
  );
};

export default WalletConnect;
