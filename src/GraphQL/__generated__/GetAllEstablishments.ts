/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllEstablishments
// ====================================================

export interface GetAllEstablishments_getAllEstablishments {
    __typename: "EstablishmentType";
    id: string;
    name: string;
    imageUrl: string;
    maxGuests: number;
    price: number;
}

export interface GetAllEstablishments {
    /**
     * Returns all establishments
     */
    getAllEstablishments: GetAllEstablishments_getAllEstablishments[];
}
