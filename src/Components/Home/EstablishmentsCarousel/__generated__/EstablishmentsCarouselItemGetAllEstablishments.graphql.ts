/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EstablishmentsCarouselItemGetAllEstablishments = {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;
    readonly maxGuests: number;
    readonly price: number;
    readonly " $refType": "EstablishmentsCarouselItemGetAllEstablishments";
};
export type EstablishmentsCarouselItemGetAllEstablishments$data = EstablishmentsCarouselItemGetAllEstablishments;
export type EstablishmentsCarouselItemGetAllEstablishments$key = {
    readonly " $data"?: EstablishmentsCarouselItemGetAllEstablishments$data;
    readonly " $fragmentRefs": FragmentRefs<"EstablishmentsCarouselItemGetAllEstablishments">;
};

const node: ReaderFragment = {
    kind: "Fragment",
    name: "EstablishmentsCarouselItemGetAllEstablishments",
    type: "EstablishmentType",
    metadata: null,
    argumentDefinitions: [],
    selections: [
        {
            kind: "ScalarField",
            alias: null,
            name: "id",
            args: null,
            storageKey: null
        },
        {
            kind: "ScalarField",
            alias: null,
            name: "name",
            args: null,
            storageKey: null
        },
        {
            kind: "ScalarField",
            alias: null,
            name: "imageUrl",
            args: null,
            storageKey: null
        },
        {
            kind: "ScalarField",
            alias: null,
            name: "maxGuests",
            args: null,
            storageKey: null
        },
        {
            kind: "ScalarField",
            alias: null,
            name: "price",
            args: null,
            storageKey: null
        }
    ]
};
(node as any).hash = "4831312fc6fcff5f3f18cf93e9a7b07b";
export default node;
