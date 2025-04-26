import React from "react";

interface PollCardProps {
  id: number;
  title: string;
  status: "Active" | "Ended";
  expiration: string;
  numVoters: number;
  onViewPoll: (pollId: number) => void;
}

export default function PollCard({
  id,
  title,
  status,
  expiration,
  numVoters,
  onViewPoll,
}: PollCardProps) {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow-md hover:shadow-lg transition duration-300">
      <h2 className="text-xl font-semibold mb-2 text-white">{title}</h2>

      <p className={`text-sm font-medium mb-1 ${status === "Active" ? "text-green-400" : "text-red-400"}`}>
        Status: {status}
      </p>

      <p className="text-sm text-gray-400 mb-1">
        Expiration: {expiration}
      </p>

      <p className="text-sm text-gray-400 mb-4">
        Voters: {numVoters}
      </p>

      <button
        onClick={() => onViewPoll(id)}
        className="w-full py-2 rounded-md text-white font-semibold 
          bg-purple-500 hover:bg-purple-600 transition duration-300"
      >
        {status === "Active" ? "Vote" : "View Results"}
      </button>
    </div>
  );
}
