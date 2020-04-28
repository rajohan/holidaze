import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        fonts: {
            main: string;
            size: string;
            weight: number;
        };

        colors: {
            primary: string;
            primaryLight: string;
            secondary: string;
            tertiary: string;
            tertiaryDark: string;
            error: string;
            success: string;
            text: string;
            link: string;
            white: string;
            black: string;
        };

        boxShadows: {
            button: string;
        };

        dropShadows: {
            small: string;
        };
    }
}
