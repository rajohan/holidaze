import React, { Suspense, useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMutation, useQuery } from "@apollo/client";

import { CurrentUser } from "../GraphQL/__generated__/CurrentUser";
import { RefreshAuthTokens } from "../GraphQL/__generated__/RefreshAuthTokens";
import { CURRENT_USER_QUERY } from "../GraphQL/Queries";
import { REFRESH_AUTH_TOKENS_MUTATION } from "../GraphQL/Mutations";
import { LOCAL_STORAGE_AUTH_TOKEN } from "../constants";
import ErrorBoundary from "./Shared/ErrorBoundary";
import Loading from "./Shared/Loading";
import Header from "./Layout/Header";
import HomeHeader from "./Home/HomeHeader";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";

const Home = React.lazy(() => import("./Home/Home"));
const Establishment = React.lazy(() => import("./Establishment/Establishment"));
const Establishments = React.lazy(() => import("./Establishments/Establishments"));
const Contact = React.lazy(() => import("./Contact/Contact"));
const Login = React.lazy(() => import("./Login/Login"));
const Admin = React.lazy(() => import("./Admin/Admin"));

const App: React.FC = (): React.ReactElement => {
    const location = useLocation();
    const [initialTokenCheck] = useMutation<RefreshAuthTokens>(REFRESH_AUTH_TOKENS_MUTATION);
    const { data, client } = useQuery<CurrentUser>(CURRENT_USER_QUERY);

    useEffect(() => {
        initialTokenCheck()
            .then((response) => {
                if (response.data) {
                    client.writeQuery({
                        query: CURRENT_USER_QUERY,
                        data: { user: response.data.refreshAuthTokens.user }
                    });

                    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, response.data.refreshAuthTokens.authToken);
                }
            })
            .catch(() => {
                client.writeQuery({
                    query: CURRENT_USER_QUERY,
                    data: { user: null }
                });

                localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
            });
    }, [initialTokenCheck, client]);

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
            {console.log(data)}
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
