import { ApolloClient, DefaultOptions, InMemoryCache } from "@apollo/client";
import { authLink, errorLink, httpLink } from "./links";

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
    defaultOptions
});

export { client };
