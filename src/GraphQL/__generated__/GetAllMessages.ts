/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllMessages
// ====================================================

export interface GetAllMessages_getAllMessages {
    __typename: "ContactType";
    id: string;
    clientName: string;
    email: string;
    status: number;
    message: string;
    createdAt: any;
}

export interface GetAllMessages {
    /**
     * Returns all messages
     */
    getAllMessages: GetAllMessages_getAllMessages[];
}
