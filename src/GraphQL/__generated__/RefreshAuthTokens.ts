/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RefreshAuthTokens
// ====================================================

export interface RefreshAuthTokens_refreshAuthTokens_user {
    __typename: "UserType";
    id: string;
    username: string;
    email: string;
    accessLevel: number;
}

export interface RefreshAuthTokens_refreshAuthTokens {
    __typename: "UserWithTokenType";
    authToken: string;
    user: RefreshAuthTokens_refreshAuthTokens_user;
}

export interface RefreshAuthTokens {
    /**
     * Refreshes auth token
     */
    refreshAuthTokens: RefreshAuthTokens_refreshAuthTokens;
}
