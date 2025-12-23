"use client";

import DecisionNode from "./DecisionNode";
import Arrow from "./Arrow";

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
                <Arrow
                    type="polyline"
                    isActive={isActive && yesPath}
                    points="548,300 548,210 680,210"
                    stroke={isActive && yesPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && yesPath ? "4" : "2"}
                    label="Yes"
                    labelX={615}
                    labelY={200}
                />

                <Arrow
                    type="polyline"
                    isActive={isActive && noPath}
                    points="548,440 548,530 680,530"
                    stroke={isActive && noPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && noPath ? "4" : "2"}
                    label="No"
                    labelX={615}
                    labelY={545}
                />
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
