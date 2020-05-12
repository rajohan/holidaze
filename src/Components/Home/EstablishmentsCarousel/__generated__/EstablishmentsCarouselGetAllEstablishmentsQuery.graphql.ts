/* tslint:disable */
/* eslint-disable */
/* @relayHash 0c668731c75cf67f5000304d75054353 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EstablishmentsCarouselGetAllEstablishmentsQueryVariables = {};
export type EstablishmentsCarouselGetAllEstablishmentsQueryResponse = {
    readonly getAllEstablishments: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EstablishmentsCarouselItemGetAllEstablishments">;
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
    ...EstablishmentsCarouselItemGetAllEstablishments
  }
}

fragment EstablishmentsCarouselItemGetAllEstablishments on EstablishmentType {
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
                            name: "EstablishmentsCarouselItemGetAllEstablishments",
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
                "query EstablishmentsCarouselGetAllEstablishmentsQuery {\n  getAllEstablishments {\n    id\n    ...EstablishmentsCarouselItemGetAllEstablishments\n  }\n}\n\nfragment EstablishmentsCarouselItemGetAllEstablishments on EstablishmentType {\n  id\n  name\n  imageUrl\n  maxGuests\n  price\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "0b5e5cefb0de3372fd8921e535134360";
export default node;
