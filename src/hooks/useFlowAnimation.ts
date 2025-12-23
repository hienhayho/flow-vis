import { useState, useEffect } from 'react';
import { ConversationData, FlowNode } from '@/types';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function useFlowAnimation(data: ConversationData | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentNodeName, setCurrentNodeName] = useState<string | null>(null);
  const [flowPath, setFlowPath] = useState<FlowNode[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!data || data.length === 0) {
      return;
    }

    const animateConversation = async () => {
      setIsAnimating(true);
      setMessages([]);
      setCurrentNodeName(null);
      setFlowPath([]);

      for (let turnIndex = 0; turnIndex < data.length; turnIndex++) {
        const turn = data[turnIndex];

        // Show user message
        setMessages(prev => [...prev, { role: 'user', content: turn.user }]);

        // Wait a bit before starting flow
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Animate through each flow node
        const pathTaken: FlowNode[] = [];
        for (let nodeIndex = 0; nodeIndex < turn.flow.length; nodeIndex++) {
          const node = turn.flow[nodeIndex];

          setCurrentNodeName(node.node_name);
          pathTaken.push(node);
          setFlowPath([...pathTaken]);

          // Wait based on the node's time (convert to milliseconds and scale down for demo)
          const waitTime = Math.max(node.time * 150, 800); // Minimum 800ms per node
          await new Promise(resolve => setTimeout(resolve, waitTime));
        }

        // Flow complete, show assistant message
        setCurrentNodeName(null);
        setMessages(prev => [...prev, { role: 'assistant', content: turn.asssistant }]);

        // Wait before next turn
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Reset flow path for next turn
        setFlowPath([]);
      }

      setIsAnimating(false);
    };

    animateConversation();
  }, [data]);

  return {
    messages,
    currentNodeName,
    flowPath,
    isAnimating,
  };
}
