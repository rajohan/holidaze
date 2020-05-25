import { createHttpLink, Observable } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/link-error";
import { setContext } from "@apollo/link-context";
import { GraphQLError } from "graphql";

import { client } from "./index";
import { API_URL, LOCAL_STORAGE_AUTH_TOKEN } from "../constants";
import { refreshAuthToken } from "./refreshAuthToken";
import { CURRENT_USER_QUERY } from "../GraphQL/Queries";

interface ErrorResponseWithStatusCode extends ErrorResponse {
    graphQLErrors?: ReadonlyArray<GraphQLError & { statusCode?: number }>;
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: ErrorResponseWithStatusCode) => {
    if (graphQLErrors && graphQLErrors[0].statusCode && graphQLErrors[0].statusCode === 401) {
        return new Observable((observer) => {
            refreshAuthToken()
                .then((response) => {
                    if (!response || !response.authToken || !response.user) {
                        throw new Error("Not Signed In");
                    }

                    client.writeQuery({
                        query: CURRENT_USER_QUERY,
                        data: { user: response.user }
                    });

                    operation.setContext(({ headers = {} }) => ({
                        headers: {
                            ...headers,
                            authorization: `Bearer ${response.authToken}`
                        }
                    }));
                })
                .then(() => {
                    const subscriber = {
                        next: observer.next.bind(observer),
                        error: observer.error.bind(observer),
                        complete: observer.complete.bind(observer)
                    };

                    forward(operation).subscribe(subscriber);
                })
                .catch(() => {
                    client.writeQuery({
                        query: CURRENT_USER_QUERY,
                        data: { user: null }
                    });

                    observer.complete();
                });
        });
    }
    if (networkError) {
        console.error(`[Network error]: ${networkError}`);
    }
});

const authLink = setContext((_, { headers }) => {
    const authToken = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN);

    return {
        headers: {
            ...headers,
            ...(authToken ? { authorization: `Bearer ${authToken}` } : {})
        }
    };
});

const httpLink = createHttpLink({
    uri: API_URL,
    credentials: "include"
});

export { errorLink, authLink, httpLink };
