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

export const LOGOUT_MUTATION = gql`
    mutation Logout {
        logout {
            loggedOut
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

export const NEW_MESSAGE_MUTATION = gql`
    mutation AddMessage($clientName: String!, $email: String!, $message: String!) {
        addMessage(data: { clientName: $clientName, email: $email, message: $message }) {
            id
        }
    }
`;

export const CHANGE_MESSAGE_STATUS_MUTATION = gql`
    mutation ChangeMessageStatus($id: ID!, $status: Int!) {
        changeMessageStatus(data: { id: $id, status: $status }) {
            id
            status
        }
    }
`;

export const NEW_ENQUIRY_MUTATION = gql`
    mutation NewEnquiry(
        $establishmentId: ID!
        $clientName: String!
        $email: String!
        $guests: Int!
        $checkin: DateTime!
        $checkout: DateTime!
    ) {
        addEnquiry(
            data: {
                establishmentId: $establishmentId
                clientName: $clientName
                email: $email
                guests: $guests
                checkin: $checkin
                checkout: $checkout
            }
        ) {
            id
        }
    }
`;

export const CHANGE_ENQUIRY_STATUS_MUTATION = gql`
    mutation ChangeEnquiryStatus($id: ID!, $status: Int!) {
        changeEnquiryStatus(data: { id: $id, status: $status }) {
            id
            status
        }
    }
`;
