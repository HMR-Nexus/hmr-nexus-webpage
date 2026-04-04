/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Doto', 'Space Mono', 'monospace'],
        sans: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        nd: {
          black: '#000000',
          surface: '#111111',
          'surface-raised': '#1A1A1A',
          border: '#222222',
          'border-visible': '#333333',
          'text-disabled': '#666666',
          'text-secondary': '#999999',
          'text-primary': '#E8E8E8',
          'text-display': '#FFFFFF',
          accent: '#D71921',
          'accent-subtle': 'rgba(215,25,33,0.15)',
          success: '#4A9E5C',
          warning: '#D4A843',
          interactive: '#5B9BF6',
        },
        nexus: {
          blue: '#0066ff',
          'blue-subtle': 'rgba(0,102,255,0.12)',
          'blue-mid': '#3d8bff',
          'blue-light': '#88ddff',
        },
        /* shadcn compat */
        border: "hsl(var(--border, 0 0% 13%))",
        input: "hsl(var(--input, 0 0% 13%))",
        ring: "hsl(var(--ring, 217 100% 50%))",
        background: "hsl(var(--background, 0 0% 0%))",
        foreground: "hsl(var(--foreground, 0 0% 91%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 0 0% 100%))",
          foreground: "hsl(var(--primary-foreground, 0 0% 0%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 0 0% 7%))",
          foreground: "hsl(var(--secondary-foreground, 0 0% 91%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 355 81% 47%) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 0 0% 10%))",
          foreground: "hsl(var(--muted-foreground, 0 0% 60%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 0 0% 10%))",
          foreground: "hsl(var(--accent-foreground, 0 0% 91%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 0 0% 7%))",
          foreground: "hsl(var(--popover-foreground, 0 0% 91%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 0 0% 7%))",
          foreground: "hsl(var(--card-foreground, 0 0% 91%))",
        },
      },
      borderRadius: {
        xl: "16px",
        lg: "12px",
        md: "8px",
        sm: "4px",
        none: "0",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
