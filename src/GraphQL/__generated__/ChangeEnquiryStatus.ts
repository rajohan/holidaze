/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeEnquiryStatus
// ====================================================

export interface ChangeEnquiryStatus_changeEnquiryStatus {
    __typename: "EnquiryType";
    id: string;
    status: number;
}

export interface ChangeEnquiryStatus {
    /**
     * Changes the status on a enquiry
     */
    changeEnquiryStatus: ChangeEnquiryStatus_changeEnquiryStatus;
}

export interface ChangeEnquiryStatusVariables {
    id: string;
    status: number;
}
