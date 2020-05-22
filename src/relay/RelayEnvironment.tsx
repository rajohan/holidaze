import React, { useContext, useEffect } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import axios from "axios";
import {
    Environment,
    GraphQLResponse,
    Network,
    RecordSource,
    RequestParameters,
    Store,
    Variables
} from "relay-runtime";

import { fetchGraphQL, axiosInstance } from "./fetchGraphQL";
import { StoreContext } from "../store";
import { API_URL } from "../constants";
import { setAuthToken } from "../store/actions";

const fetchRelay = async (params: RequestParameters, variables: Variables): Promise<GraphQLResponse> => {
    return fetchGraphQL(params.text, variables);
};

const environment = new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource())
});

type Props = {
    children: React.ReactNode;
};

const RelayEnvironment: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { state, dispatch } = useContext(StoreContext);

    useEffect(() => {
        const authRequestInterceptor = axiosInstance.interceptors.request.use(
            (config) => {
                config.headers.Authorization = state.user.authToken && `Bearer ${state.user.authToken}`;
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return (): void => {
            axiosInstance.interceptors.request.eject(authRequestInterceptor);
        };
    }, [state.user.authToken]);

    useEffect(() => {
        const authResponseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                if (response.data && response.data.errors && response.data.errors[0].statusCode === 401) {
                    // Make sure to use a new axios instance to not create a endless request loop
                    // on new 401 error because of response interceptors.
                    return axios({
                        method: "post",
                        url: API_URL,
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": API_URL
                        },
                        withCredentials: true,
                        data: JSON.stringify({
                            query: "mutation { refreshAuthTokens { authToken } }"
                        })
                    }).then(({ data }) => {
                        dispatch(setAuthToken(data.data.refreshAuthTokens.authToken));
                        response.config.headers.Authorization = `Bearer ${data.data.refreshAuthTokens.authToken}`;
                        return axios(response.config);
                    });
                }

                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return (): void => {
            axiosInstance.interceptors.response.eject(authResponseInterceptor);
        };
    }, [dispatch]);

    return <RelayEnvironmentProvider environment={environment}>{props.children}</RelayEnvironmentProvider>;
};

export default RelayEnvironment;
