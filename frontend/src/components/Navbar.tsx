"use client";

import { useState, useEffect } from "react";
import WalletConnect from "@/components/WalletConnect";
import { ethers } from "ethers";

export default function Navbar({ onAccountChange }: { onAccountChange?: (account: string) => void }) {
  const [account, setAccount] = useState<string | null>(null);
  const [theme, setTheme] = useState("dark");
  const [activeLink, setActiveLink] = useState("home");

  const handleConnected = (account: string, provider: ethers.BrowserProvider) => {
    console.log("Connected account inside Navbar:", account);
    setAccount(account);
    onAccountChange?.(account);
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.body.classList.toggle("light", newTheme === "light");
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    document.body.classList.toggle("light", savedTheme === "light");
    setTheme(savedTheme);
  }, []);

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">Voting DApp</a>
      <ul className="navbar-nav flex gap-4 items-center">
        <li className="nav-item">
          <a
            href="#home"
            className={`nav-link ${activeLink === "home" ? "text-red-400 font-bold" : ""}`}
            onClick={() => setActiveLink("home")}
          >
            Home
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#create-poll"
            className={`nav-link ${activeLink === "create-poll" ? "text-red-400 font-bold" : ""}`}
            onClick={() => setActiveLink("create-poll")}
          >
            Create Poll
          </a>
        </li>
        <li className="nav-item">
          <a
            href="#my-votes"
            className={`nav-link ${activeLink === "my-votes" ? "text-red-400 font-bold" : ""}`}
            onClick={() => setActiveLink("my-votes")}
          >
            My Votes
          </a>
        </li>
        <li className="nav-item">
          {account ? (
            <span className="connected-address">
              {account.slice(0, 6)}...{account.slice(-4)}
            </span>
          ) : (
            <WalletConnect onConnected={handleConnected} />
          )}
        </li>
        <li className="nav-item">
          <button onClick={toggleTheme} className="theme-toggle-button">
            {theme === "dark" ? "Light Mode" : "Dark Mode"}
          </button>
        </li>
      </ul>
    </nav>
  );
}
