const animate = require("tailwindcss-animate");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [],
    theme: {
        extend: {
            colors: {
                zblack: "#121212",
                zlightgray: "#767678",
                zgray: "#313131",
                zdarkgray: "#1C1C1C",
                zyellow: "#FCE006",
            },
        },
    },
    plugins: [animate],
};
