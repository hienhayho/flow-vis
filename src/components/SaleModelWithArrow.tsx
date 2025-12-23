"use client";

import FlowNode from "./FlowNode";

interface SaleModelWithArrowProps {
    isActive: boolean;
}

export default function SaleModelWithArrow({ isActive }: SaleModelWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Arrow: Sale Model -> decision node */}
                <line
                    x1="320"
                    y1="370"
                    x2="475"
                    y2="370"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    markerEnd="url(#arrow)"
                />

                {/* Label: "2. message" */}
                <text
                    x="397"
                    y="358"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    2. message
                </text>
            </svg>

            {/* Sale Model node */}
            <FlowNode
                nodeName="Sale Model"
                type="sale-model"
                isActive={isActive}
                position={{ x: 260, y: 342 }}
            />
        </div>
    );
}
