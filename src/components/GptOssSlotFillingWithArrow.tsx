"use client";

import FlowNode from "./FlowNode";

interface GptOssSlotFillingWithArrowProps {
    isActive: boolean;
}

export default function GptOssSlotFillingWithArrow({ isActive }: GptOssSlotFillingWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: GPT-OSS Slot-Filling -> next node */}
                <line
                    x1="1510"
                    y1="60"
                    x2="1600"
                    y2="60"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                    className={isActive ? "flow-arrow" : ""}
                />
            </svg>

            {/* GPT-OSS Slot-Filling node */}
            <FlowNode
                nodeName="GPT-OSS
Slot-Filling"
                type="gpt-oss"
                isActive={isActive}
                position={{ x: 1430, y: 28 }}
            />
        </div>
    );
}
