import React from "react";

const ChatInput = ({
  input,
  setInput,
  sendMessage,
  personality,
  setPersonality,
}) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mb-2">
        <span className="mr-4">Choose a personality</span>
        <select
          value={personality}
          onChange={(e) => setPersonality(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">Default</option>
          <option value="moss">Moss (IT Crowd)</option>
          <option value="homer">Homer Simpson</option>
          <option value="trump">Donald Trump</option>
          <option value="yoda">Yoda</option>
          <option value="drseuss">Dr Seuss</option>
        </select>
      </div>
      <div className="flex flex-row">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-grow border rounded p-4"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="ml-2 p-4 bg-primary-900 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
