"use client";

import FlowNode from "./FlowNode";

interface GptOssDoubleCheckWithArrowProps {
    isActive: boolean;
}

export default function GptOssDoubleCheckWithArrow({ isActive }: GptOssDoubleCheckWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: GPT-OSS Double-Check -> next node */}
                <line
                    x1="1090"
                    y1="210"
                    x2="1230"
                    y2="210"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />

                {/* Label: "4. Prompt check" */}
                <text
                    x="1160"
                    y="200"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    4. Prompt check
                </text>
            </svg>

            {/* GPT-OSS Double-Check node */}
            <FlowNode
                nodeName="GPT-OSS
Double-Check"
                type="gpt-oss"
                isActive={isActive}
                position={{ x: 1020, y: 178 }}
            />
        </div>
    );
}
