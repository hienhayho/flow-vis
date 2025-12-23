"use client";

import FlowNode from "./FlowNode";
import Arrow from "./Arrow";

interface SaleModelBottomWithArrowProps {
    isActive: boolean;
}

export default function SaleModelBottomWithArrow({ isActive }: SaleModelBottomWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                <Arrow
                    type="polyline"
                    isActive={isActive}
                    points="1486,415 1486,460 1052,460 1052,500"
                    label="Final Response"
                    labelX={1253}
                    labelY={450}
                />
            </svg>

            {/* Sale Model node */}
            <FlowNode
                nodeName="Sale Model"
                type="sale-model"
                isActive={isActive}
                position={{ x: 1458, y: 333 }}
            />
        </div>
    );
}
