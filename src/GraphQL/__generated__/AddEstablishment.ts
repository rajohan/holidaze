/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddEstablishment
// ====================================================

export interface AddEstablishment_addEstablishment {
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

export interface AddEstablishment {
    /**
     * Adds a new establishment
     */
    addEstablishment: AddEstablishment_addEstablishment;
}

export interface AddEstablishmentVariables {
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
