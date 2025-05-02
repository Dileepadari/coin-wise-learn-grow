
import { Variants } from 'framer-motion';

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

export const scaleIn: Variants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1, transition: { duration: 0.4 } },
  exit: { scale: 0.8, opacity: 0, transition: { duration: 0.3 } }
};

export const bounceIn: Variants = {
  initial: { scale: 0.3, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  },
  exit: { 
    scale: 0.5, 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

export const shimmer: Variants = {
  initial: { x: '-100%' },
  animate: { 
    x: '100%',
    transition: {
      repeat: Infinity,
      duration: 1.5,
      ease: "linear"
    }
  }
};

// New animations
export const popIn: Variants = {
  initial: { scale: 0, opacity: 0, rotate: -15 },
  animate: { 
    scale: 1, 
    opacity: 1, 
    rotate: 0,
    transition: { 
      type: "spring",
      stiffness: 500,
      damping: 15,
    } 
  },
  exit: { scale: 0, opacity: 0, rotate: 15, transition: { duration: 0.2 } }
};

export const celebration: Variants = {
  initial: { scale: 0 },
  animate: { 
    scale: [0, 1.2, 0.9, 1.1, 1],
    transition: { duration: 0.8 }
  }
};

export const floating: Variants = {
  initial: { y: 0 },
  animate: { 
    y: [0, -10, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut"
    }
  }
};

export const rotateInOut: Variants = {
  initial: { rotate: -90, opacity: 0 },
  animate: { 
    rotate: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  },
  exit: { rotate: 90, opacity: 0 }
};

export const swipeIn: Variants = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "tween", duration: 0.4 } },
  exit: { x: "100%", opacity: 0, transition: { type: "tween", duration: 0.3 } }
};

export const coinFlip: Variants = {
  initial: { rotateY: 0 },
  animate: { 
    rotateY: 360, 
    transition: {
      duration: 1.2,
      ease: "easeInOut"
    }
  }
};

export const pulseEffect: Variants = {
  initial: { scale: 1 },
  animate: { 
    scale: [1, 1.05, 1],
    transition: {
      repeat: Infinity,
      repeatType: "reverse",
      duration: 1.5
    }
  }
};

export const glitter: Variants = {
  initial: { opacity: 0, scale: 0 },
  animate: { 
    opacity: [0, 1, 0],
    scale: [0, 1, 0],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeOut",
      times: [0, 0.1, 1]
    }
  }
};


export const tada: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 0.9, 1.1, 1.1, 1.1, 1.1, 1.1, 1.1, 1],
    rotate: [0, -3, 3, -3, 3, -3, 3, 0],
    transition: {
      duration: 1.5
    }
  }
};

export const jello: Variants = {
  initial: { skewX: 0, skewY: 0 },
  animate: {
    skewX: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
    skewY: [0, -12.5, 6.25, -3.125, 1.5625, -0.78125, 0],
    transition: { duration: 1 }
  }
};
export const wiggle: Variants = {
  initial: { rotate: 0 },
  animate: { 
    rotate: [0, -5, 5, -3, 3, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      repeat: 0
    }
  },
  hover: {
    rotate: [0, -5, 5, -3, 3, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut",
      times: [0, 0.2, 0.4, 0.6, 0.8, 1]
    }
  }
};

export const bounceUpDown: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 1,
      ease: "easeInOut",
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatType: "reverse"
    }
  }
};