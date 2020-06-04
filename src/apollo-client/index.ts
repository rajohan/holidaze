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
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    getAllEstablishments: {
                        merge(_, incoming): {} {
                            return incoming;
                        }
                    },
                    getAllEnquiries: {
                        merge(_, incoming): {} {
                            return incoming;
                        }
                    }
                }
            },
            EstablishmentType: {
                fields: {
                    wishlist: {
                        merge(_, incoming): {} {
                            return incoming;
                        }
                    }
                }
            }
        }
    }),
    link: errorLink.concat(authLink.concat(httpLink)),
    defaultOptions,
    connectToDevTools: IS_DEV_MODE
});

const writeInitialData = async (): Promise<void> => {
    client.writeQuery({
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
