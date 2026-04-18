/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        // NEXUS Brand System v1
        ink: '#0A0B0D',
        graphite: '#1A1C20',
        paper: '#F5F3EE',
        bone: '#EAE6DC',
        mist: '#9A9A94',
        laser: '#C6FF3D',
        // Signal colors — UI status ONLY, never brand/marketing
        signal: {
          success: '#00C26A',
          warning: '#FFB800',
          error: '#FF4D2E',
        },
        // Legacy aliases (keep for transitional components that still reference nd-*)
        nd: {
          black: '#0A0B0D',
          surface: '#0A0B0D',
          'surface-raised': '#1A1C20',
          border: 'rgba(245,243,238,0.14)',
          'border-visible': 'rgba(245,243,238,0.24)',
          'text-disabled': '#6B6B66',
          'text-secondary': '#9A9A94',
          'text-primary': '#EAE6DC',
          'text-display': '#F5F3EE',
          accent: '#C6FF3D',
          'accent-subtle': 'rgba(198,255,61,0.12)',
          success: '#00C26A',
          warning: '#FFB800',
          interactive: '#C6FF3D',
        },
        nexus: {
          blue: '#C6FF3D',           // remapped to laser so legacy refs don't explode
          'blue-subtle': 'rgba(198,255,61,0.12)',
          'blue-mid': '#C6FF3D',
          'blue-light': '#EAE6DC',
        },
        // shadcn compat
        border: "hsl(var(--border, 0 0% 13%))",
        input: "hsl(var(--input, 0 0% 13%))",
        ring: "hsl(var(--ring, 73 100% 62%))",
        background: "hsl(var(--background, 228 12% 5%))",
        foreground: "hsl(var(--foreground, 43 22% 92%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 73 100% 62%))",
          foreground: "hsl(var(--primary-foreground, 228 12% 5%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 228 10% 12%))",
          foreground: "hsl(var(--secondary-foreground, 43 22% 92%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 10 100% 59%) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground, 43 22% 95%) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 228 10% 10%))",
          foreground: "hsl(var(--muted-foreground, 50 4% 60%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 73 100% 62%))",
          foreground: "hsl(var(--accent-foreground, 228 12% 5%))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover, 228 10% 8%))",
          foreground: "hsl(var(--popover-foreground, 43 22% 92%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 228 10% 8%))",
          foreground: "hsl(var(--card-foreground, 43 22% 92%))",
        },
      },
      letterSpacing: {
        tightest: '-0.055em',
        tighter: '-0.04em',
        tight: '-0.03em',
        normal: '0',
        mono: '0.08em',
        label: '0.14em',
      },
      fontSize: {
        // Brand type scale
        'd1': ['clamp(72px, 12vw, 160px)', { lineHeight: '0.9', letterSpacing: '-0.055em', fontWeight: '300' }],
        'd2': ['clamp(48px, 7vw, 96px)',   { lineHeight: '0.95', letterSpacing: '-0.04em',  fontWeight: '400' }],
        'h1': ['clamp(36px, 4vw, 56px)',   { lineHeight: '1',    letterSpacing: '-0.03em',  fontWeight: '500' }],
        'h2': ['clamp(24px, 2.6vw, 36px)', { lineHeight: '1.1',  letterSpacing: '-0.02em',  fontWeight: '500' }],
        'h3': ['18px',                      { lineHeight: '1.3',  letterSpacing: '-0.01em',  fontWeight: '500' }],
        'body-lg': ['17px', { lineHeight: '1.5' }],
        'body':    ['15px', { lineHeight: '1.55' }],
        'caption': ['12px', { lineHeight: '1.4', letterSpacing: '0.02em' }],
        'mono-label': ['11px', { lineHeight: '1', letterSpacing: '0.14em' }],
      },
      borderRadius: {
        xl: "0",
        lg: "0",
        md: "0",
        sm: "0",
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
        "pulse-laser": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "pulse-laser": "pulse-laser 2.4s cubic-bezier(0.4,0,0.6,1) infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
