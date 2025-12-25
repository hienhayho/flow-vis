"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface GptOssDoubleCheckWithArrowProps {
    isActive: boolean;
    onNodeClick: () => void;
}

export default function GptOssDoubleCheckWithArrow({ isActive, onNodeClick }: GptOssDoubleCheckWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={1090}
                    y1={210}
                    x2={1230}
                    y2={210}
                    label="4. Prompt check"
                    labelX={1160}
                    labelY={200}
                />
            </svg>

            {/* GPT-OSS Double-Check node */}
            <FlowNode
                nodeName="GPT-OSS
Double-Check"
                type="gpt-oss"
                isActive={isActive}
                position={{ x: 1020, y: 178 }}
                onClick={onNodeClick}
            />
        </div>
    );
}
