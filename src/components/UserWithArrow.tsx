"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface UserWithArrowProps {
    isActive: boolean;
}

export default function UserWithArrow({ isActive }: UserWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={100}
                    y1={370}
                    x2={240}
                    y2={370}
                    label="1. message"
                    labelX={170}
                    labelY={358}
                />
            </svg>

            {/* User node */}
            <FlowNode
                nodeName="User"
                type="user"
                isActive={isActive}
                position={{ x: 40, y: 338 }}
            />
        </div>
    );
}
