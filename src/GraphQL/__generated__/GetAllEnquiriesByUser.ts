/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllEnquiriesByUser
// ====================================================

export interface GetAllEnquiriesByUser_getAllEnquiriesByUser_establishment {
    __typename: "EstablishmentType";
    id: string;
    name: string;
}

export interface GetAllEnquiriesByUser_getAllEnquiriesByUser {
    __typename: "EnquiryType";
    id: string;
    checkin: any;
    checkout: any;
    status: number;
    establishment: GetAllEnquiriesByUser_getAllEnquiriesByUser_establishment;
}

export interface GetAllEnquiriesByUser {
    /**
     * Return all enquiries by a user
     */
    getAllEnquiriesByUser: GetAllEnquiriesByUser_getAllEnquiriesByUser[];
}
