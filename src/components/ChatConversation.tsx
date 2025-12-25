'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { ConversationData } from '@/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatConversationProps {
  messages: Message[];
  conversationData: ConversationData | null;
  selectedMessageIndex: number | null;
  onMessageSelect: (index: number) => void;
}

export default function ChatConversation({
  messages,
  conversationData,
  selectedMessageIndex,
  onMessageSelect
}: ChatConversationProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Map message index to conversation turn index (user messages only)
  const getUserMessageIndex = (messageIndex: number): number | null => {
    let userMessageCount = -1; // Start at -1 so first increment gives 0
    for (let i = 0; i <= messageIndex; i++) {
      if (messages[i]?.role === 'user') {
        userMessageCount++; // Increment first
        if (i === messageIndex) {
          console.log('Mapping message index', messageIndex, 'to turn index', userMessageCount);
          return userMessageCount;
        }
      }
    }
    return null;
  };

  const handleMessageClick = (messageIndex: number) => {
    const message = messages[messageIndex];
    console.log('=== MESSAGE CLICK DEBUG ===');
    console.log('Clicked message index:', messageIndex);
    console.log('Message role:', message.role);
    console.log('Message content:', message.content.substring(0, 50));
    console.log('All messages:', messages.map((m, i) => ({ index: i, role: m.role, content: m.content.substring(0, 30) })));

    if (message.role === 'user') {
      const turnIndex = getUserMessageIndex(messageIndex);
      console.log('Calculated turn index:', turnIndex);
      console.log('Will select conversationData[' + turnIndex + ']');
      if (turnIndex !== null) {
        onMessageSelect(turnIndex);
      }
    } else {
      console.log('Not a user message, ignoring');
    }
    console.log('=========================');
  };

  const isMessageSelected = (messageIndex: number): boolean => {
    if (selectedMessageIndex === null) return false;
    const message = messages[messageIndex];
    if (message?.role !== 'user') return false;

    const turnIndex = getUserMessageIndex(messageIndex);
    const isSelected = turnIndex === selectedMessageIndex;

    console.log('Checking if message', messageIndex, 'is selected. turnIndex:', turnIndex, 'selectedMessageIndex:', selectedMessageIndex, 'result:', isSelected);

    return isSelected;
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 rounded-lg shadow-inner p-4 overflow-y-auto">
      <div className="flex-1 space-y-4">
        <AnimatePresence>
          {messages.map((message, index) => {
            const isUserMessage = message.role === 'user';
            const isSelected = isMessageSelected(index);

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`flex ${isUserMessage ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  onClick={() => handleMessageClick(index)}
                  className={`max-w-[80%] rounded-lg p-3 ${
                    isUserMessage
                      ? `bg-blue-500 text-white ${isSelected ? 'ring-4 ring-[#C68E42] ring-opacity-70' : ''} ${conversationData ? 'cursor-pointer hover:bg-blue-600' : ''}`
                      : 'bg-white text-gray-800 border border-gray-200'
                  } transition-all`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  {isUserMessage && conversationData && (
                    <div className="text-xs opacity-70 mt-1 flex items-center justify-between">
                      <span>{isSelected ? '✓ Selected' : 'Click to view flow'}</span>
                      <span className="bg-blue-600 px-1.5 py-0.5 rounded text-[10px]">
                        Turn {(getUserMessageIndex(index) ?? 0) + 1}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
