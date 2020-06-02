/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Register
// ====================================================

export interface Register_addUser {
    __typename: "UserType";
    id: string;
}

export interface Register {
    /**
     * Adds a new user
     */
    addUser: Register_addUser;
}

export interface RegisterVariables {
    email: string;
    username: string;
    password: string;
    name: string;
    newsletters: boolean;
}
