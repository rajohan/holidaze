/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllEstablishments
// ====================================================

export interface GetAllEstablishments_getAllEstablishments_wishlist {
    __typename: "WishlistType";
    userId: string;
}

export interface GetAllEstablishments_getAllEstablishments_rating {
    __typename: "RateType";
    userId: string;
    rating: number;
}

export interface GetAllEstablishments_getAllEstablishments {
    __typename: "EstablishmentType";
    id: string;
    name: string;
    imageUrl: string;
    maxGuests: number;
    price: number;
    wishlist: GetAllEstablishments_getAllEstablishments_wishlist[] | null;
    rating: GetAllEstablishments_getAllEstablishments_rating[] | null;
}

export interface GetAllEstablishments {
    /**
     * Returns all establishments
     */
    getAllEstablishments: GetAllEstablishments_getAllEstablishments[];
}
