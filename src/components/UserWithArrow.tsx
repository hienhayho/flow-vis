"use client";

import FlowNode from "./FlowNode";

interface UserWithArrowProps {
    isActive: boolean;
}

export default function UserWithArrow({ isActive }: UserWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: User -> Sale Model */}
                <line
                    x1="100"
                    y1="370"
                    x2="240"
                    y2="370"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />

                {/* Label: "1. message" */}
                <text
                    x="170"
                    y="358"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    1. message
                </text>
            </svg>

            {/* User node */}
            <FlowNode
                nodeName="User"
                type="user"
                isActive={isActive}
                position={{ x: 40, y: 338 }}
            />
        </div>
    );
}
