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
    const body = document.body;
    if (body.classList.contains("light")) {
      body.classList.remove("light");
      body.classList.add("dark"); // ⭐ add dark explicitly
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.remove("dark");
      body.classList.add("light"); // ⭐ add light explicitly
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };
  
  
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    const body = document.body;
    body.classList.remove("light", "dark"); // clean previous
    body.classList.add(savedTheme); // add proper class
    setTheme(savedTheme);
  }, []);
  
  

  return (
    <nav className="navbar">
      <a className="navbar-brand" href="#">Voting DApp</a>
      <ul className="navbar-nav flex gap-4 items-center">

        {["home", "create-poll", "my-votes"].map((link) => (
          <li className="nav-item" key={link}>
            <a
              href={`#${link}`}
              className={`nav-link relative transition-all duration-300 ${
                activeLink === link
                  ? "text-red-400 font-bold after:absolute after:left-0 after:bottom-0 after:w-full after:h-0.5 after:bg-red-400 after:rounded-full"
                  : "text-gray-400 hover:text-white dark:hover:text-black"
              }`}
              onClick={() => setActiveLink(link)}
            >
              {link === "home" ? "Home" : link === "create-poll" ? "Create Poll" : "My Votes"}
            </a>
          </li>
        ))}

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
