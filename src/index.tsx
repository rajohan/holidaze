import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import { StoreProvider } from "./store";
import RelayEnvironment from "./relay/RelayEnvironment";
import { defaultTheme, GlobalStyles } from "./themes";
import App from "./Components/App";
import Loading from "./Components/Shared/Loading";

const Root: React.FC = (): React.ReactElement => {
    return (
        <StoreProvider>
            <RelayEnvironmentProvider environment={RelayEnvironment}>
                <BrowserRouter>
                    <ThemeProvider theme={defaultTheme}>
                        <Normalize />
                        <GlobalStyles />
                        <React.StrictMode>
                            <Suspense fallback={<Loading />}>
                                <App />
                            </Suspense>
                        </React.StrictMode>
                    </ThemeProvider>
                </BrowserRouter>
            </RelayEnvironmentProvider>
        </StoreProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
