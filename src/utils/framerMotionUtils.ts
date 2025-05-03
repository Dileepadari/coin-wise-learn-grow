import { Variants } from 'framer-motion';

// Helper function to safely use Variants with framer-motion's animate prop
export function useAnimationVariant(variants: Variants, key: string) {
  return variants[key] || {};
}

// Function to safely get a variant for animation
export function getVariant(variants: Variants, key: string) {
  return variants[key] || {};
}

// Commonly used animation configurations
export const springTransition = {
  type: 'spring',
  stiffness: 300, 
  damping: 20
};

export const smoothTransition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.5
};

export const delayedTransition = (delay: number) => ({
  type: 'tween',
  delay,
  duration: 0.3
});

// Custom hook for spring-based motion values
export const useSpringMotionValue = (initialValue: number) => {
  const config = { 
    stiffness: 100, 
    damping: 15, 
    restDelta: 0.001 
  };
  
  return {
    initial: initialValue,
    animate: initialValue,
    transition: {
      type: 'spring',
      ...config
    }
  };
};
