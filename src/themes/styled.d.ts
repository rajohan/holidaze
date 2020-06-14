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
            secondary: string;
            secondaryDark: string;
            secondary60: string;
            tertiaryLight: string;
            tertiary: string;
            tertiaryDark: string;
            error: string;
            errorDark: string;
            success: string;
            successDark: string;
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
