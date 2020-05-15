/* tslint:disable */
/* eslint-disable */
/* @relayHash 32bdeab43347227dbff066998b219552 */

import { ConcreteRequest } from "relay-runtime";
export type LoginMutationVariables = {
    username: string;
    password: string;
};
export type LoginMutationResponse = {
    readonly login: {
        readonly authToken: string;
    };
};
export type LoginMutation = {
    readonly response: LoginMutationResponse;
    readonly variables: LoginMutationVariables;
};

/*
mutation LoginMutation(
  $username: String!
  $password: String!
) {
  login(username: $username, password: $password) {
    authToken
  }
}
*/

const node: ConcreteRequest = (function () {
    var v0 = [
            {
                kind: "LocalArgument",
                name: "username",
                type: "String!",
                defaultValue: null
            },
            {
                kind: "LocalArgument",
                name: "password",
                type: "String!",
                defaultValue: null
            }
        ],
        v1 = [
            {
                kind: "LinkedField",
                alias: null,
                name: "login",
                storageKey: null,
                args: [
                    {
                        kind: "Variable",
                        name: "password",
                        variableName: "password"
                    },
                    {
                        kind: "Variable",
                        name: "username",
                        variableName: "username"
                    }
                ],
                concreteType: "UserTypeWithToken",
                plural: false,
                selections: [
                    {
                        kind: "ScalarField",
                        alias: null,
                        name: "authToken",
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
            name: "LoginMutation",
            type: "Mutation",
            metadata: null,
            argumentDefinitions: v0 /*: any*/,
            selections: v1 /*: any*/
        },
        operation: {
            kind: "Operation",
            name: "LoginMutation",
            argumentDefinitions: v0 /*: any*/,
            selections: v1 /*: any*/
        },
        params: {
            operationKind: "mutation",
            name: "LoginMutation",
            id: null,
            text:
                "mutation LoginMutation(\n  $username: String!\n  $password: String!\n) {\n  login(username: $username, password: $password) {\n    authToken\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "b06b87c734065027d783775d353d5108";
export default node;
