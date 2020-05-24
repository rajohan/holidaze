import { createHttpLink, Observable } from "@apollo/client";
import { ErrorResponse, onError } from "@apollo/link-error";
import { setContext } from "@apollo/link-context";
import { GraphQLError } from "graphql";

import { API_URL, LOCAL_STORAGE_AUTH_TOKEN } from "../constants";
import { refreshAuthToken } from "./refreshAuthToken";

interface ErrorResponseWithStatusCode extends ErrorResponse {
    graphQLErrors?: ReadonlyArray<GraphQLError & { statusCode?: number }>;
}

const errorLink = onError(({ graphQLErrors, networkError, operation, forward }: ErrorResponseWithStatusCode) => {
    if (graphQLErrors && graphQLErrors[0].statusCode && graphQLErrors[0].statusCode === 401) {
        return new Observable((observer) => {
            refreshAuthToken()
                .then((token) => {
                    if (!token) {
                        throw new Error("Not Signed In");
                    }

                    operation.setContext(({ headers = {} }) => ({
                        headers: {
                            ...headers,
                            authorization: `Bearer ${token}`
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
                .catch((error) => {
                    observer.error(error);
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
