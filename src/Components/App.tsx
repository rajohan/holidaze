import React, { Suspense, useContext } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { StoreContext } from "../store";
import Loading from "./Shared/Loading";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import ErrorBoundary from "./Shared/ErrorBoundary";
const HomeHeader = React.lazy(() => import("./Home/HomeHeader"));
const Header = React.lazy(() => import("./Layout/Header"));
const Home = React.lazy(() => import("./Home/Home"));
const Establishment = React.lazy(() => import("./Establishment/Establishment"));
const Establishments = React.lazy(() => import("./Establishments/Establishments"));
const Contact = React.lazy(() => import("./Contact/Contact"));
const Login = React.lazy(() => import("./Login/Login"));

const App: React.FC = (): React.ReactElement => {
    const { state } = useContext(StoreContext);
    const location = useLocation();

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
            <Suspense fallback={<Loading />}>
                {location.pathname !== "/" ? <Header /> : <HomeHeader />}
                <Main>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/establishment/:id/:name">
                            <ErrorBoundary fallback={"Sorry, the requested establishment could not be found"}>
                                <Suspense fallback={<Loading />}>
                                    <Establishment />
                                </Suspense>
                            </ErrorBoundary>
                        </Route>
                        <Route path="/establishments">
                            <Suspense fallback={<Loading />}>
                                <Establishments />
                            </Suspense>
                        </Route>
                        <Route path="/contact">
                            <Suspense fallback={<Loading />}>
                                <Contact />
                            </Suspense>
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route>404: NOT FOUND</Route>
                    </Switch>
                </Main>
                <Footer />
            </Suspense>
        </HelmetProvider>
    );
};

export default App;
