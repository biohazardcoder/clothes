/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        colors: {
            'primary': "#fff",
            'secontary': "#6c6a6a",
            'accent': "#4f362a",
            'meteor': "#111822",
            "container": "#141414",
            "highlight": "#745850"
        },
        extend: {},
    },
    plugins: [],
}