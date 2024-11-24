/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                mainText: '#EAEAEA', // Light text for dark backgrounds
                mainBg: '#0D1117', // Dark grayish background
                sidebarBg: '#161B22', // Slightly lighter dark for sidebar
                sidebarText: '#9CA3AF', // Muted gray for sidebar text
                highlight: '#FF7F50', // Coral for call-to-action highlights
                highlightText: '#FFFFFF', // Bright white for highlight text
                hoverBg: '#21262D', // Subtle hover effect for buttons/links
                hoverText: '#EAEAEA', // Light text on hover
                dashboardBg: '#1E1E1E', // Dark dashboard background
                accent: '#FFD700', // Gold for accents (e.g., buttons or icons)
                error: '#FF5252', // Bright red for errors
                success: '#32CD32', // Lime green for success states
                wishlistBg: '#1A202C', // Deep gray for cart sections
                productBg: '#252C36', // Product cards background
                footerBg: '#10141A', // Dark footer background
            },
        },
    },
    plugins: [],
}