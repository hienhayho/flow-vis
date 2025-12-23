"use client";

import DecisionNode from "./DecisionNode";

interface UseToolDecisionProps {
    isActive: boolean;
}

export default function UseToolDecision({ isActive }: UseToolDecisionProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: use tool? -> Yes (L-shaped: up then right) */}
                <polyline
                    points="548,300 548,210 680,210"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow)"
                />

                {/* Label: "Yes" */}
                <text
                    x="615"
                    y="200"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    Yes
                </text>

                {/* Arrow: use tool? -> No (L-shaped: down then right) */}
                <polyline
                    points="548,440 548,530 680,530"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow)"
                />

                {/* Label: "No" */}
                <text
                    x="615"
                    y="545"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    No
                </text>
            </svg>

            {/* Decision node: use tool? */}
            <DecisionNode
                nodeName="use tool?"
                isActive={isActive}
                position={{ x: 500, y: 322 }}
            />
        </div>
    );
}
