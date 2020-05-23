/* tslint:disable */
/* eslint-disable */
/* @relayHash 040c977d336cbdb16a15ff8401ea1219 */

import { ConcreteRequest } from "relay-runtime";
export type AppRefreshAuthTokensMutationVariables = {};
export type AppRefreshAuthTokensMutationResponse = {
    readonly refreshAuthTokens: {
        readonly authToken: string;
        readonly user: {
            readonly id: string;
        };
    };
};
export type AppRefreshAuthTokensMutation = {
    readonly response: AppRefreshAuthTokensMutationResponse;
    readonly variables: AppRefreshAuthTokensMutationVariables;
};

/*
mutation AppRefreshAuthTokensMutation {
  refreshAuthTokens {
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
            kind: "LinkedField",
            alias: null,
            name: "refreshAuthTokens",
            storageKey: null,
            args: null,
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
            name: "AppRefreshAuthTokensMutation",
            type: "Mutation",
            metadata: null,
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        operation: {
            kind: "Operation",
            name: "AppRefreshAuthTokensMutation",
            argumentDefinitions: [],
            selections: v0 /*: any*/
        },
        params: {
            operationKind: "mutation",
            name: "AppRefreshAuthTokensMutation",
            id: null,
            text:
                "mutation AppRefreshAuthTokensMutation {\n  refreshAuthTokens {\n    authToken\n    user {\n      id\n    }\n  }\n}\n",
            metadata: {}
        }
    };
})();
(node as any).hash = "15cb43bb5aac91723cd5cbf61983d444";
export default node;
