/* tslint:disable */
/* eslint-disable */
/* @relayHash 823243a2b80478d4e164461054f3b1be */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeGetAllUsersQueryVariables = {};
export type HomeGetAllUsersQueryResponse = {
    readonly getAllUsers: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeView_getAllUsers">;
    }>;
};
export type HomeGetAllUsersQuery = {
    readonly response: HomeGetAllUsersQueryResponse;
    readonly variables: HomeGetAllUsersQueryVariables;
};

/*
query HomeGetAllUsersQuery {
  getAllUsers {
    id
    ...HomeView_getAllUsers
  }
}

fragment HomeView_getAllUsers on UserType {
  username
  id
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
            name: "HomeGetAllUsersQuery",
            type: "Query",
            metadata: null,
            argumentDefinitions: [],
            selections: [
                {
                    kind: "LinkedField",
                    alias: null,
                    name: "getAllUsers",
                    storageKey: null,
                    args: null,
                    concreteType: "UserType",
                    plural: true,
                    selections: [
                        v0 /*: any*/,
                        {
                            kind: "FragmentSpread",
                            name: "HomeView_getAllUsers",
                            args: null
                        }
                    ]
                }
            ]
        },
        operation: {
            kind: "Operation",
            name: "HomeGetAllUsersQuery",
            argumentDefinitions: [],
            selections: [
                {
                    kind: "LinkedField",
                    alias: null,
                    name: "getAllUsers",
                    storageKey: null,
                    args: null,
                    concreteType: "UserType",
                    plural: true,
                    selections: [
                        v0 /*: any*/,
                        {
                            kind: "ScalarField",
                            alias: null,
                            name: "username",
                            args: null,
                            storageKey: null
                        }
                    ]
                }
            ]
        },
        params: {
            operationKind: "query",
            name: "HomeGetAllUsersQuery",
            id: null,
            text:
                "query HomeGetAllUsersQuery {\n  getAllUsers {\n    id\n    ...HomeView_getAllUsers\n  }\n}\n\nfragment HomeView_getAllUsers on UserType {\n  username\n  id\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "dfe05571492968cc8a6ebabcfe74881d";
export default node;
