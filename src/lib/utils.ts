
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
        image: 'https://static.spotboye.com/uploads/Nandini_2024-8-3-6-4-54_thumbnail.jpg',
        quote: 'Khel khel mein bachat seekho!',
        avatar: 'https://static.spotboye.com/uploads/Nandini_2024-8-3-6-4-54_thumbnail.jpg'
      };
    case 'investment': 
      return { 
        name: 'Amitabh Bachchan', 
        image: 'https://www.thestatesman.com/wp-content/uploads/2024/11/amitabh-bachchan-kaun-banega-crorepati-26-11-victims-mumbai-attack-kbc-jpg.webp',
        quote: 'Jab risk leta hai, tab paise badhta hai.',
        avatar: 'https://www.thestatesman.com/wp-content/uploads/2024/11/amitabh-bachchan-kaun-banega-crorepati-26-11-victims-mumbai-attack-kbc-jpg.webp'
      };
    case 'fraud': 
      return { 
        name: 'Akshay Kumar', 
        image: 'https://scontent.fmaa8-1.fna.fbcdn.net/v/t39.30808-6/444769833_1010145377148380_7285476419036918253_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zvbXtkssQBoQ7kNvwGQVjtn&_nc_oc=AdlJtouzlz9TnNG_v4ZwQS8uw9gspAWVyfuR4ZlsPrmmcuRK3ZYI18j72iNYQwhdDgQ&_nc_zt=23&_nc_ht=scontent.fmaa8-1.fna&_nc_gid=fiKAjsGhN--2j7Z_xavBOw&oh=00_AfEFKjA2C3WElWulRG9IA6mI1wDXmu0rHZaxoYDwkB15gg&oe=681B7B2A',
        quote: 'Savdhan rahiye, satark rahiye!',
        avatar: 'https://scontent.fmaa8-1.fna.fbcdn.net/v/t39.30808-6/444769833_1010145377148380_7285476419036918253_n.jpg?_nc_cat=1&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zvbXtkssQBoQ7kNvwGQVjtn&_nc_oc=AdlJtouzlz9TnNG_v4ZwQS8uw9gspAWVyfuR4ZlsPrmmcuRK3ZYI18j72iNYQwhdDgQ&_nc_zt=23&_nc_ht=scontent.fmaa8-1.fna&_nc_gid=fiKAjsGhN--2j7Z_xavBOw&oh=00_AfEFKjA2C3WElWulRG9IA6mI1wDXmu0rHZaxoYDwkB15gg&oe=681B7B2A'
      };
    case 'borrowing': 
      return { 
        name: 'Deepika Padukone', 
        image: 'https://i.redd.it/deepika-padukone-changed-haircolor-style-recently-with-v0-tq6p624dw13c1.jpg?width=1112&format=pjpg&auto=webp&s=ee9ec5c60ef3473799b27d21d59cb2e9e2904081',
        quote: 'Karz lena hai to samajhdari se!',
        avatar: 'https://i.redd.it/deepika-padukone-changed-haircolor-style-recently-with-v0-tq6p624dw13c1.jpg?width=1112&format=pjpg&auto=webp&s=ee9ec5c60ef3473799b27d21d59cb2e9e2904081'
      };
    case 'basics': 
    default:
      return { 
        name: 'Shahrukh Khan', 
        image: 'https://pbs.twimg.com/profile_images/1577520405333831680/WZzaLU4q_400x400.jpg',
        quote: 'Khelo, seekho, aur jeeto!',
        avatar: 'https://pbs.twimg.com/profile_images/1577520405333831680/WZzaLU4q_400x400.jpg'
      };
  }
}
