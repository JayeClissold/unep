import React, { useState } from "react";

function App() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

  // Normally I'd use some sort of library like React Hook Form to manage the form fields

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await response.json();
      if (data.response) {
        setChatHistory(data.history);
      } else if (data.error) {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Error sending message");
    }
    setInput("");
    setLoading(false);
  };

  const clearChat = async () => {
    await fetch(`${API_BASE_URL}/api/clear`, { method: "POST" });
    setChatHistory([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">UNEP chat</h1>
      <div className="chat-window border rounded p-4 h-80 overflow-y-scroll mb-4">
        {chatHistory.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 text-left ${
              msg.role === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded ${
                msg.role === "user" ? "bg-blue-200" : "bg-gray-200"
              }`}
            >
              {msg.content}
            </span>
          </div>
        ))}
        {loading && <p>Loading...</p>}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
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
      <button onClick={clearChat} className="mt-4 text-red-500">
        Clear Chat
      </button>
    </div>
  );
}

export default App;
