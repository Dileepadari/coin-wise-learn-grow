
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        // Custom vibrant colors for informal workers app
        "coin-purple": "#9b87f5",
        "coin-purple-dark": "#7E69AB",
        "coin-purple-vivid": "#8B5CF6",
        "coin-pink": "#D946EF",
        "coin-orange": "#F97316",
        "coin-blue": "#0EA5E9",
        "coin-skyblue": "#33C3F0",
        "coin-yellow": "#FEF7CD",
        "coin-orange-soft": "#FEC6A1",
        "coin-pink-soft": "#FFDEE2",
        "coin-red": "#ea384c",
        "coin-dark": "#222222",
        "holi-pink": "#FF3EA5",
        "holi-green": "#4BC94B",
        "holi-yellow": "#FFD966",
        "holi-blue": "#5BA1FC",
        "marigold": "#FFAA33",
        "sindoor": "#FF4D4D",
        "mehendi": "#75A928",
        "rangoli-blue": "#3C78D8",
        "rangoli-pink": "#FF69B4",
        "rangoli-yellow": "#FFC107",
        "rangoli-green": "#26A69A",
      },
      fontFamily: {
        'sans': ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'hindi': ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'bounce-subtle': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-5px)',
          },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'float': {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'coin-flip': {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(1800deg)' },
        },
        'scale-in-out': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'festive-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(255, 170, 51, 0.5)', 
            borderColor: 'rgba(255, 170, 51, 0.5)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(255, 170, 51, 0.8)', 
            borderColor: 'rgba(255, 170, 51, 0.8)'
          },
        },
        'diya-flicker': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        },
        'rangoli-rotate': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'bounce-subtle': 'bounce-subtle 2s infinite ease-in-out',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 3s infinite ease-in-out',
        'spin-slow': 'spin-slow 3s infinite linear',
        'coin-flip': 'coin-flip 2s ease-out',
        'scale-in-out': 'scale-in-out 2s infinite ease-in-out',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
        'festive-glow': 'festive-glow 2s infinite ease-in-out',
        'diya-flicker': 'diya-flicker 3s infinite ease-in-out',
        'rangoli-rotate': 'rangoli-rotate 20s linear infinite',
      },
      backgroundImage: {
        'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        'festival-pattern': "url('/patterns/festival-pattern.svg')",
        'rangoli-pattern': "url('/patterns/rangoli-pattern.svg')",
        'diya-pattern': "url('/patterns/diya-pattern.svg')",
        'coin-gradient': 'linear-gradient(135deg, #FFC107, #FFD54F)',
        'purple-gradient': 'linear-gradient(135deg, #9b87f5, #7E69AB)',
        'orange-gradient': 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
        'blue-gradient': 'linear-gradient(90deg, hsla(186, 33%, 94%, 1) 0%, hsla(216, 41%, 79%, 1) 100%)',
        'green-gradient': 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)',
        'holi-gradient': 'linear-gradient(90deg, #FF3EA5, #FFD966, #4BC94B, #5BA1FC)',
        'diwali-gradient': 'linear-gradient(90deg, #FFD966, #FF4D4D, #FFAA33)',
        'mehendi-gradient': 'linear-gradient(90deg, #75A928, #FFAA33)',
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
