"use client";

import DecisionNode from "./DecisionNode";

interface UseToolDecisionProps {
    isActive: boolean;
    decision?: string;
}

export default function UseToolDecision({ isActive, decision }: UseToolDecisionProps) {
    const yesPath = decision === "True";
    const noPath = decision === "False";

    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: use tool? -> Yes (L-shaped: up then right) */}
                <polyline
                    points="548,300 548,210 680,210"
                    stroke={isActive && yesPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && yesPath ? "4" : "2"}
                    fill="none"
                    markerEnd="url(#arrow)"
                    className={isActive && yesPath ? "flow-arrow" : ""}
                />

                {/* Label: "Yes" */}
                <text
                    x="615"
                    y="200"
                    fill={isActive && yesPath ? "#22c55e" : "#1a1a1a"}
                    fontSize="12"
                    fontWeight={isActive && yesPath ? "700" : "400"}
                    textAnchor="middle"
                >
                    Yes
                </text>

                {/* Arrow: use tool? -> No (L-shaped: down then right) */}
                <polyline
                    points="548,440 548,530 680,530"
                    stroke={isActive && noPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && noPath ? "4" : "2"}
                    fill="none"
                    markerEnd="url(#arrow)"
                    className={isActive && noPath ? "flow-arrow" : ""}
                />

                {/* Label: "No" */}
                <text
                    x="615"
                    y="545"
                    fill={isActive && noPath ? "#22c55e" : "#1a1a1a"}
                    fontSize="12"
                    fontWeight={isActive && noPath ? "700" : "400"}
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
