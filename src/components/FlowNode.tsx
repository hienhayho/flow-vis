"use client";

import { motion } from "framer-motion";
import { User, Settings, PenTool, Network } from "lucide-react";

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
        <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-emerald-500"
        >
            <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.0462 6.0462 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a1.54 1.54 0 0 0 .0386.0529 4.49 4.49 0 0 1-4.495 10.0761zm7.34-8.5705a4.462 4.462 0 0 1-3.0801 3.2513l-.0669.0382-4.7783 2.7582a.795.795 0 0 0-.393.6813v6.363a4.48 4.48 0 0 1-1.299-8.8189z" />
        </svg>
    );

    const ToolIcon = () => (
        <div className="relative w-full h-full flex items-center justify-center">
            <Settings
                size={28}
                className="text-gray-800 absolute"
                strokeWidth={1.5}
            />
            <PenTool
                size={16}
                className="text-red-500 absolute -top-1 -right-1 fill-red-100"
            />
        </div>
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
        let labelClass =
            "absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-[10px] font-medium text-gray-600 text-center leading-tight";

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
                    <span className="text-[11px] font-medium text-gray-700 block leading-tight whitespace-pre-line">
                        {nodeName}
                    </span>
                )}
                {type === "decision" && renderLabel()}
            </div>
            {type !== "decision" && renderLabel()}
        </motion.div>
    );
}
