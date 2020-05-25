import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";
import { authLink, errorLink, httpLink } from "./links";
import { IS_DEV_MODE } from "../constants";
import { CURRENT_USER_QUERY } from "../GraphQL/Queries";

const defaultOptions: DefaultOptions = {
    watchQuery: {
        fetchPolicy: "cache-and-network",
        errorPolicy: "ignore"
    },
    query: {
        fetchPolicy: "cache-first",
        errorPolicy: "all"
    },
    mutate: {
        errorPolicy: "all"
    }
};

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(authLink.concat(httpLink)),
    defaultOptions,
    connectToDevTools: IS_DEV_MODE
});

const writeInitialData = async (): Promise<void> => {
    client.cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: {
            user: null
        }
    });
};

writeInitialData();

client.onClearStore(writeInitialData);
client.onResetStore(writeInitialData);

export { client };
