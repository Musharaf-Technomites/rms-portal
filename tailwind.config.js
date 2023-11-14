/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        glass: "#ffffff9c",
        brown: "rgba(30,30,17)",
        fontColor:"#104871",
        primary:"#104871",
        opacityBgColor:"#00000099",
        yellow:"#FFCF01"
      },
      backgroundImage:{
        back:"url(./Assets/bgResImage.jpg)",
        logo:"url(./Assets/logo.jpg)"

      },
      screens:{
        sm: "640px",
        md: "668px",
        lg: "1024px",
        xl: "1280px",
        "2x1": "1536px",
      } 

    },
  },
  plugins: [],
}
