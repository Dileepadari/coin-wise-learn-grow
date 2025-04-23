import { motion } from "framer-motion";
import { celebration, popIn } from "@/utils/animations";
import { getCelebrityGuide } from "@/utils/utils"; // <-- fixed import path

interface CharacterProps {
  name: string;
  avatar: string;
  dialog: string;
  emotion?: 'happy' | 'sad' | 'excited' | 'thinking' | 'confused' | 'celebrating';
  size?: 'small' | 'medium' | 'large';
  position?: 'left' | 'right' | 'center';
  category?: string; // added to support looking up Bollywood celebrities
}

export const Character = ({ 
  name, 
  avatar, 
  dialog, 
  emotion = 'happy',
  size = 'medium',
  position = 'left',
  category
}: CharacterProps) => {
  // If category is provided, override with celebrity
  if (category) {
    const celebrity = getCelebrityGuide(category);
    name = celebrity.name;
    avatar = celebrity.avatar || avatar;
  }

  const getEmoji = () => {
    switch (emotion) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'excited': return '🎉';
      case 'thinking': return '🤔';
      case 'confused': return '😕';
      case 'celebrating': return '🥳';
      default: return '😊';
    }
  };
  
  const getSizeClass = () => {
    switch (size) {
      case 'small': return 'w-12 h-12';
      case 'large': return 'w-20 h-20';
      default: return 'w-16 h-16';
    }
  };
  
  const getPositionClass = () => {
    switch (position) {
      case 'right': return 'flex-row-reverse';
      case 'center': return 'flex-col items-center';
      default: return 'flex-row';
    }
  };

  return (
    <motion.div 
      className={`flex items-center space-x-4 p-4 bg-gradient-to-r from-white/90 to-coin-yellow/20 rounded-lg shadow-lg ${getPositionClass()}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="relative">
        <motion.div 
          className={`${getSizeClass()} rounded-full border-4 border-coin-purple bg-gradient-to-br from-holi-yellow to-holi-pink flex items-center justify-center`}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
        >
          <span className="text-2xl">{avatar}</span>
        </motion.div>
        <motion.div 
          className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center"
          variants={popIn}
          initial="initial"
          animate="animate"
        >
          {getEmoji()}
        </motion.div>
      </div>
      
      <motion.div 
        className={`flex-1 bg-gradient-to-r from-coin-yellow/10 to-white/70 p-3 rounded-lg relative ${position === 'right' ? 'mr-3' : 'ml-3'} border-l-4 border-holi-yellow`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="font-bold text-sm text-coin-purple mb-1">{name}</div>
        <p className="text-sm">{dialog}</p>
        
        {position !== 'center' && (
          <div 
            className={`absolute ${position === 'right' ? '-right-2' : '-left-2'} top-1/2 transform -translate-y-1/2 w-0 h-0 ${
              position === 'right' 
                ? 'border-l-8 border-l-coin-yellow/10' 
                : 'border-r-8 border-r-coin-yellow/10'
            } border-t-8 border-t-transparent border-b-8 border-b-transparent`}
          />
        )}
      </motion.div>
      
      {emotion === 'celebrating' && (
        <motion.div 
          className="absolute -top-4 -right-4 text-2xl"
          variants={celebration}
          initial="initial"
          animate="animate"
        >
          ✨
        </motion.div>
      )}
    </motion.div>
  );
};
