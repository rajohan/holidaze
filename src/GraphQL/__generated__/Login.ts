/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login_user {
    __typename: "UserType";
    id: string;
    username: string;
    name: string;
    email: string;
    accessLevel: number;
}

export interface Login_login {
    __typename: "UserWithTokenType";
    authToken: string;
    user: Login_login_user;
}

export interface Login {
    /**
     * Login a user
     */
    login: Login_login;
}

export interface LoginVariables {
    username: string;
    password: string;
}
