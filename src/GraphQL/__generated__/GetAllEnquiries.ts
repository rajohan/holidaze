/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllEnquiries
// ====================================================

export interface GetAllEnquiries_getAllEnquiries_establishment {
    __typename: "EstablishmentType";
    id: string;
    name: string;
}

export interface GetAllEnquiries_getAllEnquiries_user {
    __typename: "UserType";
    id: string;
    email: string;
    name: string;
}

export interface GetAllEnquiries_getAllEnquiries {
    __typename: "EnquiryType";
    id: string;
    guests: number;
    checkin: any;
    checkout: any;
    status: number;
    establishment: GetAllEnquiries_getAllEnquiries_establishment;
    user: GetAllEnquiries_getAllEnquiries_user;
}

export interface GetAllEnquiries {
    /**
     * Returns all enquiries
     */
    getAllEnquiries: GetAllEnquiries_getAllEnquiries[];
}
