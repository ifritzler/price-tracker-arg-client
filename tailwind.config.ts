import type { Config } from "tailwindcss";
import { nextui } from '@nextui-org/react';
// @ts-expect-error no ts support
import animations from '@midudev/tailwind-animations'

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        graydark: '#27272B'
      }
    }
  },
  plugins: [nextui({
  }), animations],  
};
export default config;
