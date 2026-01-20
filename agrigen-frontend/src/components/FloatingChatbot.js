import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaTimes, FaComments } from "react-icons/fa";
import "./FloatingChatbot.css";

// Google Gemini API Configuration
const API_KEY = "AIzaSyCVp9mXiOuM7n5soqtvp2SVenloUo14XHE";
const API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// Enhanced System prompt with comprehensive AgriGenAI context
const SYSTEM_CONTEXT = `You are an intelligent AI assistant for AgriGenAI, a comprehensive smart agriculture platform. Your role is to help farmers and users with detailed, practical assistance.

**PLATFORM FEATURES YOU SUPPORT:**

1. **Plant Genotype Analysis & Prediction**
   - Analyze uploaded tomato plant images to predict genetic traits
   - Identify traits like yield potential, disease resistance, fruit quality
   - Provide genotype classifications and breeding insights

2. **Hybrid Crop Recommendations**
   - Suggest optimal crop hybrids based on local weather conditions
   - Consider temperature, humidity, rainfall patterns
   - Recommend planting schedules and varieties

3. **Tomato Disease Detection**
   - Identify diseases from plant images (leaves, stems, fruits)
   - Detect common issues: blight, wilt, leaf curl, bacterial spot
   - Provide treatment recommendations and prevention tips

4. **Breeding Partner Suggestions**
   - Recommend parent plant combinations for desired traits
   - Suggest breeding strategies for improved varieties
   - Predict offspring characteristics

5. **Weather-based Agricultural Advice**
   - Real-time weather integration for farming decisions
   - Location-specific recommendations
   - Seasonal planting guidance

**YOUR CAPABILITIES:**
- Answer questions about platform features and how to use them
- Provide practical agricultural advice for tomato cultivation
- Explain genetic concepts in simple, farmer-friendly language
- Give troubleshooting help for platform usage
- Offer crop management tips based on weather and seasons
- Explain disease symptoms and treatments
- Guide on fertilizer and pesticide usage
- Advise on irrigation and soil management

**RESPONSE GUIDELINES:**
- Keep responses concise (under 150 words) for simple questions
- Provide detailed explanations (200-300 words) for complex topics
- Use simple, clear language - avoid excessive technical jargon
- Include practical examples when explaining concepts
- Be encouraging and supportive of farmers
- If asked about features not mentioned above, politely inform that it's coming soon
- Always relate answers back to practical farming applications

**TONE:**
- Friendly and approachable
- Professional yet conversational
- Encouraging and supportive
- Patient with repeated or basic questions

Remember: You're here to make agriculture technology accessible and useful for farmers of all experience levels.`;

const FloatingChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([
    {
      role: "assistant",
      content:
        "👋 Hello! I'm your AgriGenAI assistant. I can help you with:\n\n• 🌱 Plant genotype analysis & predictions\n• 🌾 Hybrid crop recommendations\n• 🍅 Tomato disease detection & treatment\n• 🧬 Breeding partner suggestions\n• 🌤️ Weather-based farming advice\n• 💡 Platform features & how to use them\n\nWhat would you like to know?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setLoading(true);

    // Add user message to chat
    setChat((prev) => [...prev, { role: "user", content: userMessage }]);

    try {
      // Prepare enhanced prompt with context
      const enhancedPrompt = `${SYSTEM_CONTEXT}\n\nUser Question: ${userMessage}\n\nProvide a helpful, accurate, and practical response as the AgriGenAI assistant.`;

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: enhancedPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to chat
      if (data.candidates && data.candidates[0].content) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setChat((prev) => [
          ...prev,
          {
            role: "assistant",
            content: aiResponse,
          },
        ]);
      } else {
        throw new Error("Invalid response from AI");
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setChat((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Sorry, I encountered an error. Please try again or rephrase your question. If the problem persists, check your internet connection.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Clear chat function
  const clearChat = () => {
    setChat([
      {
        role: "assistant",
        content:
          "👋 Hello! I'm your AgriGenAI assistant. I can help you with:\n\n• 🌱 Plant genotype analysis & predictions\n• 🌾 Hybrid crop recommendations\n• 🍅 Tomato disease detection & treatment\n• 🧬 Breeding partner suggestions\n• 🌤️ Weather-based farming advice\n• 💡 Platform features & how to use them\n\nWhat would you like to know?",
      },
    ]);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        className="floating-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        aria-label="Toggle chat"
      >
        {isOpen ? <FaTimes size={24} /> : <FaComments size={24} />}
        {!isOpen && <span className="chat-notification-dot"></span>}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="floating-chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            {/* Chat Header */}
            <div className="chat-header">
              <div className="chat-header-info">
                <div className="chat-status-indicator"></div>
                <div>
                  <h3>AgriGenAI Assistant</h3>
                  <p>Always here to help 🌱</p>
                </div>
              </div>
              <div className="chat-header-actions">
                <button
                  className="chat-clear-btn"
                  onClick={clearChat}
                  title="Clear chat"
                  aria-label="Clear chat"
                >
                  🗑️
                </button>
                <button
                  className="chat-close-btn"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="chat-messages">
              {chat.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`chat-message ${message.role}`}
                >
                  <div className="message-content">{message.content}</div>
                  <div className="message-time">
                    {new Date().toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="chat-message assistant"
                >
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Chat Input */}
            <div className="chat-input-container">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about agriculture..."
                className="chat-input"
                disabled={loading}
                rows="1"
                style={{
                  resize: "none",
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
              />
              <button
                onClick={sendMessage}
                disabled={loading || !input.trim()}
                className="chat-send-btn"
                aria-label="Send message"
              >
                {loading ? (
                  <div className="loading-spinner" />
                ) : (
                  <FaPaperPlane />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FloatingChatbot;
