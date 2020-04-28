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

const fetchRelay = async (params: RequestParameters, variables: Variables): Promise<GraphQLResponse> => {
    return fetchGraphQL(params.text, variables);
};

export default new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource())
});
