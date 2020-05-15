/* tslint:disable */
/* eslint-disable */
/* @relayHash 908ac15c400e7140b91c0c17e12036ed */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EstablishmentsCarouselGetAllEstablishmentsQueryVariables = {};
export type EstablishmentsCarouselGetAllEstablishmentsQueryResponse = {
    readonly getAllEstablishments: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EstablishmentsItemGetAllEstablishments">;
    }>;
};
export type EstablishmentsCarouselGetAllEstablishmentsQuery = {
    readonly response: EstablishmentsCarouselGetAllEstablishmentsQueryResponse;
    readonly variables: EstablishmentsCarouselGetAllEstablishmentsQueryVariables;
};

/*
query EstablishmentsCarouselGetAllEstablishmentsQuery {
  getAllEstablishments {
    id
    ...EstablishmentsItemGetAllEstablishments
  }
}

fragment EstablishmentsItemGetAllEstablishments on EstablishmentType {
  id
  name
  imageUrl
  maxGuests
  price
}
*/

const node: ConcreteRequest = (function () {
    var v0 = {
        kind: "ScalarField",
        alias: null,
        name: "id",
        args: null,
        storageKey: null
    };
    return {
        kind: "Request",
        fragment: {
            kind: "Fragment",
            name: "EstablishmentsCarouselGetAllEstablishmentsQuery",
            type: "Query",
            metadata: null,
            argumentDefinitions: [],
            selections: [
                {
                    kind: "LinkedField",
                    alias: null,
                    name: "getAllEstablishments",
                    storageKey: null,
                    args: null,
                    concreteType: "EstablishmentType",
                    plural: true,
                    selections: [
                        v0 /*: any*/,
                        {
                            kind: "FragmentSpread",
                            name: "EstablishmentsItemGetAllEstablishments",
                            args: null
                        }
                    ]
                }
            ]
        },
        operation: {
            kind: "Operation",
            name: "EstablishmentsCarouselGetAllEstablishmentsQuery",
            argumentDefinitions: [],
            selections: [
                {
                    kind: "LinkedField",
                    alias: null,
                    name: "getAllEstablishments",
                    storageKey: null,
                    args: null,
                    concreteType: "EstablishmentType",
                    plural: true,
                    selections: [
                        v0 /*: any*/,
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
                }
            ]
        },
        params: {
            operationKind: "query",
            name: "EstablishmentsCarouselGetAllEstablishmentsQuery",
            id: null,
            text:
                "query EstablishmentsCarouselGetAllEstablishmentsQuery {\n  getAllEstablishments {\n    id\n    ...EstablishmentsItemGetAllEstablishments\n  }\n}\n\nfragment EstablishmentsItemGetAllEstablishments on EstablishmentType {\n  id\n  name\n  imageUrl\n  maxGuests\n  price\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "aa43828340124a5c7d77aa2d79c629a6";
export default node;
