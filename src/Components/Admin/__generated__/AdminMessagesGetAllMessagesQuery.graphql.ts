/* tslint:disable */
/* eslint-disable */
/* @relayHash 46e30ac115955212e123828a31a3c458 */

import { ConcreteRequest } from "relay-runtime";
export type AdminMessagesGetAllMessagesQueryVariables = {};
export type AdminMessagesGetAllMessagesQueryResponse = {
    readonly getAllMessages: ReadonlyArray<{
        readonly id: string;
        readonly clientName: string;
        readonly email: string;
        readonly createdAt: unknown;
    }>;
};
export type AdminMessagesGetAllMessagesQuery = {
    readonly response: AdminMessagesGetAllMessagesQueryResponse;
    readonly variables: AdminMessagesGetAllMessagesQueryVariables;
};

/*
query AdminMessagesGetAllMessagesQuery {
  getAllMessages {
    id
    clientName
    email
    createdAt
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
        {
            kind: "LinkedField",
            alias: null,
            name: "getAllMessages",
            storageKey: null,
            args: null,
            concreteType: "ContactType",
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
                    name: "clientName",
                    args: null,
                    storageKey: null
                },
                {
                    kind: "ScalarField",
                    alias: null,
                    name: "email",
                    args: null,
                    storageKey: null
                },
                {
                    kind: "ScalarField",
                    alias: null,
                    name: "createdAt",
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
            name: "AdminMessagesGetAllMessagesQuery",
            type: "Query",
            metadata: null,
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        operation: {
            kind: "Operation",
            name: "AdminMessagesGetAllMessagesQuery",
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        params: {
            operationKind: "query",
            name: "AdminMessagesGetAllMessagesQuery",
            id: null,
            text:
                "query AdminMessagesGetAllMessagesQuery {\n  getAllMessages {\n    id\n    clientName\n    email\n    createdAt\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "3bc87ec55e28aac408a56c609817ef7b";
export default node;
