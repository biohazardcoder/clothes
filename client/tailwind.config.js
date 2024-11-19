/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //Text-colors
        primary: '#F3B699',
        secontary: '#9CA3AF',
        //Background-colors
        meteor: '#111822',
        container: '#1A202C',
        // Button-colors
        highlight: '#745850',
        accent: '#4F362A',
        //Support-colors
        error: '#FF5252',
        success: '#32CD32',
      },
    },
  },
  plugins: [],
};
