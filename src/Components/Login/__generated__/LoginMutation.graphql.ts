/* tslint:disable */
/* eslint-disable */
/* @relayHash 02e82551875e9d7ef3dd6936f895a501 */

import { ConcreteRequest } from "relay-runtime";
export type LoginMutationVariables = {
    username: string;
    password: string;
};
export type LoginMutationResponse = {
    readonly login: {
        readonly authToken: string;
        readonly user: {
            readonly id: string;
        };
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
    user {
      id
    }
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
                    },
                    {
                        kind: "LinkedField",
                        alias: null,
                        name: "user",
                        storageKey: null,
                        args: null,
                        concreteType: "UserType",
                        plural: false,
                        selections: [
                            {
                                kind: "ScalarField",
                                alias: null,
                                name: "id",
                                args: null,
                                storageKey: null
                            }
                        ]
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
                "mutation LoginMutation(\n  $username: String!\n  $password: String!\n) {\n  login(username: $username, password: $password) {\n    authToken\n    user {\n      id\n    }\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "56e2b6bfe4e031ef5d691501a40708fe";
export default node;
