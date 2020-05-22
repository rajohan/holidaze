import React, { Suspense, useContext, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { StoreContext } from "../store";
import Loading from "./Shared/Loading";
import Header from "./Layout/Header";
import HomeHeader from "./Home/HomeHeader";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";

import ErrorBoundary from "./Shared/ErrorBoundary";
import { setTitle } from "../store/actions";
const Home = React.lazy(() => import("./Home/Home"));
const Establishment = React.lazy(() => import("./Establishment/Establishment"));
const Establishments = React.lazy(() => import("./Establishments/Establishments"));
const Contact = React.lazy(() => import("./Contact/Contact"));
const Login = React.lazy(() => import("./Login/Login"));
const Admin = React.lazy(() => import("./Admin/Admin"));

const App: React.FC = (): React.ReactElement => {
    const { state, dispatch } = useContext(StoreContext);
    const location = useLocation();

    useEffect(() => {
        switch (true) {
            case /^\/$/.test(location.pathname):
                return dispatch(setTitle("Home"));
            case /^\/establishment\/.*/.test(location.pathname):
                return dispatch(setTitle(location.pathname.split("/")[3]));
            case /^\/establishments(?:[/].*)?$/.test(location.pathname):
                return dispatch(setTitle("Establishments"));
            case /^\/contact(?:[/].*)?$/.test(location.pathname):
                return dispatch(setTitle("Contact"));
            case /^\/admin(?:[/].*)?$/.test(location.pathname):
                return dispatch(setTitle("Admin"));
            default:
                return dispatch(setTitle("404 Page not found"));
        }
    }, [dispatch, location.pathname]);

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
                            <Suspense fallback={<Loading />}>
                                <Home />
                            </Suspense>
                        </Route>
                        <Route path="/establishment/:id/:name">
                            <ErrorBoundary fallback={"Sorry, the requested establishment could not be found"}>
                                <Suspense fallback={<Loading text="Loading establishment" />}>
                                    <Establishment />
                                </Suspense>
                            </ErrorBoundary>
                        </Route>
                        <Route path="/establishments">
                            <Suspense fallback={<Loading text="Loading establishments" />}>
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
                        <Route path="/admin">
                            <Suspense fallback={<Loading />}>
                                <Admin />
                            </Suspense>
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
