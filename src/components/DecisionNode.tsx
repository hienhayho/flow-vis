'use client';

import { motion } from 'framer-motion';

interface DecisionNodeProps {
  nodeName: string;
  isActive: boolean;
  position: { x: number; y: number };
  onClick?: () => void;
}

export default function DecisionNode({ nodeName, isActive, position, onClick }: DecisionNodeProps) {
  const handleClick = () => {
    console.log('DecisionNode clicked:', nodeName);
    onClick?.();
  };

  return (
    <motion.div
      className="absolute flex items-center justify-center cursor-pointer"
      style={{ left: position.x, top: position.y }}
      animate={{
        scale: isActive ? 1.15 : 1,
        opacity: isActive ? 1 : 0.4,
      }}
      transition={{ duration: 0.3 }}
      onClick={handleClick}
      whileHover={{ scale: isActive ? 1.15 : 1.05 }}
    >
      {/* Diamond shape using CSS transform */}
      <div
        className={`w-24 h-24 bg-red-400 border-2 border-red-600 transform rotate-45 flex items-center justify-center ${
          isActive ? 'shadow-2xl ring-4 ring-[#C68E42] ring-opacity-70' : ''
        } transition-all duration-300`}
      >
        <span
          className={`transform -rotate-45 text-sm font-bold text-white text-center px-2 leading-tight ${
            isActive ? 'font-extrabold' : ''
          }`}
        >
          {nodeName}
        </span>
      </div>
    </motion.div>
  );
}
