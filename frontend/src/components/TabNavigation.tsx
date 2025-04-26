"use client";

import { useState } from "react";

interface TabNavigationProps {
  onTabChange: (tab: string) => void;
}

export default function TabNavigation({ onTabChange }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Polls" },
    { id: "active", label: "Active Polls" },
    { id: "past", label: "Past Polls" }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange(tabId);
  };

  return (
    <>
      {/* --- Welcome Title --- */}
      <h1 className="text-3xl font-bold text-center mb-10 animate-fadeIn animate-delay-300">
        Welcome to the Voting DApp
      </h1>
      <div className="flex justify-center mt-8">
        <div className="flex space-x-4 border-b border-gray-700 dark:border-gray-300">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`py-2 px-4 text-sm font-semibold transition-colors ${activeTab === tab.id
                  ? "border-b-4 border-red-400 text-red-400"
                  : "text-gray-400 hover:text-white dark:hover:text-black"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </>

  );
}
