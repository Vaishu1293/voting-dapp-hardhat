import React from 'react';

type Poll = {
  id: number;
  title: string;
  status: 'Active' | 'Ended';
  expiration: string;
};

type MyVotesProps = {
  userVotes: { [pollId: number]: string };
  allPolls: Poll[];
};

const MyVotes: React.FC<MyVotesProps> = ({ userVotes, allPolls }) => {
  const votedPolls = allPolls.filter((poll) => userVotes.hasOwnProperty(poll.id));

  if (votedPolls.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-6 rounded text-gray-300 text-center shadow">
        You have not cast any votes yet.
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold text-red-400 mb-4">My Votes</h2>
      <ul className="space-y-4">
        {votedPolls.map((poll) => (
          <li
            key={poll.id}
            className="bg-gray-800 border border-gray-700 p-4 rounded shadow hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-red-400 mb-1">{poll.title}</h3>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-medium text-white">Your Vote:</span> {userVotes[poll.id]}
            </p>
            <p
              className={`text-sm font-medium mb-1 ${
                poll.status === 'Ended' ? 'text-red-400' : 'text-green-400'
              }`}
            >
              Status: {poll.status}
            </p>
            <p className="text-sm text-gray-400">Expiration: {poll.expiration}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyVotes;
