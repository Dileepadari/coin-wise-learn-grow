
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Celebrity {
  name: string;
  image: string;
  quote?: string;
  avatar?: string;
}

export function getCelebrityGuide(category: string): Celebrity {
  switch (category) {
    case 'savings': 
      return { 
        name: 'Aishwarya Rai', 
        image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=100&auto=format&fit=crop',
        quote: 'Khel khel mein bachat seekho!',
        avatar: '💎'
      };
    case 'investment': 
      return { 
        name: 'Amitabh Bachchan', 
        image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?q=80&w=100&auto=format&fit=crop',
        quote: 'Jab risk leta hai, tab paise badhta hai.',
        avatar: '🎭'
      };
    case 'fraud': 
      return { 
        name: 'Akshay Kumar', 
        image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=100&auto=format&fit=crop',
        quote: 'Savdhan rahiye, satark rahiye!',
        avatar: '🛡️'
      };
    case 'borrowing': 
      return { 
        name: 'Deepika Padukone', 
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop',
        quote: 'Karz lena hai to samajhdari se!',
        avatar: '💫'
      };
    case 'basics': 
    default:
      return { 
        name: 'Shahrukh Khan', 
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
        quote: 'Khelo, seekho, aur jeeto!',
        avatar: '👑'
      };
  }
}
