import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import { StoreProvider } from "./store";
import RelayEnvironment from "./relay/RelayEnvironment";
import { defaultTheme, GlobalStyles } from "./themes";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import App from "./Components/App";

const Root: React.FC = (): React.ReactElement => {
    return (
        <StoreProvider>
            <RelayEnvironmentProvider environment={RelayEnvironment}>
                <BrowserRouter>
                    <ThemeProvider theme={defaultTheme}>
                        <Normalize />
                        <GlobalStyles />
                        <React.StrictMode>
                            <App />
                        </React.StrictMode>
                    </ThemeProvider>
                </BrowserRouter>
            </RelayEnvironmentProvider>
        </StoreProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
