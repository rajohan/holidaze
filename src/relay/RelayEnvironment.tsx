import React, { useContext } from "react";
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

import { fetchGraphQL } from "./fetchGraphQL";
import { StoreContext } from "../store";

const fetchRelay = async (
    params: RequestParameters,
    variables: Variables,
    authToken?: string
): Promise<GraphQLResponse> => {
    return fetchGraphQL(params.text, variables, authToken);
};

type Props = {
    children: React.ReactNode;
};

const RelayEnvironment: React.FC<Props> = (props: React.PropsWithChildren<Props>): React.ReactElement => {
    const { state } = useContext(StoreContext);

    const environment = new Environment({
        network: Network.create((params: RequestParameters, variables: Variables) =>
            fetchRelay(params, variables, state.user.authToken)
        ),
        store: new Store(new RecordSource())
    });

    return <RelayEnvironmentProvider environment={environment}>{props.children}</RelayEnvironmentProvider>;
};

export default RelayEnvironment;
