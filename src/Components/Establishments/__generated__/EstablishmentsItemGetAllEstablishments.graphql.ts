/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EstablishmentsItemGetAllEstablishments = {
    readonly id: string;
    readonly name: string;
    readonly imageUrl: string;
    readonly maxGuests: number;
    readonly price: number;
    readonly " $refType": "EstablishmentsItemGetAllEstablishments";
};
export type EstablishmentsItemGetAllEstablishments$data = EstablishmentsItemGetAllEstablishments;
export type EstablishmentsItemGetAllEstablishments$key = {
    readonly " $data"?: EstablishmentsItemGetAllEstablishments$data;
    readonly " $fragmentRefs": FragmentRefs<"EstablishmentsItemGetAllEstablishments">;
};

const node: ReaderFragment = {
    kind: "Fragment",
    name: "EstablishmentsItemGetAllEstablishments",
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
(node as any).hash = "64822e09ce7c9d7b65240dc309dfbef9";
export default node;
