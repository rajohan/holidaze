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

export const REGISTER_MUTATION = gql`
    mutation Register($email: String!, $username: String!, $password: String!, $name: String!, $newsletters: Boolean!) {
        addUser(
            data: { email: $email, username: $username, password: $password, name: $name, newsletters: $newsletters }
        ) {
            id
        }
    }
`;

export const FORGOT_PASSWORD_MUTATION = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email) {
            id
        }
    }
`;

export const FORGOT_PASSWORD_VERIFY_MUTATION = gql`
    mutation ForgotPasswordVerify($newPassword: String!, $token: String!) {
        forgotPasswordVerify(newPassword: $newPassword, token: $token) {
            id
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

export const ADD_ESTABLISHMENT_MUTATION = gql`
    mutation AddEstablishment(
        $name: String!
        $email: String!
        $imageUrl: String!
        $price: Float!
        $maxGuests: Int!
        $googleLat: Float!
        $googleLong: Float!
        $description: String!
        $selfCatering: Boolean!
    ) {
        addEstablishment(
            data: {
                name: $name
                email: $email
                imageUrl: $imageUrl
                price: $price
                maxGuests: $maxGuests
                googleLat: $googleLat
                googleLong: $googleLong
                description: $description
                selfCatering: $selfCatering
            }
        ) {
            id
            name
            imageUrl
            price
            maxGuests
            googleLat
            googleLong
            description
            selfCatering
            createdAt
            updatedAt
        }
    }
`;

export const UPDATE_ESTABLISHMENT_MUTATION = gql`
    mutation UpdateEstablishment(
        $id: ID!
        $name: String!
        $email: String!
        $imageUrl: String!
        $price: Float!
        $maxGuests: Int!
        $googleLat: Float!
        $googleLong: Float!
        $description: String!
        $selfCatering: Boolean!
    ) {
        updateEstablishment(
            data: {
                id: $id
                name: $name
                email: $email
                imageUrl: $imageUrl
                price: $price
                maxGuests: $maxGuests
                googleLat: $googleLat
                googleLong: $googleLong
                description: $description
                selfCatering: $selfCatering
            }
        ) {
            id
            name
            imageUrl
            price
            maxGuests
            googleLat
            googleLong
            description
            selfCatering
            createdAt
            updatedAt
        }
    }
`;

export const DELETE_ESTABLISHMENT_MUTATION = gql`
    mutation DeleteEstablishment($id: ID!) {
        deleteEstablishment(id: $id) {
            id
        }
    }
`;
