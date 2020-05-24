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

export interface GetAllEnquiries_getAllEnquiries {
    __typename: "EnquiryType";
    id: string;
    clientName: string;
    email: string;
    checkin: any;
    checkout: any;
    establishment: GetAllEnquiries_getAllEnquiries_establishment;
}

export interface GetAllEnquiries {
    /**
     * Returns all enquiries
     */
    getAllEnquiries: GetAllEnquiries_getAllEnquiries[];
}
