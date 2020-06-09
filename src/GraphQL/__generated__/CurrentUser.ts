/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: CurrentUser
// ====================================================

export interface CurrentUser_user {
    __typename: "CurrentUser";
    id: string;
    username: string;
    email: string;
    name: string;
    accessLevel: number;
}

export interface CurrentUser {
    user: CurrentUser_user | null;
}
