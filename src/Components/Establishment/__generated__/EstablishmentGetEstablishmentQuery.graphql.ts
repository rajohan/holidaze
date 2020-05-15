/* tslint:disable */
/* eslint-disable */
/* @relayHash 143b718c41de297f436b898475580a2a */

import { ConcreteRequest } from "relay-runtime";
export type EstablishmentGetEstablishmentQueryVariables = {
    id: string;
};
export type EstablishmentGetEstablishmentQueryResponse = {
    readonly getEstablishment: {
        readonly id: string;
        readonly name: string;
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
                "query EstablishmentGetEstablishmentQuery(\n  $id: ID!\n) {\n  getEstablishment(id: $id, withEnquiries: false) {\n    id\n    name\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "0fb5e794a32f0482eae6771601031f34";
export default node;
