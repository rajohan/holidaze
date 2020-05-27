/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangeMessageStatus
// ====================================================

export interface ChangeMessageStatus_changeMessageStatus {
    __typename: "ContactType";
    id: string;
    status: number;
}

export interface ChangeMessageStatus {
    /**
     * Changes the status on a message
     */
    changeMessageStatus: ChangeMessageStatus_changeMessageStatus;
}

export interface ChangeMessageStatusVariables {
    id: string;
    status: number;
}
