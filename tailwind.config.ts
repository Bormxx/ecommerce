import type { Config } from "tailwindcss";
import Forms from "@tailwindcss/forms";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      boxShadow: {
        custom: "0px 4px 8px 0px rgba(229, 231, 235, 1)",
      },
    },
    backgroundPosition: {
      "custom-right": "right 40%",
    },
  },
  plugins: [Forms],
} satisfies Config;
