import React from "react";

const ChatInput = ({ input, setInput, sendMessage }) => {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        className="flex-grow border rounded p-2"
        placeholder="Type your message..."
      />
      <button
        onClick={sendMessage}
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
