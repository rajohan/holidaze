/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ForgotPassword
// ====================================================

export interface ForgotPassword_forgotPassword {
    __typename: "UserType";
    id: string;
}

export interface ForgotPassword {
    /**
     * Creates a token to reset a users password
     */
    forgotPassword: ForgotPassword_forgotPassword;
}

export interface ForgotPasswordVariables {
    email: string;
}
