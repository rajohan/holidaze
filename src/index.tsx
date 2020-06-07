import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";
import { ApolloProvider } from "@apollo/client";

import { client } from "./apollo-client";
import { defaultTheme, GlobalStyles } from "./themes";
import App from "./Components/App";
import Loading from "./Components/Shared/Loading";
import ErrorBoundary from "./Components/Shared/ErrorBoundary";

const Root: React.FC = (): React.ReactElement => {
    return (
        <ErrorBoundary fallback="Sorry an unexpected error occurred, please try to refresh the page">
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
        </ErrorBoundary>
    );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(<Root />);
