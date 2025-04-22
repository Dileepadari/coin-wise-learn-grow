
import React, { useState } from "react";
import { motion } from "framer-motion";
import CharacterDialog from "./CharacterDialog";
import { floating, celebration } from "@/utils/animations";
import { translate } from "@/utils/translate";
import { useApp } from "@/context/AppContext";

interface GameCharacterProps {
  name: string;
  role: string;
  avatar?: string;
  position: { x: number; y: number };
  onInteract?: () => void;
  dialogText?: string;
  emotion?: 'happy' | 'surprised' | 'thinking' | 'celebrating';
}

export default function GameCharacter({ 
  name, 
  role, 
  avatar, 
  position, 
  onInteract,
  dialogText,
  emotion = 'happy' 
}: GameCharacterProps) {
  const [showDialog, setShowDialog] = useState(false);
  const { language } = useApp();
  
  const handleInteract = () => {
    setShowDialog(true);
    
    // Hide dialog after a few seconds
    setTimeout(() => {
      setShowDialog(false);
      if (onInteract) onInteract();
    }, 3000);
  };
  
  const getGreeting = () => {
    if (dialogText) return dialogText;
    
    const greetings = {
      english: `Hi, I'm ${name}!`,
      hindi: `नमस्ते, मैं ${name} हूँ!`,
      telugu: `నమస్కారం, నేను ${name}!`
    };
    
    return greetings[language];
  };

  const getEmoji = () => {
    switch (role.toLowerCase()) {
      case 'guide': return '👨‍🏫';
      case 'merchant': return '👨‍💼';
      case 'banker': return '🏦';
      case 'farmer': return '👨‍🌾';
      case 'teacher': return '👩‍🏫';
      case 'friend': return '👫';
      default: return avatar || '👤';
    }
  };
  
  return (
    <motion.div 
      className="absolute flex flex-col items-center cursor-pointer"
      style={{ 
        left: `${position.x}%`, 
        top: `${position.y}%`,
        transform: 'translate(-50%, -50%)'
      }}
      variants={floating}
      initial="initial"
      animate="animate"
      whileHover={{ scale: 1.1 }}
      onClick={handleInteract}
    >
      <div className="relative">
        <CharacterDialog 
          text={getGreeting()} 
          isActive={showDialog} 
          emotion={emotion} 
          characterName={name}
        />
        
        <motion.div 
          className="h-16 w-16 rounded-full bg-primary/20 border-2 border-primary/40 flex items-center justify-center text-2xl shadow-lg"
          whileTap={{ scale: 0.9 }}
        >
          {getEmoji()}
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-green-500 rounded-full"
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </div>
      
      <motion.div 
        className="mt-2 text-center bg-background/80 px-2 py-1 rounded shadow-sm"
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-xs font-bold">{name}</div>
        <div className="text-xs text-muted-foreground">{role}</div>
      </motion.div>
    </motion.div>
  );
}
