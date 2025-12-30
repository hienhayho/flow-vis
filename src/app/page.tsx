'use client';

import { useState, useEffect } from 'react';
import { ArrowDownCircle, ArrowUpCircle, Lightbulb, Copy, Check, Pause, Play } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import ChatConversation from '@/components/ChatConversation';
import FlowVisualization from '@/components/FlowVisualization';
import { useFlowAnimation } from '@/hooks/useFlowAnimation';
import { ConversationData } from '@/types';

// Copy Button Component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
      title="Copy to clipboard"
    >
      {copied ? (
        <Check size={14} className="text-green-600" />
      ) : (
        <Copy size={14} className="text-gray-400" />
      )}
    </button>
  );
}

// JSON Content Renderer Component
function JsonContentRenderer({ content }: { content: string }) {
  const parseContent = (): { type: 'json' | 'raw'; data: any; formatted?: string } => {
    if (!content || content.trim() === '') {
      return { type: 'raw', data: content };
    }

    try {
      // Step 1: Check if content contains tool_call tags
      const toolCallMatch = content.match(/<tool_call>([\s\S]*?)<\/tool_call>/);
      let jsonString = toolCallMatch ? toolCallMatch[1].trim() : content.trim();

      // Step 2: Try to unescape if it looks like escaped JSON
      if (jsonString.includes('\\"') || jsonString.includes('\\n')) {
        try {
          jsonString = JSON.parse(`"${jsonString}"`);
        } catch {
          // If unescaping fails, continue with original
        }
      }

      // Step 3: Try to parse as JSON
      const parsed = JSON.parse(jsonString);
      const formatted = JSON.stringify(parsed, null, 2);

      return { type: 'json', data: parsed, formatted };
    } catch {
      // Parsing failed, return raw content
      return { type: 'raw', data: content };
    }
  };

  const syntaxHighlight = (json: string): JSX.Element[] => {
    const parts: JSX.Element[] = [];
    let key = 0;

    // Regex to match JSON tokens
    const regex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g;

    let lastIndex = 0;
    let match;

    while ((match = regex.exec(json)) !== null) {
      // Add text before match
      if (match.index > lastIndex) {
        parts.push(
          <span key={`text-${key++}`}>{json.substring(lastIndex, match.index)}</span>
        );
      }

      const token = match[0];

      if (match[3]) {
        // Key (string followed by colon)
        parts.push(
          <span key={`key-${key++}`} className="text-blue-700 font-semibold">
            {token.slice(0, -1)}
          </span>
        );
        parts.push(<span key={`colon-${key++}`}>:</span>);
      } else if (token.startsWith('"')) {
        // String value
        parts.push(
          <span key={`string-${key++}`} className="text-green-700">
            {token}
          </span>
        );
      } else if (token === 'true' || token === 'false') {
        // Boolean
        parts.push(
          <span key={`bool-${key++}`} className="text-purple-700 font-medium">
            {token}
          </span>
        );
      } else if (token === 'null') {
        // Null
        parts.push(
          <span key={`null-${key++}`} className="text-gray-500 italic">
            {token}
          </span>
        );
      } else {
        // Number
        parts.push(
          <span key={`number-${key++}`} className="text-orange-700">
            {token}
          </span>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < json.length) {
      parts.push(<span key={`end-${key++}`}>{json.substring(lastIndex)}</span>);
    }

    return parts;
  };

  const result = parseContent();

  if (result.type === 'json' && result.formatted) {
    return (
      <div className="relative">
        <div className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded font-medium">
          JSON
        </div>
        <pre className="text-xs bg-gray-50 rounded p-2 pt-7 overflow-x-auto border border-gray-200">
          <code className="font-mono leading-relaxed">
            {syntaxHighlight(result.formatted)}
          </code>
        </pre>
      </div>
    );
  }

  return (
    <p className="text-sm text-gray-800 font-mono leading-relaxed break-words whitespace-pre-wrap">
      {content}
    </p>
  );
}

export default function Home() {
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const [selectedMessageIndex, setSelectedMessageIndex] = useState<number | null>(null);
  const [selectedNodeName, setSelectedNodeName] = useState<string | null>(null);
  const [showSampleSelector, setShowSampleSelector] = useState(false);
  const [availableSamples, setAvailableSamples] = useState<string[]>([]);
  const { messages, currentNodeName, flowPath, isAnimating, isPaused, togglePause } = useFlowAnimation(conversationData);

  // Get the active flow based on selected message
  const activeFlow = selectedMessageIndex !== null && conversationData
    ? conversationData[selectedMessageIndex]?.flow || []
    : flowPath;

  // Display either selected node or current animated node
  const displayNodeName = selectedNodeName || currentNodeName;

  // Handle message selection (toggle on/off)
  const handleMessageSelect = (index: number) => {
    console.log('Message selected:', index);
    // Toggle: if same message is clicked again, deselect it
    if (selectedMessageIndex === index) {
      setSelectedMessageIndex(null);
      setSelectedNodeName(null);
    } else {
      setSelectedMessageIndex(index);
      setSelectedNodeName(null); // Clear node selection when changing messages
    }
  };

  // Handle node selection with debugging
  const handleNodeSelect = (nodeName: string) => {
    console.log('Node clicked:', nodeName);
    console.log('Available nodes in activeFlow:', activeFlow.map(n => n.node_name));
    setSelectedNodeName(nodeName);
  };

  const loadSampleData = async (filename: string) => {
    try {
      const response = await fetch(`/${filename}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}`);
      }
      const data = await response.json();
      setConversationData(data);
      setShowSampleSelector(false);
    } catch (error) {
      console.error('Failed to load sample data:', error);
      alert(`Failed to load ${filename}. Please check if the file exists in the public folder.`);
    }
  };

  const handleLoadSampleClick = () => {
    // Always show selector dropdown
    setShowSampleSelector(!showSampleSelector);
  };

  // Auto-detect available JSON files in public folder
  const detectSampleFiles = async () => {
    try {
      // Try to fetch a manifest file that lists available samples
      const response = await fetch('/samples-manifest.json');
      if (response.ok) {
        const manifest = await response.json();
        setAvailableSamples(manifest.files || []);
      } else {
        // Fallback: try common sample filenames
        const commonSamples = ['sample.json', 'sample1.json', 'sample2.json', 'sample3.json'];
        const available = [];

        for (const filename of commonSamples) {
          try {
            const testResponse = await fetch(`/${filename}`, { method: 'HEAD' });
            if (testResponse.ok) {
              available.push(filename);
            }
          } catch {
            // File doesn't exist, skip
          }
        }

        if (available.length > 0) {
          setAvailableSamples(available);
        } else {
          // Default fallback
          setAvailableSamples(['sample.json']);
        }
      }
    } catch (error) {
      console.error('Failed to detect sample files:', error);
      setAvailableSamples(['sample.json']);
    }
  };

  // Detect available samples on component mount
  useEffect(() => {
    detectSampleFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="max-w-[1800px] mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">FOXY Flow Visualization</h1>
          {!conversationData && (
            <div className="flex gap-4 items-center relative">
              <FileUpload onDataLoaded={setConversationData} />
              <span className="text-gray-500 font-medium">or</span>
              <div className="relative">
                <button
                  onClick={handleLoadSampleClick}
                  className="px-6 py-2 bg-[#C68E42] text-white rounded-lg hover:bg-[#B07A38] transition-colors font-medium shadow-md"
                >
                  Load Sample Data
                </button>
                {showSampleSelector && availableSamples.length > 0 && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-50 min-w-[250px]">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-600 px-2 py-1 border-b border-gray-200 mb-1">
                        Select Sample File ({availableSamples.length} available):
                      </div>
                      {availableSamples.map((sample) => (
                        <button
                          key={sample}
                          onClick={() => loadSampleData(sample)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 font-medium hover:bg-[#C68E42] hover:text-white rounded transition-colors"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {conversationData && (
            <div className="flex gap-4 relative items-center">
              <button
                onClick={() => setConversationData(null)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Upload New File
              </button>
              <div className="relative">
                <button
                  onClick={handleLoadSampleClick}
                  className="px-6 py-2 bg-[#C68E42] text-white rounded-lg hover:bg-[#B07A38] transition-colors font-medium shadow-md"
                >
                  Load Sample Data
                </button>
                {showSampleSelector && availableSamples.length > 0 && (
                  <div className="absolute top-full mt-2 bg-white rounded-lg shadow-xl border-2 border-gray-200 z-50 min-w-[250px]">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-gray-600 px-2 py-1 border-b border-gray-200 mb-1">
                        Select Sample File ({availableSamples.length} available):
                      </div>
                      {availableSamples.map((sample) => (
                        <button
                          key={sample}
                          onClick={() => loadSampleData(sample)}
                          className="w-full text-left px-3 py-2 text-sm text-gray-700 font-medium hover:bg-[#C68E42] hover:text-white rounded transition-colors"
                        >
                          {sample}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {isAnimating && (
                <button
                  onClick={togglePause}
                  className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium shadow-md"
                >
                  {isPaused ? (
                    <>
                      <Play size={18} />
                      Resume
                    </>
                  ) : (
                    <>
                      <Pause size={18} />
                      Pause
                    </>
                  )}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Main content - Three column layout */}
        {conversationData && (
          <div className="flex gap-4 h-[calc(100vh-180px)]">
            {/* Left: Chat Conversation (18%) */}
            <div className="w-[18%] flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">Conversation</h2>
              <div className="flex-1 min-h-0">
                <ChatConversation
                  messages={messages}
                  conversationData={conversationData}
                  selectedMessageIndex={selectedMessageIndex}
                  onMessageSelect={handleMessageSelect}
                />
              </div>
            </div>

            {/* Center: Flow Visualization (57%) */}
            <div className="w-[57%] flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-700 mb-3">Processing Flow</h2>
              <div className="flex-1 min-h-0">
                <FlowVisualization
                  currentNodeName={currentNodeName}
                  flowPath={activeFlow}
                  selectedNodeName={selectedNodeName}
                  onNodeSelect={handleNodeSelect}
                  selectedMessageIndex={selectedMessageIndex}
                />
              </div>
            </div>

            {/* Right: Node Inspector Panel (25%) */}
            <div className="w-[25%] flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-2xl font-semibold text-gray-700">Node Inspector</h2>
                <div className="flex gap-2">
                  {selectedMessageIndex !== null && (
                    <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">
                      Turn {selectedMessageIndex + 1}
                    </span>
                  )}
                  {selectedNodeName && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                      Node Selected
                    </span>
                  )}
                  {currentNodeName && !selectedNodeName && !selectedMessageIndex && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      Animating
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-1 min-h-0 bg-white rounded-lg border border-gray-200 shadow-sm overflow-y-auto">
                {displayNodeName ? (() => {
                  const currentNode = activeFlow.find((n) => n.node_name === displayNodeName);

                  console.log('Inspector rendering - displayNodeName:', displayNodeName);
                  console.log('Inspector rendering - found node:', currentNode);
                  console.log('Inspector rendering - selectedMessageIndex:', selectedMessageIndex);

                  if (!currentNode) {
                    return (
                      <div className="p-6 text-center">
                        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                          <div className="flex items-center justify-center gap-2 mb-2">
                            <Lightbulb size={20} className="text-amber-600" />
                            <h4 className="font-semibold text-amber-900">No Data Available</h4>
                          </div>
                          <p className="text-sm text-amber-700">
                            No execution data found for <span className="font-semibold">{displayNodeName}</span>
                          </p>
                          <p className="text-xs text-amber-600 mt-2">
                            This node may not have been executed yet or doesn't contain tracked data.
                          </p>
                          <details className="mt-3 text-xs">
                            <summary className="cursor-pointer text-amber-700 font-semibold">Debug Info</summary>
                            <div className="mt-2 text-left bg-white rounded p-2 font-mono text-[10px]">
                              <div>Looking for node: <span className="text-red-600">{displayNodeName}</span></div>
                              <div className="mt-1">Selected message index: <span className="text-purple-600">{selectedMessageIndex ?? 'none'}</span></div>
                              <div className="mt-1">Using conversationData[{selectedMessageIndex ?? 'animation'}]</div>
                              <div className="mt-1">Active flow has {activeFlow.length} nodes:</div>
                              <ul className="list-disc list-inside">
                                {activeFlow.map((n, i) => (
                                  <li key={i} className={n.node_name === displayNodeName ? 'text-red-600 font-bold' : 'text-blue-600'}>
                                    {n.node_name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </details>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div className="p-4">
                      {/* Node Header */}
                      <div className="mb-5 pb-3 border-b-2 border-[#C68E42]">
                        <h3 className="font-bold text-[#C68E42] text-base">
                          {currentNode.node_name}
                        </h3>
                      </div>

                      <div className="space-y-3">
                        {/* Input Section */}
                        <div className="border border-blue-200 rounded-lg bg-blue-50/30 overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-2 bg-blue-100/50 border-b border-blue-200">
                            <div className="flex items-center gap-2">
                              <ArrowDownCircle size={16} className="text-blue-600" />
                              <span className="text-xs font-bold text-blue-900 uppercase tracking-wide">
                                Input
                              </span>
                            </div>
                            {currentNode.input && <CopyButton text={currentNode.input} />}
                          </div>
                          <div className="px-3 py-2.5">
                            {currentNode.input ? (
                              <JsonContentRenderer content={currentNode.input} />
                            ) : (
                              <p className="text-xs text-gray-400 italic">No input data</p>
                            )}
                          </div>
                        </div>

                        {/* Output Section */}
                        <div className="border border-green-200 rounded-lg bg-green-50/30 overflow-hidden">
                          <div className="flex items-center justify-between px-3 py-2 bg-green-100/50 border-b border-green-200">
                            <div className="flex items-center gap-2">
                              <ArrowUpCircle size={16} className="text-green-600" />
                              <span className="text-xs font-bold text-green-900 uppercase tracking-wide">
                                Output
                              </span>
                            </div>
                            {currentNode.output && <CopyButton text={currentNode.output} />}
                          </div>
                          <div className="px-3 py-2.5">
                            {currentNode.output ? (
                              <JsonContentRenderer content={currentNode.output} />
                            ) : (
                              <p className="text-xs text-gray-400 italic">No output data</p>
                            )}
                          </div>
                        </div>

                        {/* Reason Section */}
                        <div className="border border-amber-200 rounded-lg bg-amber-50/20 overflow-hidden">
                          <div className="flex items-center gap-2 px-3 py-2 bg-amber-100/30 border-b border-amber-200">
                            <Lightbulb size={16} className="text-amber-600" />
                            <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                              Reason
                            </span>
                          </div>
                          <div className="px-3 py-2.5">
                            {currentNode.reason ? (
                              <p className="text-xs text-gray-600 leading-relaxed whitespace-pre-line">
                                {currentNode.reason}
                              </p>
                            ) : (
                              <p className="text-xs text-gray-400 italic">No reason provided</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="p-6 text-center text-gray-400">
                    {selectedMessageIndex === null ? (
                      <>
                        <p className="text-sm">Select a message from the conversation</p>
                        <p className="text-xs mt-2 text-gray-500">
                          Choose a message to view its processing flow
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm">Click a node to view details</p>
                        {activeFlow.length > 0 && (
                          <p className="text-xs mt-2 text-gray-500">
                            {activeFlow.length} node{activeFlow.length !== 1 ? 's' : ''} available
                          </p>
                        )}
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

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
