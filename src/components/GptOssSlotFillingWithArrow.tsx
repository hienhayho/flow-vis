"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface GptOssSlotFillingWithArrowProps {
    isActive: boolean;
}

export default function GptOssSlotFillingWithArrow({ isActive }: GptOssSlotFillingWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={1510}
                    y1={60}
                    x2={1600}
                    y2={60}
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
