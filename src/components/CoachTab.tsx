import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  RotateCcw,
  AlertCircle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { useCredit } from '../context/CreditContext';
import { ChatMessage } from '../types/credit';
import { getCannedCoachResponse } from '../data/mockCreditData';
import { CoachSkeleton } from './common/LoadingSkeletons';
import { EmptyStateView, ErrorStateView, BureauMockBadge } from './common/ScreenStates';

export const CoachTab: React.FC = () => {
  const {
    persona,
    isSimulatedLoading,
    isSimulatedEmpty,
    isSimulatedError,
    setIsSimulatedError,
    logEvent,
  } = useCredit();

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize messages based on current persona
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'coach',
      text: `Hello ${persona.name.split(' ')[0]}! I'm your UPI Credit Health Coach. Your Bureau (mock) score is ${
        persona.score ? `${persona.score} (${persona.band})` : 'New to Credit (Thin-file)'
      }. How can I help you improve your credit terms today? Mock data, not financial advice.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  // When persona switches, refresh welcome message to persona
  useEffect(() => {
    setMessages([
      {
        id: `welcome-${persona.id}-${Date.now()}`,
        sender: 'coach',
        text: `Hello ${persona.name.split(' ')[0]}! I'm your UPI Credit Health Coach. Your Bureau (mock) score is ${
          persona.score ? `${persona.score} (${persona.band})` : 'New to Credit (Thin-file)'
        }. How can I help you improve your credit terms today? Mock data, not financial advice.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, [persona.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    logEvent('coach_asked', `Asked: "${text.slice(0, 40)}..."`, { question: text });

    let botReply = '';
    let isFallback = false;

    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona,
          message: text,
          history: messages.slice(-4),
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reply) {
          botReply = data.reply;
        } else {
          botReply = getCannedCoachResponse(persona, text);
          isFallback = true;
        }
      } else {
        // Fall back gracefully to canned answer without throwing error
        botReply = getCannedCoachResponse(persona, text);
        isFallback = true;
      }
    } catch (_err) {
      // Fallback
      botReply = getCannedCoachResponse(persona, text);
      isFallback = true;
    } finally {
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'coach',
          text: botReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          isFallback,
        },
      ]);
    }
  };

  // State checks
  if (isSimulatedLoading) {
    return (
      <div className="p-4">
        <CoachSkeleton />
      </div>
    );
  }

  if (isSimulatedError) {
    return (
      <div className="p-4">
        <ErrorStateView
          title="Coach Assistant Offline"
          message="Could not initialize the financial coach chat session. Please retry."
          onRetry={() => setIsSimulatedError(false)}
        />
      </div>
    );
  }

  if (isSimulatedEmpty) {
    return (
      <div className="p-4">
        <EmptyStateView
          title="No Conversation History"
          message="Start a fresh chat with your Credit Coach to get customized actionable steps."
          actionText="Ask Starter Question"
          onAction={() => handleSendMessage(persona.cannedQuestions[0])}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F5F3FA]">
      {/* Coach Top Profile Banner */}
      <div className="p-3 bg-white border-b border-purple-100 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#5F259F] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-xs font-bold text-gray-900">AI Credit Health Coach</h3>
              <BureauMockBadge />
            </div>
            <p className="text-[10px] text-gray-500">
              Active Context: {persona.name} • {persona.band}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setMessages([
              {
                id: `welcome-${Date.now()}`,
                sender: 'coach',
                text: `Session reset. Ready with your ${persona.band} profile data. Mock data, not financial advice.`,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ]);
          }}
          className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
          title="Reset Conversation"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Chat Messages Scrollable Feed */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 pb-24 text-xs">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex items-start gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-[#5F259F] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Bot className="w-4 h-4 text-purple-100" />
                </div>
              )}

              <div
                className={`max-w-[82%] rounded-2xl p-3 shadow-xs space-y-1 ${
                  isUser
                    ? 'bg-[#5F259F] text-white rounded-tr-xs'
                    : 'bg-white text-gray-800 rounded-tl-xs border border-purple-100/90'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                <div className="flex items-center justify-between gap-2 pt-0.5 text-[9px] opacity-70">
                  <span>{msg.timestamp}</span>
                  {!isUser && msg.isFallback && <span>(Local Coach)</span>}
                </div>
              </div>

              {isUser && (
                <div className="w-7 h-7 rounded-full bg-purple-200 text-[#5F259F] flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                  {persona.name[0]}
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex items-start gap-2">
            <div className="w-7 h-7 rounded-full bg-[#5F259F] text-white flex items-center justify-center shrink-0 mt-0.5">
              <Bot className="w-4 h-4 text-purple-100" />
            </div>
            <div className="bg-white rounded-2xl rounded-tl-xs p-3 shadow-xs border border-purple-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#5F259F] animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#5F259F] animate-bounce [animation-delay:0.2s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#5F259F] animate-bounce [animation-delay:0.4s]" />
              <span className="text-[10px] text-gray-400 font-medium ml-1">Analyzing bureau factors...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips & Input Tray */}
      <div className="p-3 bg-white border-t border-purple-100 space-y-2 shrink-0">
        {/* 4 Tailored Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[11px] no-scrollbar">
          {persona.cannedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              disabled={isLoading}
              className="px-2.5 py-1.5 rounded-xl bg-purple-50 hover:bg-purple-100 text-[#5F259F] font-semibold border border-purple-200/60 whitespace-nowrap shrink-0 transition-colors cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Text Input & Send */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask about your credit score, EMIs, or loans..."
            disabled={isLoading}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-gray-50 border border-purple-100 focus:border-[#5F259F] text-xs text-gray-900 outline-none transition-colors"
          />
          <button
            type="submit"
            disabled={isLoading || !inputMessage.trim()}
            className="min-h-[44px] min-w-[44px] rounded-xl bg-[#5F259F] hover:bg-[#4F1D85] disabled:bg-gray-200 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4 text-white" />
          </button>
        </form>

        <p className="text-[10px] text-center text-gray-400 font-medium">
          Mock data, not financial advice • Gemini 3.8 Flash integrated
        </p>
      </div>
    </div>
  );
};
