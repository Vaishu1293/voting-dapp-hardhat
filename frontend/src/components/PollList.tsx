import React from 'react';
import PollCard from './PollCard';

type Poll = {
  id: number;
  title: string;
  status: 'Active' | 'Ended';
  expiration: string;
  numVoters: number;
  options: string[];
  votes: Record<string, number>;
};

type PollListProps = {
  polls: Poll[];
  onView: (pollId: number) => void;
  filter: 'Active' | 'Ended';
};

const PollList: React.FC<PollListProps> = ({ polls, onView, filter }) => {
  const filteredPolls = polls?.filter(poll => poll?.status === filter);

  if (filteredPolls?.length === 0) {
    return (
      <div className="bg-gray-800 border border-gray-700 p-6 rounded text-gray-300 text-center shadow">
        {filter === 'Active' ? 'No active polls available.' : 'No past polls found.'}
      </div>
    );
  }

  return (
    <>
    <p>Poll List</p>
    </>
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //   {filteredPolls.map(poll => (
    //     <PollCard key={poll.id} poll={poll} onView={onView} />
    //   ))}
    // </div>
  );
};

export default PollList;
