"use client";

import { useState } from "react";

type Tab = "active" | "past" | "create" | "myvotes";

interface TabNavigationProps {
  onTabChange: (tab: Tab) => void;
}

export default function TabNavigation({ onTabChange }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState<Tab>("active");

  const handleTabClick = (tab: Tab) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  return (
    <div className="tab-container">
      <ul className="nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "active" ? "active" : ""}`}
            onClick={() => handleTabClick("active")}
          >
            Active Polls
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "past" ? "active" : ""}`}
            onClick={() => handleTabClick("past")}
          >
            Past Polls
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "create" ? "active" : ""}`}
            onClick={() => handleTabClick("create")}
          >
            Create Poll
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "myvotes" ? "active" : ""}`}
            onClick={() => handleTabClick("myvotes")}
          >
            My Votes
          </button>
        </li>
      </ul>
    </div>
  );
}
