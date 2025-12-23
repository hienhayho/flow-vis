"use client";

import FlowNode from "./FlowNode";

interface UpdateArgumentsWithArrowProps {
    isActive: boolean;
}

export default function UpdateArgumentsWithArrow({ isActive }: UpdateArgumentsWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: Update Arguments -> next node */}
                <line
                    x1="1775"
                    y1="60"
                    x2="1875"
                    y2="60"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />

                {/* Label: "Args" */}
                <text
                    x="1825"
                    y="50"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    Args
                </text>
            </svg>

            {/* Update Arguments node */}
            <FlowNode
                nodeName="Update
Arguments"
                type="process"
                isActive={isActive}
                position={{ x: 1610, y: 42 }}
            />
        </div>
    );
}
