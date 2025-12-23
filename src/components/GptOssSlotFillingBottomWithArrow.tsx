"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface GptOssSlotFillingBottomWithArrowProps {
    isActive: boolean;
}

export default function GptOssSlotFillingBottomWithArrow({ isActive }: GptOssSlotFillingBottomWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="polyline"
                    isActive={isActive}
                    points="1930,360 1930,530 1090,530"
                    label="Final Response"
                    labelX={1495}
                    labelY={520}
                />
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
