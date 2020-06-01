/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchEstablishments
// ====================================================

export interface SearchEstablishments_searchEstablishments {
    __typename: "EstablishmentType";
    id: string;
    name: string;
}

export interface SearchEstablishments {
    /**
     * Returns establishments maxing a search query
     */
    searchEstablishments: SearchEstablishments_searchEstablishments[];
}

export interface SearchEstablishmentsVariables {
    searchQuery: string;
}
