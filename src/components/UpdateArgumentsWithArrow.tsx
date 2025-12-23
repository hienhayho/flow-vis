"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface UpdateArgumentsWithArrowProps {
    isActive: boolean;
}

export default function UpdateArgumentsWithArrow({ isActive }: UpdateArgumentsWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={1775}
                    y1={60}
                    x2={1875}
                    y2={60}
                    label="Args"
                    labelX={1825}
                    labelY={50}
                />
            </svg>

            {/* Update Arguments node */}
            <FlowNode
                nodeName="Update
Arguments"
                type="process"
                isActive={isActive}
                position={{ x: 1610, y: 42 }}
            />
        </div>
    );
}
