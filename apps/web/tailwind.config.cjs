/** @type {import('tailwindcss').Config} */
const config = require("../../packages/tailwind-config/tailwind.config.cjs");

module.exports = {
  ...config,
  content: [
    "./src/**/*.tsx",
    "../mf-auth/src/**/*.{js,ts,jsx,tsx}", // 🔥 Remote MF components
    "../mf-inventory/src/**/*.{js,ts,jsx,tsx}",
  ],
};
