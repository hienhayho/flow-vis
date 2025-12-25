"use client";

import { useEffect, useRef } from "react";
import UserWithArrow from "./UserWithArrow";
import SaleModelWithArrow from "./SaleModelWithArrow";
import UseToolDecision from "./UseToolDecision";
import ParseToolWithArrow from "./ParseToolWithArrow";
import GptOssDoubleCheckWithArrow from "./GptOssDoubleCheckWithArrow";
import ConfirmUseToolDecision from "./ConfirmUseToolDecision";
import GptOssSlotFillingWithArrow from "./GptOssSlotFillingWithArrow";
import UpdateArgumentsWithArrow from "./UpdateArgumentsWithArrow";
import ToolResourceWithArrow from "./ToolResourceWithArrow";
import PostProcessWithArrow from "./PostProcessWithArrow";
import UserEnd from "./UserEnd";
import GptOssSlotFillingBottomWithArrow from "./GptOssSlotFillingBottomWithArrow";
import SaleModelBottomWithArrow from "./SaleModelBottomWithArrow";

interface FlowNode {
    node_name: string;
    input: string;
    output: string;
    time: number;
    reason: string;
}

interface FlowVisualizationProps {
    currentNodeName: string | null;
    flowPath: FlowNode[];
    selectedNodeName: string | null;
    onNodeSelect: (nodeName: string) => void;
}

// Node position mapping for auto-scroll (outside component to avoid re-creation)
const nodePositions: Record<string, number> = {
    "User Input": 60,
    "Sale Model 1": 280,
    "use tool?": 500,
    "Parse Tool_name/arguments": 690,
    "GPT-OSS Dọuble-check": 1020,
    "confirm use tool?": 1250,
    "GPT-OSS Slot-Filling": 1430,
    "Update Argument": 1610,
    "Tool Resource": 1898,
    "Post-process": 710,
    "User Output": 1020,
    "GPT-OSS Final": 1898,
    "Sale model 2": 1458,
};

export default function FlowVisualization({
    currentNodeName,
    flowPath,
    selectedNodeName,
    onNodeSelect,
}: FlowVisualizationProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const isNodeActive = (nodeKey: string): boolean => {
        // Selected node takes priority, then animated current node
        if (selectedNodeName) {
            return nodeKey === selectedNodeName;
        }
        if (currentNodeName) {
            return nodeKey === currentNodeName;
        }
        return false;
    };

    const isNodeSelected = (nodeKey: string): boolean => {
        return selectedNodeName === nodeKey;
    };

    const getNodeDecision = (nodeKey: string): string | undefined => {
        const node = flowPath.find(n => n.node_name === nodeKey);
        return node?.output;
    };

    // Auto-scroll to active node
    useEffect(() => {
        if (currentNodeName && scrollContainerRef.current) {
            const xPosition = nodePositions[currentNodeName];
            if (xPosition !== undefined) {
                // If User Output node, wait 1s then scroll back to beginning
                if (currentNodeName === "User Output") {
                    setTimeout(() => {
                        if (scrollContainerRef.current) {
                            scrollContainerRef.current.scrollTo({
                                left: 0,
                                behavior: "smooth"
                            });
                        }
                    }, 1000);
                } else {
                    scrollContainerRef.current.scrollTo({
                        left: xPosition - 200,
                        behavior: "smooth"
                    });
                }
            }
        }
    }, [currentNodeName]);

    return (
        <div className="w-full h-full bg-[#FFFBF5] rounded-[30px] border-4 border-dashed border-[#D4C5A0] relative overflow-x-auto overflow-y-hidden font-sans" ref={scrollContainerRef}>
            {/* Title */}
            <div className="absolute top-6 left-8 text-2xl font-bold text-[#C68E42] tracking-wide z-20">
                FOXY
            </div>

            <div className="relative w-full h-full min-w-[2100px]">
                {/* SVG Layer for connectors */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ minWidth: '2100px' }}>
                    <defs>
                        {/* Arrow marker */}
                        <marker
                            id="arrow"
                            markerWidth="10"
                            markerHeight="10"
                            refX="9"
                            refY="5"
                            orient="auto"
                            markerUnits="strokeWidth"
                        >
                            <path
                                d="M0,0 L0,10 L10,5 z"
                                fill="#2c3e50"
                                stroke="#2c3e50"
                                strokeWidth="0.5"
                            />
                        </marker>

                        {/* Drop shadow for lines */}
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
                            <feOffset dx="0" dy="1" result="offsetblur"/>
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.2"/>
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                </svg>

                {/* User with arrow */}
                <UserWithArrow
                    isActive={isNodeActive("User Input")}
                    onNodeClick={() => onNodeSelect("User Input")}
                />

                {/* Sale Model with arrow */}
                <SaleModelWithArrow
                    isActive={isNodeActive("Sale Model 1")}
                    onNodeClick={() => onNodeSelect("Sale Model 1")}
                />

                {/* Use tool decision with Yes/No arrows */}
                <UseToolDecision
                    isActive={isNodeActive("use tool?")}
                    decision={getNodeDecision("use tool?")}
                    onNodeClick={() => onNodeSelect("use tool?")}
                />

                {/* Parse Tool with arrow */}
                <ParseToolWithArrow
                    isActive={isNodeActive("Parse Tool_name/arguments")}
                    onNodeClick={() => onNodeSelect("Parse Tool_name/arguments")}
                />

                {/* GPT-OSS Double-Check with arrow */}
                <GptOssDoubleCheckWithArrow
                    isActive={isNodeActive("GPT-OSS Dọuble-check")}
                    onNodeClick={() => onNodeSelect("GPT-OSS Dọuble-check")}
                />

                {/* Confirm use tool decision with Yes/No arrows */}
                <ConfirmUseToolDecision
                    isActive={isNodeActive("confirm use tool?")}
                    decision={getNodeDecision("confirm use tool?")}
                    onNodeClick={() => onNodeSelect("confirm use tool?")}
                />

                {/* GPT-OSS Slot-Filling with arrow */}
                <GptOssSlotFillingWithArrow
                    isActive={isNodeActive("GPT-OSS Slot-Filling")}
                    onNodeClick={() => onNodeSelect("GPT-OSS Slot-Filling")}
                />

                {/* Update Arguments with arrow */}
                <UpdateArgumentsWithArrow
                    isActive={isNodeActive("Update Argument")}
                    onNodeClick={() => onNodeSelect("Update Argument")}
                />

                {/* Tool Resource with arrow */}
                <ToolResourceWithArrow
                    isActive={isNodeActive("Tool Resource")}
                    onNodeClick={() => onNodeSelect("Tool Resource")}
                />

                {/* Post-process with arrow */}
                <PostProcessWithArrow
                    isActive={isNodeActive("Post-process")}
                    onNodeClick={() => onNodeSelect("Post-process")}
                />

                {/* User end node */}
                <UserEnd
                    isActive={isNodeActive("User Output")}
                    onNodeClick={() => onNodeSelect("User Output")}
                />

                {/* GPT-OSS Slot-Filling bottom with arrow */}
                <GptOssSlotFillingBottomWithArrow
                    isActive={isNodeActive("GPT-OSS Final")}
                    onNodeClick={() => onNodeSelect("GPT-OSS Final")}
                />

                {/* Sale Model bottom with arrow */}
                <SaleModelBottomWithArrow
                    isActive={isNodeActive("Sale model 2")}
                    onNodeClick={() => onNodeSelect("Sale model 2")}
                />

            </div>
        </div>
    );
}
