/* tslint:disable */
/* eslint-disable */
/* @relayHash b5e4fb87074eb2da58f03edf398f398d */

import { ConcreteRequest } from "relay-runtime";
export type EstablishmentGetEstablishmentQueryVariables = {
    id: string;
};
export type EstablishmentGetEstablishmentQueryResponse = {
    readonly getEstablishment: {
        readonly id: string;
        readonly name: string;
        readonly imageUrl: string;
        readonly price: number;
        readonly maxGuests: number;
        readonly googleLat: number;
        readonly googleLong: number;
        readonly description: string;
        readonly selfCatering: boolean;
        readonly createdAt: unknown;
        readonly updatedAt: unknown;
    };
};
export type EstablishmentGetEstablishmentQuery = {
    readonly response: EstablishmentGetEstablishmentQueryResponse;
    readonly variables: EstablishmentGetEstablishmentQueryVariables;
};

/*
query EstablishmentGetEstablishmentQuery(
  $id: ID!
) {
  getEstablishment(id: $id, withEnquiries: false) {
    id
    name
    imageUrl
    price
    maxGuests
    googleLat
    googleLong
    description
    selfCatering
    createdAt
    updatedAt
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
            {
                kind: "LocalArgument",
                name: "id",
                type: "ID!",
                defaultValue: null
            }
        ],
        v1 = [
            {
                kind: "LinkedField",
                alias: null,
                name: "getEstablishment",
                storageKey: null,
                args: [
                    {
                        kind: "Variable",
                        name: "id",
                        variableName: "id"
                    },
                    {
                        kind: "Literal",
                        name: "withEnquiries",
                        value: false
                    }
                ],
                concreteType: "EstablishmentType",
                plural: false,
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
                        name: "price",
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
                        name: "googleLat",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "googleLong",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "description",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "selfCatering",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "createdAt",
                        args: null,
                        storageKey: null
                    },
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "updatedAt",
                        args: null,
                        storageKey: null
                    }
                ]
            }
        ];
    return {
        kind: "Request",
        fragment: {
            kind: "Fragment",
            name: "EstablishmentGetEstablishmentQuery",
            type: "Query",
            metadata: null,
            argumentDefinitions: v0 /*: any*/,
            selections: v1 /*: any*/
        },
        operation: {
            kind: "Operation",
            name: "EstablishmentGetEstablishmentQuery",
            argumentDefinitions: v0 /*: any*/,
            selections: v1 /*: any*/
        },
        params: {
            operationKind: "query",
            name: "EstablishmentGetEstablishmentQuery",
            id: null,
            text:
                "query EstablishmentGetEstablishmentQuery(\n  $id: ID!\n) {\n  getEstablishment(id: $id, withEnquiries: false) {\n    id\n    name\n    imageUrl\n    price\n    maxGuests\n    googleLat\n    googleLong\n    description\n    selfCatering\n    createdAt\n    updatedAt\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "96ffe539062b67f89206926e395f20dd";
export default node;
