/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: DeleteEstablishment
// ====================================================

export interface DeleteEstablishment_deleteEstablishment {
    __typename: "EstablishmentType";
    id: string;
}

export interface DeleteEstablishment {
    /**
     * Deletes a establishment by ID
     */
    deleteEstablishment: DeleteEstablishment_deleteEstablishment;
}

export interface DeleteEstablishmentVariables {
    id: string;
}
