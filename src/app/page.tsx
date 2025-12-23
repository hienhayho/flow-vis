'use client';

import { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import ChatConversation from '@/components/ChatConversation';
import FlowVisualization from '@/components/FlowVisualization';
import { useFlowAnimation } from '@/hooks/useFlowAnimation';
import { ConversationData } from '@/types';

export default function Home() {
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const { messages, currentNodeName, flowPath } = useFlowAnimation(conversationData);

  const loadSampleData = async () => {
    try {
      const response = await fetch('/sample.json');
      const data = await response.json();
      setConversationData(data);
    } catch (error) {
      console.error('Failed to load sample data:', error);
      alert('Failed to load sample data. Please check if sample.json exists in the public folder.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">FOXY Flow Visualization</h1>
          {!conversationData && (
            <div className="flex gap-4 items-center">
              <FileUpload onDataLoaded={setConversationData} />
              <span className="text-gray-500 font-medium">or</span>
              <button
                onClick={loadSampleData}
                className="px-6 py-2 bg-[#C68E42] text-white rounded-lg hover:bg-[#B07A38] transition-colors font-medium shadow-md"
              >
                Load Sample Data
              </button>
            </div>
          )}
          {conversationData && (
            <div className="flex gap-4">
              <button
                onClick={() => setConversationData(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload New File
              </button>
              <button
                onClick={loadSampleData}
                className="px-6 py-2 bg-[#C68E42] text-white rounded-lg hover:bg-[#B07A38] transition-colors font-medium shadow-md"
              >
                Load Sample Data
              </button>
            </div>
          )}
        </div>

        {/* Main content - Split view */}
        {conversationData && (
          <div className="flex gap-6 h-[calc(100vh-180px)]">
            {/* Left: Chat Conversation (20%) */}
            <div className="w-[20%] flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">Conversation</h2>
              <div className="flex-1 min-h-0">
                <ChatConversation messages={messages} />
              </div>
            </div>

            {/* Right: Flow Visualization (80%) */}
            <div className="w-[80%] flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">Processing Flow</h2>
              <div className="flex-1 min-h-0">
                <FlowVisualization currentNodeName={currentNodeName} flowPath={flowPath} />
              </div>
            </div>
          </div>
        )}

        {/* Node Info Display - Fixed Position Outside Flow */}
        {conversationData && currentNodeName && flowPath.length > 0 && (() => {
          const currentNode = flowPath.find((n) => n.node_name === currentNodeName);
          if (!currentNode) return null;

          return (
            <div className="fixed top-6 right-8 bg-white rounded-lg shadow-xl p-4 max-w-sm border-2 border-[#C68E42] z-50">
              <h3 className="font-bold text-[#C68E42] mb-2 text-sm">
                {currentNode.node_name}
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="font-semibold text-gray-700">Input: </span>
                  <span className="text-gray-600">{currentNode.input}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Output: </span>
                  <span className="text-gray-600">{currentNode.output}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Reason: </span>
                  <span className="text-gray-600 whitespace-pre-line">{currentNode.reason}</span>
                </div>
              </div>
            </div>
          );
        })()}

        {/* Empty state */}
        {!conversationData && (
          <div className="text-center py-20">
            <p className="text-gray-600 text-lg">
              Upload a JSON file to visualize the conversation flow
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
