"use client";

import { useState } from "react";

// Define translations
const translations = {
  title: "GameBot",
  greeting: "👋 Hi! I'm GameBot. How can I help you?",
  placeholder: "Type your question here...",
  sendButton: "Send",
  loading: "Typing...",
  error: "Sorry, there was an error processing your message. Please try again.",
  menuOptions: [
    { icon: "🎮", text: "Products & Games" },
    { icon: "💰", text: "Prices & Payments" },
    { icon: "👥", text: "Customer Service" },
    { icon: "🛠️", text: "Technical Support" },
    { icon: "📦", text: "Stock & Availability" },
    { icon: "🚚", text: "Shipping & Orders" },
  ],
};

export default function Home() {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "bot",
        content: translations.greeting,
      },
    ]
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setInput("");

    const userMessage = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch("/api/cohere", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      const botMessage = {
        role: "bot",
        content:
          data.text?.message || "Sorry, there was an error in my response.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content: translations.error,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    return content
      .split("\n")
      .map((line) => {
        if (line.trim().startsWith("-")) {
          return line.replace(/^\s*-\s*/, "• ");
        }
        return line;
      })
      .join("\n");
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-gradient-to-b from-purple-50 to-white p-4">
      <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-6">
        {/* Header */}
        <div className="flex justify-center items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800 text-center">
            {translations.title}
          </h1>
        </div>

        {/* Chat container */}
        <div className="h-[400px] overflow-y-auto border border-gray-200 rounded-lg p-4 mb-6 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.role === "user" ? "flex justify-end" : "flex justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                  msg.role === "user"
                    ? "bg-purple-600 text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {formatMessage(msg.content)
                  .split("\n")
                  .map((line, i) => (
                    <div
                      key={i}
                      className={`${line.trim().startsWith("•") ? "pl-4" : ""}`}
                    >
                      {line}
                    </div>
                  ))}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-200 text-gray-800 p-3 rounded-lg rounded-bl-none">
                {translations.loading}
              </div>
            </div>
          )}
        </div>

        {/* Menu buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {translations.menuOptions.map(({ icon, text }) => (
            <button
              key={text}
              onClick={() => sendMessage(`${icon} ${text}`)}
              className="flex items-center justify-center p-3 bg-purple-100 hover:bg-purple-200
                         text-purple-800 rounded-lg transition-colors duration-200"
            >
              <span className="mr-2">{icon}</span>
              <span>{text}</span>
            </button>
          ))}
        </div>

        {/* Input area */}
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={translations.placeholder}
            className="flex-1 p-3 text-black border border-gray-300 rounded-lg focus:outline-none
                       focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg
                     transition-colors duration-200 disabled:bg-purple-400"
          >
            {translations.sendButton}
          </button>
        </div>
      </div>
    </main>
  );
}
