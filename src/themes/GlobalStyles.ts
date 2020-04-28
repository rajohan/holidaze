import { createGlobalStyle } from "styled-components";

import { cssReset } from "./cssReset";

export const GlobalStyles = createGlobalStyle`
    ${cssReset}

    *::selection {
        background-color: ${(props): string => props.theme.colors.secondary};
        color: ${(props): string => props.theme.colors.text};
        text-shadow: none;
    }
    
    body {
        font-size: ${(props): string => props.theme.fonts.size};
        font-weight: ${(props): number => props.theme.fonts.weight};
        font-family: ${(props): string => props.theme.fonts.main};
        color: ${(props): string => props.theme.colors.text};
        background-color: ${(props): string => props.theme.colors.primary};
    }
    
    #__next {
        display: flex;
        flex-direction: column;
        min-height: 100vh;
    }
`;
