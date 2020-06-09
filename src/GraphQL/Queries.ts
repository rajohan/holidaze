import { gql } from "@apollo/client";

export const CURRENT_USER_QUERY = gql`
    query CurrentUser {
        user @client {
            id
            username
            email
            name
            accessLevel
        }
    }
`;

export const GET_USER_QUERY = gql`
    query GetUser {
        getUser {
            id
            username
            name
            email
        }
    }
`;

export const IS_ON_NEWSLETTER_LIST_QUERY = gql`
    query IsOnNewsletterList($email: String!) {
        isOnNewsletterList(email: $email) {
            isOnNewsletterList
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

            wishlist {
                userId
            }

            rating {
                userId
                rating
            }
        }
    }
`;

export const ADMIN_GET_ALL_ESTABLISHMENTS_QUERY = gql`
    query AdminGetAllEstablishments {
        getAllEstablishments {
            id
            name
            email
            imageUrl
            price
            maxGuests
            googleLat
            googleLong
            selfCatering
            description
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

            wishlist {
                userId
            }

            rating {
                userId
                rating
            }
        }
    }
`;

export const SEARCH_ESTABLISHMENTS_QUERY = gql`
    query SearchEstablishments($searchQuery: String!) {
        searchEstablishments(searchQuery: $searchQuery) {
            id
            name
        }
    }
`;

export const GET_ALL_ENQUIRIES_QUERY = gql`
    query GetAllEnquiries {
        getAllEnquiries(withEstablishment: true) {
            id
            clientName
            email
            guests
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

export const GET_ALL_ENQUIRIES_BY_USER_QUERY = gql`
    query GetAllEnquiriesByUser {
        getAllEnquiriesByUser {
            id
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
