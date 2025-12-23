"use client";

import FlowNode from "./FlowNode";

interface SaleModelBottomWithArrowProps {
    isActive: boolean;
}

export default function SaleModelBottomWithArrow({ isActive }: SaleModelBottomWithArrowProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* SVG for arrow */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
                {/* Elbow Arrow: Sale Model -> User end (down, left, down) */}
                <polyline
                    points="1486,415 1486,460 1052,460 1052,500"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    fill="none"
                    markerEnd="url(#arrow)"
                />

                {/* Label: "Final Response" */}
                <text
                    x="1253"
                    y="450"
                    fill="#1a1a1a"
                    fontSize="12"
                    fontWeight="400"
                    textAnchor="middle"
                >
                    Final Response
                </text>
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
