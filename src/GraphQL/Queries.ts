import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
    query CurrentUser {
        user @client {
            id
            username
            email
            accessLevel
        }
    }
`;

export const GET_ALL_ESTABLISHMENTS_QUERY = gql`
    query GetAllEstablishments {
        getAllEstablishments {
            id
            name
            imageUrl
            maxGuests
            price
        }
    }
`;

export const ADMIN_GET_ALL_ESTABLISHMENTS_QUERY = gql`
    query AdminGetAllEstablishments {
        getAllEstablishments {
            id
            name
            email
        }
    }
`;

export const GET_ESTABLISHMENT_QUERY = gql`
    query GetEstablishment($id: ID!) {
        getEstablishment(id: $id, withEnquiries: false) {
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

export const GET_ALL_ENQUIRIES_QUERY = gql`
    query GetAllEnquiries {
        getAllEnquiries(withEstablishment: true) {
            id
            clientName
            email
            checkin
            checkout
            status

            establishment {
                id
                name
            }
        }
    }
`;

export const GET_ALL_MESSAGES_QUERY = gql`
    query GetAllMessages {
        getAllMessages {
            id
            clientName
            email
            status
            message
            createdAt
        }
    }
`;
