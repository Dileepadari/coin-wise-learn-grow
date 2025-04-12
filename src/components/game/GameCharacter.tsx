
import React, { useState } from "react";
import { motion } from "framer-motion";
import CharacterDialog from "./CharacterDialog";

interface GameCharacterProps {
  name: string;
  role: string;
  avatar?: string;
  position: { x: number; y: number };
  onInteract?: () => void;
  dialogText?: string;
}

export default function GameCharacter({ 
  name, 
  role, 
  avatar, 
  position, 
  onInteract,
  dialogText 
}: GameCharacterProps) {
  const [showDialog, setShowDialog] = useState(false);
  
  const handleInteract = () => {
    setShowDialog(true);
    
    // Hide dialog after a few seconds
    setTimeout(() => {
      setShowDialog(false);
      if (onInteract) onInteract();
    }, 3000);
  };
  
  return (
    <motion.div 
      className="absolute flex flex-col items-center cursor-pointer"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      whileHover={{ scale: 1.05 }}
      onClick={handleInteract}
    >
      <div className="relative">
        <CharacterDialog text={dialogText || `Hi, I'm ${name}!`} isActive={showDialog} />
        
        <div className="h-16 w-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-2xl shadow-lg">
          {avatar || "👤"}
        </div>
        
        <motion.div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
      
      <div className="mt-2 text-center bg-background/80 px-2 py-1 rounded shadow-sm">
        <div className="text-xs font-bold">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </div>
    </motion.div>
  );
}
