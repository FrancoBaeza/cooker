/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            screens: {
                tablet: "700px",
                laptop: "1024px",
                desktop: "1920px",
            },
            colors: {
                "nice-white": "#e0e0e0",
                "base-primary": "#5DB2D4",
                "400-primary": "#2D9518",
                "300-primary": "#137E17",
                "200-primary": "#0E6624",
                "base-secondary": "#00718F",
                "base-secondary2": "#157D9D",

                "base-gray": "#7F7F87",
                "400-gray": "#5F5F67",
            },
            backgroundImage: {
                main: `linear-gradient(70deg, rgba(93, 140, 212, 1)  2%, rgba(93, 178, 212, 1)  52%, rgba(224,224,224,1) 52%)`,
            },
            fontFamily: {
                "primary": ["Inter", "sans-serif"],
                "secondary": ["Oswald", "sans-serif"],
            },
        },
    },
    plugins:[   require("tailwind-scrollbar-hide"),
                require('tailwind-scrollbar')({ nocompatible: true }),
            ],
};
