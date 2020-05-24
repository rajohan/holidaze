import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
    mutation Login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            authToken

            user {
                id
                username
                email
                accessLevel
            }
        }
    }
`;

export const REFRESH_AUTH_TOKENS_MUTATION = gql`
    mutation RefreshAuthTokens {
        refreshAuthTokens {
            authToken

            user {
                id
                username
                email
                accessLevel
            }
        }
    }
`;
