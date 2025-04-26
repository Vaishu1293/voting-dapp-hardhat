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
    <div className="poll-card">
      <h2 className="poll-title">{title}</h2>

      <p className={`poll-status ${status.toLowerCase()}`}>
        Status: {status}
      </p>

      <p className="poll-detail">
        Expiration: {expiration}
      </p>

      <p className="poll-detail mb-4">
        Voters: {numVoters}
      </p>

      <button
        onClick={() => onViewPoll(id)}
        className="view-poll-btn"
      >
        {status === "Active" ? "Vote" : "View Results"}
      </button>
    </div>
  );
}
