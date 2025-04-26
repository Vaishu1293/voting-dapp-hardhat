import React, { useState, FormEvent } from 'react';

type CreatePollFormProps = {
  onCreatePoll: (newPoll: {
    title: string;
    description: string;
    expiration: string;
    options: string[];
  }) => void;
};

const CreatePollForm: React.FC<CreatePollFormProps> = ({ onCreatePoll }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [expiration, setExpiration] = useState('');
  const [options, setOptions] = useState<string[]>(['', '']);

  const handleOptionChange = (index: number, value: string) => {
    const updated = [...options];
    updated[index] = value;
    setOptions(updated);
  };

  const addOption = () => setOptions([...options, '']);
  const removeOption = (index: number) => {
    const updated = options.filter((_, i) => i !== index);
    setOptions(updated);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title || !description || !expiration || options.filter(opt => opt.trim()).length < 2) {
      alert('Please fill out all fields and include at least two options.');
      return;
    }

    const newPoll = {
      title,
      description,
      expiration,
      options: options.filter(opt => opt.trim()),
    };

    onCreatePoll(newPoll);

    // Reset form
    setTitle('');
    setDescription('');
    setExpiration('');
    setOptions(['', '']);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 border border-gray-700 p-6 rounded shadow mb-6 text-white">
      <h2 className="text-xl font-semibold text-red-400 mb-4">Create a New Poll</h2>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Poll Title</label>
        <input
          type="text"
          className="form-input w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Description</label>
        <textarea
          className="form-textarea w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-1">Expiration Date</label>
        <input
          type="date"
          className="form-input w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          value={expiration}
          onChange={(e) => setExpiration(e.target.value)}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Options</label>
        {options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="text"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="form-input flex-1 p-2 rounded bg-gray-700 text-white border border-gray-600"
              placeholder={`Option ${index + 1}`}
              required
            />
            {options.length > 2 && (
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="ml-2 px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded"
              >
                –
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addOption}
          className="mt-2 px-4 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded"
        >
          + Add Option
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded mt-4"
      >
        Create Poll
      </button>
    </form>
  );
};

export default CreatePollForm;
