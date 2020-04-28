/* tslint:disable */
/* eslint-disable */
/* @relayHash 3e2fc528c6d6be0f779e2b9480455800 */

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type HomeGetAllUsersQueryVariables = {};
export type HomeGetAllUsersQueryResponse = {
    readonly getAllUsers: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"HomeViewGetAllUsers">;
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
    ...HomeViewGetAllUsers
  }
}

fragment HomeViewGetAllUsers on UserType {
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
                            name: "HomeViewGetAllUsers",
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
                "query HomeGetAllUsersQuery {\n  getAllUsers {\n    id\n    ...HomeViewGetAllUsers\n  }\n}\n\nfragment HomeViewGetAllUsers on UserType {\n  username\n  id\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "96da43950b588274cbe7e5946d713216";
export default node;
