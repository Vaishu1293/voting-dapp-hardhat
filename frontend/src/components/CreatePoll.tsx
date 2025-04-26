"use client";

import { useState } from "react";

export default function CreatePoll() {
    const [title, setTitle] = useState("");
    const [options, setOptions] = useState(["", ""]); // Start with 2 empty options
    const [expiration, setExpiration] = useState("");

    const handleOptionChange = (index: number, value: string) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addOption = () => {
        setOptions([...options, ""]);
    };

    const removeOption = (index: number) => {
        if (options.length <= 2) {
            alert("At least 2 options are required to create a poll.");
            return;
        }

        const newOptions = [...options];
        newOptions.splice(index, 1); // Remove the clicked option
        setOptions(newOptions);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Creating Poll:", { title, options, expiration });
        // later: send this data to backend or smart contract
    };

    return (
        <div className="max-w-3xl mx-auto mt-12 p-8 create-poll-card animate-fadeIn animate-delay-500">
            <h2 className="text-3xl font-bold text-center mt-4 text-white dark:text-gray-900 animate-fadeIn animate-delay-300">
                Create a New Poll
            </h2>
            <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                    <label className="create-poll-label">
                        Poll Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter your poll title..."
                        className="form-control"
                    />
                </div>

                <div>
                    <label className="create-poll-label">
                        Poll Options
                    </label>
                    {options.map((option, index) => (
                        <div key={index} className="flex gap-2 mb-4">
                            <input
                                type="text"
                                value={option}
                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                required
                                placeholder={`Option ${index + 1}`}
                                className="form-control flex-grow"
                            />
                            {options.length > 2 && (
                                <button
                                    type="button"
                                    onClick={() => removeOption(index)}
                                    className="remove-option-btn bg-red-500 hover:bg-red-600 text-white px-3 rounded"
                                >
                                    ✕
                                </button>
                            )}

                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addOption}
                        className="add-option-btn mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                    >
                        ➕ Add Option
                    </button>
                </div>

                <div>
                    <label className="create-poll-label">
                        Expiration Date
                    </label>
                    <input
                        type="date"
                        value={expiration}
                        onChange={(e) => setExpiration(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>

                <button
                    type="submit"
                    className="btn-primary bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded font-bold w-full mt-6"
                >
                    🚀 Create Poll
                </button>
            </form>
        </div>
    );


}