"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface ToolResourceWithArrowProps {
    isActive: boolean;
}

export default function ToolResourceWithArrow({ isActive }: ToolResourceWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={1930}
                    y1={120}
                    x2={1930}
                    y2={240}
                    label="Tool"
                    labelX={1895}
                    labelY={175}
                    label2="Response"
                    label2Y={190}
                />
            </svg>

            {/* Tool Resource node */}
            <FlowNode
                nodeName="Tool Resource"
                type="tool"
                isActive={isActive}
                position={{ x: 1898, y: 28 }}
            />
        </div>
    );
}
