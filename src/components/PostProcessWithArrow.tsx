"use client";

import FlowNode from "./FlowNode";

interface PostProcessWithArrowProps {
    isActive: boolean;
}

export default function PostProcessWithArrow({ isActive }: PostProcessWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: Post-process -> next node */}
                <line
                    x1="875"
                    y1="530"
                    x2="1005"
                    y2="530"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />

                {/* Label: "Final Response" */}
                <text
                    x="940"
                    y="520"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    Final Response
                </text>
            </svg>

            {/* Post-process node */}
            <FlowNode
                nodeName="Post-process"
                type="process"
                isActive={isActive}
                position={{ x: 710, y: 512 }}
            />
        </div>
    );
}
