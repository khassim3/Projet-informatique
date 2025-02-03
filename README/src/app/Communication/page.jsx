"use client"
import React, { useState } from 'react';
import "../Communication/commu.css";

const ChatInterface = () => {
  const [conversations, setConversations] = useState([
    { id: 1, name: "Mentor 1", active: true },
    { id: 2, name: "Mentor 2", active: false },
    { id: 3, name: "Mentor 3", active: false }, 
  ]);

  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help you?", type: "received" },
    { id: 2, text: "I need help with my project.", type: "sent" },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { id: prevMessages.length + 1, text: newMessage, type: "sent" },
      ]);
      setNewMessage("");
    }
  };

  const handleConversationClick = (id) => {
    setConversations((prevConversations) =>
      prevConversations.map((conv) => ({ ...conv, active: conv.id === id }))
    );
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h2>Conversations</h2>
        <ul className="conversation-list">
          {conversations.map((conversation) => (
            <li
              key={conversation.id}
              className={`conversation-item ${conversation.active ? "active-conversation" : ""}`}
              onClick={() => handleConversationClick(conversation.id)}
            >
              {conversation.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-section">
        <div className="chat-header">Mentor 1</div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.type}`}
            >
              {message.text}
            </div>
          ))}
        </div>

        <div className="chat-input">
          <button className="attachment-button">📎</button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;