"use client";

import { useState } from "react";

// Definir las traducciones
const translations = {
  es: {
    title: "Asistente de Tienda de Videojuegos",
    greeting:
      "👋 ¡Hola! Soy tu asistente de videojuegos. ¿En qué puedo ayudarte?\n\nPuedes consultar sobre nuestros productos, precios, servicio al cliente y más.",
    placeholder: "Escribe tu pregunta aquí...",
    sendButton: "Enviar",
    loading: "Escribiendo...",
    error:
      "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
    menuOptions: [
      { icon: "🎮", text: "Productos y Juegos" },
      { icon: "💰", text: "Precios y Pagos" },
      { icon: "👥", text: "Atención al Cliente" },
      { icon: "🛠️", text: "Soporte Técnico" },
      { icon: "📦", text: "Stock y Disponibilidad" },
      { icon: "🚚", text: "Envíos y Pedidos" },
    ],
  },
  en: {
    title: "Video Game Store Assistant",
    greeting:
      "👋 Hi! I'm your gaming assistant. How can I help you?\n\nYou can ask about our products, prices, customer service and more.",
    placeholder: "Type your question here...",
    sendButton: "Send",
    loading: "Typing...",
    error:
      "Sorry, there was an error processing your message. Please try again.",
    menuOptions: [
      { icon: "🎮", text: "Products & Games" },
      { icon: "💰", text: "Prices & Payments" },
      { icon: "👥", text: "Customer Service" },
      { icon: "🛠️", text: "Technical Support" },
      { icon: "📦", text: "Stock & Availability" },
      { icon: "🚚", text: "Shipping & Orders" },
    ],
  },
};

export default function Home() {
  const [language, setLanguage] = useState<"es" | "en">("es");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "bot",
        content: translations[language].greeting,
      },
    ]
  );
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Obtener las traducciones actuales basadas en el idioma seleccionado
  const t = translations[language];

  const toggleLanguage = () => {
    const newLanguage = language === "es" ? "en" : "es";
    setLanguage(newLanguage);
    // Actualizar el mensaje de bienvenida
    setMessages([
      {
        role: "bot",
        content: translations[newLanguage].greeting,
      },
    ]);
  };

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
          data.text?.message || "Lo siento, hubo un error en mi respuesta.",
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "Lo siento, hubo un error al procesar tu mensaje. Por favor, intenta de nuevo.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessage = (content: string) => {
    // Reemplaza los guiones por viñetas y asegura el formato correcto
    return content
      .split("\n")
      .map((line, index) => {
        // Si la línea comienza con un guion, reemplázalo con una viñeta
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
        {/* Header con título y botón de idioma */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-purple-800 text-center flex-1">
            {t.title}
          </h1>
          <button
            onClick={toggleLanguage}
            className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg
                     transition-colors duration-200 flex items-center gap-2"
          >
            <span>{language.toUpperCase()}</span>
            <span className="text-sm">{language === "es" ? "🇪🇸" : "🇺🇸"}</span>
          </button>
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
                {t.loading}
              </div>
            </div>
          )}
        </div>

        {/* Menu buttons */}
        <div className="grid grid-cols-2 gap-2 mb-6">
          {t.menuOptions.map(({ icon, text }) => (
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
            placeholder={t.placeholder}
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
            {t.sendButton}
          </button>
        </div>
      </div>
    </main>
  );
}
