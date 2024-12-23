/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mainText: '#EAEAEA',
        primary: '#ffffff',
        mainBg: '#0D1117',
        sidebarBg: '#161B22',
        sidebarText: '#9CA3AF',
        highlight: '#52677d',
        highlightText: '#FFFFFF',
        hoverBg: '#21262D',
        hoverText: '#EAEAEA',
        dashboardBg: '#1E1E1E',
        accent: '#52677d',
        error: '#FF5252',
        success: '#32CD32',
        wishlistBg: '#1A202C',
        productBg: '#252C36',
        footerBg: '#10141A',
        secontary: "#6c6a6a",
        meteor: "#111822",
        container: "#141414",
      },
    },
  },
  plugins: [],
};
