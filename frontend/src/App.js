import React, { useState } from 'react';
import WalletConnect from './components/WalletConnect';
import CreatePollForm from './components/CreatePollForm';
import PollList from './components/PollList';
import MyVotes from './components/MyVotes';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="min-h-screen font-sans bg-gray-900 text-white transition-all duration-300 dark:bg-gray-100 dark:text-gray-900">
      {/* Navbar */}
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

      {/* Content */}
      <div className="max-w-6xl mx-auto p-6">
        {activeTab === 'active' && <PollList type="active" />}
        {activeTab === 'past' && <PollList type="past" />}
        {activeTab === 'create' && <CreatePollForm />}
        {activeTab === 'votes' && <MyVotes />}
      </div>
    </div>
  );
}

export default App;
