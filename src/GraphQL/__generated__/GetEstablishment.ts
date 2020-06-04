/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetEstablishment
// ====================================================

export interface GetEstablishment_getEstablishment_wishlist {
    __typename: "WishlistType";
    userId: string;
}

export interface GetEstablishment_getEstablishment {
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
    wishlist: GetEstablishment_getEstablishment_wishlist[] | null;
}

export interface GetEstablishment {
    /**
     * Returns a establishment by ID
     */
    getEstablishment: GetEstablishment_getEstablishment;
}

export interface GetEstablishmentVariables {
    id: string;
}
