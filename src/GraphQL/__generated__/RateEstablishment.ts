/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RateEstablishment
// ====================================================

export interface RateEstablishment_rateEstablishment {
    __typename: "EstablishmentType";
    id: string;
}

export interface RateEstablishment {
    /**
     * Rates an establishment
     */
    rateEstablishment: RateEstablishment_rateEstablishment;
}

export interface RateEstablishmentVariables {
    establishmentId: string;
    rating: number;
}
