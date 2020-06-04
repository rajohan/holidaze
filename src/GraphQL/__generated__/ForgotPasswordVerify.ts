/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ForgotPasswordVerify
// ====================================================

export interface ForgotPasswordVerify_forgotPasswordVerify {
    __typename: "UserType";
    id: string;
}

export interface ForgotPasswordVerify {
    /**
     * Completes a forgot password request
     */
    forgotPasswordVerify: ForgotPasswordVerify_forgotPasswordVerify;
}

export interface ForgotPasswordVerifyVariables {
    newPassword: string;
    token: string;
}
