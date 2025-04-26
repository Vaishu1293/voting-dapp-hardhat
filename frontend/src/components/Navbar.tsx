import React from 'react';
import WalletConnect from './WalletConnect';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="bg-gray-800 dark:bg-purple-100 text-white dark:text-gray-800 shadow-md border-b border-gray-700 dark:border-gray-300 px-6 py-4 sticky top-0 z-50 flex justify-between items-center">
      <h1 className="text-xl font-bold text-red-400 dark:text-purple-700">Voting DApp</h1>
      <ul className="flex gap-4 items-center">
        <li>
          <button
            className={`nav-link ${activeTab === 'active' ? 'text-red-400 font-semibold' : ''}`}
            onClick={() => setActiveTab('active')}
          >
            Active Polls
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${activeTab === 'past' ? 'text-red-400 font-semibold' : ''}`}
            onClick={() => setActiveTab('past')}
          >
            Past Polls
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${activeTab === 'create' ? 'text-red-400 font-semibold' : ''}`}
            onClick={() => setActiveTab('create')}
          >
            Create Poll
          </button>
        </li>
        <li>
          <button
            className={`nav-link ${activeTab === 'votes' ? 'text-red-400 font-semibold' : ''}`}
            onClick={() => setActiveTab('votes')}
          >
            My Votes
          </button>
        </li>
        <li>
          <WalletConnect />
        </li>
        <li>
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
