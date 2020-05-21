/* tslint:disable */
/* eslint-disable */
/* @relayHash 8326c004384a5f5b600c7375047d54f5 */

import { ConcreteRequest } from "relay-runtime";
export type AdminEstablishmentsGetAllEstablishmentsQueryVariables = {};
export type AdminEstablishmentsGetAllEstablishmentsQueryResponse = {
    readonly getAllEstablishments: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly email: string;
    }>;
};
export type AdminEstablishmentsGetAllEstablishmentsQuery = {
    readonly response: AdminEstablishmentsGetAllEstablishmentsQueryResponse;
    readonly variables: AdminEstablishmentsGetAllEstablishmentsQueryVariables;
};

/*
query AdminEstablishmentsGetAllEstablishmentsQuery {
  getAllEstablishments {
    id
    name
    email
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        {
            kind: "LinkedField",
            alias: null,
            name: "getAllEstablishments",
            storageKey: null,
            args: null,
            concreteType: "EstablishmentType",
            plural: true,
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
                    name: "email",
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
            name: "AdminEstablishmentsGetAllEstablishmentsQuery",
            type: "Query",
            metadata: null,
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        operation: {
            kind: "Operation",
            name: "AdminEstablishmentsGetAllEstablishmentsQuery",
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        params: {
            operationKind: "query",
            name: "AdminEstablishmentsGetAllEstablishmentsQuery",
            id: null,
            text:
                "query AdminEstablishmentsGetAllEstablishmentsQuery {\n  getAllEstablishments {\n    id\n    name\n    email\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "e5d85a2922703ad64fcd4f4059973eae";
export default node;
