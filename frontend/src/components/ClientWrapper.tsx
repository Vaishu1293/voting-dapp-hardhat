"use client"; // 👈 because we are using useState inside this component

import { useState } from "react";
import TabNavigation from "@/components/TabNavigation";

export default function ClientWrapper() {
  const [currentTab, setCurrentTab] = useState("active");

  return (
    <div className="container">
      <TabNavigation onTabChange={setCurrentTab} />

      {currentTab === "active" && <div id="active-polls"> {/* Render Active Polls here */} </div>}
      {currentTab === "past" && <div id="past-polls"> {/* Render Past Polls here */} </div>}
      {currentTab === "create" && <div id="create-poll"> {/* Render Create Poll Form here */} </div>}
      {currentTab === "myvotes" && <div id="my-votes"> {/* Render My Votes list here */} </div>}
    </div>
  );
}
