import React from 'react';

type TabNavigationProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ["home", "past-polls", "create-poll", "my-votes"];

  return (
    <div className="flex justify-center border-b border-gray-600 py-2">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors duration-200 ${
            activeTab === tab
              ? 'border-red-500 text-red-500'
              : 'border-transparent text-gray-400 hover:text-red-400'
          }`}
        >
          {tab.replace('-', ' ').replace(/^\w/, c => c.toUpperCase())}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;
