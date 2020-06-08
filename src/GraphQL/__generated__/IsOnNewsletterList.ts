/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: IsOnNewsletterList
// ====================================================

export interface IsOnNewsletterList_isOnNewsletterList {
    __typename: "IsOnNewsletterListType";
    isOnNewsletterList: boolean;
}

export interface IsOnNewsletterList {
    /**
     * Checks if a email is on the newsletter list
     */
    isOnNewsletterList: IsOnNewsletterList_isOnNewsletterList;
}

export interface IsOnNewsletterListVariables {
    email: string;
}
