"use client";

import FlowNode from "./FlowNode";

interface GptOssSlotFillingBottomWithArrowProps {
    isActive: boolean;
}

export default function GptOssSlotFillingBottomWithArrow({ isActive }: GptOssSlotFillingBottomWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Elbow Arrow: GPT-OSS Slot-Filling -> User end (down then left) */}
                <polyline
                    points="1930,360 1930,530 1090,530"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />

                {/* Label: "Final Response" */}
                <text
                    x="1495"
                    y="520"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    Final Response
                </text>
            </svg>

            {/* GPT-OSS Slot-Filling node */}
            <FlowNode
                nodeName="GPT-OSS
Slot-Filling"
                type="gpt-oss"
                isActive={isActive}
                position={{ x: 1898, y: 268 }}
            />
        </div>
    );
}
