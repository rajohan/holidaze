/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateEstablishment
// ====================================================

export interface UpdateEstablishment_updateEstablishment {
    __typename: "EstablishmentType";
    id: string;
    name: string;
    imageUrl: string;
    price: number;
    maxGuests: number;
    googleLat: number;
    googleLong: number;
    description: string;
    selfCatering: boolean;
    createdAt: any;
    updatedAt: any;
}

export interface UpdateEstablishment {
    /**
     * Updates a establishment by ID
     */
    updateEstablishment: UpdateEstablishment_updateEstablishment;
}

export interface UpdateEstablishmentVariables {
    id: string;
    name: string;
    email: string;
    imageUrl: string;
    price: number;
    maxGuests: number;
    googleLat: number;
    googleLong: number;
    description: string;
    selfCatering: boolean;
}
