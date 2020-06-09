/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddToNewsletter
// ====================================================

export interface AddToNewsletter_AddToNewsletter {
    __typename: "NewsletterType";
    id: string;
}

export interface AddToNewsletter {
    /**
     * Adds a email to the newsletter list
     */
    AddToNewsletter: AddToNewsletter_AddToNewsletter;
}

export interface AddToNewsletterVariables {
    email: string;
}
