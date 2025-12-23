"use client";

import DecisionNode from "./DecisionNode";

interface ConfirmUseToolDecisionProps {
    isActive: boolean;
    decision?: string;
}

export default function ConfirmUseToolDecision({ isActive, decision }: ConfirmUseToolDecisionProps) {
    const yesPath = decision === "True";
    const noPath = decision === "False";

    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: Confirm use tool? -> Yes (L-shaped: up then right) */}
                <polyline
                    points="1298,140 1298,60 1430,60"
                    stroke={isActive && yesPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && yesPath ? "4" : "2"}
                    fill="none"
                    markerEnd="url(#arrow)"
                    className={isActive && yesPath ? "flow-arrow" : ""}
                />

                {/* Label: "Yes" */}
                <text
                    x="1365"
                    y="50"
                    fill={isActive && yesPath ? "#22c55e" : "#1a1a1a"}
                    fontSize="12"
                    fontWeight={isActive && yesPath ? "700" : "400"}
                    textAnchor="middle"
                >
                    Yes
                </text>

                {/* Arrow: Confirm use tool? -> No (L-shaped: down then right) */}
                <polyline
                    points="1298,280 1298,360 1430,360"
                    stroke={isActive && noPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && noPath ? "4" : "2"}
                    fill="none"
                    markerEnd="url(#arrow)"
                    className={isActive && noPath ? "flow-arrow" : ""}
                />

                {/* Label: "No" */}
                <text
                    x="1365"
                    y="375"
                    fill={isActive && noPath ? "#22c55e" : "#1a1a1a"}
                    fontSize="12"
                    fontWeight={isActive && noPath ? "700" : "400"}
                    textAnchor="middle"
                >
                    No
                </text>
            </svg>

            {/* Decision node: Confirm use tool? */}
            <DecisionNode
                nodeName="Confirm
use tool?"
                isActive={isActive}
                position={{ x: 1250, y: 162 }}
            />
        </div>
    );
}
