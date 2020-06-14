import React, { useEffect } from "react";
import { Switch, Route, useLocation } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useMutation, useQuery } from "@apollo/client";

import { CurrentUser } from "../GraphQL/__generated__/CurrentUser";
import { RefreshAuthTokens } from "../GraphQL/__generated__/RefreshAuthTokens";
import { CURRENT_USER_QUERY } from "../GraphQL/Queries";
import { REFRESH_AUTH_TOKENS_MUTATION } from "../GraphQL/Mutations";
import { LOCAL_STORAGE_AUTH_TOKEN } from "../constants";
import Header from "./Layout/Header";
import HomeHeader from "./Home/HomeHeader";
import Main from "./Layout/Main";
import Footer from "./Layout/Footer";
import ErrorBoundary from "./Shared/ErrorBoundary";

const Home = React.lazy(() => import("./Home/Home"));
const Establishment = React.lazy(() => import("./Establishment/Establishment"));
const Establishments = React.lazy(() => import("./Establishments/Establishments"));
const Contact = React.lazy(() => import("./Contact/Contact"));
const Admin = React.lazy(() => import("./Admin/Admin"));
const Register = React.lazy(() => import("./Register/Register"));
const ForgotPassword = React.lazy(() => import("./ForgotPassword/ForgotPassword"));
const ForgotPasswordVerify = React.lazy(() => import("./ForgotPassword/ForgotPasswordVerify"));
const Wishlist = React.lazy(() => import("./Wishlist/Wishlist"));
const Profile = React.lazy(() => import("./Profile/Profile"));

const App: React.FC = (): React.ReactElement => {
    const location = useLocation();
    const [initialTokenCheck] = useMutation<RefreshAuthTokens>(REFRESH_AUTH_TOKENS_MUTATION);
    const { client } = useQuery<CurrentUser>(CURRENT_USER_QUERY);

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
                <meta
                    name="keywords"
                    content="Holidaze, Bergen, Holiday, Establishment, Hotel, B&B, Guest House, Accommodation"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,400;0,700;1,400&display=swap"
                    rel="stylesheet"
                />
                <title>Holidaze</title>
            </Helmet>
            {location.pathname !== "/" ? <Header /> : <HomeHeader />}
            <ErrorBoundary fallback="Sorry an unexpected error occurred, please try to refresh the page">
                <Main>
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/establishment/:id/:name">
                            <Establishment />
                        </Route>
                        <Route path="/establishments">
                            <Establishments />
                        </Route>
                        <Route path="/contact">
                            <Contact />
                        </Route>
                        <Route path="/register">
                            <Register />
                        </Route>
                        <Route path="/forgotPassword" exact>
                            <ForgotPassword />
                        </Route>
                        <Route path="/forgotPassword/:token">
                            <ForgotPasswordVerify />
                        </Route>
                        <Route path="/wishlist">
                            <Wishlist />
                        </Route>
                        <Route path="/admin">
                            <Admin />
                        </Route>
                        <Route path="/profile">
                            <Profile />
                        </Route>
                        <Route>404: NOT FOUND</Route>
                    </Switch>
                </Main>
            </ErrorBoundary>
            <Footer />
        </HelmetProvider>
    );
};

export default App;
