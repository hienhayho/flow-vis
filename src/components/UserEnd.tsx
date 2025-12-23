"use client";

import FlowNode from "./FlowNode";

interface UserEndProps {
    isActive: boolean;
}

export default function UserEnd({ isActive }: UserEndProps) {
    return (
        <div className={`transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-50'}`}>
            {/* User node at the end */}
            <FlowNode
                nodeName="User"
                type="user"
                isActive={isActive}
                position={{ x: 1020, y: 498 }}
            />
        </div>
    );
}
