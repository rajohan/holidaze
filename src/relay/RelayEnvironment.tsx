import React, { useContext, useEffect } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";

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
    const { state } = useContext(StoreContext);

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

        const authResponseInterceptor = axiosInstance.interceptors.response.use(
            (response) => {
                if (response.data && response.data.errors) {
                    if (response.data.errors[0].statusCode === 401) {
                        console.log("login please");
                    }
                }

                return response;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return (): void => {
            axiosInstance.interceptors.request.eject(authRequestInterceptor);
            axiosInstance.interceptors.response.eject(authResponseInterceptor);
        };
    }, [state.user.authToken]);

    return <RelayEnvironmentProvider environment={environment}>{props.children}</RelayEnvironmentProvider>;
};

export default RelayEnvironment;
