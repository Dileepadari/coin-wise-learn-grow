
import React from "react";
import { motion } from "framer-motion";
import { fadeInUp, popIn } from "@/utils/animations";

interface CharacterDialogProps {
  text: string;
  isActive: boolean;
  position?: { top: number; left: number };
  emotion?: 'happy' | 'surprised' | 'thinking' | 'celebrating';
  characterName?: string;
}

export default function CharacterDialog({ 
  text, 
  isActive, 
  position, 
  emotion = 'happy',
  characterName
}: CharacterDialogProps) {
  if (!isActive) return null;
  
  const getEmoji = () => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'surprised': return '😮';
      case 'thinking': return '🤔';
      case 'celebrating': return '🥳';
      default: return '';
    }
  };
  
  return (
    <motion.div 
      className="absolute z-10 bg-black/80 text-white px-4 py-2 rounded-xl max-w-[200px] min-w-[120px] text-center text-sm"
      style={position || { top: -60, left: "50%" }}
      variants={fadeInUp}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {characterName && (
        <motion.div
          className="font-bold text-amber-300 mb-1"
          variants={popIn}
          initial="initial"
          animate="animate"
        >
          {characterName} {getEmoji()}
        </motion.div>
      )}
      {text}
      <motion.div 
        className="w-4 h-4 bg-black/80 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.1 }}
      ></motion.div>
    </motion.div>
  );
}
