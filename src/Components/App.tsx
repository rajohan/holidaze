import React, { Suspense, useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import { Normalize } from "styled-normalize";

import { StoreContext } from "../store";
import { defaultTheme } from "../themes";
import { GlobalStyles } from "../themes";
import Home from "./Home/Home";

const App: React.FC = (): React.ReactElement => {
    const { state } = useContext(StoreContext);

    return (
        <ThemeProvider theme={defaultTheme}>
            <HelmetProvider>
                <Normalize />
                <GlobalStyles />
                <Helmet>
                    <meta name="description" content="Holidaze" />
                    <title>{state.page.title}</title>
                </Helmet>
                <div>Test</div>
                <Switch>
                    <Route path="/" exact>
                        <Suspense fallback="Loading...">
                            <Home />
                        </Suspense>
                    </Route>
                    <Route path="/contact">Contact</Route>
                </Switch>
            </HelmetProvider>
        </ThemeProvider>
    );
};

export default App;
