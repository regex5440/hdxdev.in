import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./views/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      height: {
        "1/2screen": "50vh",
        "2screen": "200vh",
        "3screen": "300vh",
        "4screen": "400vh",
      },
      scale: {
        15: "15",
      },
      animation: {
        slideLeft: "slideLeft 0.8s ease-in-out",
      },
      keyframes: {
        slideFadeIn: {
          from: {
            transform: "translateY(150%)",
            opacity: "0",
          },
          to: {
            transform: "translateY(0)",
            opacity: "1",
          },
        },
        slideDown: {
          from: {
            transform: "translateY(-100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        slideLeft: {
          from: {
            marginLeft: "50%",
            translate: "-50%",
          },
          to: {
            marginLeft: "0%",
            translate: "0%",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
