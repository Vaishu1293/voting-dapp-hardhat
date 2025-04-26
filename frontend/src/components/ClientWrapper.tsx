"use client";

import { useState } from "react";
import TabNavigation from "@/components/TabNavigation";
import PollCard from "./PollCard";
import Pagination from "@/components/Pagination"; // ⭐ import the new Pagination component

const dummyPolls = [
  { id: 1, title: "Favorite Color", status: "Active", expiration: "2025-05-31", numVoters: 12 },
  { id: 2, title: "Best Food", status: "Ended", expiration: "2025-04-15", numVoters: 25 },
  { id: 3, title: "Best Courses", status: "Ended", expiration: "2025-02-15", numVoters: 18 },
  { id: 4, title: "Favorite Sport", status: "Active", expiration: "2025-06-01", numVoters: 30 },
  { id: 5, title: "Best City to Visit", status: "Ended", expiration: "2025-03-22", numVoters: 40 },
  { id: 6, title: "Favorite Programming Language", status: "Active", expiration: "2025-07-20", numVoters: 50 },
  { id: 7, title: "Top Travel Destination", status: "Ended", expiration: "2025-04-02", numVoters: 15 },
];

export default function ClientWrapper() {
  const [currentTab, setCurrentTab] = useState("all");
  const [polls, setPolls] = useState(dummyPolls);
  const [currentPage, setCurrentPage] = useState(1);

  const pollsPerPage = 6; // 2 rows × 3 columns = 6 polls per page

  function handlePollClick(pollId: number) {
    console.log("Clicked poll:", pollId);
    // later navigate to detail page
  }

  const filteredPolls = polls.filter((poll) => {
    if (currentTab === "active") return poll.status === "Active";
    if (currentTab === "past") return poll.status === "Ended";
    return true;
  });

  const indexOfLastPoll = currentPage * pollsPerPage;
  const indexOfFirstPoll = indexOfLastPoll - pollsPerPage;
  const currentPolls = filteredPolls.slice(indexOfFirstPoll, indexOfLastPoll);

  const totalPages = Math.ceil(filteredPolls.length / pollsPerPage);

  function handleNextPage() {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  }

  function handlePrevPage() {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  }

  function handleTabChange(tab: string) {
    setCurrentTab(tab);
    setCurrentPage(1); // reset pagination
  }

  return (
    <div className="container">
      <TabNavigation onTabChange={handleTabChange} />

      <div id="polls-list" className="mt-8">
        {filteredPolls.length === 0 ? (
          <div className="text-center text-gray-400">No polls available for this category.</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
              {currentPolls.map((poll) => (
                <PollCard
                  key={poll.id}
                  id={poll.id}
                  title={poll.title}
                  status={poll.status as "Active" | "Ended"}
                  expiration={poll.expiration}
                  numVoters={poll.numVoters}
                  onViewPoll={handlePollClick}
                />
              ))}
            </div>

            {/* ⭐ Use Pagination component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />

          </>
        )}
      </div>
    </div>
  );
}
