"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface PostProcessWithArrowProps {
    isActive: boolean;
}

export default function PostProcessWithArrow({ isActive }: PostProcessWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={875}
                    y1={530}
                    x2={1005}
                    y2={530}
                    label="Final Response"
                    labelX={940}
                    labelY={520}
                />
            </svg>

            {/* Post-process node */}
            <FlowNode
                nodeName="Post-process"
                type="process"
                isActive={isActive}
                position={{ x: 710, y: 512 }}
            />
        </div>
    );
}
