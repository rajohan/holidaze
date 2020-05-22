import React, { Suspense, useContext, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import graphql from "babel-plugin-relay/macro";
import { useMutation } from "react-relay/hooks";

import ErrorBoundary from "./Shared/ErrorBoundary";
import Loading from "./Shared/Loading";
import Header from "./Layout/Header";
import HomeHeader from "./Home/HomeHeader";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";

import { setAuthToken } from "../store/actions";
import { StoreContext } from "../store";
import {
    AppRefreshAuthTokensMutation,
    AppRefreshAuthTokensMutationResponse
} from "./__generated__/AppRefreshAuthTokensMutation.graphql";

const Home = React.lazy(() => import("./Home/Home"));
const Establishment = React.lazy(() => import("./Establishment/Establishment"));
const Establishments = React.lazy(() => import("./Establishments/Establishments"));
const Contact = React.lazy(() => import("./Contact/Contact"));
const Login = React.lazy(() => import("./Login/Login"));
const Admin = React.lazy(() => import("./Admin/Admin"));

const App: React.FC = (): React.ReactElement => {
    const location = useLocation();
    const { dispatch } = useContext(StoreContext);

    const [commit] = useMutation<AppRefreshAuthTokensMutation>(graphql`
        mutation AppRefreshAuthTokensMutation {
            refreshAuthTokens {
                authToken
            }
        }
    `);

    const mutationConfig = {
        onCompleted: (response: AppRefreshAuthTokensMutationResponse): void => {
            dispatch(setAuthToken(response.refreshAuthTokens.authToken));
        }
    };

    useEffect(() => {
        commit({ ...mutationConfig, variables: {} });
        // eslint-disable-next-line
    }, []);

    return (
        <HelmetProvider>
            <Helmet>
                <meta name="description" content="Holidaze" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
                <title>Holidaze</title>
            </Helmet>
            {location.pathname !== "/" ? <Header /> : <HomeHeader />}
            <Main>
                <Switch>
                    <Route path="/" exact>
                        <Home />
                    </Route>
                    <Route path="/establishment/:id/:name">
                        <ErrorBoundary fallback={"Sorry, the requested establishment could not be found"}>
                            <Suspense fallback={<Loading text="Loading establishment" />}>
                                <Establishment />
                            </Suspense>
                        </ErrorBoundary>
                    </Route>
                    <Route path="/establishments">
                        <Establishments />
                    </Route>
                    <Route path="/contact">
                        <Contact />
                    </Route>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/admin">
                        <ErrorBoundary fallback={"Sorry, you do not have access to the admin section"}>
                            <Admin />
                        </ErrorBoundary>
                    </Route>
                    <Route>404: NOT FOUND</Route>
                </Switch>
            </Main>
            <Footer />
        </HelmetProvider>
    );
};

export default App;
