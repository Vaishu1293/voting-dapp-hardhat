"use client";

import { useState } from "react";

interface MyVote {
  pollTitle: string;
  selectedOption: string;
  pollStatus: "Active" | "Ended";
}

const dummyVotes: MyVote[] = [
  { pollTitle: "Favorite Color", selectedOption: "Blue", pollStatus: "Ended" },
  { pollTitle: "Best Food", selectedOption: "Pizza", pollStatus: "Ended" },
];

export default function MyVotes() {
  const [myVotes, setMyVotes] = useState<MyVote[]>(dummyVotes);

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 my-votes-card animate-fadeIn animate-delay-500">
      <h2 className="my-votes-title">
        Your Votes
      </h2>

      {myVotes.length === 0 ? (
        <div className="text-center text-gray-400 dark:text-gray-600 mt-10">
          You haven't voted in any polls yet. 🚀
        </div>
      ) : (
        <div className="space-y-6 mt-8">
          {myVotes.map((vote, index) => (
            <div
              key={index}
              className="vote-card animate-fadeIn animate-delay-500"
            >
              <h3 className="vote-card-title">{vote.pollTitle}</h3>
              <p className="vote-card-detail">
                Your Vote: <span className="font-semibold">{vote.selectedOption}</span>
              </p>
              <p
                className={`vote-card-status ${
                  vote.pollStatus === "Ended" ? "ended" : "active"
                }`}
              >
                {vote.pollStatus === "Ended" ? "Poll Ended" : "Poll Active"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
