"use client";

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
}

interface PollDetailsProps {
  poll: Poll;
  onBack: () => void;
}

export default function PollDetails({ poll, onBack }: PollDetailsProps) {
  // Dummy options (later fetch from backend)
  const options: PollOption[] = [
    { id: 1, text: "Option 1", votes: 10 },
    { id: 2, text: "Option 2", votes: 15 },
    { id: 3, text: "Option 3", votes: 5 },
  ];

  return (
    <div className="mt-8 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">{poll.title}</h2>
      <p className="text-gray-400 mb-6">Status: {poll.status} | Expiration: {poll.expiration}</p>

      {poll.status === "Active" ? (
        <div className="space-y-4">
          {options.map((option) => (
            <button
              key={option.id}
              className="block w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold p-4 rounded-md transition"
            >
              {option.text}
            </button>
          ))}
          <button
            className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Vote
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {options.map((option) => {
            const percentage = ((option.votes / 30) * 100).toFixed(0);
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

