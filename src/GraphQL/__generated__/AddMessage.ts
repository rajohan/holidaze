/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddMessage
// ====================================================

export interface AddMessage_addMessage {
    __typename: "ContactType";
    id: string;
}

export interface AddMessage {
    /**
     * Adds a new message
     */
    addMessage: AddMessage_addMessage;
}

export interface AddMessageVariables {
    clientName: string;
    email: string;
    message: string;
}
