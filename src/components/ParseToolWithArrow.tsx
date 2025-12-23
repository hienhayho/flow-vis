"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface ParseToolWithArrowProps {
    isActive: boolean;
}

export default function ParseToolWithArrow({ isActive }: ParseToolWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={885}
                    y1={210}
                    x2={1005}
                    y2={210}
                    label="3. Tool info"
                    labelX={945}
                    labelY={200}
                />
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
