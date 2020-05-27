/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: NewEnquiry
// ====================================================

export interface NewEnquiry_addEnquiry {
    __typename: "EnquiryType";
    id: string;
}

export interface NewEnquiry {
    /**
     * Adds a new enquiry
     */
    addEnquiry: NewEnquiry_addEnquiry;
}

export interface NewEnquiryVariables {
    establishmentId: string;
    clientName: string;
    email: string;
    guests: number;
    checkin: any;
    checkout: any;
}
