"use client";

import { motion } from "framer-motion";
import { User, Network } from "lucide-react";
import Image from "next/image";

interface FlowNodeProps {
    nodeName: string;
    type: "user" | "sale-model" | "gpt-oss" | "process" | "tool" | "decision";
    isActive: boolean;
    position: { x: number; y: number };
}

export default function FlowNode({
    nodeName,
    type,
    isActive,
    position,
}: FlowNodeProps) {
    // Custom Icons
    const OpenAILogo = () => (
        <Image
            src="/openai.png"
            alt="OpenAI Logo"
            width={32}
            height={32}
            className="object-contain"
        />
    );

    const ToolIcon = () => (
        <Image
            src="/tools.png"
            alt="Tools Icon"
            width={32}
            height={32}
            className="object-contain"
        />
    );

    const getNodeStyle = () => {
        switch (type) {
            case "user":
                return "w-16 h-16 flex items-center justify-center"; // No bg, just icon
            case "sale-model":
                return "bg-white border-2 border-blue-200 rounded-full w-14 h-14 flex items-center justify-center shadow-sm";
            case "gpt-oss":
                return "w-16 h-16 flex items-center justify-center bg-white rounded-full"; // Icon mostly
            case "process":
                return "bg-yellow-50 border border-yellow-200 rounded-xl px-5 py-3 min-w-[140px] text-center shadow-sm";
            case "tool":
                return "w-16 h-16 flex flex-col items-center justify-center";
            case "decision":
                return "bg-red-400 w-12 h-12 transform rotate-45 flex items-center justify-center border-2 border-red-500 shadow-md";
            default:
                return "bg-gray-100 border-2 border-gray-400 rounded-lg px-3 py-2";
        }
    };

    const getIcon = () => {
        switch (type) {
            case "user":
                return (
                    <User
                        size={48}
                        className="text-gray-700"
                        strokeWidth={1.5}
                    />
                );
            case "sale-model":
                return <Network size={28} className="text-blue-500" />;
            case "gpt-oss":
                return <OpenAILogo />;
            case "tool":
                return <ToolIcon />;
            default:
                return null;
        }
    };

    const renderLabel = () => {
        // Process nodes have text inside
        if (type === "process") return null;

        // Decision nodes text inside (rotated back)
        if (type === "decision") {
            return (
                <div className="transform -rotate-45 text-[10px] font-bold text-white text-center leading-tight">
                    {nodeName}
                </div>
            );
        }

        // External labels for icons
        const labelClass =
            `absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] ${isActive ? 'font-bold' : 'font-medium'} text-gray-600 text-center leading-tight`;

        if (type === "user" && nodeName === "User")
            return <div className={labelClass}>User</div>;
        if (type === "sale-model")
            return (
                <div className={labelClass}>
                    Sale
                    <br />
                    Model
                </div>
            );
        if (type === "gpt-oss")
            return (
                <div className={labelClass}>{nodeName.replace(" ", "\n")}</div>
            );
        if (type === "tool")
            return (
                <div className={labelClass}>
                    Tool
                    <br />
                    Resource
                </div>
            );

        return null;
    };

    return (
        <motion.div
            className="absolute flex items-center justify-center"
            style={{ left: position.x, top: position.y }}
            animate={{
                scale: isActive ? 1.15 : 1,
                opacity: isActive ? 1 : 0.4,
            }}
            transition={{ duration: 0.3 }}
        >
            <div className={`${getNodeStyle()} z-10 relative ${isActive ? 'ring-4 ring-[#C68E42] ring-opacity-70' : ''}`}>
                {getIcon()}
                {type === "process" && (
                    <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'} text-gray-700 block leading-tight whitespace-pre-line`}>
                        {nodeName}
                    </span>
                )}
                {type === "decision" && renderLabel()}
            </div>
            {type !== "decision" && renderLabel()}
        </motion.div>
    );
}
