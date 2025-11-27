
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getChatbotResponse } from '../services/geminiService';
import SparklesIcon from './icons/SparklesIcon';

// Parses basic markdown (bolding, newlines) for better display in chat.
const parseChatMessageMarkdown = (text: string): string => {
  if (!text) return '';
  return text
    // Replace **bold** with <strong> tags
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-cyan-300">$1</strong>')
    // Replace newlines with <br> tags
    .replace(/\n/g, '<br />');
};

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: 'bot', text: "Hi there! I'm the AI guide for DrunkDetect. Ask me anything about how the app works, emotions, or the science behind it. I'll keep my answers clear and concise. What's on your mind?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const botResponseText = await getChatbotResponse(input);
    const botMessage: ChatMessage = { sender: 'bot', text: botResponseText };
    setMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-[70vh] max-w-3xl mx-auto bg-slate-800 rounded-lg shadow-2xl border border-slate-700">
      <h2 className="text-2xl font-bold text-center p-4 border-b border-slate-700 bg-gradient-to-r from-cyan-400 to-teal-400 text-transparent bg-clip-text">
        Chat with AI Assistant
      </h2>
      <div className="flex-grow p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={`flex mb-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-xl break-words ${msg.sender === 'user' ? 'bg-cyan-600 text-white' : 'bg-slate-700 text-slate-200'}`}>
              {msg.sender === 'bot' && (
                <div className="flex items-center mb-1">
                  <SparklesIcon />
                  <span className="font-bold text-sm ml-2 text-cyan-400">Gemini</span>
                </div>
              )}
               {msg.sender === 'user' ? (
                <p className="text-sm leading-relaxed">{msg.text}</p>
              ) : (
                <div
                  className="text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: parseChatMessageMarkdown(msg.text) }}
                />
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start mb-4">
             <div className="bg-slate-700 text-slate-200 px-4 py-2 rounded-xl">
               <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-cyan-400"></div>
                <span className="ml-2 text-sm">Thinking...</span>
               </div>
             </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t border-slate-700 flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about emotions, ViTs, or intoxication..."
          className="flex-grow bg-slate-700 text-white rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || input.trim() === ''}
          className="bg-cyan-600 text-white px-4 rounded-r-lg font-semibold hover:bg-cyan-700 disabled:bg-slate-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
