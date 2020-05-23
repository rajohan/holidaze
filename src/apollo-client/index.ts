import { ApolloClient, InMemoryCache } from "@apollo/client";
import { authLink, errorLink, httpLink } from "./links";

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(authLink.concat(httpLink))
});

export { client };
