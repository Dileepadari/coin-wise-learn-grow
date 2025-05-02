import React from 'react';
import { LucideProps } from 'lucide-react';
import { motion } from 'framer-motion';

// Create an animated icon wrapper
export const AnimatedIcon = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: delay 
      }}
      whileHover={{ 
        scale: 1.1,
        rotate: [-1, 1, -1, 1, 0],
        transition: { duration: 0.5 }
      }}
    >
      {children}
    </motion.div>
  );
};

// Existing icons
export const LevelUp = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m12 3 4 4-4-4-4 4 4-4Z" />
      <path d="M12 7v14" />
      <path d="M15 10h4.5a2 2 0 0 1 0 4H18" />
      <path d="M15 14h4" />
      <path d="M9 10H4.5a2 2 0 0 0 0 4H6" />
      <path d="M9 14H6" />
    </svg>
  );
};

export const GamepadIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <line x1="6" y1="12" x2="10" y2="12" />
      <line x1="8" y1="10" x2="8" y2="14" />
      <line x1="15" y1="13" x2="15.01" y2="13" />
      <line x1="17" y1="11" x2="17.01" y2="11" />
      <path d="M17 6H7a4 4 0 0 0-4 4v4a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4v-4a4 4 0 0 0-4-4Z" />
    </svg>
  );
};

export const BadgeIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
      <path d="M12 12v.01" />
    </svg>
  );
};

export const Rupee = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M6 3h12" />
      <path d="M6 8h12" />
      <path d="m6 13 8.5 8" />
      <path d="M6 13h3" />
      <path d="M9 13c6.667 0 6.667-10 0-10" />
    </svg>
  );
};

export const CoinStack = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24" 
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="7" r="6" />
      <path d="M6 19a6 6 0 0 1 12 0" />
      <circle cx="12" cy="19" r="2" />
      <path d="m12 13-2.9 1.9" />
      <path d="M12 13v3" />
    </svg>
  );
};

export const FireworkIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 2v8" />
      <path d="m8 6 8 4-8 4 8 4" />
      <path d="M12 22v-8" />
      <path d="M18 18h2" />
      <path d="M4 18h2" />
      <path d="M14 12h8" />
      <path d="M2 12h8" />
    </svg>
  );
};

export const DiamondIcon = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z" />
    </svg>
  );
};

// Add some fun new playful icons
export const Coins = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="8" cy="8" r="6" />
      <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
      <path d="M7 6h1v4" />
      <path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
  );
};

export const Confetti = (props: LucideProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 5c-.5-.5-2.5.5-2.5.5l7.5 7.5 5-5" />
      <path d="M8.5 8.5 7 13l-1.5.5" />
      <path d="M9 15c-.5-.5-2.5.5-2.5.5l7.5 7.5 5-5" />
      <path d="M13.5 13.5 12 18l-1.5.5" />
      <path d="M11 4c.5-.5-.5-2.5-.5-2.5L3 9l5 5" />
      <path d="M7.5 7.5 13 9l.5 1.5" />
      <path d="M16 15c.5-.5-.5-2.5-.5-2.5L8 20l5 5" />
      <path d="M12.5 12.5 18 14l.5 1.5" />
      <path d="M19 5c.5-.5 2.5.5 2.5.5l-7.5 7.5-5-5" />
      <path d="M15.5 7.5 17 13l1.5.5" />
    </svg>
  );
};
