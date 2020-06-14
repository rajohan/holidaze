import { DefaultTheme } from "styled-components";

export const defaultTheme: DefaultTheme = {
    fonts: {
        main: "Lato, sans-serif",
        size: "16px",
        weight: 400
    },
    colors: {
        primary: "#1B262C",
        secondary: "#DBEDF3",
        secondaryDark: "#B7E4F3",
        secondary60: "rgb(219 237 243 / 60%)",
        tertiaryLight: "#2A8EE7",
        tertiary: "#3282B8",
        tertiaryDark: "#245E85",
        error: "#ff4437",
        errorDark: "#d7241b",
        success: "#21ba45",
        successDark: "#129535",
        text: "#1B262C",
        link: "#1B262C",
        white: "#ffffff",
        black: "#101010"
    },
    boxShadows: {
        button: "0 10px 10px rgba(0, 0, 0, 0.2)"
    },
    dropShadows: {
        small: "drop-shadow(0 1px 1px #000000)"
    }
};
