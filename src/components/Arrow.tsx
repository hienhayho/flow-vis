"use client";

interface ArrowProps {
    type: "line" | "polyline";
    isActive: boolean;
    // For line arrows
    x1?: number;
    y1?: number;
    x2?: number;
    y2?: number;
    // For polyline arrows
    points?: string;
    // Label props
    label?: string;
    labelX?: number;
    labelY?: number;
    // Multi-line label support
    label2?: string;
    label2Y?: number;
    // Styling props
    stroke?: string;
    strokeWidth?: string | number;
    className?: string;
}

export default function Arrow({
    type,
    isActive,
    x1,
    y1,
    x2,
    y2,
    points,
    label,
    labelX,
    labelY,
    label2,
    label2Y,
    stroke = "#1a1a1a",
    strokeWidth,
    className,
}: ArrowProps) {
    const defaultStrokeWidth = strokeWidth || "2";
    const arrowClassName = className || (isActive ? "flow-arrow" : "");

    return (
        <>
            {type === "line" && (
                <line
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={stroke}
                    strokeWidth={defaultStrokeWidth}
                    markerEnd="url(#arrow)"
                    className={arrowClassName}
                />
            )}

            {type === "polyline" && (
                <polyline
                    points={points}
                    stroke={stroke}
                    strokeWidth={defaultStrokeWidth}
                    fill="none"
                    markerEnd="url(#arrow)"
                    className={arrowClassName}
                />
            )}

            {label && labelX !== undefined && labelY !== undefined && (
                <>
                    <text
                        x={labelX}
                        y={labelY}
                        fill={stroke}
                        fontSize="12"
                        fontWeight={isActive ? "700" : "400"}
                        textAnchor="middle"
                    >
                        {label}
                    </text>
                    {label2 && label2Y !== undefined && (
                        <text
                            x={labelX}
                            y={label2Y}
                            fill={stroke}
                            fontSize="12"
                            fontWeight={isActive ? "700" : "400"}
                            textAnchor="middle"
                        >
                            {label2}
                        </text>
                    )}
                </>
            )}
        </>
    );
}
