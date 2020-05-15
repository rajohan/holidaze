/* tslint:disable */
/* eslint-disable */
/* @relayHash aa6384df5cbdc4dbf4996f06605fa1d4 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type EstablishmentsGetAllEstablishmentsQueryVariables = {};
export type EstablishmentsGetAllEstablishmentsQueryResponse = {
    readonly getAllEstablishments: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"EstablishmentsItemGetAllEstablishments">;
    }>;
};
export type EstablishmentsGetAllEstablishmentsQuery = {
    readonly response: EstablishmentsGetAllEstablishmentsQueryResponse;
    readonly variables: EstablishmentsGetAllEstablishmentsQueryVariables;
};

/*
query EstablishmentsGetAllEstablishmentsQuery {
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
            name: "EstablishmentsGetAllEstablishmentsQuery",
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
            name: "EstablishmentsGetAllEstablishmentsQuery",
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
            name: "EstablishmentsGetAllEstablishmentsQuery",
            id: null,
            text:
                "query EstablishmentsGetAllEstablishmentsQuery {\n  getAllEstablishments {\n    id\n    ...EstablishmentsItemGetAllEstablishments\n  }\n}\n\nfragment EstablishmentsItemGetAllEstablishments on EstablishmentType {\n  id\n  name\n  imageUrl\n  maxGuests\n  price\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "6e4a812779aa8db00aa5dde0146cd8d7";
export default node;
