import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { StoreContext } from "../store";
import Header from "./Layout/Header";
import Main from "./Layout/Main";
import Home from "./Home/Home";
import Footer from "./Layout/Footer";
import HomeHeader from "./Home/HomeHeader";

const App: React.FC = (): React.ReactElement => {
    const { state } = useContext(StoreContext);

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content="Holidaze" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
                <title>{state.page.title}</title>
            </Helmet>
            <Switch>
                <Route path="/" exact>
                    <HomeHeader />
                    <Main>
                        <Home />
                    </Main>
                </Route>
                <Header />
                <Main>
                    <Route path="/contact">Contact</Route>
                </Main>
            </Switch>
            <Footer />
        </HelmetProvider>
    );
};

export default App;
