import React, { useState, useEffect } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";

function App() {
  const [input, setInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const API_BASE_URL =
    process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

  // Fetch chat history on mount so the complete history is available on reload.
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/history`, {
          credentials: "include",
        });
        const data = await response.json();
        if (data.history) {
          setChatHistory(data.history);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchHistory();
  }, [API_BASE_URL]);

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
    setInput(""); // Clear input after submission
    setLoading(false);
  };

  const clearChat = async () => {
    try {
      await fetch(`${API_BASE_URL}/api/clear`, {
        method: "POST",
        credentials: "include",
      });
      setChatHistory([]);
    } catch (error) {
      console.error("Error clearing chat:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">UNEP Chat</h1>
      <ChatWindow chatHistory={chatHistory} loading={loading} />
      <ChatInput input={input} setInput={setInput} sendMessage={sendMessage} />
      <button onClick={clearChat} className="mt-4 text-red-500">
        Clear Chat
      </button>
    </div>
  );
}

export default App;
