"use client";

import DecisionNode from "./DecisionNode";
import Arrow from "./Arrow";

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
                <Arrow
                    type="polyline"
                    isActive={isActive && yesPath}
                    points="1298,140 1298,60 1430,60"
                    stroke={isActive && yesPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && yesPath ? "4" : "2"}
                    label="Yes"
                    labelX={1365}
                    labelY={50}
                />

                <Arrow
                    type="polyline"
                    isActive={isActive && noPath}
                    points="1298,280 1298,360 1430,360"
                    stroke={isActive && noPath ? "#22c55e" : "#1a1a1a"}
                    strokeWidth={isActive && noPath ? "4" : "2"}
                    label="No"
                    labelX={1365}
                    labelY={375}
                />
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
