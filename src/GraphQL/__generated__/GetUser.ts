/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUser
// ====================================================

export interface GetUser_getUser {
    __typename: "UserType";
    id: string;
    username: string;
    name: string;
    email: string;
}

export interface GetUser {
    /**
     * Returns current signed in user
     */
    getUser: GetUser_getUser;
}
