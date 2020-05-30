/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: AdminGetAllEstablishments
// ====================================================

export interface AdminGetAllEstablishments_getAllEstablishments {
    __typename: "EstablishmentType";
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    price: number;
    maxGuests: number;
    googleLat: number;
    googleLong: number;
    selfCatering: boolean;
    description: string;
}

export interface AdminGetAllEstablishments {
    /**
     * Returns all establishments
     */
    getAllEstablishments: AdminGetAllEstablishments_getAllEstablishments[];
}
