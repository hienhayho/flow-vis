import { useState, useEffect, useRef } from "react";
import { ConversationData, FlowNode } from "@/types";

interface Message {
    role: "user" | "assistant";
    content: string;
}

interface AnimationConfig {
    minActiveTime: number;
    scaleNodeActiveTime: number;
}

export function useFlowAnimation(
    data: ConversationData | null,
    config: AnimationConfig = { minActiveTime: 1000, scaleNodeActiveTime: 150 }
) {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentNodeName, setCurrentNodeName] = useState<string | null>(null);
    const [flowPath, setFlowPath] = useState<FlowNode[]>([]);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const pausedRef = useRef(false);

    // Helper function to wait with pause support
    const pausableDelay = async (ms: number) => {
        let elapsed = 0;
        const interval = 100;

        while (elapsed < ms) {
            // Wait for 100ms interval
            await new Promise((resolve) => setTimeout(resolve, interval));

            // Only increment elapsed time if not paused
            if (!pausedRef.current) {
                elapsed += interval;
            }
            // If paused, don't increment elapsed, just keep waiting
        }
    };

    useEffect(() => {
        if (!data || data.length === 0) {
            return;
        }

        let cancelled = false;

        const animateConversation = async () => {
            setIsAnimating(true);
            setMessages([]);
            setCurrentNodeName(null);
            setFlowPath([]);
            pausedRef.current = false;
            setIsPaused(false);

            for (let turnIndex = 0; turnIndex < data.length; turnIndex++) {
                if (cancelled) break;

                const turn = data[turnIndex];

                // Show user message
                setMessages((prev) => [
                    ...prev,
                    { role: "user", content: turn.user },
                ]);

                // Wait a bit before starting flow
                await pausableDelay(1000);
                if (cancelled) break;

                // Animate through each flow node
                const pathTaken: FlowNode[] = [];
                for (
                    let nodeIndex = 0;
                    nodeIndex < turn.flow.length;
                    nodeIndex++
                ) {
                    if (cancelled) break;

                    const node = turn.flow[nodeIndex];

                    setCurrentNodeName(node.node_name);
                    pathTaken.push(node);
                    setFlowPath([...pathTaken]);

                    // Wait based on the node's time (convert to milliseconds and scale down for demo)
                    const waitTime = Math.max(
                        node.time * config.scaleNodeActiveTime,
                        config.minActiveTime
                    );
                    await pausableDelay(waitTime);
                }

                if (cancelled) break;

                // Flow complete, show assistant message
                setCurrentNodeName(null);
                setMessages((prev) => [
                    ...prev,
                    { role: "assistant", content: turn.asssistant },
                ]);

                // Wait before next turn
                await pausableDelay(2000);

                // Reset flow path for next turn
                setFlowPath([]);
            }

            setIsAnimating(false);
            setIsPaused(false);
        };

        animateConversation();

        return () => {
            cancelled = true;
        };
    }, [data, config.minActiveTime, config.scaleNodeActiveTime]);

    const togglePause = () => {
        pausedRef.current = !pausedRef.current;
        setIsPaused(!isPaused);
    };

    return {
        messages,
        currentNodeName,
        flowPath,
        isAnimating,
        isPaused,
        togglePause,
    };
}
