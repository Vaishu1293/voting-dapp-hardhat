"use client";

import { useState } from "react";

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface Poll {
  id: number;
  title: string;
  status: "Active" | "Ended";
  expiration: string;
  numVoters: number;
  options: PollOption[]; // ✅ Include options inside poll
}

interface PollDetailsProps {
  poll: Poll;
  onBack: () => void;
}

export default function PollDetails({ poll, onBack }: PollDetailsProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleVoteSubmit = () => {
    if (selectedOption !== null) {
      console.log(`Voted for option ID: ${selectedOption}`);
      setSubmitted(true);
    } else {
      alert("Please select an option before voting!");
    }
  };

  const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

  return (
    <div className="mt-8 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">{poll.title}</h2>
      <p className="text-gray-400 mb-6">Status: {poll.status} | Expiration: {poll.expiration}</p>

      {poll.status === "Active" && !submitted ? (
        <div className="space-y-4">
          {poll.options.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedOption(option.id)}
              className={`block w-full p-4 rounded-md transition font-semibold
                ${selectedOption === option.id ? "bg-purple-600 text-white" : "bg-gray-700 hover:bg-gray-600 text-white"}`}
            >
              {option.text}
            </button>
          ))}
          <button
            onClick={handleVoteSubmit}
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Vote
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {poll.options.map((option) => {
            const percentage = totalVotes ? ((option.votes / totalVotes) * 100).toFixed(0) : 0;
            return (
              <div key={option.id}>
                <div className="flex justify-between mb-1">
                  <span>{option.text}</span>
                  <span className="text-gray-400">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-4">
                  <div
                    className="bg-purple-500 h-4 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <button
        onClick={onBack}
        className="mt-10 inline-block px-6 py-3 rounded bg-gray-600 hover:bg-gray-700 text-white"
      >
        ← Back to Polls
      </button>
    </div>
  );
}
