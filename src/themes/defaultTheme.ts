import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
    fonts: {
        main: "Lato, sans-serif",
        size: "16px",
        weight: 400
    },
    colors: {
        primary: "#222222",
        primaryLight: "#2f2f2f",
        secondary: "#1f1f1f",
        tertiary: "#3598db",
        tertiaryDark: "#35599d",
        error: "#ff4437",
        success: "#21ba45",
        text: "#ffffff",
        link: "#ffffff",
        white: "#ffffff",
        black: "#101010"
    },
    boxShadows: {
        button: "0 10px 20px rgba(0, 0, 0, 0.7)"
    },
    dropShadows: {
        small: "drop-shadow(0 1px 1px #000000)"
    }
};
