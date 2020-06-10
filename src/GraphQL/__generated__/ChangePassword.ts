/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePassword
// ====================================================

export interface ChangePassword_changePassword {
    __typename: "UserType";
    id: string;
}

export interface ChangePassword {
    /**
     * Changes a users password
     */
    changePassword: ChangePassword_changePassword;
}

export interface ChangePasswordVariables {
    password: string;
}
