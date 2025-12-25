"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface SaleModelWithArrowProps {
    isActive: boolean;
    onNodeClick: () => void;
}

export default function SaleModelWithArrow({ isActive, onNodeClick }: SaleModelWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="line"
                    isActive={isActive}
                    x1={320}
                    y1={370}
                    x2={475}
                    y2={370}
                    label="2. message"
                    labelX={397}
                    labelY={358}
                />
            </svg>

            {/* Sale Model node */}
            <FlowNode
                nodeName="Sale Model"
                type="sale-model"
                isActive={isActive}
                position={{ x: 260, y: 342 }}
                onClick={onNodeClick}
            />
        </div>
    );
}
