/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: EditUser
// ====================================================

export interface EditUser_editUser {
    __typename: "UserType";
    id: string;
}

export interface EditUser {
    /**
     * Edits a users details
     */
    editUser: EditUser_editUser;
}

export interface EditUserVariables {
    username: string;
    email: string;
    name: string;
    newsletters: boolean;
}
