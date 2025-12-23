"use client";

import FlowNode from "./FlowNode";

interface ParseToolWithArrowProps {
    isActive: boolean;
}

export default function ParseToolWithArrow({ isActive }: ParseToolWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: Parse Tool -> next node */}
                <line
                    x1="885"
                    y1="210"
                    x2="1005"
                    y2="210"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />

                {/* Label: "3. Tool info" */}
                <text
                    x="945"
                    y="200"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    3. Tool info
                </text>
            </svg>

            {/* Parse Tool node */}
            <FlowNode
                nodeName="Parse
Tool name/arguments"
                type="process"
                isActive={isActive}
                position={{ x: 690, y: 190 }}
            />
        </div>
    );
}
