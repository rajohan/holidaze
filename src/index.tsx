import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { ApolloProvider } from "@apollo/client";

import { StoreProvider } from "./store";
import { client } from "./apollo-client";
import { defaultTheme, GlobalStyles } from "./themes";
import App from "./Components/App";
import Loading from "./Components/Shared/Loading";

const Root: React.FC = (): React.ReactElement => {
    return (
        <StoreProvider>
            <ApolloProvider client={client}>
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
            </ApolloProvider>
        </StoreProvider>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
