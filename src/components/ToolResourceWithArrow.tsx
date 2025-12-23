"use client";

import FlowNode from "./FlowNode";

interface ToolResourceWithArrowProps {
    isActive: boolean;
}

export default function ToolResourceWithArrow({ isActive }: ToolResourceWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: Tool Resource -> down */}
                <line
                    x1="1930"
                    y1="120"
                    x2="1930"
                    y2="240"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />

                {/* Label: "Tool Response" */}
                <text
                    x="1895"
                    y="175"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    Tool
                </text>
                <text
                    x="1895"
                    y="190"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    Response
                </text>
            </svg>

            {/* Tool Resource node */}
            <FlowNode
                nodeName="Tool Resource"
                type="tool"
                isActive={isActive}
                position={{ x: 1898, y: 28 }}
            />
        </div>
    );
}
