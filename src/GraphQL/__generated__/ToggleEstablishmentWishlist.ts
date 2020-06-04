/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleEstablishmentWishlist
// ====================================================

export interface ToggleEstablishmentWishlist_toggleEstablishmentWishlist {
    __typename: "EstablishmentType";
    id: string;
}

export interface ToggleEstablishmentWishlist {
    /**
     * Toggles the wishlist status on an establishment
     */
    toggleEstablishmentWishlist: ToggleEstablishmentWishlist_toggleEstablishmentWishlist;
}

export interface ToggleEstablishmentWishlistVariables {
    establishmentId: string;
}
