import React from "react";

const ChatWindow = ({ chatHistory, loading }) => {
  return (
    <div className="chat-window border rounded p-4 h-80 overflow-y-scroll mb-4">
      {chatHistory.map((msg, index) => (
        <div
          key={index}
          className={`mb-2 ${msg.role === "user" ? "text-right" : "text-left"}`}
        >
          <span
            className={`inline-block p-4 rounded-xl ${
              msg.role === "user" ? "bg-secondary-100" : "bg-primary-100"
            }`}
          >
            {msg.content}
          </span>
        </div>
      ))}
      {loading && <p>Loading...</p>}
    </div>
  );
};

export default ChatWindow;
