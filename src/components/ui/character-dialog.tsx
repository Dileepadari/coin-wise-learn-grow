
import { motion } from "framer-motion";

interface CharacterProps {
  name: string;
  avatar: string;
  dialog: string;
  emotion?: 'happy' | 'sad' | 'excited' | 'thinking';
}

export const Character = ({ name, avatar, dialog, emotion = 'happy' }: CharacterProps) => {
  return (
    <motion.div 
      className="flex items-center space-x-4 p-4 bg-white/90 rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative">
        <img src={avatar} alt={name} className="w-16 h-16 rounded-full border-4 border-coin-purple" />
        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center">
          {emotion === 'happy' && '😊'}
          {emotion === 'sad' && '😢'}
          {emotion === 'excited' && '🎉'}
          {emotion === 'thinking' && '🤔'}
        </div>
      </div>
      
      <motion.div 
        className="flex-1 bg-coin-yellow/10 p-3 rounded-lg relative"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <div className="font-medium text-sm text-coin-purple mb-1">{name}</div>
        <p className="text-sm">{dialog}</p>
        <div className="absolute -left-2 top-1/2 transform -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-coin-yellow/10 border-b-8 border-b-transparent"></div>
      </motion.div>
    </motion.div>
  );
};
