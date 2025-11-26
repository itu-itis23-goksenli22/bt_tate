"use client";

import { useState, useRef, useEffect } from "react";
import { X, Send, MessageCircle } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "👋 Merhaba! AI Scale hakkında sorularınızı yanıtlamak için buradayım.\n\n💡 Sorabilirsiniz:\n• Eğitim programları\n• Fiyatlar ve paketler\n• Nasıl başlarım?\n• Başarı hikayeleri\n\nSize nasıl yardımcı olabilirim?",
      timestamp: new Date(),
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate or retrieve session ID
  useEffect(() => {
    const generateSessionId = () => {
      return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    };

    // Check if session ID exists in localStorage
    let existingSessionId = localStorage.getItem('chatbot_session_id');

    if (!existingSessionId) {
      // Create new session ID
      existingSessionId = generateSessionId();
      localStorage.setItem('chatbot_session_id', existingSessionId);
    }

    setSessionId(existingSessionId);
    console.log('Chat Session ID:', existingSessionId);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Wait for session ID to be generated
    if (!sessionId) {
      console.warn('Session ID not yet generated, waiting...');
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      console.log('Sending message to API:', inputMessage, 'Session:', sessionId);

      const response = await fetch('/api/chat', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          sessionId: sessionId,
          timestamp: new Date().toISOString(),
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`Failed to send message: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response data:', data);

      const assistantMessage: Message = {
        role: "assistant",
        content: data.response || data.message || data.output || "Üzgünüm, bir hata oluştu. Lütfen tekrar deneyin.",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chatbot error:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: `Üzgünüm, şu anda bir bağlantı sorunu yaşıyoruz. Hata detayı: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleNewChat = () => {
    // Generate new session ID
    const newSessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('chatbot_session_id', newSessionId);
    setSessionId(newSessionId);

    // Reset messages
    setMessages([
      {
        role: "assistant",
        content: "👋 Merhaba! AI Scale hakkında sorularınızı yanıtlamak için buradayım.\n\n💡 Sorabilirsiniz:\n• Eğitim programları\n• Fiyatlar ve paketler\n• Nasıl başlarım?\n• Başarı hikayeleri\n\nSize nasıl yardımcı olabilirim?",
        timestamp: new Date(),
      },
    ]);

    console.log('New chat started with Session ID:', newSessionId);
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 md:bottom-6 md:right-20 z-50 bg-gradient-to-r from-accent to-accent-light p-4 md:p-5 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
          aria-label="Sohbet robotunu aç"
        >
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 text-white group-hover:rotate-12 transition-transform duration-300" />

          {/* Notification dot */}
          <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed inset-x-0 bottom-0 md:inset-auto md:bottom-6 md:right-20 z-50 w-full md:w-[400px] h-[100dvh] md:h-[600px] max-h-[100dvh] bg-primary-dark border-t-2 md:border-2 border-accent/30 md:rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="bg-gradient-to-r from-accent to-accent-light p-4 flex items-center justify-between relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent animate-pulse"></div>

            <div className="flex items-center gap-2 md:gap-3 relative z-10">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 rounded-full flex items-center justify-center relative flex-shrink-0">
                <MessageCircle className="w-4 h-4 md:w-6 md:h-6 text-white" />
                {/* Pulse effect */}
                <span className="absolute inset-0 rounded-full bg-white/30 animate-ping"></span>
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-bold text-base md:text-lg truncate">AI Scale Asistan</h3>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse flex-shrink-0"></span>
                  <p className="text-white/90 text-xs font-medium truncate">Online • Hızlı yanıt</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 md:gap-2 relative z-10 flex-shrink-0">
              {/* New Chat Button */}
              <button
                onClick={handleNewChat}
                className="text-white/80 hover:text-white transition-colors p-1.5 md:p-2 hover:bg-white/10 rounded-lg"
                aria-label="Yeni Sohbet"
                title="Yeni Sohbet Başlat"
              >
                <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>

              {/* Close Button */}
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors hover:rotate-90 transition-transform duration-300"
                aria-label="Kapat"
              >
                <X className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4 bg-primary">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                } animate-fadeIn`}
              >
                <div
                  className={`max-w-[90%] md:max-w-[85%] px-3 py-2.5 md:px-4 md:py-3 rounded-2xl shadow-lg ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-accent to-accent-light text-white rounded-br-sm"
                      : "bg-gradient-to-br from-primary-light to-primary-dark text-white/90 rounded-bl-sm border border-white/10"
                  }`}
                >
                  <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-2 flex items-center gap-1 ${
                      message.role === "user"
                        ? "text-white/70 justify-end"
                        : "text-white/40"
                    }`}
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {message.timestamp.toLocaleTimeString("tr-TR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-primary-light px-4 py-3 rounded-2xl rounded-bl-sm border border-white/10">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></span>
                    <span
                      className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-white/60 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 md:p-4 bg-primary-dark border-t border-white/10 safe-area-bottom">
            <div className="flex gap-2 mb-2">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Mesajınızı yazın..."
                  disabled={isLoading}
                  className="w-full bg-primary border-2 border-white/10 rounded-xl px-3 py-2.5 md:px-4 md:py-3 pr-10 text-white placeholder-white/40 focus:outline-none focus:border-accent/50 focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-xs md:text-sm disabled:opacity-50"
                />
                {/* Character count or emoji button */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <span className="text-white/30 text-xs">
                    {inputMessage.length > 0 && `${inputMessage.length}`}
                  </span>
                </div>
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading || !sessionId}
                className="bg-gradient-to-r from-accent to-accent-light p-2.5 md:p-3 rounded-xl hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group flex items-center justify-center min-w-[44px] md:min-w-[48px]"
                aria-label="Gönder"
              >
                <Send className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
            <div className="hidden md:flex items-center justify-center gap-2 text-white/40 text-xs">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <p>AI destekli asistan • Anlık yanıt • Enter ile gönder</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
