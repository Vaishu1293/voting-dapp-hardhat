import React from 'react';

type Poll = {
  id: number;
  title: string;
  status: 'Active' | 'Ended';
  expiration: string;
  numVoters: number;
  options: string[];
  votes: Record<string, number>;
};

type PollCardProps = {
  poll: Poll;
  onView: (id: number) => void;
};

const PollCard: React.FC<PollCardProps> = ({ poll, onView }) => {
  return (
    <div className="bg-gray-700 border border-gray-600 p-4 rounded shadow hover:shadow-lg transition">
      <h2 className="text-lg font-semibold text-red-400 mb-2">{poll.title}</h2>
      <p className={`text-sm mb-1 ${poll.status === 'Ended' ? 'text-red-400' : 'text-green-400'}`}>{poll.status}</p>
      <p className="text-sm text-gray-300 mb-1">Expiration: {poll.expiration}</p>
      <p className="text-sm text-gray-300 mb-4">Voters: {poll.numVoters}</p>
      <button
        onClick={() => onView(poll.id)}
        className="bg-red-500 hover:bg-red-600 text-white w-full py-2 px-4 rounded"
      >
        {poll.status === 'Ended' ? 'View Results' : 'Vote'}
      </button>
    </div>
  );
};

export default PollCard;
