import React from "react";
import LoadingBubble from "./LoadingBubble";

/**
 * ChatWindow displays the chat messages.
 * When loading is true, it displays an animated bubble to indicate the assistant is "thinking".
 *
 * @param {Object} props
 * @param {Array} props.chatHistory - Array of chat messages.
 * @param {boolean} props.loading - Flag indicating if the assistant is currently generating a response.
 */

const ChatWindow = ({ chatHistory, loading }) => {
  return (
    <div className="chat-window border rounded p-4 h-80 overflow-y-scroll mb-4">
      {chatHistory
        .filter((msg) => msg.role !== "system") // Excluding system messages
        .map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
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
      {loading && (
        <div className="mb-2 text-left">
          <LoadingBubble />
        </div>
      )}
    </div>
  );
};

export default ChatWindow;
