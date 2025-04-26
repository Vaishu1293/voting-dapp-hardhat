"use client";

import { useState } from "react";
import TabNavigation from "@/components/TabNavigation";
import PollCard from "./PollCard";
import PollDetails from "@/components/PollDetails"; // ⭐ Import PollDetails component
import Pagination from "@/components/Pagination"; // ⭐ import Pagination

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
  const [selectedPollId, setSelectedPollId] = useState<number | null>(null);

  const pollsPerPage = 6;

  function handlePollClick(pollId: number) {
    setSelectedPollId(pollId); // ⭐ Go to Poll Details
  }

  function handleBackToPolls() {
    setSelectedPollId(null); // ⭐ Back to Poll List
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

  function handlePageChange(page: number) {
    setCurrentPage(page);
  }

  function handleTabChange(tab: string) {
    setCurrentTab(tab);
    setCurrentPage(1);
  }

  const selectedPoll = polls.find((poll) => poll.id === selectedPollId);

  return (
    <div className="container">
      {selectedPoll ? (
        <div className="animate-slideFadeIn">
          <PollDetails poll={selectedPoll} onBack={handleBackToPolls} />
        </div>
      ) : (
        <>
          <TabNavigation onTabChange={handleTabChange} />

          <div id="polls-list" className="mt-8 animate-slideFadeIn">
            {filteredPolls.length === 0 ? (
              <div className="text-center text-gray-400">No polls available for this category.</div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

                {/* ⭐ Pagination */}
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
