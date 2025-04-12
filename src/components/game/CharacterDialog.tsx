
import React from "react";
import { motion } from "framer-motion";

interface CharacterDialogProps {
  text: string;
  isActive: boolean;
  position?: { top: number; left: number };
}

export default function CharacterDialog({ text, isActive, position }: CharacterDialogProps) {
  if (!isActive) return null;
  
  return (
    <motion.div 
      className="absolute z-10 bg-black/80 text-white px-4 py-2 rounded-xl max-w-[200px] min-w-[120px] text-center text-sm"
      style={position || { top: -60, left: "50%" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      {text}
      <div className="w-4 h-4 bg-black/80 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
    </motion.div>
  );
}
